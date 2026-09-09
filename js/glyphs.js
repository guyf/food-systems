/* glyphs.js — hand-drawn, stroke-based SVG symbols, one per impact area.
 * FS.glyph(id) returns an <g class="fs-glyph"> drawn in a roughly -24..24 box,
 * ready to drop into a plant head. Colour comes from CSS (stroke: var(--ink));
 * the parent plant applies filter:url(#rough) for the wobble. */
(function (FS) {
  "use strict";

  function p(d, extra) {
    var attrs = { d: d };
    if (extra) Object.keys(extra).forEach(function (k) { attrs[k] = extra[k]; });
    return FS.svg("path", attrs);
  }
  function line(x1, y1, x2, y2) {
    return FS.svg("line", { x1: x1, y1: y1, x2: x2, y2: y2 });
  }
  function circle(cx, cy, r, extra) {
    var a = { cx: cx, cy: cy, r: r };
    if (extra) Object.keys(extra).forEach(function (k) { a[k] = extra[k]; });
    return FS.svg("circle", a);
  }

  var BUILD = {
    /* climate change — sun + rising heat */
    "climate": function (g) {
      g.appendChild(circle(-2, -4, 9));
      [-90, -40, 0, 40, 90, 140].forEach(function (deg) {
        var a = deg * Math.PI / 180;
        g.appendChild(line(
          -2 + Math.cos(a) * 12, -4 + Math.sin(a) * 12,
          -2 + Math.cos(a) * 17, -4 + Math.sin(a) * 17));
      });
      g.appendChild(p("M-17,14 q4,-6 8,0 t8,0 t8,0"));
      g.appendChild(p("M-15,21 q4,-6 8,0 t8,0 t8,0"));
    },

    /* biodiversity — a bee */
    "biodiversity": function (g) {
      g.appendChild(FS.svg("ellipse", { cx: 0, cy: 4, rx: 10, ry: 7 }));
      g.appendChild(line(-4, -1, -4, 9));
      g.appendChild(line(3, -2, 3, 10));
      g.appendChild(p("M-6,-2 q-12,-9 -16,2 q10,6 16,2 z"));
      g.appendChild(p("M6,-2 q12,-9 16,2 q-10,6 -16,2 z"));
      g.appendChild(line(-3, -6, -6, -12));
      g.appendChild(line(2, -6, 5, -12));
    },

    /* water & flooding — a drop + ripples */
    "water": function (g) {
      g.appendChild(p("M0,-16 C 9,-3 13,3 13,8 a13,13 0 1 1 -26,0 c0,-5 4,-11 13,-24 z"));
      g.appendChild(p("M-15,17 q15,7 30,0"));
      g.appendChild(p("M-19,22 q19,9 38,0"));
    },

    /* food security — a sheaf of wheat */
    "food-security": function (g) {
      [[-7, "M-7,20 C -10,4 -10,-6 -9,-16"], [0, "M0,20 C 0,4 0,-8 0,-18"],
       [7, "M7,20 C 10,4 10,-6 9,-16"]].forEach(function (s) {
        g.appendChild(p(s[1]));
        var bx = s[0];
        for (var i = 0; i < 4; i++) {
          var y = -14 + i * 8;
          g.appendChild(p("M" + bx + "," + y + " l-5,-4 M" + bx + "," + y + " l5,-4"));
        }
      });
      g.appendChild(p("M-9,12 q9,5 18,0"));
    },

    /* community — two little houses */
    "community": function (g) {
      g.appendChild(p("M-18,20 v-14 h13 v14"));
      g.appendChild(p("M-20,6 l7,-9 l8,9"));
      g.appendChild(p("M2,20 v-16 h14 v16"));
      g.appendChild(p("M0,4 l8,-10 l9,10"));
      g.appendChild(line(8, 20, 8, 12));
    },

    /* human health — heart + pulse */
    "health": function (g) {
      g.appendChild(p("M0,18 C -16,4 -20,-6 -12,-13 C -6,-18 0,-13 0,-8 C 0,-13 6,-18 12,-13 C 20,-6 16,4 0,18 z"));
      g.appendChild(p("M-19,-1 h7 l3,-7 l4,15 l3,-8 h9", { fill: "none" }));
    },

    /* animal welfare — a sheep */
    "animal-welfare": function (g) {
      g.appendChild(p("M-12,4 q-8,-2 -6,-9 q0,-8 8,-7 q3,-6 11,-3 q9,-3 11,5 q7,1 5,9 q1,8 -8,8 q-4,5 -12,2 q-9,3 -14,-5 z"));
      g.appendChild(FS.svg("ellipse", { cx: 12, cy: 6, rx: 6, ry: 5 }));
      g.appendChild(p("M15,3 q4,-2 4,-6"));
      g.appendChild(line(-8, 11, -8, 18));
      g.appendChild(line(2, 12, 2, 19));
    }
  };

  FS.glyph = function (id) {
    var g = FS.svg("g", {
      "class": "fs-glyph",
      fill: "none",
      "stroke-width": 3,
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    });
    (BUILD[id] || function (gg) { gg.appendChild(circle(0, 0, 12)); })(g);
    return g;
  };
})(window.FS);
