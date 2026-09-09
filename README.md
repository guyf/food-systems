# Food & Farming Systems

An interactive infographic. Food and farming is drawn as **the ground** — a
hand-drawn field — and the biggest challenges facing the planet and society grow
out of it as **plants**: The Planet on the left (climate, biodiversity, water &
flooding), Society on the right (food security, community, human health, animal
welfare). Each shows how today's system does harm and how a better one could help.

- **Explore** — click a plant; it moves centre-stage and its detail opens over the
  field, the other plants sink into the soil.
- **Play the story** — a scene-by-scene walkthrough with captions and animated
  chapter cards (style homage to Clarkson's Farm), built to take a voiceover later.

Content is currently placeholder scaffolding (`data/areas.js`, `data/scenes.js`);
the structure is done, the words come next.

One external dependency: the Google Fonts stylesheet in `index.html` (degrades to
system fonts offline).

## Run locally

No build step. Either:

```bash
npx serve .
```

then open the printed URL — or just open `index.html` in a browser.

## Deploy

`git push`. The repo is linked to a Cloudflare Worker that serves the static files;
there is no build command and no manual deploy.

## Project notes

See [CLAUDE.md](CLAUDE.md) for the architecture, the `FS.bus` event contract, the
data model, and how to add areas, scenes, and narration audio.
