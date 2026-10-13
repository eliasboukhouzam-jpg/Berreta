# Berreta site: draft v0.1

Scroll-driven 3D story. **Part I** shows the 12 revolutions briefly, as line-art plates that draw themselves while scale dials move. **Part II** (2014–2026) takes each object apart in 3D, one part at a time, as you scroll.

## Run

```bash
cd site
npm install
npm run dev      # local dev server
npm run build    # static build in site/dist
```

## Structure

| Path | What |
|---|---|
| `src/content/revolutions.js` | Part I text + dial values (one entry per revolution) |
| `src/content/chapters.js` | Part II chapters: steps (text + 3D state), part labels, timelines |
| `src/art/plates.js` | Placeholder line art for the 12 plates (to be replaced by commissioned drawings) |
| `src/three/stage.js` | Single fixed WebGL canvas, lights, labels, easing toward the scroll state |
| `src/three/exploded.js` | `ExplodedModel`: named parts, explode vectors, focus/dim, labels |
| `src/models/*.js` | Procedural placeholder models: rock (hero), FPV drone, Shahed-type drone, 155 mm shell (cut-away) |
| `src/ui/past.js` | Part I pinned timeline (GSAP ScrollTrigger) |
| `src/ui/chapters.js` | Part II scroll → 3D state mapping |

## Adding a chapter

1. Build a model in `src/models/` with `new ExplodedModel(id)` and `.add(partId, object, { explode: [x, y, z] })`.
2. Register it in `src/main.js`.
3. Add a chapter in `src/content/chapters.js` with `parts` (labels) and `steps` (each step: `state` + text).

Step state fields: `explode` (0–1), `rotY`, `rotX`, `zoom`, `focus` (part id), `show` (optional part ids), `labels` (bool).

## Status

Draft. Models are simplified shapes built in code, not drawings of real systems. Text carries evidence badges (documented / consensus / estimate). Sources are in `../research/`.
