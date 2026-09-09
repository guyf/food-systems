/* chapter.js — the Clarkson's-Farm-style interstitial card shown in movie mode
 * when the story reaches a new area (or the intro / outro beat).
 *
 * FS.Chapter.play({ numeral, kicker, title }, done)
 *   shows the card, holds, wipes away, then calls done().
 * FS.Chapter.clear()  cancels any card in flight immediately. */
(function (FS) {
  "use strict";

  var el, numEl, kickerEl, titleEl;
  var timers = [];
  var HOLD = 1700;     // ms the card sits fully visible
  var OUT = 320;       // ms wipe-out

  function build() {
    el = FS.$("#chapter");
    el.textContent = "";

    var card = FS.h("div", { "class": "fs-chapter-card" });
    numEl = FS.h("span", { "class": "fs-chapter-num" });
    kickerEl = FS.h("span", { "class": "fs-chapter-kicker" });
    titleEl = FS.h("h2", { "class": "fs-chapter-title" });

    var rule = FS.svg("svg", { "class": "fs-chapter-rule", viewBox: "0 0 240 12", "aria-hidden": "true" });
    rule.appendChild(FS.svg("path", {
      "class": "fs-chapter-rule-path",
      d: "M4,7 C 60,1 120,12 180,5 S 232,6 236,7",
      fill: "none", "stroke-width": "3", "stroke-linecap": "round"
    }));

    var critter = FS.svg("svg", { "class": "fs-chapter-critter", viewBox: "0 0 60 40", "aria-hidden": "true" });
    /* a rough little tractor */
    critter.appendChild(FS.svg("path", {
      d: "M6,26 h22 l3,-10 h9 l4,10 h6", fill: "none", "stroke-width": "3",
      "stroke-linecap": "round", "stroke-linejoin": "round"
    }));
    critter.appendChild(FS.svg("circle", { cx: 14, cy: 30, r: 7, fill: "none", "stroke-width": "3" }));
    critter.appendChild(FS.svg("circle", { cx: 42, cy: 30, r: 5, fill: "none", "stroke-width": "3" }));

    card.appendChild(numEl);
    card.appendChild(kickerEl);
    card.appendChild(titleEl);
    card.appendChild(rule);
    card.appendChild(critter);
    el.appendChild(card);
  }

  function reset() {
    timers.forEach(clearTimeout);
    timers = [];
  }

  function clear() {
    reset();
    if (!el) return;
    el.classList.remove("is-in", "is-out");
    el.hidden = true;
  }

  function play(opts, done) {
    if (!el) build();
    reset();
    opts = opts || {};

    numEl.textContent = opts.numeral || "";
    numEl.hidden = !opts.numeral;
    kickerEl.textContent = opts.kicker || "";
    titleEl.textContent = opts.title || "";

    el.hidden = false;
    el.classList.remove("is-out");

    FS.nextFrame(function () {
      el.classList.add("is-in");
      var hold = FS.prefersReducedMotion() ? 900 : HOLD;
      timers.push(FS.delay(hold, function () {
        el.classList.remove("is-in");
        el.classList.add("is-out");
        timers.push(FS.delay(OUT, function () {
          el.hidden = true;
          el.classList.remove("is-out");
          if (done) done();
        }));
      }));
    });
  }

  FS.Chapter = { init: build, play: play, clear: clear };
})(window.FS);
