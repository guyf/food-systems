/* scenes.js — the "movie mode" engine and playback bar.
 * Reacts to  mode:change.
 * Emits  scene:enter  (per scene) and  area:clear  (when leaving movie mode).
 *
 * Timing: if a scene has narrationSrc, the <audio> element drives it (scene
 * advances on 'ended'); otherwise a timer of durationMs does. The scrubber
 * seeks between scenes (not within one). A thin bar under the caption shows
 * progress through the current scene.
 *
 * When the story reaches a new area (or the intro/outro beat) a chapter card
 * is played first (FS.Chapter) and the scene starts when it clears. */
(function (FS) {
  "use strict";

  var scenes = [];
  var idx = 0;
  var playing = false;
  var mode = "explore";
  var lastChapterKey = null;
  var numerals = {};

  var audio;
  var advanceTimer = 0;
  var sceneStart = 0;         // performance.now() baseline for timer scenes
  var elapsedInScene = 0;     // ms already played of the current timer scene
  var rafProg = 0;

  var bar, capWrap, capText, capBar;
  var btnPrev, btnPlay, btnNext, btnMute, scrub, timeLabel;

  /* ------------------------------------------------------------ UI build */
  function buildCaption() {
    capWrap = FS.$("#caption");
    capWrap.textContent = "";
    capText = FS.h("p", { "class": "fs-caption-text" });
    capBar = FS.h("i");
    capWrap.appendChild(FS.h("div", { "class": "fs-caption-inner" }, capText));
    capWrap.appendChild(FS.h("div", { "class": "fs-caption-prog" }, capBar));
  }

  function buildBar() {
    bar = FS.$("#playback");
    bar.textContent = "";

    btnPrev = FS.h("button", { type: "button", "aria-label": "Previous scene", text: "⏮" });
    btnPlay = FS.h("button", { type: "button", "class": "fs-play", "aria-label": "Play", text: "▶︎" });
    btnNext = FS.h("button", { type: "button", "aria-label": "Next scene", text: "⏭" });
    scrub = FS.h("input", {
      type: "range", min: "0", max: "0", value: "0", step: "1",
      "class": "fs-scrub", "aria-label": "Scene"
    });
    timeLabel = FS.h("span", { "class": "fs-time", text: "0 / 0" });
    btnMute = FS.h("button", { type: "button", "aria-label": "Mute narration", text: "🔊" });

    btnPrev.addEventListener("click", function () { go(idx - 1, playing); });
    btnNext.addEventListener("click", function () { go(idx + 1, playing); });
    btnPlay.addEventListener("click", function () { playing ? pause() : play(); });
    btnMute.addEventListener("click", function () {
      audio.muted = !audio.muted;
      btnMute.textContent = audio.muted ? "🔇" : "🔊";
    });
    scrub.addEventListener("input", function () {
      go(parseInt(scrub.value, 10) || 0, playing);
    });

    bar.appendChild(btnPrev);
    bar.appendChild(btnPlay);
    bar.appendChild(btnNext);
    bar.appendChild(scrub);
    bar.appendChild(timeLabel);
    bar.appendChild(btnMute);
  }

  /* --------------------------------------------------------- transport */
  function scene() { return scenes[idx]; }

  function chapterOpts(s) {
    if (!s.areaId) {
      var isOutro = s.id === "outro";
      return {
        numeral: "",
        kicker: isOutro ? "" : "A short film about",
        title: isOutro ? "The end" : ((FS.meta && FS.meta.title) || "Food & Farming")
      };
    }
    var area = (FS.areas || []).find(function (a) { return a.id === s.areaId; });
    var grp = area && (FS.groups || []).find(function (g) { return g.id === area.group; });
    return {
      numeral: numerals[s.areaId] || "",
      kicker: grp ? grp.label : "",
      title: area ? area.label : s.areaId
    };
  }

  function go(i, autoplay) {
    if (!scenes.length) return;
    clearTimeout(advanceTimer);
    stopProgress();
    FS.Chapter.clear();

    idx = FS.clamp(i, 0, scenes.length - 1);
    elapsedInScene = 0;
    var s = scene();

    scrub.max = String(scenes.length - 1);
    scrub.value = String(idx);
    timeLabel.textContent = (idx + 1) + " / " + scenes.length;
    capText.textContent = s.caption || "";
    capBar.style.width = "0%";

    audio.pause();
    if (s.narrationSrc) {
      audio.src = s.narrationSrc;
      try { audio.currentTime = 0; } catch (e) { /* not seekable yet */ }
      audio.load();
    } else {
      audio.removeAttribute("src");
    }

    FS.bus.emit("scene:enter", { scene: s, index: idx, total: scenes.length });

    var key = s.areaId || s.id;
    var newChapter = mode === "movie" && key !== lastChapterKey;
    lastChapterKey = key;

    if (newChapter) {
      playing = false;
      syncPlayBtn();
      FS.Chapter.play(chapterOpts(s), function () { enterScene(autoplay); });
    } else {
      enterScene(autoplay);
    }
  }

  function enterScene(autoplay) {
    if (autoplay) play();
    else { playing = false; syncPlayBtn(); }
  }

  function play() {
    if (!scenes.length) return;
    FS.Chapter.clear();
    playing = true;
    syncPlayBtn();
    var s = scene();

    if (s.narrationSrc) {
      var pr = audio.play();
      if (pr && pr.catch) pr.catch(function () { /* autoplay blocked; user can press play */ });
    } else {
      sceneStart = performance.now() - elapsedInScene;
      var remain = Math.max(0, (s.durationMs || 6000) - elapsedInScene);
      advanceTimer = setTimeout(advance, remain);
    }
    startProgress();
  }

  function pause() {
    playing = false;
    syncPlayBtn();
    clearTimeout(advanceTimer);
    var s = scene();
    if (s && !s.narrationSrc) {
      elapsedInScene = performance.now() - sceneStart;
    }
    audio.pause();
    stopProgress();
  }

  function advance() {
    if (idx >= scenes.length - 1) { pause(); return; }
    go(idx + 1, true);
  }

  function syncPlayBtn() {
    btnPlay.textContent = playing ? "⏸" : "▶︎";
    btnPlay.setAttribute("aria-label", playing ? "Pause" : "Play");
  }

  /* -------------------------------------------------- per-scene progress */
  function progressFraction() {
    var s = scene();
    if (s.narrationSrc) {
      return audio.duration ? FS.clamp(audio.currentTime / audio.duration, 0, 1) : 0;
    }
    var total = s.durationMs || 6000;
    var done = playing ? (performance.now() - sceneStart) : elapsedInScene;
    return FS.clamp(done / total, 0, 1);
  }

  function tickProgress() {
    capBar.style.width = (progressFraction() * 100).toFixed(1) + "%";
    rafProg = requestAnimationFrame(tickProgress);
  }
  function startProgress() {
    stopProgress();
    rafProg = requestAnimationFrame(tickProgress);
  }
  function stopProgress() {
    if (rafProg) cancelAnimationFrame(rafProg);
    rafProg = 0;
  }

  /* --------------------------------------------------------- mode switch */
  function setMode(m) {
    mode = m;
    if (m === "movie") {
      lastChapterKey = null;
      bar.hidden = false;
      capWrap.hidden = false;
      document.body.classList.add("is-movie");
      go(0, false);
    } else {
      pause();
      FS.Chapter.clear();
      lastChapterKey = null;
      bar.hidden = true;
      capWrap.hidden = true;
      document.body.classList.remove("is-movie");
      FS.bus.emit("area:clear", { source: "scenes" });
    }
  }

  function init() {
    scenes = FS.scenes || [];

    var n = 0;
    scenes.forEach(function (s) {
      if (s.areaId && !numerals[s.areaId]) { n += 1; numerals[s.areaId] = FS.roman(n); }
    });

    buildCaption();
    buildBar();
    if (FS.Chapter && FS.Chapter.init) FS.Chapter.init();

    audio = new Audio();
    audio.preload = "auto";
    audio.addEventListener("ended", function () { if (playing) advance(); });

    FS.bus.on("mode:change", function (d) { setMode(d.mode); });
  }

  FS.Scenes = { init: init };
})(window.FS);
