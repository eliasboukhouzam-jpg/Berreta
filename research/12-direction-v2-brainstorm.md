# 12 — Direction v2: "Pick a weapon → take it apart → follow every material back to the mine"

> Brainstorm, 13 Oct 2026. Replaces the v0.1 site direction. Reference: **Mana Yerba Mate** (manayerbamate.com), Awwwards Site of the Day. Its homepage is a 3D slider where each flavour has its own graphic world and colour palette, with a preloader and a bubbly page transition ✅ (Awwwards & Behance listings).
> Confidence: ✅ documented · 🟡 likely · ⚠️ guess / verify.

---

## 0. Four hard truths before we start

1. **"Real 3D models" are mostly one solid piece.** Most downloadable gun models are built for games or renders. Main parts (slide, magazine, trigger) are sometimes separate, but internals rarely are. For a take-apart animation we need models **split into 8–20 parts**. Either we buy the few that are (see §6) or pay a 3D artist to split one.
2. **Licences decide what we can use.** Free models are usually CC-BY (credit required). Paid branded models are usually **"Editorial use only"**, which typically covers informative sites like ours but not advertising ⚠️. Read every licence.
3. **Never use files from 3D-printing sites** (MakerWorld, Cults3D, printable STL/CAD). In the US, publishing printable firearm files online is regulated 🟡, and it's against this site's guardrails anyway. We use **visual-grade meshes only**, with no dimensions shown. Our "how it was made" is told at **industry level** (mine → smelter → mill → factory), never as machining steps.
4. **The map shows where a material *likely* comes from, not where *this gun's* metal came from.** Metals are mixed at smelters. Every link carries its evidence level (L1 documented → L4 global context, see `07-value-chain-model.md`). That honesty is part of the design.

---

## 1. The experience in seven acts (storyboard)

### Act 0: Preloader, "Extracting"
A counter fills while assets load: *"Moving 0 → 2,400 kg of rock…"* (placeholder figure: the ore it takes to make one pistol, to be calculated ⚠️). Sets the theme from the first second.

### Act 1: The selector (the Mana "flavours")
- **One weapon centre stage**, slowly turning. Left/right (or swipe) switches weapon.
- **Each weapon has its own world**, derived from its **signature material**:
  - Beretta 92 → anodised aluminium: cold grey with a bauxite-red accent
  - AK-47 → stamped steel and walnut: warm brown
  - Glock 17 → polymer: graphite and petroleum black
  - M4 → aluminium and black anodising: olive grey
  - SIG M17 → PVD coyote: tan and desert
- **The transition (our "bubbly" moment):** the current weapon **melts into liquid metal**, which floods the screen as a colour wipe and then **re-solidifies** into the next weapon. Name and year roll in letter by letter. Two other options: a particle dissolve (gun → dust of its elements → next gun), or a forge-spark wipe.
- **Under the name:** 3 numbers: *year · parts · countries touched*.

### Act 2: Scroll → it comes apart
- The weapon turns to profile. Parts **slide apart along their real axes** with a soft spring, like a museum exploded view.
- Each part gets a thin label: name + material.
- A counter assembles itself: *"18 parts · 9 materials · 21 elements · 34 countries"* (computed from data, numbers here illustrative ⚠️).
- **Click any part** to jump straight to its journey (Act 3), so it isn't only linear scrolling.

### Act 3: Into the part → into the material
- The camera **pushes into one part** (e.g. the frame). It turns translucent, and inside it the **alloy recipe** fills like liquid in a glass: *Al 90% · Zn 5.6% · Mg 2.5% · Cu 1.6%* (7075-type alloy, grade to verify ⚠️).
- Each ingredient pops out as a **periodic-table tile** (symbol, atomic number, a one-line "why it's here").

### Act 4: Element → the world
- One tile (say **Al**, from bauxite) flies up and becomes a point of light. The camera pulls back through haze to a **3D globe**: dark, dotted, elegant, no satellite photo.
- **Mines rise as light pillars**, height = tonnes per year.
- **Countries glow by share of world production.** A small leaderboard: top 5 countries, tonnes, %.
- **"Who controls it" layer:** thin arcs from a mine to the HQ country of its owner (e.g. a mine in Guinea → its owner abroad). This answers "occupations": who operates and owns the mines.
- **"Who refines it" layer:** refineries and smelters appear as a second, different symbol. Processing is usually more concentrated than mining.

### Act 5: The journey, start to finish (the core story)
The camera follows **one path** across the globe, stop by stop. Each stop = one sentence + one number + evidence badge:
1. **Mine**: open pit or underground, a small stylised diorama
2. **Concentration / refining** (e.g. bauxite → alumina)
3. **Smelting** (alumina → aluminium, hugely electricity-hungry: the hydro and coal story)
4. **Shipping**: animated sea route, chokepoints pulse (Malacca, Suez/Bab el-Mandeb, Hormuz, Panama)
5. **Mill**: alloying, rolling, forging into bar or blank
6. **Gun factory**: an isometric scene, the part takes its shape
7. **Back into the gun**: the part flies back into the exploded weapon, which now shows it "completed"

**Politics chips** appear along the route when relevant: export controls, tariffs, sanctions, conflicts.

### Act 6: Next part
The exploded weapon shows a **progress silhouette**: parts already followed are filled in copper. Scroll continues to the next part, or the user picks one.

### Act 7: Reassembly & the reveal
All parts snap back together. Final screen: *"This pistol touched 34 countries, 12 mines and 41,000 km of sea"* (illustrative numbers). Then the twist we found in the M17 research: **"Its ammunition holds 100× more metal than the gun."** That leads into an ammunition chapter, or back to the selector.

---

## 2. The same logic, everywhere

| Level | What the user sees | Transition into the next level |
|---|---|---|
| **Weapon** | Whole object, its colour world | Scroll → explode |
| **Part** | One component, labelled | Click / scroll → push in |
| **Material** | Alloy recipe filling the part | Tile flies out |
| **Element** | Periodic tile, why it's needed | Pull back → globe |
| **World** | Mines, countries, owners, refiners | Pick a path |
| **Journey** | Mine → refinery → ship → mill → factory | Part returns to the gun |

Every weapon, every part and every element uses the **same six levels**. That's what makes the site feel like one system, and what makes it buildable: one engine, many datasets.

---

## 3. Motion & aesthetics ideas

- **Liquid-metal wipe** between weapons (Mana's bubbly transition, translated).
- **Particle dissolve** from part → element tiles (thousands of points recoloured per element).
- **Dotted globe** with soft bloom; country fills fade in by share; mines as thin light pillars.
- **Ownership arcs** thin and quiet; **shipping arcs** dashed and moving (a small dot travels).
- **Isometric dioramas** for processing steps, all in one matte "clay" material, so they read as one family.
- **Oversized ticking numbers** for tonnes and percentages (in the spirit of Shopify Editions and Why Zero).
- **Optional sound**, off by default: mechanical clicks on take-apart, low hum on the globe.
- **Restraint:** one accent colour per weapon world; no explosions, no camouflage, no "tactical" fonts.

---

## 4. Which weapons for v1 ("flavours")

**Recommendation: build ONE weapon end-to-end first** (all 7 acts), then add the others. My pick is the **Beretta 92 / M9**:
- It ties to the project name and to our 1526 story. It was the US service pistol 1985–2017 ✅, replaced by the M17 (which we already researched).
- A paid model with **~60 separate objects** exists (TurboSquid "Beretta M9 – Full Detail", Editorial, ~$99) 🟡, the best take-apart candidate found so far.
- **Aluminium-alloy frame + steel slide/barrel** gives two very visual mineral stories: red **bauxite** pits (Guinea, Australia) and **iron/chromium/nickel** for steel.

Then the set of 5:

| Weapon | Year | Signature material | Why | Model status |
|---|---|---|---|---|
| Beretta 92 / M9 | 1975 / 1985 | Aluminium alloy + steel | Name & story tie-in | Paid editorial models, one with ~60 objects 🟡 |
| AK-47 / AKM | 1947 / 1959 | Stamped steel + wood | Most produced firearm | Free CC-BY Sketchfab models; one AKMS with separate moving parts 🟡 |
| Glock 17 | 1982 | Polymer frame | Plastic gun = oil and gas chain | Free CC0 / CC-BY low-poly models (quality too low for hero use ⚠️) |
| M4 / AR-15 | 1960s / 1994 | Aluminium + polymer | Most visible rifle in the world | To search |
| SIG M17 | 2017 | Stainless + polymer | Our researched value chain | To search |

---

## 5. Data needed per element (and where it comes from)

| Layer | Source | Notes |
|---|---|---|
| Country production (tonnes, %) | **USGS Mineral Commodity Summaries** (yearly) | Primary source. Domain currently blocked here; allow `pubs.usgs.gov` |
| Mine locations by mineral | **USGS "Global Distribution of Selected Mines, Deposits, and Districts of Critical Minerals"** (2017, 22 minerals, **public domain**) ✅ | Perfect for the globe pillars |
| Mine footprints (shapes) | **Maus et al. 2022, global mining polygons v2**, 44,929 polygons ✅ (licence to check) | For the zoom-in on a mine |
| Mine-level tonnes & owners | Company annual reports, government statistics | Manual, top mines only |
| Refineries / smelters | USGS Minerals Yearbook country chapters, company reports | Manual |
| Trade routes | UN Comtrade / CEPII BACI (HS codes) | Arcs between countries |
| Country borders | Natural Earth (public domain) | Globe base |
| Politics | MOFCOM, US BIS/OFAC, EU, Federal Register | Dated "last checked" chips |

---

## 6. 3D model sourcing: what I found (13 Oct 2026, via search; sites blocked here, so not opened)

| Weapon | Candidate | Licence | Parts | Price |
|---|---|---|---|---|
| Beretta M9 | TurboSquid "Beretta M9 – Full Detail" | Editorial only | ~60 objects | ~$99 |
| Beretta M9 | CGTrader "Beretta M9 Pistol" | Editorial, no-AI | parented to one empty (check) | ~$10 |
| Beretta 92FS | Sketchfab "Beretta92FS" | CC-BY | unknown | free |
| AK-47 | Sketchfab "AK-47 Classic Assault Rifle Kalashnikov" | CC-BY | not stated, ~20.8k triangles | free |
| AKMS | Sketchfab, Skipper Research & Development | check | trigger, magazine, stock separate | ? |
| Glock 17 | itch.io low-poly packs | CC0 / CC-BY | basic | free |

**Next step on models:** allow `sketchfab.com`, `turbosquid.com`, `cgtrader.com` so I can inspect them properly (screenshots, part counts, licence pages). Buying needs your account and card.

**Alternative:** commission a 3D artist to model one weapon for an exploded view (all parts separate, clean materials). Higher quality, single style, and we own it. Budget to be quoted ⚠️.

---

## 7. Tech (for later)
Three.js (or React Three Fiber) + GSAP ScrollTrigger. glTF models compressed with Draco/Meshopt. Globe in three.js with Natural Earth borders and our data as JSON. Lazy-load per act. On phones: lighter models and possibly pre-rendered video for the heaviest transitions.

## 8. Decisions for you
1. **Pilot weapon:** Beretta 92/M9 (recommended), or another?
2. **Models:** buy editorial models (~$10–100 each), or commission one custom model?
3. **The 5 "flavours":** keep the list in §4, or change it?
4. **Ammunition chapter** as the final twist: yes or no?

## Sources
- [Awwwards: Mana Yerba Mate](https://www.awwwards.com/sites/mana-yerba-mate) · [3D scrolling animation](https://www.awwwards.com/inspiration/3d-scrolling-animation-mana-yerba-mate) · [Colourful text animation](https://www.awwwards.com/inspiration/colourful-text-animation-mana-yerba-mate) · [Behance case study](https://www.behance.net/gallery/177582067/Mana-Yerba-Mate-Website) · [CSS Winner](https://www.csswinner.com/details/mana-yerba-mate/16996) · [Mana site](https://en.manayerbamate.com/)
- [TurboSquid: Beretta M9 – Full Detail](https://www.turbosquid.com/3d-models/beretta-m9-full-detail-1396761) · [CGTrader: Beretta M9 Pistol](https://www.cgtrader.com/3d-models/military/gun/beretta-m9-pistol-3d-model) · [CGTrader: Pistol Beretta M9](https://www.cgtrader.com/3d-models/military/gun/pistol-beretta-m9a3) · [Sketchfab: Beretta92FS](https://sketchfab.com/3d-models/beretta92fs-e6ea9fe2e6094e7f8545a20c436c872d)
- [Sketchfab: AK-47 Classic](https://sketchfab.com/3d-models/ak-47-classic-assault-rifle-kalashnikov-cf9c771eb89a47f797f55e6520f50cb6) · [Sketchfab: AKMS underfolding](https://sketchfab.com/3d-models/akms-ak-47-w-underfolding-stock-assault-rifle-fc23b0eac8154445b8ecef61e2ea0de2) · [Sketchfab: Ak-47 Kalashnikov](https://sketchfab.com/3d-models/ak-47-kalashnikov-19e3efbd22c64c328b2e80fab48cca75)
- [itch.io: low-poly Glock 17 (CC0)](https://ashton-cable.itch.io/low-poly-glock-17) · [itch.io: PSX Glock 17 (CC-BY)](https://lydaus.itch.io/psx-glock-17)
- [USGS: Global distribution of selected mines, deposits and districts of critical minerals](https://www.usgs.gov/data/global-distribution-selected-mines-deposits-and-districts-critical-minerals)
- [IIASA: Global-scale mining polygons v2](https://pure.iiasa.ac.at/18508) · [Maus et al. 2022 paper (PDF)](https://www.forest-trends.org/wp-content/uploads/2025/08/Mausetal-2022-UpdateGlobalMiningLanduse.pdf)
