# 04 — Entry template and three worked examples

> Brainstorm draft, 13 Oct 2026. The template is the **content contract**: every weapon page fills the same fields so design and dev can build once.
> Confidence: ✅ documented · 🟡 consensus · ⚠️ estimate / verify before publishing.

---

## Part 1: The entry template

```yaml
id: naue-ii-sword               # stable slug
name: Naue II sword
aliases: [flange-hilted sword, Griffzungenschwert]
family: sword                    # sword | bow | firearm | artillery | explosive | armor | vehicle | ship | aircraft | missile | nuclear | drone | cyber | enabler
era: bronze-age                  # one of the 11 eras in 02-master-timeline.md
dates:
  first_known: -1300             # negative = BCE
  widespread: -1200
  obsolete: -700
  evidence: documented           # documented | consensus | estimate | contested
origin: { region: Central Europe, modern_countries: [AT, DE, HU], culture: Urnfield }
predecessors: [aegean-rapier, dagger]
successors: [iron-naue-ii, hallstatt-sword]
counters: []                     # what it beat
countered_by: []                 # what beat it

# --- T1 card ---
card: "First sword built to both cut and stab, cast from copper and tin that often traveled thousands of km before meeting in a mold."
three_facts: []

# --- T2 story ---
problem_solved: ""
how_it_works: ""                 # plain language, NEVER a procedure
impact: ""

# --- T3 deep dive ---
bill_of_materials:               # what it is made of
  - { material: copper, share: "~88-90%", role: "blade", sourced_then: [...], sourced_now: null, material_page: copper }
production_chain:                # ordered stages, rock → weapon → battlefield
  - { stage: extract, what: "", where: "", who: "", energy: "", evidence: consensus }
  - { stage: refine, ... }
  - { stage: trade, ... }
  - { stage: make, ... }
  - { stage: finish, ... }
  - { stage: deploy, ... }
scale: { units_made: null, unit_cost: null, cost_2026_usd: null }
who_paid: ""                     # labor, injuries, environment, victims
myths_vs_facts: [{ myth: "", fact: "", evidence: "" }]
see_it: [{ museum: "", city: "", object_id: "" }]
places: [mitterberg, cornwall, uluburun]      # links to Place pages
storylines: [tin-routes]                       # links to 05-storylines.md
sources: [{ ref: "", claim: "", evidence: "" }]
media: [{ file: "", license: "", credit: "" }] # licensing tracked from day 1
```

**Rule for `how_it_works` and `production_chain`:** describe *what happened where and why*, never *how to do it*. See `01-concept.md` §7.

---

## Part 2: Worked example A: Naue II bronze sword (c. 1300 BCE)

**Card.** The first sword made to both cut and stab. It was cast from copper and tin that often traveled thousands of kilometers before meeting in a mold.

**Three facts**
1. It spread from the Danube to Egypt and the Aegean within about a century 🟡, and the design outlived bronze: early iron swords copied it.
2. A Late Bronze Age ship (Uluburun, c. 1305 BCE) carried ~10 t of copper and ~1 t of tin ✅, exactly the ratio for bronze.
3. Bronze was not "worse" than early iron. Hammered bronze edges rival unhardened bloomery iron 🟡. Iron won because iron ore is everywhere and tin is not.

**Problem solved.** Earlier Aegean rapiers were long thrusting blades whose riveted hilts snapped when used to slash 🟡. The Naue II casts the hilt tang ("flange") in one piece with the blade and sandwiches organic grip plates around it, so the sword survives cutting blows.

**How it works (plain).** A leaf-shaped blade puts weight forward for cutting, and a strong point lets it stab. The flanged hilt spreads impact through the whole grip instead of a few rivets.

**Bill of materials**
| Part | Material | Share | Sourced from (then) |
|---|---|---|---|
| Blade + hilt tang | Tin bronze | ~88–90% Cu, 10–12% Sn 🟡 | Copper: Alpine mines (e.g. Mitterberg, Austria), Cyprus, Levant (Timna/Faynan), Iberia. Tin: Cornwall/Devon, Brittany, Iberia, Erzgebirge, Central Asia |
| Trace elements | Lead, arsenic, antimony, silver | <1% | Ore "fingerprints" used today for provenance ✅ |
| Grip plates | Bone, antler, horn or wood | — | Local |
| Rivets | Bronze | — | Same alloy |
| Scabbard | Wood, leather, bronze chape | — | Local |

**Production chain**
1. **Extract copper.** Underground mining with fire-setting (heating rock, then cooling it to crack it). Ores shifted from oxide/carbonate (malachite) to sulfide (chalcopyrite) ores, which need roasting. The Alpine mines were industrial-scale for their time 🟡.
2. **Smelt to ingots.** Smelting happened near the mine. Ingots came in standard shapes: "oxhide" ingots (~25–30 kg ⚠️) in the Mediterranean, plano-convex "bun" ingots in Europe.
3. **Extract tin.** Cassiterite was panned from stream gravels (placer deposits) and smelted to tin ingots. Tin sources are rare and far from most copper, **so this is the chokepoint.**
4. **Trade.** Sea and river routes. Isotope studies show eastern-Mediterranean tin ingots partly from **Cornwall/Devon** 🟡 (verify the 2019 PLOS ONE study), and tin and copper ingot wrecks have been found off Devon ⚠️ (Salcombe, Erme).
5. **Alloy and cast.** Copper and tin were remelted in a crucible over a charcoal fire driven by bellows, then poured into two-piece stone, clay or bronze molds.
6. **Finish.** Hammering hardens the edges, then grinding and polishing with abrasive stone, then grip plates riveted on.
7. **Deploy & deposit.** Elite warrior weapon. Many were deliberately thrown into rivers and bogs (ritual deposition) 🟡, which is why so many survive (Thames, Seine, Danish bogs).

**Scale.** Thousands of finds across Europe and the Mediterranean ✅. Unit cost unknown. Treat as an elite good ⚠️.

**Who paid.** Miners in deep, smoke-filled Alpine shafts. Forests cut for charcoal: smelting needed large amounts of fuel per kg of copper ⚠️ (find a quantified source). Raiding and the Late Bronze Age collapse.

**Myths vs facts**
- *"Bronze bends, iron doesn't."* Work-hardened bronze is tough. Iron's advantage was **supply**, not quality 🟡.
- *"Swords were the main weapon."* The spear was. Swords were expensive status weapons 🟡.

**See it.** British Museum (London), Naturhistorisches Museum (Vienna), National Museum of Denmark (Copenhagen) ⚠️ (confirm object IDs).

**Storylines.** Tin routes · From mold to mass production.

---

## Part 3: Worked example B: The matchlock arquebus & the Beretta barrels (1526)

**Card.** On 3 October 1526, the Venetian Arsenal paid Bartolomeo Beretta 296 ducats for 185 arquebus barrels ✅. It is the oldest surviving record of a company that still makes guns today, and it turned 500 ten days ago. Behind each barrel was an Alpine valley of mines, charcoal burners and water-powered hammers.

**Three facts**
1. The receipt survives in the Archivio di Stato di Venezia ✅.
2. One year earlier, at **Pavia (1525)**, Spanish arquebusiers destroyed the French heavy cavalry ✅. Venice was buying the weapon that had just won.
3. Val Trompia has been mined for iron since Roman times. By the mid-1500s it had ~40 ironworks, ~50 mines and 8 smelters 🟡 (verify primary source).

**Problem solved.** A man trained for weeks could now kill an armored knight trained since childhood. Armor, horses and noble training had been the most expensive "weapon" of the Middle Ages, and gunpowder made that investment much less valuable 🟡.

**How it works (plain).** A trigger lowers a smoldering cord (the "match") into a small pan of powder. The flash fires the main charge and the lead ball leaves the barrel. Effective against massed troops at about 50–100 m ⚠️.

**Bill of materials**
| Part | Material | Sourced from (then) |
|---|---|---|
| Barrel | Wrought iron / low-carbon steel | Val Trompia ores (siderite, manganese-bearing ⚠️ verify) |
| Lock (serpentine, springs) | Iron, spring steel | Local smiths |
| Stock | Walnut 🟡 | Northern Italian hardwood |
| Ammunition | Lead ball | Galena: Sardinia, Tuscany ⚠️ |
| Propellant | Gunpowder (~75% saltpeter, ~15% charcoal, ~10% sulfur 🟡, encyclopedic proportions only) | Saltpeter: collected/imported (Venetian sources ⚠️ to research); sulfur: Italy (Romagna, Sicily ⚠️) |
| Match | Hemp/flax cord soaked in saltpeter solution | Local |

**Production chain**
1. **Ore.** Mined in the upper valley. Brescia and its valleys belonged to the Venetian Republic from 1426 to 1797 ✅, so Venice owned its own arms district.
2. **Charcoal.** *Carbonai* (charcoal burners) in Alpine beech and chestnut forests. Venice regulated forests closely because of its shipbuilding 🟡.
3. **Smelting & refining.** Blast furnaces produce pig iron, refining hearths turn it into wrought-iron bars 🟡 (indirect process, by then standard in Brescian valleys).
4. **Barrel making.** Water-wheel-driven hammers (*magli*) on the river Mella. Historically a barrel was forged from a flat strip around a mandrel, then bored and finished 🟡. A Gardone *maestro da canne* (master barrel maker) signed for the order.
5. **Assembly.** The barrels went to the **Arsenale di Venezia**, the state shipyard-arsenal and one of Europe's largest industrial sites ⚠️ (workforce figures vary widely), where stocks and locks were fitted.
6. **Powder & shot.** State powder supply. **This is the weakest-researched link** and needs a historian of the Venetian *Provveditori*.
7. **Deploy.** Venetian garrisons, galleys and the *terraferma* militia ⚠️.

**Who paid.** Miners and charcoal burners: hard, dangerous rural labor. Deforestation of Alpine slopes. And the soldiers on the other end: the Italian Wars (1494–1559) devastated the peninsula.

**Myths vs facts**
- *"Beretta was founded in 1526."* 1526 is the **earliest documented transaction**. The family's ironworking is older ✅ (company and Wikipedia agree).
- *"Early guns were useless because they were inaccurate."* Massed volleys didn't need accuracy, and guns were easier to learn than the bow 🟡.

**Why this entry matters for the site.** It's the bridge between the medieval craft economy and the modern arms industry: one valley, one family, five centuries, from arquebus barrels to the US M9 (1985) ✅.

**Storylines.** Saltpeter · Craft to factory · The arms company that never died.

---

## Part 4: Worked example C: The 155 mm artillery shell (2022–2026)

**Card.** The most demanded object of the war in Ukraine. A 155 mm high-explosive shell weighs about 47 kg ⚠️, and its supply chain runs through cotton fields, natural gas, a Polish chemical plant and a 1900s railroad shop turned Army plant in Pennsylvania.

**Three facts**
1. Early 2022, the US made about **14,400 shells a month** ⚠️. By mid-2025 it made about **40,000**, still short of a **100,000/month** goal now set for FY2026 ✅ (Army statements reported in press).
2. **The US has not produced TNT since the 1980s** 🟡. It imports from **Poland** and other countries ✅. A new plant in **Graham, Kentucky** (Repkon USA, up to $435 m) is targeted for **~Nov 2028** ✅.
3. The main bottleneck was not money. It was **energetics** (explosives & propellant), single-source plants from the 1940s, and skilled labor 🟡.

**Problem solved.** Artillery is the cheapest way to deliver explosive at range in volume. In a war of attrition, **mass beats precision**. That inverts the 1991–2014 "precision era" (see Era 9).

**How it works (plain).** A steel body filled with high explosive is fired from a howitzer (M777, M109, CAESAR, PzH 2000…). A copper band around the shell grips the barrel's rifling to spin it. A fuze in the nose decides when it detonates (on impact, in the air, or with a GPS kit for precision).

**Bill of materials**
| Part | Material | Sourced from (now) |
|---|---|---|
| Shell body | High-fragmentation forged steel | US steel (iron ore from Minnesota/Michigan taconite or scrap) + **manganese (US 100% imported)** ⚠️ |
| Explosive fill | TNT or IMX-101 insensitive explosive | TNT: **Poland (Nitro-Chem)**, others ✅. IMX: Holston Army Ammunition Plant, Tennessee 🟡 |
| Propellant (separate charges) | Nitrocellulose-based modular charges | **Radford Army Ammunition Plant, Virginia: sole US NC source** 🟡 |
| Nitrocellulose inputs | Cotton linters or wood pulp + nitric acid | Nitric acid ← ammonia ← **Haber-Bosch** ← **natural gas** |
| TNT inputs | Toluene + nitric & sulfuric acid | Toluene ← oil refineries |
| Rotating band | Copper / gilding metal | Copper (Chile, US…) |
| Fuze | Steel/aluminium body, electronics, battery | Electronics supply chain: chips, possibly Chinese-sourced components ⚠️ |

**Production chain (US case)**
1. **Steel bodies.** Forged and machined at **Scranton Army Ammunition Plant** (Pennsylvania) 🟡, plus new capacity in **Mesquite, Texas** ⚠️.
2. **Energetics.** TNT imported. IMX made at Holston. Propellant from Radford. These single sites are the chokepoint.
3. **Load-Assemble-Pack.** Bodies are filled with explosive and packed at **Iowa Army Ammunition Plant** 🟡 and a new facility in **Camden, Arkansas** designed for **50,000/month** at full rate ✅.
4. **Fuzes & charges.** Separate lines, separate suppliers. Assembled into a "round" only at the gun.
5. **Ship & fire.** Rail → port → Poland → Ukraine.

**The 700-year echo.** Saltpeter (nitrogen) was the scarce part of gunpowder in 1526. In 2026 the scarce part of a shell is still the **nitrogen chemistry**. It just comes from natural gas through Haber-Bosch instead of stable floors. (This is the strongest single story the site can tell. See storyline "Saltpeter".)

**Scale & cost**
- Russia: estimates of ~3–4 million shells/year plus large North Korean deliveries ⚠️ (contested).
- EU: target of ~2 million/year by end of 2025 ⚠️. Rheinmetall's Unterlüß plant opened Aug 2025 ⚠️.
- Unit price in Europe rose several-fold after 2022 ⚠️ (find contract data; don't publish rumor).

**Who paid.** Artillery is widely reported as the leading cause of casualties in Ukraine ⚠️. Unexploded ordnance will contaminate farmland for decades (WWI shells still surface in France and Belgium ✅).

**Myths vs facts**
- *"The West just needs to spend more."* Plants take 3–5 years to build. The Kentucky TNT plant was contracted in 2025 for 2028 ✅.
- *"Shells are low-tech."* The shell body is. The energetics chemistry and safety-certified plants are not.

**Storylines.** Saltpeter · Mass vs precision · The single point of failure.
