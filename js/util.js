/* util.js — shared namespace, event bus, DOM helpers, animation.
 * Classic script (no ES modules) so index.html works when opened directly
 * from disk as well as when served. Everything hangs off window.FS. */
window.FS = window.FS || {};

(function (FS) {
  "use strict";

  /* ---------------------------------------------------------------- event bus
   * The single channel the modules talk over. Contract:
   *   area:select  { id, source }        an impact area was chosen
   *   area:clear   { source }            selection dismissed
   *   scene:enter  { scene, index, total } movie mode moved to a scene
   *   mode:change  { mode }              "explore" <-> "movie"
   */
  var channels = new Map();

  FS.bus = {
    on: function (type, fn) {
      if (!channels.has(type)) channels.set(type, new Set());
      channels.get(type).add(fn);
      return function () { FS.bus.off(type, fn); };
    },
    off: function (type, fn) {
      var set = channels.get(type);
      if (set) set.delete(fn);
    },
    emit: function (type, detail) {
      var set = channels.get(type);
      if (!set) return;
      Array.from(set).forEach(function (fn) {
        try { fn(detail); }
        catch (err) { console.error("[FS.bus] listener for " + type + " threw", err); }
      });
    }
  };

  /* ------------------------------------------------------------- DOM helpers */
  FS.$ = function (sel, root) { return (root || document).querySelector(sel); };
  FS.$$ = function (sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  };

  function applyAttrs(node, attrs, isSvg) {
    Object.keys(attrs || {}).forEach(function (k) {
      var v = attrs[k];
      if (v == null || v === false) return;
      if (k === "text") { node.textContent = v; return; }
      if (k === "html") { node.innerHTML = v; return; }
      if (k === "class") { node.setAttribute("class", v); return; }
      if (k === "dataset" && !isSvg) { Object.assign(node.dataset, v); return; }
      if (k === "style" && typeof v === "object") { Object.assign(node.style, v); return; }
      if (k.indexOf("on") === 0 && typeof v === "function") {
        node.addEventListener(k.slice(2), v); return;
      }
      node.setAttribute(k, v === true ? "" : v);
    });
  }

  function appendKids(node, kids) {
    kids.forEach(function (kid) {
      if (kid == null || kid === false) return;
      if (Array.isArray(kid)) { appendKids(node, kid); return; }
      node.appendChild(
        typeof kid === "string" || typeof kid === "number"
          ? document.createTextNode(String(kid))
          : kid
      );
    });
  }

  /* Build an HTML element: FS.h("p", {class:"x"}, "hello", child) */
  FS.h = function (tag, attrs) {
    var node = document.createElement(tag);
    applyAttrs(node, attrs, false);
    appendKids(node, Array.prototype.slice.call(arguments, 2));
    return node;
  };

  /* Build an SVG element in the correct namespace. */
  var SVG_NS = "http://www.w3.org/2000/svg";
  FS.svg = function (tag, attrs) {
    var node = document.createElementNS(SVG_NS, tag);
    applyAttrs(node, attrs, true);
    appendKids(node, Array.prototype.slice.call(arguments, 2));
    return node;
  };

  /* -------------------------------------------------------------- animation */
  FS.clamp = function (n, lo, hi) { return Math.max(lo, Math.min(hi, n)); };

  FS.ease = {
    inOutCubic: function (t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
  };

  FS.prefersReducedMotion = function () {
    return !!(window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  };

  /* Wait two animation frames — long enough for a freshly un-hidden element to
   * be laid out before a class change is expected to transition. */
  FS.nextFrame = function (fn) {
    requestAnimationFrame(function () { requestAnimationFrame(fn); });
  };

  FS.delay = function (ms, fn) { return setTimeout(fn, ms); };

  /* Roman numerals for chapter cards (1..39 is plenty). */
  FS.roman = function (n) {
    var map = [[10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]];
    var out = "";
    n = Math.max(0, Math.floor(n));
    map.forEach(function (pair) {
      while (n >= pair[0]) { out += pair[1]; n -= pair[0]; }
    });
    return out;
  };

  /* Tween a bag of numbers. Returns a cancel function.
   * Respects prefers-reduced-motion by jumping straight to the end. */
  FS.tween = function (opts) {
    var from = opts.from, to = opts.to;
    var duration = opts.duration == null ? 600 : opts.duration;
    var ease = opts.ease || FS.ease.inOutCubic;
    var onUpdate = opts.onUpdate, onDone = opts.onDone;
    var keys = Object.keys(from);

    if (FS.prefersReducedMotion() || duration <= 0) {
      if (onUpdate) onUpdate(to, 1);
      if (onDone) onDone();
      return function () {};
    }

    var start = performance.now();
    var raf = 0;
    var cancelled = false;

    function frame(now) {
      if (cancelled) return;
      var t = Math.min(1, (now - start) / duration);
      var e = ease(t);
      var cur = {};
      keys.forEach(function (k) { cur[k] = from[k] + (to[k] - from[k]) * e; });
      if (onUpdate) onUpdate(cur, t);
      if (t < 1) raf = requestAnimationFrame(frame);
      else if (onDone) onDone();
    }

    raf = requestAnimationFrame(frame);
    return function () { cancelled = true; cancelAnimationFrame(raf); };
  };
})(window.FS);
