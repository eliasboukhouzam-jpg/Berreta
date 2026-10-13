# 08 — Worked value chain: SIG Sauer M17 (US Army Modular Handgun System)

> Draft, 13 Oct 2026. Built with the model in `07-value-chain-model.md`.
> Evidence levels: **L1** documented · **L2** reported · **L3** market inference · **L4** global context. Confidence: ✅ 🟡 ⚠️.
> ⚠️ USGS's site is blocked from this environment. Figures marked *(USGS via secondary)* come from sources quoting USGS MCS 2026 and **must be re-checked against the primary chapters**.

Why this product: it is the pistol that **replaced the Beretta M9** in 2017, so it bridges the site's Beretta thread (1526 → M9 1985) into the present.

---

## Headline insight (the hook)

**Most of a pistol's minerals are in its ammunition.** The M17 weighs ~0.84 kg (29.6 oz) ✅. One 9 mm round weighs ~12 g ⚠️. If a service pistol fires **20,000 rounds** over its life (an *illustrative assumption* ⚠️, not a measured figure), that's ~240 kg of ammunition, **~285× the gun's own weight**:

| Element | Per round (approx. ⚠️) | × 20,000 rounds | In the pistol itself |
|---|---|---|---|
| Copper | ~3.9 g (brass case + gilding-metal jacket) | **~78 kg** | trace |
| Zinc | ~1.3 g | ~25 kg | trace |
| Lead | ~6 g (bullet core) | **~120 kg** | — |
| Antimony | ~0.06–0.18 g (core hardener, primer) ⚠️ | ~1–4 kg | — |
| Chromium, nickel, iron | — | — | the steel parts (a few hundred grams) |

So the M17's real value chain runs mostly through **copper mines in Chile and the DRC, zinc mines in Alaska and Peru, lead recycling plants, and antimony from China, Russia and Tajikistan**, and much less through stainless steel.

---

## Layer 1: Product, bill of materials, contract

**Contract (L1)**
- Awarded **19 Jan 2017** to SIG Sauer: IDIQ, firm-fixed-price, reported as **up to ~$580 m** 🟡. A GAO decision cited **up to $170 m**, and the discrepancy is unexplained ⚠️. Glock's protest was denied by GAO (June 2017) 🟡.
- Scope: up to **280,000** M17/M18 for the Army, ~7,000 subcompacts, plus **212,000** for other services 🟡. ~200,000+ built (per Wikipedia, ⚠️ verify).
- Includes ammunition: SIG chose **Olin Winchester** for **M1152** (115 gr FMJ) and **M1153** (147 gr JHP) 🟡 (L2).

**Company (L1/L2)**
- SIG Sauer Inc., HQ at Pease, **Newington, New Hampshire**, plant in **Exeter, NH** 🟡.
- Owned by **L&O Holding** (Germany; founders Michael Lüke & Thomas Ortmeier) 🟡. German production site at **Eckernförde closed 2020** 🟡.

**Bill of materials**
| Component | Material | Mass | Notes |
|---|---|---|---|
| Slide | Stainless steel, PVD coated 🟡 | ⚠️ guess 300–350 g (to be weighed) | **Grade not published.** Scenario A: 416-type (12–14% Cr, ~no Ni). Scenario B: 17-4 PH-type (15–17.5% Cr, 3–5% Ni, 3–5% Cu, ~0.3% Nb) |
| Fire control unit (the legally serialized part) | Stainless steel 🟡 | ⚠️ guess 50–80 g | Same grade question |
| Barrel | Carbon/alloy steel 🟡 (4.7 in) | ⚠️ guess 120–150 g | If chrome-moly: Fe + Cr + Mo + Mn |
| Grip module | Polymer 🟡 (typically glass-fiber-reinforced polyamide ⚠️) | ⚠️ guess 80–120 g | Petrochemicals; E-glass contains **boron** |
| Springs, pins | Spring steel | small | — |
| Night sights | **Tritium** gas vials 🟡 | < 1 g | Tritium half-life 12.3 years ✅: sights dim and get replaced |
| Magazines (17- and 21-rd) | Steel body, polymer follower 🟡 | ⚠️ | — |
| **Ammunition (per round)** | Brass case (~70% Cu / 30% Zn ✅ cartridge brass), gilding-metal jacket, lead core, primer, nitrocellulose propellant | ~12 g ⚠️ | See headline |

*To do:* buy or borrow a commercial P320-M17, strip and weigh it, and photograph the parts. That turns the guesses into L1 data and doubles as site content.

---

## Layers 2–5: Minerals → mines & countries → processing → refineries

### Chromium (stainless steel slide & FCU)
- **US mine production: none** (2021–25). US consumed ~**4% of world chromite** in 2025. Secondary (recycled) chromium: ~**100 kt** (Cr content) in 2025 *(USGS via secondary)*.
- **US chromite ore imports: South Africa 96%, Turkey 3%** (2021–24) *(USGS via secondary)* → **L3**: the chromium in US-melted stainless is most likely **South African**.
- South Africa's chrome comes from the **Bushveld Complex** (Limpopo/North West), which holds most of the world's chromite reserves 🟡. Ferrochrome smelters: Glencore-Merafe, Samancor 🟡. **Electricity costs (Eskom)** have forced smelter shutdowns ⚠️ (verify 2025–26 status).
- **China** is the largest ferrochrome producer, using imported South African ore 🟡. World tonnage table: ⚠️ *to fill from USGS chromium chapter*.

### Nickel (only in Scenario B, 17-4 PH; also in many springs/coatings)
- **Indonesia ~2.2–2.31 Mt** contained nickel in 2024, **~60%+ of world** *(USGS via secondary)*. Philippines ~330 kt; Russia ~210 kt (Norilsk Nickel) ⚠️ 2024 figures.
- Indonesia **banned nickel ore exports in Jan 2020** ✅, forcing processing at home in Chinese-built parks (**IMIP Morowali**, **IWIP Weda Bay**; Tsingshan) 🟡. 2026 ore quota being cut to ~250–260 Mt from ~379 Mt in 2025 ⚠️ (S&P).
- For US defense: nickel units more likely from **Canada (Sudbury, Voisey's Bay)** and **Norway** refineries, plus scrap ⚠️ (L3, check US import data).

### Iron
- US steel is ~70% electric-arc furnace (scrap-based) ⚠️. Ore from **Minnesota's Mesabi Range** (taconite) 🟡. World context: Australia & Brazil dominate seaborne ore (L4).

### Stainless melt & bar (refinery/mill layer)
- US melt shops: **North American Stainless** (Ghent, KY; owned by Acerinox, Spain), **Outokumpu** (Calvert, AL), **Cleveland-Cliffs**, **ATI**. Specialty bar: e.g. **Carpenter Technology** (Reading, PA) 🟡. Which mill supplies SIG is **unknown** → L3 only.
- **DFARS "specialty metals" rule** (10 U.S.C. 4863 / DFARS 252.225-7009): stainless and other specialty metals in US defense items must generally be **melted or produced in the US or a "qualifying country"** 🟡. Exceptions exist (commercial items, de minimis) ⚠️. This is a *legal* constraint that makes the L3 inference stronger: the M17's stainless was **probably melted in the US or an allied country**, even though the chromium inside it was mined in South Africa.

### Copper (ammo: case + jacket)
- World mine output 2025 ~**23 Mt** *(USGS via secondary)*: **Chile ~5.3 Mt (~23%)**, **DRC ~3.2 Mt**, **Peru ~2.7 Mt**, China ~1.8 Mt mined but **~14 Mt refined** (largest refiner by far) ⚠️.
- Named mines (L4): Escondida (Chile, BHP; world's largest), Kamoa-Kakula (DRC), Cerro Verde & Antamina (Peru). US: **Morenci** (Arizona, Freeport), **Bingham Canyon** (Utah, Rio Tinto) 🟡.
- Brass strip for cases: historically **East Alton, Illinois** (Olin Brass, later owned by Wieland ⚠️ verify).

### Zinc (ammo: brass)
- World 2025 **12.59 Mt** (ILZSG): **China ~4.07 Mt**, **Peru ~1.51 Mt**, **Australia ~1.13 Mt**. US **670 kt** (USGS est.), mostly **Red Dog, Alaska** (Teck / NANA) 🟡.

### Lead (bullet core)
- **The US has had no primary lead smelter since Herculaneum, Missouri closed (2013)** ✅. US lead now mostly comes from **recycling car batteries** (secondary smelters) 🟡 → L3: an M17 bullet core is most likely **recycled battery lead**.
- World tonnage table: ⚠️ *to fill (ILZSG / USGS lead chapter)*.

### Antimony (bullet-core hardener, primers)
- World mine output 2025 ~**110 kt**: **China ~40 kt, Russia ~32 kt, Tajikistan ~22 kt** *(USGS via secondary)*. ⚠️ The Russia figure is a big jump from older data. Verify. (My earlier atlas said "China ~50–70%". By this 2025 data China mines ~36% but still dominates **refining**.)
- Mines (L4): Xikuangshan (Hunan, China, "antimony capital") 🟡; Russian gold-antimony deposits (Krasnoyarsk, Yakutia) ⚠️; Anzob (Tajikistan) ⚠️.
- US: **US Antimony Corp** smelter (Thompson Falls, Montana) 🟡; **Perpetua Resources' Stibnite project** (Idaho) being developed with US government backing ⚠️.

### Tritium (night sights)
- Made as a by-product of **CANDU heavy-water reactors**. **Ontario Power Generation's Darlington** station runs what is described as the **world's largest tritium removal facility** 🟡 (L4). Which vial maker supplies SIG is **unknown**.

### Polymer & glass fiber (grip)
- Polyamide from petrochemicals (US shale gas/oil → L4 domestic). E-glass fiber uses **boron**: Türkiye (Eti Maden) and US (Boron, California) 🟡.

### Propellant
- Nitrocellulose-based ball powder. US ball-propellant producer: **St. Marks Powder** (Florida, General Dynamics) 🟡. Supplier for M1152 specifically: unknown ⚠️.

---

## Layer 6: Manufacturing & assembly

| Step | Where | Evidence |
|---|---|---|
| Machining, assembly of M17/M18 | Newington & Exeter, New Hampshire | L1/L2 🟡 |
| Sub-components (springs, MIM parts, sights, coatings) | Unknown suppliers | ⚠️ research via SIG supplier lists, job ads, patents |
| 9 mm ammunition | Winchester (Olin); centerfire plant in **Oxford, Mississippi** ⚠️ | L2 |
| Note | Olin also operates the Army's **Lake City** plant (Independence, Missouri), a separate contract mainly for rifle/MG calibers 🟡 | L2 |

## Layer 7: Logistics (probable routes, L3)

| Flow | Route | Chokepoints & risks |
|---|---|---|
| Chromite / ferrochrome | Bushveld → rail (**Transnet**) → Richards Bay, Durban or **Maputo** (Mozambique) → ship | South African rail & port breakdowns 🟡 |
| Indonesian nickel | Sulawesi / Halmahera → mostly to **China** | **Strait of Malacca**, South China Sea |
| Chilean copper | Antofagasta / San Antonio → Pacific → US | **Panama Canal** (2023 drought limits ✅) |
| DRC copper | Copperbelt → road/rail to Dar es Salaam, Durban, or the **Lobito Corridor** (Angola, US/EU-backed rail) 🟡 | Long overland trucking; conflict in eastern DRC |
| Antimony | China / Russia / Tajikistan → overland & sea | Export controls more than geography |
| Tritium | Ontario → licensed radioactive-material transport → vial maker → sight maker → NH | Regulatory (NRC / CNSC licensing) |
| Finished pistols | New Hampshire → Army depots → units; foreign sales via FMS/DCS | — |
| Global sea lanes | **Red Sea / Bab el-Mandeb** (Houthi attacks 2023– ✅) → Cape of Good Hope diversions | Freight cost & delay |

## Layer 8: Politics & risk (as of 13 Oct 2026)

| Risk | Status | Affects |
|---|---|---|
| **China antimony ban on the US** (Dec 2024) | Suspended; suspension reported to expire **27 Nov 2026** ⚠️ | Bullet cores, primers |
| **US Section 232 metals tariffs** | Restructured by proclamation **2 Apr 2026** (effective 6 Apr): 50% on articles made wholly/mostly of steel, aluminium or copper; 25% on derivatives; now on **full value** of goods ⚠️ (conflicting sources: verify) | Imported stainless bar, copper, brass |
| **Indonesia nickel policy** | Ore export ban (2020) + 2026 quota cut ⚠️ | Nickel price/availability |
| **South Africa** | Power & rail crises; tense US–SA relations (SA ambassador expelled by US, March 2025 🟡); chrome export-tax debates ⚠️ | Chromium |
| **Russia** | Sanctions complicate Russian antimony & nickel purchases 🟡 | Antimony, nickel |
| **DRC** | Eastern conflict (M23); US-brokered DRC–Rwanda peace agreement (June 2025) 🟡 | Copper (and cobalt) |
| **Product-level: P320 platform** | FBI ballistic-research report (Aug 2024) said an uncommanded discharge "may be possible if sear engagement is lost" but was **inconclusive**; ICE dropped the P320 (Jul 2025); Air Force grounded M18s after a fatal incident (2025); Army kept its pistols; a Massachusetts jury found a design defect; **SIG denies** the pistol can fire without a trigger pull 🟡. 2026 status ⚠️ to update | Contracts, reputation |

**Tone rule for this box:** facts, dates, both sides, sources. No editorializing.

## Layer 9: Contracts & agreements

| Agreement | Parties | Date | Relevance | Evidence |
|---|---|---|---|---|
| MHS IDIQ contract | US Army ↔ SIG Sauer | 19 Jan 2017 | The product itself | L1 🟡 |
| MHS ammunition | SIG ↔ Olin Winchester | 2017 | 9 mm loads | L2 🟡 |
| Lake City AAP operation | US Army ↔ Olin Winchester | ongoing | Small-arms ammo base | L2 🟡 |
| US–Ukraine minerals agreement | US ↔ Ukraine | 30 Apr 2025 ✅ | Future critical-mineral supply | L1 |
| US–Australia critical minerals framework | US ↔ Australia | Oct 2025 🟡 | Non-Chinese processing | L1 |
| US–Kazakhstan tungsten deal | US ↔ Kazakhstan | 2025 🟡 | Tungsten (not in M17; sister products) | L2 |
| Lobito Corridor | US, EU, Angola, DRC, Zambia | 2023– 🟡 | Copper export route | L1 |
| US–China trade truce (Busan) | US ↔ China | 30 Oct 2025 🟡 | Paused export controls, expiring Nov 2026 ⚠️ | L2 |
| Foreign sales of M17/M18 / P320 variants | various | ⚠️ | To research: SIPRI Arms Transfers, DSCA notifications | — |

## Layer 10: Use & end of life

- Users: US Army, Air Force, Navy, Marines (M18), Coast Guard 🟡; P320 variants with many police forces.
- End of life: pistols are demilitarized and **stainless is recycled**, so the chain loops back to the scrap that feeds US electric-arc mills 🟡.
- Ranges: **brass is recycled** through military recycling programs 🟡. Lead accumulates in range soils (environmental cost) 🟡.

## Who paid

- **Indonesia:** deforestation and coal-fired captive power for nickel parks. A smelter explosion at **IMIP Morowali (Dec 2023)** killed ~20 workers ⚠️ (verify toll).
- **South Africa:** chrome-mine labor and community health in the Bushveld ⚠️.
- **Lead:** Herculaneum, Missouri. Decades of childhood lead exposure around the smelter that once supplied US lead ✅.
- **Antimony:** heavy-metal pollution around Xikuangshan, Hunan ⚠️.
- **DRC copper belt:** conflict and displacement in the region 🟡.

## Gaps to close (next pass)

1. Primary USGS tables (chromium, nickel, lead, antimony, copper, zinc) once `pubs.usgs.gov` is reachable.
2. Teardown weights (turns the BOM guesses into L1 data).
3. Exact stainless grade (patents, SIG documents, material-safety data).
4. UN Comtrade HS-code flows into the US: 2610 (chromite), 7202.41 (ferrochrome), 7502 (unwrought nickel), 7403 (refined copper), 7901 (zinc), 7801 (lead), 8110 (antimony).
5. Foreign sales of M17/M18 & P320 (SIPRI, DSCA).
6. 2026 status of P320 reviews and litigation.

## Sources used for this file

- [Wikipedia: SIG Sauer M17](https://en.wikipedia.org/wiki/SIG_Sauer_M17) (map only)
- [Military.com: GAO denies Glock protest](https://military.com/kitup/2017/06/modular-handgun-system-4.html)
- [NHPR: SIG's hometown celebrates Army contract](https://www.nhpr.org/nh-news/2017-02-03/sig-sauers-new-hampshire-hometown-celebrates-huge-army-contract)
- [Army Recognition: P320 to replace M9](https://www.armyrecognition.com/archives/archives-land-defense/land-defense-2017/for-u-s-army-variant-of-sig-sauer-p320-9mm-semi-automatic-pistol-will-replace-m9-beretta-12001171)
- [SIG Sauer: M17 product page](https://www.sigsauer.com/m17.html)
- [American Rifleman: M1152 & M1153](https://www.americanrifleman.org/content/m1152-m1153-the-army-s-new-9-mm-luger-loads/)
- [Task & Purpose: Winchester MHS ammo](https://taskandpurpose.com/news/winchester-army-modular-handgun-system-ammo/)
- [Guns.com: Winchester $788 m Army ammo contract (Sep 2026)](https://www.guns.com/news/2026/09/15/winchester-bags-788-million-army-ammo-contract)
- [Wikipedia: SIG Sauer AG](https://en.wikipedia.org/wiki/SIG_Sauer_AG)
- [AccurateShooter: SIG to shut German production](https://bulletin.accurateshooter.com/?p=64323)
- [The War Zone: Army making no changes to P320-derived pistols after FBI report](https://www.twz.com/land/army-making-no-changes-to-its-sig-p320-derived-pistols-after-concerning-fbi-report.md)
- [SOFREP: Air Force grounds M18 pistols](https://sofrep.com/news/air-force-grounds-m18-pistols-after-fatal-discharge-at-f-e-warren-air-force-base/)
- [Fox 13: Florida lawmaker urges P320 suspension](https://fox13news.com/news/florida-lawmaker-urges-law-enforcement-agencies-suspend-use-sig-sauer-p320-handgun-citing-safety-issues)
- [ANS: Helium-3 from tritium stored at Darlington](https://ans.org/news/article-3256/helium3-to-be-produced-from-tritium-stored-at-canadas-darlington-station)
- [CSM (1991): Sales of tritium](https://csmonitor.com/1991/0327/27072.html)
- [USGS: MCS 2026 data release](https://www.usgs.gov/data/mineral-commodity-summaries-2026-data-release) · [USGS 2026 StoryMap](https://storymaps.arcgis.com/stories/404a3b288f20461a96a81229db41da64)
- [USGS MCS 2026 chromium chapter](https://pubs.usgs.gov/periodicals/mcs2026/mcs2026-chromium.pdf) (via search excerpt)
- [USGS MCS 2025 nickel chapter](https://pubs.usgs.gov/periodicals/mcs2025/mcs2025-nickel.pdf) · [IISD nickel profile 2026](https://www.iisd.org/system/files/2026-02/commodity-profile-nickel.pdf) · [S&P: Indonesia 2026 nickel ore target](https://www.spglobal.com/market-intelligence/en/news-insights/articles/2026/1/indonesia-finalizing-reduced-nickel-ore-output-target-for-2026-97045526)
- [Investing News: copper production by country](https://investingnews.com/daily/resource-investing/base-metals-investing/copper-investing/copper-production-country/) · [Farmonaut: copper by country](https://farmonaut.com/mining/copper-production-by-country-usgs-mineral-summaries)
- [ILZSG zinc, Feb 2026](https://www.ilzsg.org/wp-content/uploads/3.PRESS%20RELEASES/ILZSG%20February%202026%20Zn.pdf) · [USGS MCS 2026 zinc](https://pubs.usgs.gov/periodicals/mcs2026/mcs2026-zinc.pdf)
- [AZoMining: antimony market 2026](https://www.azomining.com/Article.aspx?ArticleID=1966) · [Habtoor: antimony 2026](https://habtoorresources.com/knowledge/antimony-market-2026-supply-trade-and-buyer-risk/) · [S&P antimony report (Aug 2026)](https://www.spglobal.com/content/dam/spglobal/global-assets/en/special-reports/critical-mineral-market-reports/Market%20Report%20-%20Antimony%20-%2008052026.pdf)
- [White & Case: Section 232 modifications](https://www.whitecase.com/insight-alert/united-states-modifies-steel-aluminum-and-copper-section-232-tariffs) · [Shapiro: Section 232 changes effective 6 Apr 2026](https://www.shapiro.com/alerts/new-regulations-affecting-section-232-take-effect-on-april-6/)
