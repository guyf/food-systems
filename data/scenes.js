/* scenes.js — the ordered script for "movie mode".
 * ============================================================================
 * PLACEHOLDER captions. The engine (js/scenes.js) is complete; fill these in
 * and, later, record narration audio and point `narrationSrc` at the files
 * under assets/audio/.
 *
 * Shape of one scene:
 * {
 *   id:           unique string
 *   areaId:       an FS.areas[].id to focus, or null for an intro/outro beat
 *   action:       "intro" | "focus" | "compare" | "outro"  (informational; the
 *                 engine only distinguishes areaId set vs null)
 *   compare:      "harm" | "opportunity" | null  — which side the detail panel
 *                 should emphasise while this scene plays
 *   caption:      on-screen line (also the basis for the eventual voiceover)
 *   narrationSrc: "" for now, later e.g. "assets/audio/02-climate.mp3".
 *                 When set, the audio's length drives the scene; otherwise
 *                 durationMs does.
 *   durationMs:   fallback scene length when there is no narration audio
 * }
 * ========================================================================== */
window.FS = window.FS || {};

FS.scenes = [
  { id: "intro", areaId: null, action: "intro", compare: null,
    caption: "PLACEHOLDER — opening line: food and farming sit at the centre of it all.",
    narrationSrc: "", durationMs: 6000 },

  { id: "climate", areaId: "climate", action: "compare", compare: "harm",
    caption: "PLACEHOLDER — the current system is a major source of emissions...",
    narrationSrc: "", durationMs: 8000 },
  { id: "climate-good", areaId: "climate", action: "compare", compare: "opportunity",
    caption: "PLACEHOLDER — ...but farmland could store carbon instead.",
    narrationSrc: "", durationMs: 7000 },

  { id: "biodiversity", areaId: "biodiversity", action: "compare", compare: "harm",
    caption: "PLACEHOLDER — farmland covers most of the country, and wildlife is vanishing from it...",
    narrationSrc: "", durationMs: 8000 },
  { id: "biodiversity-good", areaId: "biodiversity", action: "compare", compare: "opportunity",
    caption: "PLACEHOLDER — ...nature-friendly farming brings it back.",
    narrationSrc: "", durationMs: 7000 },

  { id: "water", areaId: "water", action: "compare", compare: "harm",
    caption: "PLACEHOLDER — run-off pollutes rivers and worsens floods...",
    narrationSrc: "", durationMs: 8000 },
  { id: "water-good", areaId: "water", action: "compare", compare: "opportunity",
    caption: "PLACEHOLDER — ...healthy soil and wetlands hold and clean water.",
    narrationSrc: "", durationMs: 7000 },

  { id: "food-security", areaId: "food-security", action: "compare", compare: "harm",
    caption: "PLACEHOLDER — a fragile, import-dependent supply leaves people exposed...",
    narrationSrc: "", durationMs: 8000 },
  { id: "food-security-good", areaId: "food-security", action: "compare", compare: "opportunity",
    caption: "PLACEHOLDER — ...diversity and resilience feed everyone.",
    narrationSrc: "", durationMs: 7000 },

  { id: "community", areaId: "community", action: "compare", compare: "harm",
    caption: "PLACEHOLDER — consolidation hollows out rural places...",
    narrationSrc: "", durationMs: 8000 },
  { id: "community-good", areaId: "community", action: "compare", compare: "opportunity",
    caption: "PLACEHOLDER — ...local food economies rebuild them.",
    narrationSrc: "", durationMs: 7000 },

  { id: "health", areaId: "health", action: "compare", compare: "harm",
    caption: "PLACEHOLDER — cheap calories drive diet-related disease and strain the NHS...",
    narrationSrc: "", durationMs: 8000 },
  { id: "health-good", areaId: "health", action: "compare", compare: "opportunity",
    caption: "PLACEHOLDER — ...affordable, nourishing food keeps us well.",
    narrationSrc: "", durationMs: 7000 },

  { id: "animal-welfare", areaId: "animal-welfare", action: "compare", compare: "harm",
    caption: "PLACEHOLDER — intensity and cost-cutting come at the animals' expense...",
    narrationSrc: "", durationMs: 8000 },
  { id: "animal-welfare-good", areaId: "animal-welfare", action: "compare", compare: "opportunity",
    caption: "PLACEHOLDER — ...'less and better' respects them.",
    narrationSrc: "", durationMs: 7000 },

  { id: "outro", areaId: null, action: "outro", compare: null,
    caption: "PLACEHOLDER — closing call to action: change the system, change everything.",
    narrationSrc: "", durationMs: 8000 }
];
