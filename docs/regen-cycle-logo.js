// regen-cycle-logo.js — generates assets/img/regen-cycle.svg, the 6:1 header
// logo: a regenerative rotation read right to left (wheat -> clover cover ->
// cow grazing into it -> hens following through the pats -> wheat again).
// Palette from css/styles.css. Run: node docs/regen-cycle-logo.js assets/img/regen-cycle.svg
const fs = require("fs");
const out = process.argv[2];

const C = {
  paper: "#f4ead4", ink: "#2b2419", inkSoft: "#6b5d45",
  hillFar: "#bccaa9", hillMid: "#a1b78a",
  soil: "#6f5137", soil2: "#573c27", root: "#b89f76",
  good: "#4c7a37", planet: "#3f6b53", gold: "#c9912a", straw: "#a8782a",
  society: "#b06b25", harm: "#a13a29", rose: "#b5606a",
};
const W = 600, H = 100, G = 80; // ground line

let seed = 11;
const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
const j = (a) => (rnd() * 2 - 1) * a;
const f = (n) => Math.round(n * 10) / 10;

// ---------------------------------------------------------------- wheat
function wheat(x, h, lean) {
  const tx = x + lean, ty = G - h;
  let s = `<path d="M${f(x)},${G} Q${f(x + lean * 0.2)},${f(G - h * 0.55)} ${f(tx)},${f(ty)}" stroke="${C.straw}" stroke-width="1.8" fill="none"/>`;
  const ly = G - h * 0.35, side = rnd() < 0.5 ? -1 : 1;
  s += `<path d="M${f(x + lean * 0.1)},${f(ly)} q${5 * side},-6 ${9 * side},-3" stroke="${C.straw}" stroke-width="1.4" fill="none"/>`;
  // the ear: stacked grains, leaning with the stalk
  const ang = Math.atan2(lean, h) * 180 / Math.PI;
  let ear = "";
  for (let i = 0; i < 6; i++) {
    const cy = -i * 3.1 - 2, sd = i % 2 ? 1 : -1;
    ear += `<ellipse cx="${f(sd * 1.4)}" cy="${f(cy)}" rx="1.7" ry="3.1" transform="rotate(${sd * 20} ${f(sd * 1.4)} ${f(cy)})" fill="${C.gold}" stroke="${C.ink}" stroke-width="0.8"/>`;
    ear += `<path d="M${f(sd * 2.5)},${f(cy - 2.5)} l${f(sd * 3)},-7" stroke="${C.inkSoft}" stroke-width="0.6"/>`;
  }
  ear += `<ellipse cx="0" cy="-20.5" rx="1.5" ry="2.6" fill="${C.gold}" stroke="${C.ink}" stroke-width="0.8"/>`;
  ear += `<path d="M0,-23 l0,-7" stroke="${C.inkSoft}" stroke-width="0.6"/>`;
  s += `<g transform="translate(${f(tx)},${f(ty)}) rotate(${f(ang)})">${ear}</g>`;
  return s;
}
function wheatField(x0, x1, n) {
  let s = "";
  for (let i = 0; i < n; i++) {
    const x = x0 + (x1 - x0) * (i + 0.5) / n + j(2);
    s += wheat(x, 44 + j(5), j(4));
  }
  return s;
}

// ---------------------------------------------------------------- clover
function trefoil(x, y, r, col) {
  let s = `<path d="M${f(x)},${G} Q${f(x + j(3))},${f((G + y) / 2)} ${f(x)},${f(y)}" stroke="${C.good}" stroke-width="1" fill="none"/>`;
  [-90, 30, 150].forEach((a) => {
    const rad = (a + j(12)) * Math.PI / 180;
    s += `<circle cx="${f(x + Math.cos(rad) * r)}" cy="${f(y + Math.sin(rad) * r)}" r="${f(r)}" fill="${col || C.good}" stroke="${C.ink}" stroke-width="0.7"/>`;
  });
  return s;
}
function cloverHead(x, y, fill) {
  let s = `<path d="M${f(x)},${G} Q${f(x - 2)},${f((G + y) / 2)} ${f(x)},${f(y)}" stroke="${C.good}" stroke-width="1" fill="none"/>`;
  s += `<circle cx="${f(x)}" cy="${f(y - 3)}" r="4" fill="${fill}" stroke="${C.ink}" stroke-width="0.8"/>`;
  for (let i = 0; i < 5; i++) s += `<path d="M${f(x - 2.5 + i * 1.2)},${f(y - 5 + (i % 2) * 2)} l0.8,1.8" stroke="${C.ink}" stroke-width="0.5"/>`;
  return s;
}
function cloverPatch(x0, x1, n, hMin, hMax, heads) {
  let s = "";
  const items = [];
  for (let i = 0; i < n; i++) items.push({ x: x0 + (x1 - x0) * rnd(), y: G - (hMin + (hMax - hMin) * rnd()) });
  items.sort((a, b) => a.y - b.y);
  (heads || []).forEach((hd) => { s += cloverHead(hd[0], hd[1], hd[2]); });
  items.forEach((it, i) => { s += trefoil(it.x, it.y, 2.6 + rnd() * 0.8, i % 3 ? C.good : C.planet); });
  return s;
}
function tufts(x0, x1, n) {
  let s = "";
  for (let i = 0; i < n; i++) {
    const x = x0 + (x1 - x0) * (i + rnd()) / n;
    s += `<path d="M${f(x - 2)},${G} l-1,-3 M${f(x)},${G} l0,-4 M${f(x + 2)},${G} l1,-3" stroke="${C.good}" stroke-width="1" fill="none"/>`;
  }
  return s;
}

// ---------------------------------------------------------------- cow
// Belted Galloway, facing right, head down grazing. Drawn in local coords:
// ground at y=0, rump at x=0; placed with translate/scale.
function cow(x, k) {
  const body = [
    "M4,-45",
    "C14,-45.5 30,-44 44,-45.5",     // flat topline to the withers
    "C50,-46 55,-44 59,-40",         // withers into the crest
    "C64,-35 68,-29 71.5,-25",       // thick neck reaching down to the poll
    "C73.5,-23.5 75,-22 75.5,-20",   // forehead
    "C77,-14 78,-8 78.5,-3.5",       // broad face
    "C79,-1 78,0 76,0 L71.5,0",      // muzzle in the sward
    "C70.5,-3 69,-7 66,-11",         // jaw
    "C64.5,-13 62.5,-15 60,-17",     // throat
    "C57.5,-18.5 55,-20 53,-20",     // dewlap to brisket
    "C52.5,-14 52,-8 52.5,-3 L52.5,0 L47.5,0", // near foreleg
    "C47.5,-4 47.5,-8 47,-11",       // knee
    "C46.5,-14 46,-17 44.5,-19.5",   // forearm to elbow
    "C36,-16 24,-15.5 17,-19.5",     // deep belly
    "C15.5,-20.5 14.5,-21 14,-21",   // flank / stifle
    "C13,-17 11,-14 10,-11.5",       // gaskin down to the hock
    "C9.5,-7 9.5,-3 10,0 L5,0",      // hind cannon
    "C4.5,-3 4,-7 3.5,-10",
    "C2.5,-11.5 1,-12.5 1,-14",      // point of the hock
    "C-1,-20 -2,-28 -1,-35",         // full thigh
    "C-0.5,-39 1,-43 4,-45 Z"        // pin bone -> tailhead
  ].join(" ");
  const dark = "#463b2e", mid = "#5a4d3c";
  let s = `<clipPath id="cow-body"><path d="${body}"/></clipPath>`;
  // far legs, a shade lighter so the pairs separate
  s += `<path d="M44.5,-19 C44,-12 43.5,-6 44,0 L39.5,0 C39.5,-6 39.5,-12 38.5,-18 Z" fill="${dark}"/>`;
  s += `<path d="M20.5,-19 C20,-13 18.5,-9 18,-6 L18.5,0 L14,0 L13.5,-6 C13.5,-9 13.5,-12 14,-17 Z" fill="${dark}"/>`;
  // tail down the back of the thigh, with its switch
  s += `<path d="M4,-44.5 C0,-41 -2.5,-34 -3,-16" stroke="${C.ink}" stroke-width="1.8" fill="none"/>`;
  s += `<path d="M-3,-17 c-2.2,2 -2.6,6 -1.2,8.5 c1,-1 2.4,-1 3,0.2 c0.6,-3 0.2,-6.5 -1.8,-8.7 Z" fill="${C.ink}"/>`;
  s += `<path d="${body}" fill="${C.ink}" filter="url(#rc-shag)"/>`;
  // the white belt round the barrel
  s += `<path d="M24,-50 C26,-40 23,-28 25,-12 L36,-12 C34.5,-28 37.5,-40 35.5,-50 Z" fill="${C.paper}" clip-path="url(#cow-body)"/>`;
  // outline holds the two halves together as one animal at logo size
  s += `<path d="${body}" fill="none" stroke="${C.ink}" stroke-width="1.8" filter="url(#rc-shag)"/>`;
  // short, fuzzy ear out from the poll + a curly topknot
  s += `<path d="M70,-25.5 C71,-30 74.5,-32 78.5,-31.5 C79.5,-29.5 78,-26.5 74,-24.5 C72.5,-24 71,-24 70,-25.5 Z" fill="${C.ink}" filter="url(#rc-shag)"/>`;
  s += `<path d="M73,-30 C75,-30.5 77,-30 77.8,-29.5" stroke="${mid}" stroke-width="0.8" fill="none"/>`;
  s += `<circle cx="68.5" cy="-28" r="1.6" fill="${C.ink}"/><circle cx="70.5" cy="-27" r="1.4" fill="${C.ink}"/>`;
  // face: eye, muzzle, nostril
  s += `<circle cx="72.6" cy="-18.5" r="0.95" fill="${C.paper}"/>`;
  s += `<ellipse cx="75.8" cy="-3.2" rx="3" ry="2.6" fill="${mid}"/>`;
  s += `<circle cx="77.8" cy="-3.9" r="0.6" fill="${C.ink}"/>`;
  return `<g transform="translate(${x},${G}) scale(${k})">${s}</g>`;
}

// ---------------------------------------------------------------- hens
// Local coords, facing right, feet on y=5. Colour: a brown layer.
function henUpright() {
  return `
  <path d="M0,0 L-1,5 l-2,0.5 M-1,5 l2,0.5 M3,0 L4,5 l-2,0.5 M4,5 l2.5,0.3" stroke="${C.gold}" stroke-width="1.1" fill="none"/>
  <path d="M-13,-19 C-10,-14 -8,-12 -5,-12 C0,-14 5,-14 8,-12 C12,-9 11,-2 5,-0.5 C-1,1 -8,-1 -11,-6 C-13,-10 -15,-15 -13,-19 Z" fill="${C.society}" stroke="${C.ink}" stroke-width="1"/>
  <path d="M-12,-17 C-10,-13 -9,-10 -9,-7" stroke="${C.soil2}" stroke-width="1" fill="none"/>
  <path d="M3,-12 C5,-16 5,-19 7,-22 L12,-20 C10,-16 10,-13 9,-10 Z" fill="${C.society}" stroke="${C.ink}" stroke-width="1"/>
  <path d="M-6,-8 C-2,-4 3,-5 5,-8" stroke="${C.soil2}" stroke-width="1" fill="none"/>
  <circle cx="9.5" cy="-21.5" r="3.6" fill="${C.society}" stroke="${C.ink}" stroke-width="1"/>
  <path d="M6.5,-24 q0.8,-3.5 2.2,-0.8 q1.3,-3.2 2.4,-0.2 q1.4,-2 1.6,1.2 Z" fill="${C.harm}"/>
  <ellipse cx="12.3" cy="-17.6" rx="1.1" ry="1.8" fill="${C.harm}"/>
  <path d="M12.8,-22.6 L16.5,-21.4 L12.8,-20.2 Z" fill="${C.gold}" stroke="${C.ink}" stroke-width="0.5"/>
  <circle cx="10.4" cy="-22.2" r="0.7" fill="${C.ink}"/>`;
}
function henPecking() {
  return `
  <path d="M0,0 L-1,5 l-2,0.5 M-1,5 l2,0.5 M3,0 L3.5,5 l-2,0.5 M3.5,5 l2.5,0.3" stroke="${C.gold}" stroke-width="1.1" fill="none"/>
  <path d="M-13,-16 C-10,-12 -8,-11 -5,-11 C1,-12 6,-10 9,-6 C11,-3 9,0.5 4,0.5 C-2,1.5 -8,-0.5 -10,-5 C-12,-8 -14,-12 -13,-16 Z" fill="${C.society}" stroke="${C.ink}" stroke-width="1"/>
  <path d="M-12,-14 C-10,-11 -9,-8 -9,-5" stroke="${C.soil2}" stroke-width="1" fill="none"/>
  <path d="M-5,-7 C-1,-3 3,-4 5,-6" stroke="${C.soil2}" stroke-width="1" fill="none"/>
  <path d="M6,-8 C10,-7 13,-4 14,-1 L11,1.5 C9,-0.5 7,-2 5,-2 Z" fill="${C.society}" stroke="${C.ink}" stroke-width="1"/>
  <circle cx="13.5" cy="1" r="3.4" fill="${C.society}" stroke="${C.ink}" stroke-width="1"/>
  <path d="M10.5,-1.5 q0.2,-3.4 2.2,-1.2 q1,-3 2.4,-0.6 q1.6,-1.6 1.8,1.6 Z" fill="${C.harm}"/>
  <path d="M15.5,2.8 L17.5,6.8 L14,4.6 Z" fill="${C.gold}" stroke="${C.ink}" stroke-width="0.5"/>
  <circle cx="14.6" cy="0.2" r="0.7" fill="${C.ink}"/>`;
}
function hen(x, flip, pose) {
  const body = pose === "peck" ? henPecking() : henUpright();
  return `<g transform="translate(${x},${G - 5.75}) scale(${flip ? -1.15 : 1.15},1.15)">${body}</g>`;
}
function pat(x, w) {
  return `<path d="M${x - w},${G} C${x - w},${G - 4} ${x - w * 0.5},${G - 6.5} ${x},${G - 7} C${x + w * 0.5},${G - 6.5} ${x + w},${G - 4} ${x + w},${G} Z" fill="${C.soil2}" stroke="${C.ink}" stroke-width="0.9"/>
  <path d="M${x - w * 0.55},${G - 2.2} q${w * 0.5},-2.4 ${w * 1.1},0" stroke="${C.soil}" stroke-width="0.8" fill="none"/>`;
}

// ---------------------------------------------------------------- residue
function residue(x0, x1, n) {
  let s = "";
  for (let i = 0; i < n; i++) {
    const x = x0 + (x1 - x0) * rnd(), y = G - 0.5 - rnd() * 2.5, len = 5 + rnd() * 6;
    s += `<path d="M${f(x)},${f(y)} l${f(len)},${f(j(1.5))}" stroke="${i % 3 ? C.straw : C.planet}" stroke-width="1.5"/>`;
  }
  return s;
}

// ---------------------------------------------------------------- soil + roots
function roots(x0, x1, n, depth, nodules) {
  let s = "";
  for (let i = 0; i < n; i++) {
    const x = x0 + (x1 - x0) * (i + 0.5) / n + j(2);
    let d = `M${f(x)},${G + 1}`, cx = x, cy = G + 1;
    const steps = 4;
    for (let k = 0; k < steps; k++) {
      const nx = cx + j(3), ny = cy + depth / steps;
      d += ` Q${f(cx + j(3))},${f((cy + ny) / 2)} ${f(nx)},${f(ny)}`;
      if (k > 0 && k < steps - 1) d += ` M${f(nx)},${f(ny)} l${f(j(5))},${f(2 + rnd() * 3)} M${f(nx)},${f(ny)}`;
      cx = nx; cy = ny;
      if (nodules && k === 1 && rnd() < 0.8) s += `<circle cx="${f(nx + 1.5)}" cy="${f(ny + 1)}" r="1.1" fill="${C.root}"/>`;
    }
    s += `<path d="${d}" stroke="${C.root}" stroke-width="0.6" fill="none"/>`;
  }
  return s;
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-labelledby="t d">
  <title id="t">A regenerative farming cycle</title>
  <desc id="d">Read right to left: wheat, then a clover cover crop, a cow grazing into the clover, hens following behind through the cow pats, then wheat again drilled into the residue.</desc>
  <defs>
    <filter id="rc-rough" x="-2%" y="-10%" width="104%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="7" result="n"/>
      <feDisplacementMap in="SourceGraphic" in2="n" scale="1.6" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
    <filter id="rc-shag" x="-5%" y="-5%" width="110%" height="110%">
      <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="1" seed="4" result="n"/>
      <feDisplacementMap in="SourceGraphic" in2="n" scale="1.2" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
    <linearGradient id="rc-soil" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0" stop-color="${C.soil2}"/>
      <stop offset="1" stop-color="#8a6a4a"/>
    </linearGradient>
  </defs>
  <g stroke-linecap="round" stroke-linejoin="round">
    <path d="M0,${G} C60,62 150,60 230,70 C300,78 360,58 450,64 C520,68 570,62 600,66 L600,${G} Z" fill="${C.hillFar}" opacity="0.55"/>
    <g filter="url(#rc-rough)">
      <path d="M0,${G - 1} C120,${G - 2.5} 240,${G + 1} 360,${G - 1.5} C460,${G - 3} 540,${G + 0.5} 600,${G - 1} L600,${H} L0,${H} Z" fill="url(#rc-soil)"/>
      <path d="M0,${G - 1} C120,${G - 2.5} 240,${G + 1} 360,${G - 1.5} C460,${G - 3} 540,${G + 0.5} 600,${G - 1}" stroke="${C.ink}" stroke-width="2" fill="none"/>
      ${roots(0, 8, 1, 15, true)}
      ${roots(18, 112, 6, 13, false)}
      ${roots(122, 240, 6, 15, false)}
      ${roots(250, 340, 6, 17, true)}
      ${roots(350, 482, 9, 16, true)}
      ${roots(490, 590, 7, 12, false)}
      <path d="M18,95.5 C160,97.5 440,97.5 578,95.5" stroke="#d9cba9" stroke-width="1" stroke-dasharray="3 2.5" fill="none"/>
      <path d="M574,93 L580,95.5 L574,98" stroke="#d9cba9" stroke-width="1" fill="none"/>
    </g>
    <g filter="url(#rc-rough)">
      ${cloverPatch(-6, 9, 7, 4, 17, [[2, 60, C.paper]])}
      ${residue(10, 114, 28)}
      ${wheatField(16, 110, 7)}
      ${tufts(112, 250, 12)}
      ${hen(128, false, "up")}
      <path d="M150,79 l1.5,-1 M156,78.5 l1,0.8 M146,78.8 l1.5,-0.6 M161,78.6 l1.2,0.5" stroke="${C.soil2}" stroke-width="1.4"/>
      ${hen(160, false, "peck")}
      ${pat(193, 9)}
      ${hen(208, false, "peck")}
      ${pat(236, 7)}
      ${cow(254, 1.05)}
      ${cloverPatch(334, 358, 7, 2, 8)}
      ${cloverPatch(354, 486, 40, 5, 20, [[378, 58, C.paper], [416, 60, C.rose], [455, 59, C.paper]])}
      ${wheatField(494, 594, 7)}
    </g>
  </g>
</svg>
`;
fs.writeFileSync(out, svg);
console.log("wrote", out, svg.length, "bytes");
