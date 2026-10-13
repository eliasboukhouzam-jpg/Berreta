# 01 — Concept, scope and editorial rules

> Status: brainstorm draft, 13 Oct 2026. Nothing here is design. This is *what the site says*, not how it looks.

Confidence legend used across all research files:
✅ **Certain**: hard evidence (surviving artifact, primary document, official data)
🟡 **Likely**: scholarly consensus or strong inference
⚠️ **Guessing / verify**: estimate, contested, or single-source. Must be checked before publishing.

---

## 1. The problem with the brief as written

"Every weapon, chronologically, with its full production chain and minerals" can't be finished as stated:

- **Too many items.** Counting individual models (Mauser 98k, Kar98a, G98, M1903…), there are tens of thousands of weapons. One team can't research production chains for that many. Wikipedia, museums and YouTube already cover the *list of weapons* better than we will.
- **Uneven evidence.** For a Bronze Age sword we can rebuild the chain from archaeology and isotope studies. For an F-35 or a hypersonic missile, the real supplier chain is classified or proprietary. We can describe the *materials* and the *type* of chain, but rarely the actual suppliers.
- **The real gap is elsewhere.** A quick check found no site that ties weapons history to the minerals and industry behind each weapon (see `06-sources.md`). That pairing is the reason for this site to exist.

## 2. Thesis (the one sentence the whole site argues)

> **Every weapon is a supply chain with a trigger.**
> The history of weapons is a history of who controlled the rocks, the forests, the chemistry and the factories.

What follows from it:
- Tin made bronze swords, and losing it helped end the Bronze Age.
- Saltpeter (nitrogen) is the thread from Chinese alchemy, through the British East India Company, the Chilean nitrate war and Haber-Bosch, to the 155 mm shells of 2026.
- Rare earths, gallium, tungsten and antimony are today's tin, and China holds most of them.

## 3. Unit of content: the breakthrough, not the model

We document **weapon families / breakthroughs**, meaning the moment a technology changed what was possible. Individual models appear only as *examples* inside a family page.

| ✅ A page | ❌ Not a page (example inside a page) |
|---|---|
| The flintlock | Brown Bess, Charleville 1777 |
| The bolt-action smokeless rifle | Mauser 98, Lee-Enfield, Mosin-Nagant |
| The polymer-frame pistol | Glock 17, Beretta APX |
| The loitering munition | Shahed-136, Lancet, Switchblade |

The master list in `02-master-timeline.md` has about 200 breakthroughs. That's a realistic v1. If we shipped model-level pages we would never finish.

> **Update (13 Oct 2026):** the end product is a full **value chain** per weapon (mines, countries, tonnage, processing, refineries, logistics, politics, contracts). See `07-value-chain-model.md`. The axes below are how readers *enter* that chain.

## 4. The four ways in (navigation axes)

Content gets written once and is reachable four ways. That decides the data model, so it has to be settled before design.

1. **Time**: the chronological spine (eras → breakthroughs). What the user asked for.
2. **Material**: "Show me everything tungsten made possible." Each mineral page lists the weapons that depend on it across 5,000 years. This is the original part.
3. **Place**: mines, forests, factories, arsenals, battles on a map. (Val Trompia, Cornwall, Bihar, Atacama, Shinkolobwe, Oak Ridge, Bayan Obo…)
4. **Storylines**: cross-era narrative threads (see `05-storylines.md`). This is how a non-expert gets pulled through.

## 5. Depth tiers: how "everyone can understand" and "most details possible" fit together

These two goals conflict. Layering is the fix: every weapon page has four depths and the reader goes as deep as they want.

| Tier | Length | For whom | Content |
|---|---|---|---|
| **T1: Card** | 1 sentence + 3 facts | everyone, mobile scroll | what it is, when, why it mattered |
| **T2: Story** | ~300 words | curious reader | problem it solved, how it works (plain language), impact |
| **T3: Deep dive** | 1,500–3,000 words | enthusiast/student | full production chain, bill of materials, labor, energy, numbers, myths vs facts |
| **T4: Data & sources** | structured | researcher | every claim with source + confidence badge, downloadable |

v1 rule: **every breakthrough gets T1 + T2; only flagship entries get T3** (about 30 to start, see §9).

## 6. Evidence system (shown on the site, not just internal)

A lot of popular weapons history is myth. Examples we'll have to deal with:
- Folding does not give katanas magic properties. It mostly removed slag from poor iron-sand steel. 🟡
- The Terracotta Army bronzes were **not** deliberately chrome-plated. The chromium came from lacquer (2019 study). ✅
- "Damascus steel contained carbon nanotubes" is a single 2006 study, often overstated. ⚠️
- "417 kg of rare earths per F-35" traces to a 2012 DoD study whose method was never published. ⚠️

So every factual claim on the site carries a badge: **Documented / Consensus / Estimate / Contested**. That's a trust feature, and it's also a design element to plan for later.

## 7. Content guardrails (non-negotiable)

The site explains **materials, industry, geography, economics and consequences**. It never gives **recipes or procedures**.

| ✅ We write | ❌ We never write |
|---|---|
| "Gunpowder is saltpeter, sulfur and charcoal; saltpeter was the scarce one, and here's who controlled it" | Grain sizes, mixing, or production procedures |
| "Uranium from Shinkolobwe was enriched at Oak Ridge using calutrons wound with Treasury silver" | Device design, enrichment parameters, critical masses |
| "Chlorine gas came out of Germany's chlor-alkali industry; Haber led the program" | Synthesis routes or dispersal methods for any chemical or biological agent |
| "A barrel was forged from a strip around a mandrel, then bored" (historical craft) | Instructions for making, converting or modifying a working firearm today |

This is right in principle, and it also keeps us safe with hosts, ad networks and payment providers. 🟡

## 8. Ethics: every entry has a "Who paid" field

If the site only celebrates engineering, it reads as a gun-fan site. If it lectures, it loses readers. The fix is a factual **Who paid** section on every entry covering the people and places that bore the cost of making and using it:

- Laurion silver slaves → Athenian fleet (480 BCE)
- Mita forced labor and mercury poisoning at Potosí/Huancavelica → Habsburg wars
- Mittelbau-Dora prisoners → V-2 (more died building it than were killed by it) 🟡
- Navajo uranium miners, Hanford, Oak Ridge mercury → the nuclear arsenal
- Cobalt artisanal miners (DRC), conflict tantalum → modern electronics

This also sets the site apart: no competitor puts **production cost in human terms** next to the specs.

## 9. Flagship deep dives for v1 (proposed 30)

Chosen so every era and every key mineral gets at least one full T3 chain:

1. Ötzi's kit (copper axe + flint + yew), c. 3300 BCE
2. Naue II bronze sword, c. 1300 BCE *(worked example in `04-sample-entries.md`)*
3. Composite bow, c. 2000 BCE onward
4. War chariot, c. 2000–1200 BCE
5. Athenian trireme (Laurion silver), 480 BCE
6. Qin crossbow and standardized arrowheads, c. 210 BCE
7. Roman gladius & pilum (Noric steel)
8. Wootz / "Damascus" blade
9. Japanese tachi/katana (iron sand + tatara)
10. English longbow (imported yew)
11. Plate armor (Milan, Augsburg, Styrian Erzberg)
12. Gunpowder (saltpeter) as a material in its own right
13. Orban's bombard, Constantinople 1453
14. Matchlock arquebus / Beretta 1526 *(worked example)*
15. Flintlock (Brandon gunflints)
16. Ship of the line (oak, hemp, copper sheathing)
17. Mysorean / Congreve rocket
18. Percussion cap (mercury fulminate, Almadén)
19. Krupp steel breech-loader
20. Maxim gun
21. Smokeless powder + Chilean nitrate + Haber-Bosch
22. Dreadnought (nickel armor + oil)
23. WWI tank
24. T-34 / Sherman (mass production)
25. Radar & cavity magnetron
26. Manhattan Project (uranium, silver, graphite)
27. AK-47
28. AIM-9 Sidewinder / guided missile
29. F-35 (rare earths, titanium, composites, the 2022 magnet incident)
30. 155 mm artillery shell, 2022–2026 *(worked example)*
31. *(bonus)* FPV / loitering drone: the cheapest supply chain in modern war

## 10. Audience (assumption; needs your confirmation)

⚠️ Guessing, since you haven't said: general public 15+, history/geopolitics enthusiasts, students, journalists. **Not** collectors or shooters looking for gun specs (there are better sites for that). If firearms enthusiasts *are* the core audience, the scope changes; see open questions in `README.md`.

## 11. Name risk

⚠️ If "Berreta" is the public name: it's one letter off **Beretta**, a trademark of a real arms company that turned 500 in October 2026. Expect confusion with the brand and possibly a trademark complaint. Fine as a codename, risky as a domain.
