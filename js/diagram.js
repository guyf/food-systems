/* diagram.js — the field. Food & farming is the ground; each impact area is a
 * plant growing out of it. Planet on the left, society on the right.
 *
 * Emits   area:select / area:clear
 * Reacts to  area:select / area:clear / scene:enter
 *   -> the chosen plant travels to the centre of the field and the others
 *      retract into the soil. (The detail panel is drawn by detail.js.)
 *
 * Below 640px the field is replaced by a plain list. */
(function (FS) {
  "use strict";

  /* VB_W x VB_H and FIELD_Y are mirrored in css/styles.css (--vb-w, --vb-h,
     --field-y) so the HTML overlays can sit in the drawing's coordinates */
  var VB_W = 1200, VB_H = 720;
  var FIELD_Y = 510;      // soil surface — where every plant is rooted (soil ~= 29% tall)
  var CENTRE_X = 600;     // where the focused plant travels to

  /* root x and natural height (soil to flower centre) per area */
  var POS = {
    "climate":        { x: 150, h: 236 },
    "biodiversity":   { x: 312, h: 258 },
    "water":          { x: 468, h: 222 },
    "food-security":  { x: 726, h: 246 },
    "community":      { x: 848, h: 228 },
    "health":         { x: 968, h: 256 },
    "animal-welfare": { x: 1086, h: 226 }
  };

  var DISC_R = 34;        // flower centre, holds the glyph
  var PETAL_R = 50;       // tip of the petal ring

  /* hills run well past both edges so a wide window never shows where they stop */
  var HILLS = [
    "M-1500,404 C -900,388 -400,420 -10,416 C 170,382 320,404 470,398 S 780,368 980,392 1210,382 1210,382" +
      " C 1600,374 2100,410 2700,398 L2700,518 -1500,518 Z",
    "M-1500,446 C -900,436 -400,458 -10,450 C 190,430 330,458 540,448 S 840,418 1040,444 1210,436 1210,436" +
      " C 1600,430 2100,454 2700,444 L2700,518 -1500,518 Z"
  ];
  /* furrow offsets below the soil surface */
  var FURROWS = [20, 50, 88, 130, 172];

  var host, svg, gPlants, fieldNameEl;
  var fieldNameTimer = 0;
  var plantEls = {};      // id -> outer <g class="fs-plant">
  var selected = null;
  var mq = window.matchMedia("(max-width: 640px)");

  function areasInOrder() {
    var out = [];
    (FS.groups || []).forEach(function (grp) {
      grp.areaIds.forEach(function (id) {
        var a = (FS.areas || []).find(function (x) { return x.id === id; });
        if (a) out.push(a);
      });
    });
    return out;
  }

  /* ------------------------------------------------ small deterministic RNG */
  function mulberry32(a) {
    return function () {
      a |= 0; a = a + 0x6D2B79F5 | 0;
      var t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  function hashStr(s) {
    var h = 2166136261;
    for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }
  function r1(n) { return Math.round(n * 10) / 10; }

  /* a thin thread wandering downward from (0,0) toward (0, y1) */
  function threadDown(y1, rng) {
    var segs = 4 + Math.floor(rng() * 3);
    var dy = y1 / segs, x = 0, y = 0, d = "M0,0";
    for (var i = 0; i < segs; i++) {
      var taper = 1 - i / (segs + 1);
      var nx = (rng() - 0.5) * 26 * taper;
      var ny = y + dy;
      var cx = x + (rng() - 0.5) * 22;
      var cy = y + dy * 0.5;
      d += " Q " + r1(cx) + "," + r1(cy) + " " + r1(nx) + "," + r1(ny);
      x = nx; y = ny;
    }
    return d;
  }

  /* a thin lateral thread from (0, y0) heading out (dir) and down, wiggling */
  function lateralThread(y0, dir, rng) {
    var len = 24 + rng() * 46;
    var segs = 3 + Math.floor(rng() * 3);
    var x = 0, y = y0, d = "M0," + r1(y0);
    for (var i = 0; i < segs; i++) {
      var t = (i + 1) / segs;
      var nx = dir * len * t + (rng() - 0.5) * 16;
      var ny = y0 + len * t * (0.4 + rng() * 0.8) + i * 3;
      var cx = x + dir * 9 + (rng() - 0.5) * 12;
      var cy = (y + ny) / 2;
      d += " Q " + r1(cx) + "," + r1(cy) + " " + r1(nx) + "," + r1(ny);
      x = nx; y = ny;
    }
    return d;
  }

  /* point + unit tangent on a cubic bezier given as [[x,y] x4] */
  function bezier(P, t) {
    var u = 1 - t;
    var x = u*u*u*P[0][0] + 3*u*u*t*P[1][0] + 3*u*t*t*P[2][0] + t*t*t*P[3][0];
    var y = u*u*u*P[0][1] + 3*u*u*t*P[1][1] + 3*u*t*t*P[2][1] + t*t*t*P[3][1];
    var dx = 3*u*u*(P[1][0]-P[0][0]) + 6*u*t*(P[2][0]-P[1][0]) + 3*t*t*(P[3][0]-P[2][0]);
    var dy = 3*u*u*(P[1][1]-P[0][1]) + 6*u*t*(P[2][1]-P[1][1]) + 3*t*t*(P[3][1]-P[2][1]);
    var len = Math.sqrt(dx*dx + dy*dy) || 1;
    return { x: x, y: y, tx: dx / len, ty: dy / len };
  }

  /* a filled outline of the stem curve, w0 half-width at the soil, w1 at the top */
  function taperedStem(P, w0, w1) {
    var N = 18, left = [], right = [];
    for (var i = 0; i <= N; i++) {
      var b = bezier(P, i / N), w = w0 + (w1 - w0) * (i / N);
      left.push(r1(b.x - b.ty * w) + "," + r1(b.y + b.tx * w));
      right.push(r1(b.x + b.ty * w) + "," + r1(b.y - b.tx * w));
    }
    return "M" + left.join(" L") + " L" + right.reverse().join(" L") + " Z";
  }

  /* a pointed leaf with a midrib, attached at a stem point, angled up and out */
  function leaf(at, dir, len, angle) {
    var w = len * 0.34;
    var g = FS.svg("g", {
      "class": "fs-leaf-g",
      transform: "translate(" + r1(at.x) + "," + r1(at.y) + ") scale(" + dir + ",1) rotate(" + r1(-angle) + ")"
    });
    g.appendChild(FS.svg("path", {
      "class": "fs-leaf",
      d: "M0,0 C " + r1(len * 0.28) + "," + r1(-w) + " " + r1(len * 0.72) + "," + r1(-w * 0.95) + " " + r1(len) + ",0" +
         " C " + r1(len * 0.7) + "," + r1(w * 0.75) + " " + r1(len * 0.28) + "," + r1(w * 0.8) + " 0,0 Z"
    }));
    g.appendChild(FS.svg("path", {
      "class": "fs-leaf-rib",
      d: "M3,0 Q " + r1(len * 0.5) + "," + r1(-w * 0.12) + " " + r1(len * 0.86) + ",0"
    }));
    return g;
  }

  /* split a label into two roughly balanced lines (by character count) */
  function labelLines(label) {
    var w = label.split(" ");
    if (w.length === 1) return [label];
    var best = 1, bestDiff = Infinity;
    for (var i = 1; i < w.length; i++) {
      var diff = Math.abs(w.slice(0, i).join(" ").length - w.slice(i).join(" ").length);
      if (diff < bestDiff) { bestDiff = diff; best = i; }
    }
    return [w.slice(0, best).join(" "), w.slice(best).join(" ")];
  }

  /* -------------------------------------------------------------- scene */
  function buildScene() {
    host.textContent = "";
    plantEls = {};

    svg = FS.svg("svg", {
      "class": "fs-svg",
      viewBox: "0 0 " + VB_W + " " + VB_H,
      /* meet: the whole scene always fits, no top/edge cropping. The sky and
         soil rects are oversized so any letterbox band fills seamlessly. */
      preserveAspectRatio: "xMidYMid meet",
      role: "group",
      "aria-label": "Food and farming — the ground everything grows from. Select a plant."
    });

    /* sky (kept plain — sun and clouds removed for now) */
    svg.appendChild(FS.svg("rect", { "class": "fs-sky", x: -3000, y: -3000, width: VB_W + 6000, height: 3000 + FIELD_Y }));
    svg.appendChild(FS.svg("rect", { "class": "fs-haze", x: -3000, y: FIELD_Y - 280, width: VB_W + 6000, height: 280 }));

    /* hills */
    var hills = FS.svg("g", { "class": "fs-hills" });
    hills.appendChild(FS.svg("path", { "class": "fs-hill fs-hill--far", d: HILLS[0] }));
    hills.appendChild(FS.svg("path", { "class": "fs-hill fs-hill--mid", d: HILLS[1] }));
    svg.appendChild(hills);

    /* field */
    var field = FS.svg("g", { "class": "fs-soil" });
    field.appendChild(FS.svg("rect", { "class": "fs-soil-fill", x: -3000, y: FIELD_Y, width: VB_W + 6000, height: 3000 }));
    FURROWS.forEach(function (off, idx) {
      var y = FIELD_Y + off;
      field.appendChild(FS.svg("path", {
        "class": "fs-furrow", d: "M-1500," + y + " L-30," + y + " Q 600," + (y - 10 - idx * 2) + " 1230," + y + " L2700," + y,
        "stroke-width": 2 + idx * 0.6
      }));
    });
    field.appendChild(FS.svg("path", {
      "class": "fs-soil-edge",
      d: "M-1500," + FIELD_Y + " L-10," + FIELD_Y + " Q 210," + (FIELD_Y - 9) + " 600," + FIELD_Y +
         " T 1210," + (FIELD_Y - 2) + " L2700," + (FIELD_Y - 2)
    }));
    /* grass tufts along the edge */
    var tuftG = FS.svg("g", { "class": "fs-tufts" });
    var ty = FIELD_Y + 2;
    [60, 190, 360, 520, 690, 840, 980, 1130].forEach(function (x) {
      tuftG.appendChild(FS.svg("path", {
        d: "M" + x + "," + ty + " l-4,-12 M" + x + "," + ty + " l0,-15 M" + x + "," + ty + " l5,-11"
      }));
    });
    field.appendChild(tuftG);
    svg.appendChild(field);

    /* (group headings THE PLANET / SOCIETY are HTML overlays — see #groups —
       so the SVG's slice-cropping of the top edge can never hide them) */

    /* faint fungal threads in the soil (under the roots) */
    svg.appendChild(buildSoilLife());

    /* field name — swaps to the focused area's name */
    fieldNameEl = FS.svg("text", { "class": "fs-fieldname", x: CENTRE_X, y: FIELD_Y + 118, text: "FOOD & FARMING" });
    svg.appendChild(fieldNameEl);

    /* plants */
    gPlants = FS.svg("g", { "class": "fs-plants" });
    areasInOrder().forEach(function (area) {
      gPlants.appendChild(buildPlant(area));
    });
    svg.appendChild(gPlants);

    svg.addEventListener("click", function (e) {
      if (selected && !e.target.closest(".fs-plant")) {
        FS.bus.emit("area:clear", { source: "diagram" });
      }
    });

    host.appendChild(svg);
    applyFocus();
  }

  function buildPlant(area) {
    var meta = POS[area.id] || { x: CENTRE_X, h: 320 };
    var h = meta.h;

    var outer = FS.svg("g", {
      "class": "fs-plant",
      role: "button",
      tabindex: "0",
      "aria-label": area.label + " — open detail"
    });
    outer.setAttribute("data-area", area.id);
    outer.setAttribute("data-group", area.group);
    outer.style.transform = "translate(" + meta.x + "px," + FIELD_Y + "px)";

    /* fine, thread-like roots reaching down into the soil */
    var rd = 122 + Math.round((h - 300) * 0.3);   // root depth
    var rng = mulberry32(hashStr(area.id));
    var roots = FS.svg("g", { "class": "fs-roots" });

    /* a couple of meandering main threads */
    roots.appendChild(FS.svg("path", { "class": "fs-taproot", d: threadDown(rd + 8, rng) }));
    roots.appendChild(FS.svg("path", { "class": "fs-rootlet", d: threadDown(rd * (0.7 + rng() * 0.2), rng) }));

    /* many fine laterals, each splitting once or twice */
    var nLat = 11;
    for (var i = 0; i < nLat; i++) {
      var ly = rd * (0.1 + (i / nLat) * 0.86) + (rng() - 0.5) * 8;
      var dir = rng() < 0.5 ? -1 : 1;
      roots.appendChild(FS.svg("path", { "class": "fs-rootlet", d: lateralThread(ly, dir, rng) }));
      if (rng() < 0.7) {
        roots.appendChild(FS.svg("path", { "class": "fs-roothair", d: lateralThread(ly + rng() * 6, dir, rng) }));
      }
      if (rng() < 0.4) {
        roots.appendChild(FS.svg("path", { "class": "fs-roothair", d: lateralThread(ly + 4, -dir, rng) }));
      }
    }

    /* very fine hairs off the centre line */
    var nHair = 16;
    for (var j = 0; j < nHair; j++) {
      var hy = rd * (0.08 + rng() * 0.9);
      var hd = rng() < 0.5 ? -1 : 1;
      var hl = 6 + rng() * 12;
      roots.appendChild(FS.svg("path", {
        "class": "fs-roothair",
        d: "M" + r1((rng() - 0.5) * 6) + "," + r1(hy) +
           " q " + r1(hd * hl * 0.5) + "," + r1(hl * 0.4) + " " + r1(hd * hl) + "," + r1(hl)
      }));
    }
    outer.appendChild(roots);

    var body = FS.svg("g", { "class": "fs-plant-body" });
    var srng = mulberry32(hashStr(area.id + ":stem"));   // own RNG so the roots don't shift

    /* stem — a tapering, gently leaning curve from the soil up to the flower */
    var lean = (srng() - 0.5) * 22;
    var stem = [
      [0, 0],
      [-10 + lean, -h * 0.34],
      [10 + lean * 0.6, -h * 0.68],
      [0, -h]
    ];
    body.appendChild(FS.svg("path", { "class": "fs-stem", d: taperedStem(stem, 3.8, 1.7) }));

    /* leaves along the stem, alternating sides, smaller towards the top */
    var side = srng() < 0.5 ? -1 : 1;
    [0.2, 0.42, 0.63].forEach(function (t, i) {
      var len = (54 - i * 9) * (0.9 + srng() * 0.2);
      body.appendChild(leaf(bezier(stem, t), side, len, 34 + srng() * 12));
      side = -side;
    });

    /* flower head: a ring of petals round a disc that carries the glyph */
    var head = FS.svg("g", { "class": "fs-head", transform: "translate(0," + (-h) + ")" });
    var petals = FS.svg("g", { "class": "fs-petals" });
    var nPetals = 11, twist = srng() * 30;
    for (var k = 0; k < nPetals; k++) {
      petals.appendChild(FS.svg("path", {
        "class": "fs-petal",
        d: "M0," + (-DISC_R + 6) +
           " C 12," + (-DISC_R - 2) + " 13," + (-PETAL_R + 4) + " 0," + (-PETAL_R) +
           " C -13," + (-PETAL_R + 4) + " -12," + (-DISC_R - 2) + " 0," + (-DISC_R + 6) + " Z",
        transform: "rotate(" + r1(twist + k * 360 / nPetals) + ")"
      }));
    }
    head.appendChild(petals);
    head.appendChild(FS.svg("circle", { "class": "fs-head-disc", cx: 0, cy: 0, r: DISC_R }));
    head.appendChild(FS.glyph(area.id));

    /* label sits ABOVE the flower, lines stacking upward from a fixed baseline */
    var lines = labelLines(area.label);
    var lastLineY = -PETAL_R - 14;
    var label = FS.svg("text", {
      "class": "fs-plant-label", x: 0, y: lastLineY - (lines.length - 1) * 20
    });
    lines.forEach(function (ln, i) {
      label.appendChild(FS.svg("tspan", { x: 0, dy: i === 0 ? 0 : 20, text: ln }));
    });
    head.appendChild(label);
    body.appendChild(head);

    outer.appendChild(body);

    outer.addEventListener("click", function () { pick(area.id); });
    outer.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        pick(area.id);
      }
    });

    plantEls[area.id] = outer;
    return outer;
  }

  /* faint fungal threads scattered through the soil band
     (worms + tiny creatures removed for now) */
  function buildSoilLife() {
    var g = FS.svg("g", { "class": "fs-soil-life" });
    var rng = mulberry32(20240607);
    var TOP = FIELD_Y + 12, SPAN = 138;

    for (var k = 0; k < 6; k++) {
      var fx = 70 + rng() * 1060;
      var fy = TOP + rng() * SPAN;
      g.appendChild(FS.svg("path", {
        "class": "fs-hyphae",
        d: "M" + r1(fx) + "," + r1(fy) + " q 10,12 3,26 m -3,-26 q -13,7 -9,24" +
           " m 9,-24 q 5,15 17,19 m -17,-19 q 2,-12 -8,-18"
      }));
    }

    return g;
  }

  function pick(id) {
    FS.bus.emit("area:select", { id: id, source: "diagram" });
  }

  function labelOf(id) {
    var a = (FS.areas || []).find(function (x) { return x.id === id; });
    return (a ? a.label : id).toUpperCase();
  }

  /* swap the sign on the soil between "FOOD & FARMING" and the focused area,
   * with a short cross-fade */
  function setFieldName(txt) {
    if (!fieldNameEl) return;
    if ((fieldNameEl.textContent || "") === txt) return;
    fieldNameEl.style.opacity = "0";
    clearTimeout(fieldNameTimer);
    fieldNameTimer = setTimeout(function () {
      fieldNameEl.textContent = txt;
      fieldNameEl.style.opacity = "";
    }, 220);
  }

  function applyFocus() {
    if (svg && host.contains(svg)) {
      host.classList.toggle("has-focus", !!selected);
      Object.keys(plantEls).forEach(function (id) {
        var el = plantEls[id];
        var isSel = id === selected;
        el.classList.toggle("is-focused", isSel);
        var meta = POS[id] || { x: CENTRE_X };
        el.style.transform = "translate(" + (isSel ? CENTRE_X : meta.x) + "px," + FIELD_Y + "px)";
      });
      setFieldName(selected ? labelOf(selected) : "FOOD & FARMING");
    }
    /* accordion rows */
    Object.keys(plantEls).forEach(function (id) {
      var el = plantEls[id];
      if (el.tagName === "BUTTON") {
        var isSel = id === selected;
        el.classList.toggle("is-active", isSel);
        el.setAttribute("aria-pressed", isSel ? "true" : "false");
      }
    });
  }

  /* ---------------------------------------------------------- accordion */
  function buildAccordion() {
    host.textContent = "";
    plantEls = {};
    svg = null;

    (FS.groups || []).forEach(function (grp) {
      var sec = FS.h("section", { "class": "fs-acc-group" }, FS.h("h3", { text: grp.label }));
      grp.areaIds.forEach(function (id) {
        var area = (FS.areas || []).find(function (a) { return a.id === id; });
        if (!area) return;
        var wrapGlyph = FS.h("span", { "class": "fs-acc-ic", "aria-hidden": "true" });
        var mini = FS.svg("svg", { viewBox: "-30 -30 60 60", width: "26", height: "26", "class": "fs-glyph" });
        var gl = FS.glyph(id);
        mini.appendChild(gl);
        wrapGlyph.appendChild(mini);

        var row = FS.h("button", { "class": "fs-acc-row", type: "button", "aria-pressed": "false" },
          wrapGlyph,
          FS.h("span", { "class": "fs-acc-lbl", text: area.label }),
          FS.h("span", { "class": "fs-acc-chev", "aria-hidden": "true", text: "›" })
        );
        row.setAttribute("data-area", id);
        row.addEventListener("click", function () {
          if (selected === id) FS.bus.emit("area:clear", { source: "diagram" });
          else pick(id);
        });
        plantEls[id] = row;
        sec.appendChild(row);
      });
      host.appendChild(sec);
    });

    applyFocus();
  }

  function render() {
    if (mq.matches) buildAccordion();
    else buildScene();
  }

  /* THE PLANET / SOCIETY headings, as HTML over the scene (never SVG-cropped) */
  function buildGroupHeadings() {
    var el = FS.$("#groups");
    if (!el || !FS.groups) return;
    el.textContent = "";
    FS.groups.forEach(function (g) {
      el.appendChild(FS.h("span", {
        "class": "fs-group-tag fs-group-tag--" + g.id, text: g.label
      }));
    });
  }

  function init() {
    host = FS.$("#diagram");
    if (!host) return;

    buildGroupHeadings();
    render();
    if (mq.addEventListener) mq.addEventListener("change", render);
    else mq.addListener(render);

    FS.bus.on("area:select", function (d) { selected = d.id; applyFocus(); });
    FS.bus.on("area:clear", function () { selected = null; applyFocus(); });
    FS.bus.on("scene:enter", function (d) {
      selected = d.scene.areaId || null;
      applyFocus();
    });
  }

  FS.Diagram = { init: init };
})(window.FS);
