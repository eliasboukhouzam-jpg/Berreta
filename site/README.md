# Berreta site: draft v0.2

Pick a weapon the way you pick a flavour: each one has its own colour world, and switching runs a molten dissolve on the 3D model, a gooey colour wipe and a letter roll. Scroll down and the weapon comes apart. Each part shows its material and the elements in it. Then one material leaves the gun: the globe shows who mines it, the biggest mines and their owners, who refines it, and one plausible path from mine to factory.

Five weapons: Beretta 92FS, Glock 17, M16A2, Barrett M82A1, FPV strike drone.

## Run

```bash
cd site
npm install
npm run dev      # local dev server
npm run build    # static build in site/dist
```

`dev-models.html` renders all five models side by side (query: `explode`, `rot`, `tilt`, `only`) for checking silhouettes.

## Structure

| Path | What |
|---|---|
| `src/data/weapons.js` | The five weapons: copy, colour world, parts (each with an alloy and a key element), the journey of one material |
| `src/data/alloys.js` | Alloys and polymers with their element recipes |
| `src/data/elements.js` | Per element: mining and refining tables, biggest mines with owners, refining sites |
| `src/models/*.js` | Procedural exterior models drawn from side profiles in millimetres |
| `src/three/profile.js` | Profile extrusion, lathe, spring and serration helpers (1 unit = 100 mm) |
| `src/three/materials.js` | Finishes: bruniton, nitride, anodised, stippled polymer, glass, copper… |
| `src/three/exploded.js` | `ExplodedModel`: named parts, explode vectors, focus/dim, labels, dissolve |
| `src/three/dissolve.js` | Noise dissolve shader used when switching weapons |
| `src/three/globe.js` | Dotted globe: choropleth by share, mine pillars, refining sites, journey arcs |
| `src/three/stage.js` | One fixed WebGL canvas; scroll sets a target state, the stage eases toward it |
| `src/ui/selector.js` | Weapon picker and the switch transition |
| `src/ui/story.js` | Scroll story built per weapon: take apart → parts → globe → back together |

## Adding a weapon

1. Build a model in `src/models/` with `new ExplodedModel(id)` and `.add(partId, object, { explode: [x, y, z] })`.
2. Add it to `src/data/weapons.js` (parts must use the same ids) and register it in `src/main.js`.
3. Any new alloy goes in `alloys.js`; any new element in `elements.js`.

## Limits on purpose

- Models are exteriors only, split at field-strip level (what an owner's manual shows). No internal mechanisms, no dimensions on screen, no files that could be used for manufacturing.
- Journeys are one plausible path. Metals from many mines are mixed at refineries, so no weapon can be traced to a single mine.
- Figures carry evidence badges (documented / consensus / estimate). Sources are in `../research/`. Not affiliated with any manufacturer.
