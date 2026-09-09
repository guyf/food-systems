/* main.js — boot and wiring. Runs last (all scripts are `defer`, in order). */
(function (FS) {
  "use strict";

  function boot() {
    var meta = FS.meta || {};
    if (meta.title) document.title = meta.title;

    var intro = FS.$("#intro");
    if (intro) {
      /* intro paragraph first, then the title as the closing line at the bottom */
      if (meta.intro) {
        intro.appendChild(FS.h("p", { "class": "fs-lede", text: meta.intro }));
      }
      intro.appendChild(FS.h("h1", { "class": "fs-title",
        text: meta.title || "Food & Farming Systems" }));
    }

    FS.state = { mode: "explore", selectedAreaId: null };

    FS.Diagram.init();
    FS.Detail.init();
    FS.Scenes.init();

    var modeButtons = FS.$$(".fs-mode [data-mode]");
    modeButtons.forEach(function (btn) {
      btn.addEventListener("click", function () { setMode(btn.dataset.mode); });
    });

    FS.bus.on("mode:change", function (d) {
      FS.state.mode = d.mode;
      modeButtons.forEach(function (b) {
        b.classList.toggle("is-active", b.dataset.mode === d.mode);
        b.setAttribute("aria-pressed", b.dataset.mode === d.mode ? "true" : "false");
      });
    });

    FS.bus.on("area:select", function (d) { FS.state.selectedAreaId = d.id; });
    FS.bus.on("area:clear", function () { FS.state.selectedAreaId = null; });

    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      if (FS.state.mode === "movie") setMode("explore");
      else FS.bus.emit("area:clear", { source: "key" });
    });
  }

  function setMode(mode) {
    if (!mode || FS.state.mode === mode) return;
    FS.bus.emit("mode:change", { mode: mode });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})(window.FS);
