# Research: content phase (no design yet)

Brainstorm drafted 13 Oct 2026. This folder is the **content source of truth** for the site. Design comes later.

| File | What's in it |
|---|---|
| [01-concept.md](01-concept.md) | Thesis, scope rule, 4 navigation axes, depth tiers, evidence badges, guardrails, ethics, flagship list |
| [02-master-timeline.md](02-master-timeline.md) | ~200 breakthroughs in 11 eras, each with materials + one-line production chain |
| [03-materials-atlas.md](03-materials-atlas.md) | ~65 materials: what they enabled, where they came from then and now, chokepoint flags |
| [04-sample-entries.md](04-sample-entries.md) | The entry template (YAML) + 3 full deep dives: Naue II bronze sword, Beretta 1526 arquebus barrels, 155 mm shell 2026 |
| [05-storylines.md](05-storylines.md) | 11 cross-era narrative threads (Saltpeter, Tin routes, Chokepoints, Who paid…) |
| [06-sources.md](06-sources.md) | Source tiers, core library, the web sources used today, hygiene rules |
| [07-value-chain-model.md](07-value-chain-model.md) | **The end product:** 10-layer value chain (mine → country → tonnage → processing → refinery → factory → logistics → politics → contracts → end of life), evidence levels L1–L4, node/edge data model |
| [08-value-chain-sig-m17.md](08-value-chain-sig-m17.md) | Worked chain for the SIG Sauer M17 (the pistol that replaced the Beretta M9) |
| [09-chain-structure.md](09-chain-structure.md) | **How the story is told:** 12 old revolutions as "rules that broke" (brief), 6 scale dials, 7 deep shifts for 2014–2026, ancestor pairs |
| [10-inspiration-and-visual-models.md](10-inspiration-and-visual-models.md) | Lessons from Anduril, Beretta, Helsing & newsrooms; story patterns; visual system (line art past, 3D present, exploded view → value chain); asset licensing |
| [11-reference-sites.md](11-reference-sites.md) | **The team's 6 reference sites** (Why Zero, Oryzo, Shopify Editions, Lando Norris, Terminal Industries, Anime.js): what each teaches for stories & drawing models; combined visual direction |

**Confidence legend everywhere:** ✅ documented · 🟡 consensus (default when untagged) · ⚠️ estimate/contested, verify before publishing.

## Decisions only you can make (they change the content)

1. **Scope:** all weapons (stone → cyber), or firearms-centered (matching the "Berreta" name)? The drafts assume **all weapons, organized around materials**.
2. **Audience:** general public & students (assumed) vs firearms enthusiasts. Changes depth and tone.
3. **Language(s):** English only, or also French / Arabic / Italian? Decide before writing T2 stories, not after.
4. **Name:** keep "Berreta" public, or codename only? (Trademark proximity to Beretta. See `01-concept.md` §11.)
5. **Nuclear, chemical & biological weapons:** include at encyclopedic/history level (recommended, already drafted that way), or exclude?

## Next research passes (suggested order)

1. Verify every ⚠️ in the flagship 30 entries against Tier 1–2 sources.
2. Fill coverage gaps listed at the bottom of `02-master-timeline.md` (Africa, Americas, Islamic world, Oceania).
3. Write T1 cards for all ~200 breakthroughs (fast, 1 sentence + 3 facts each).
4. Write T3 deep dives for the 30 flagships.
5. Convert everything to structured data (`content/weapons/*.yaml`, `content/materials/*.yaml`) using the template in `04-sample-entries.md`. That's the handoff to design/dev.
