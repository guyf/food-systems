# CLAUDE.md — Food & Farming Systems infographic

## What this is

A browser infographic making one argument: **what we eat and how we farm is the
ground the biggest challenges facing the planet and society grow out of — and
therefore one of our biggest opportunities.** For each impacted area it shows how
today's food system does **harm** and how a better system could do **good**.

### The picture

A hand-drawn field. **Food & farming is the soil** — a band across the bottom, about
29% of the height (`FIELD_Y` 510 in a 1200×720 viewBox, `js/diagram.js`). Each impact area is a **plant
growing out of it** — **The Planet** on the left (climate, biodiversity, water &
flooding), **Society** on the right (food security, community, human health, animal
welfare). The sky is kept plain (a sun / clouds were tried and removed — they read
as stray overlays). At rest the title + intro (`#intro`) sit in the earth band; the
SVG `FOOD & FARMING` sign there is hidden until a plant is focused.

**THE PLANET / SOCIETY** headings are HTML (`#groups`, built by `diagram.js`), not
SVG — the scene SVG uses `preserveAspectRatio="xMidYMid meet"` with oversized
sky/soil rects and hills/furrows that run far past both edges, so nothing is ever
cropped or visibly ends on a wide window.

**Overlay sizing — `--u`.** `.fs-scene` is a CSS size container (it needs an
explicit `height`; `cqh` reads 0 against a min-height-only container). `--u` in
`css/styles.css` is px per viewBox unit as the SVG is actually drawn
(`min(100cqw / 1200, 100cqh / 720)`), and every HTML overlay — group headings,
banner, intro, the detail panel's bottom edge — is positioned and font-sized in
`--u` against the viewBox (`--vb-w`, `--vb-h`, `--field-y`, mirrored from
`diagram.js`). So text scales with the plants, not the window width, and nothing
collides on short, wide laptop screens. Change the viewBox or `FIELD_Y` in both
places.

Other HTML overlays on the scene, all faded out when a plant is focused or in movie
mode: `#banner` (`.fs-banner`, the statement pinned above the plants — static text
in `index.html`) and `#intro` (the paragraph then the `meta.title` line, seated in
the earth band; `main.js` injects the lede before the title so the title reads as
the closing line). Text on the soil uses the theme-independent `--on-soil` /
`--on-soil-dim` / `--root` tokens (never overridden in the dark block), plus a
soil-tinted text-shadow halo so it stays readable over the roots.

Each plant is a flower: a tapering filled stem (a leaning cubic bezier, lean from a
per-plant seeded RNG separate from the roots'), three pointed leaves with midribs
attached along the curve on alternating sides, and a head of 11 petals round a disc
carrying the glyph (`DISC_R`, `PETAL_R`). The label stacks above the petals. Colour
comes from `--leaf`, set per group: leaves full strength, petals mixed 45% into
paper. Hover sways the plant and turns the petal ring.

Below ground: every plant has an `.fs-roots` group — a dense network of fine
thread-like paths (a couple of meandering main threads + wiggly laterals + hairs,
all generated per-plant from a seeded RNG in `js/diagram.js`), a sibling of
`.fs-plant-body` so it ducks/scales with the plant on focus via its own
`has-focus` rules; no `#rough` filter (it chews up the thin strokes). Root strokes
are ~0.45–1.1px. `buildSoilLife()` currently only scatters a few very faint
`.fs-hyphae` threads — worms and tiny creatures were removed. The whole
`.fs-plants` group sits unshifted; plant heights (`POS[].h`, 222–258) are what
keep the labels clear of the banner.

- **Explore** — click a plant. It travels to the centre and shrinks; the others
  retract into the soil; the intro fades and the soil sign fades in showing the
  **area name**; and the sky above **splits in two** — **Today** (left) and
  **Opportunity** (right), just a title and text, no boxes. "Back to the field"
  (or `Esc`) returns.
- **Play the story** ("movie mode") — an ordered sequence of scenes with captions
  and a playback bar. When the story reaches a new area it plays a **chapter card**
  interstitial (Roman numeral, area name, a rule that draws itself, a little
  tractor drives across) — style homage to Clarkson's Farm. Captions are
  placeholders; no narration audio yet.

## Visual style

Homage to Clarkson's Farm — **not** their logo, type, or assets. Cream paper
(`--paper`), ink line (`--ink`), condensed slab display type (Oswald) over a serif
body (Bitter), earthy palette, rough edges via an SVG `feDisplacementMap` filter
(`filter: url(#rough)`, defined inline in `index.html`), a paper-grain overlay
(`.fs-grain`), and animated chapter cards.

Fonts are loaded from Google Fonts in `index.html`. That's the **one** external
dependency. It degrades to system fallbacks (Arial Narrow / Georgia) when offline,
e.g. when `index.html` is opened straight off disk; served over https it loads.

## Working agreement

- **No build step. No framework. One dependency (the web font).** Plain HTML + CSS
  + vanilla JS. Keep it that way — it deploys to Cloudflare with zero config.
- **Claude does not run in-browser tests.** Guy reviews every change visually in a
  browser. Claude's checks stop at `node --check` on the JS and reading the code.
- **Content lives in `data/`, not in the JS.** `data/areas.js` now holds a
  **first-draft** of the real UK-focused content with per-area `sources[]` — the
  figures still need checking against those sources. `data/scenes.js` captions are
  still placeholder. Don't hardcode copy into the modules.
- Deploy = `git push`. The repo is linked to a Cloudflare Worker; there is no
  manual deploy and no build command.

## Layout

```
index.html          app shell, <svg> filter defs, grain div, <script defer> tags
css/styles.css      all styling; custom properties + light/dark + reduced-motion
js/util.js          window.FS: event bus, $/$$, h()/svg() builders, tween(),
                    nextFrame(), delay(), roman()
js/glyphs.js        FS.glyph(id) — a rough stroke-SVG symbol per impact area
js/diagram.js       FS.Diagram — the field: SVG scene (wide) or list (<=640px);
                    plant travel + retract on focus
js/detail.js        FS.Detail  — the Today | Opportunity split over the sky
js/chapter.js       FS.Chapter — the movie-mode interstitial card
js/scenes.js        FS.Scenes  — movie engine + playback bar + caption bar,
                    fires chapter cards on area change
js/main.js          boot: inject intro, init modules, wire the mode toggle + Esc
data/areas.js       FS.meta / FS.groups / FS.areas  (the content model)
data/scenes.js      FS.scenes  (the ordered movie script)
data/organisations.js  FS.organisations — the UK regen-farming landscape (see below)
organisations.html  "Who's already in the field": plain first-pass page rendering
                    data/organisations.js. Deliberately unstyled beyond the tokens
                    (plus the shared `.fs-back` link).
mission.html        "Our mission": static first-draft copy for the transition-
                    funding charity; styles are the `.fs-page*` / `.fs-aims` rules
                    at the end of css/styles.css (shared with future subpages).
data/systems.js     FS.systems — the three-layer "whole system" (farms → supply
                    chains → demand), each Today → Could be + levers, with the
                    push/pull links between layers, and `orgs[]` — exact names
                    from data/organisations.js (systems.html takes the links from
                    there, so rename in both). First draft; stats flagged
                    `check: true` until verified.
systems.html        "The whole system": renders data/systems.js as a stack —
                    demand on top, supply chains, farms on the soil at the
                    bottom. Linked from the main header.
docs/               notes not served by the site (.assetsignore) —
                    landscape-research-method.md is the method + re-run prompt
                    for organisations.js; regen-cycle-logo.js generates the
                    header logo (`node docs/regen-cycle-logo.js assets/img/regen-cycle.svg`)
assets/audio/       narration mp3s go here later
assets/img/         regen-cycle.svg — the 6:1 header logo (`.fs-logo`), a
                    regen rotation read right to left; left of the header in
                    place of a text brand (alt="Food & Farming"); 50px tall,
                    40px <=800px, 24px <=720px; colours baked in, so a paper
                    card in dark mode. Header nav: Who's in the field · Our
                    mission · mode toggle; <=720px it wraps to two rows
                    (--header-h 86px)
```

Script load order (all `defer`, so they run in order after parse):
`util` → `glyphs` → `data/areas` → `data/scenes` → `diagram` → `detail` →
`chapter` → `scenes` → `main`.

## The one contract: `FS.bus`

Modules never call each other directly — everything is decoupled through a tiny
pub/sub bus in `util.js`.

| event         | payload                          | emitted by            | consumed by            |
|---------------|----------------------------------|-----------------------|------------------------|
| `area:select` | `{ id, source }`                 | diagram               | diagram, detail, main  |
| `area:clear`  | `{ source }`                     | diagram, detail, main, scenes | diagram, detail, main |
| `mode:change` | `{ mode: "explore" \| "movie" }` | main                  | diagram, detail, scenes, main |
| `scene:enter` | `{ scene, index, total }`        | scenes                | diagram, detail        |

`FS.bus.on(type, fn)` returns an unsubscribe function. To add a behaviour,
subscribe and/or emit — keep new cross-module coupling on the bus.

## Data model

### An area (`data/areas.js` → `FS.areas[]`)

```js
{
  id: "climate",                 // kebab-case; must match FS.groups[].areaIds,
                                 //   FS.scenes[].areaId, and POS in diagram.js
  group: "planet",               // "planet" | "society"
  label: "Global warming",
  icon: "🌡️",                    // legacy; the plant head uses FS.glyph(id) now
  summary: "one sentence",
  harm:        { headline, points: [ { text, stat } ] },
  opportunity: { headline, points: [ { text, stat } ] },
  shift: "one line: the change that flips harm -> benefit",
  sources: [ { key: "s1", cite: "...", url: "" } ]
}
```

`stat` is `null` or `{ value, unit, source }` where `source` is a `sources[].key`.
`FS.groups` defines the two clusters and, via `areaIds`, left→right order.

### A scene (`data/scenes.js` → `FS.scenes[]`)

```js
{
  id: "climate",
  areaId: "climate",   // an FS.areas id to focus, or null for intro/outro
  action: "compare",   // informational only
  compare: "harm",     // "harm" | "opportunity" | null — detail column to emphasise
  caption: "on-screen line (basis for the voiceover)",
  narrationSrc: "",    // "" now; later "assets/audio/03-climate.mp3"
  durationMs: 8000     // fallback length when there's no narration audio
}
```

Timing: `narrationSrc` set → the `<audio>` drives the scene (advances on `ended`);
otherwise a `durationMs` timer does. The scrubber seeks **between scenes**.

Chapter cards: `scenes.js` plays one whenever the scene's `areaId` (or, for
intro/outro, its `id`) differs from the previous scene's. Roman numerals are
assigned in `FS.scenes` order, one per distinct `areaId`.

## How to...

- **Add an impact area:** add an object to `FS.areas`; add its `id` to the right
  group's `areaIds`; add a `POS` entry in `js/diagram.js` (`x` root position in the
  0–1200 viewBox, `h` natural plant height); add a builder in `js/glyphs.js`
  (`BUILD["your-id"]`); add scene(s) to `FS.scenes`.
- **Move / resize a plant:** edit its `POS` entry in `js/diagram.js`. The field
  surface is `FIELD_Y` (510); focused plants travel to `CENTRE_X` (600). Keep the
  tallest `h` around 258 or the labels reach the banner.
- **Add / reorder scenes:** edit `FS.scenes` — array order is play order.
- **Add narration:** drop `assets/audio/NN-name.mp3`, set it as that scene's
  `narrationSrc`; its duration then controls the scene.
- **Retheme:** edit the custom properties at the top of `css/styles.css` (full
  dark-mode block below the light one). Rough-filter strength: the `#rough` /
  `#rough-strong` filters in `index.html`.
- **Tune the chapter card:** timings (`HOLD`, `OUT`) in `js/chapter.js`; look in
  the `.fs-chapter*` rules in `css/styles.css`.

## Manual review checklist (for Guy)

- Serve: `npx serve .` (or open `index.html` directly — fonts fall back offline).
  No console errors.
- Explore: clicking a plant pulls it centre + down, the rest sink into the soil,
  the soil sign becomes the area name, the sky splits Today | Opportunity;
  "Back to the field" / `Esc` reverses it.
- Narrow (~375px): the field becomes a list that still opens every area.
- Play the story: a chapter card plays into each new area; Play steps the beats;
  caption + emphasised column follow; pause / scrub / prev / next work; `Esc` exits.
- Reduced motion (OS setting): plants, panel and chapter cards appear without the
  travel/scale/draw animation.
- Drop any `.mp3` in `assets/audio/`, set it as one scene's `narrationSrc`, reload —
  that scene plays the audio and uses its length for timing.
