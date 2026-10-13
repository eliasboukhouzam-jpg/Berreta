# 07 — The value-chain model (the site's end product)

> Draft, 13 Oct 2026. Goal: for any weapon, show the full chain **mine → country → tonnage → processing → refinery → factory → logistics → politics → contracts → user → end of life.**
> Worked example: `08-value-chain-sig-m17.md`.
> Confidence: ✅ documented · 🟡 consensus · ⚠️ estimate / verify.

---

## 1. What can't be done

**You can't trace a specific gun back to specific mines.** Metals are fungible. A stainless-steel mill melts scrap from thousands of sources plus ferrochrome blended from many mines, and manufacturers don't publish their suppliers. A page claiming "this SIG slide came from mine X in South Africa" would be made up.

What *can* be shown honestly is a **chain of evidence levels**. Every link in the chain declares which kind it is:

| Level | Name | Meaning | Example (M17) | Shown as (design later) |
|---|---|---|---|---|
| **L1** | Documented | A contract, filing, or government document names the link | US Army ↔ SIG Sauer MHS contract (Jan 2017) | solid line |
| **L2** | Reported | Credible press or analysts report the link | Winchester (Olin) makes the M1152/M1153 9 mm loads | solid, lighter |
| **L3** | Market inference | Trade or market structure makes the link *probable* | US chromite imports are ~96% South African → chromium in US-melted stainless is most likely South African | dashed line + % |
| **L4** | Global context | World production shares; no direct link claimed | Indonesia mines ~60% of the world's nickel | background map |
| **H** | Historical reconstruction | Archaeology, isotopes, archives | Cornish tin in eastern-Mediterranean ingots | dotted |

This rule matters more than any design choice: **the site never presents an L3 link as if it were L1.**

## 2. The ten layers of a chain

The order the user described, made explicit:

| # | Layer | Question it answers | Main data sources |
|---|---|---|---|
| 1 | **Product & bill of materials** | What parts? What materials? How many grams? | Manufacturer specs, manuals, teardown studies, patents |
| 2 | **Minerals needed** | Material → elements → ore minerals | Alloy standards (ASTM/AISI), metallurgy references |
| 3 | **Mines & countries** | Which countries, which mines, who owns them, **how many tonnes/year** | USGS Mineral Commodity Summaries (annual, Feb), BGS World Mineral Production, World Mining Data, study groups (ILZSG, ICSG, INSG), company annual reports |
| 4 | **Processing** | Concentrate, smelting, intermediates (ferrochrome, nickel pig iron, copper cathode) | USGS Minerals Yearbook country chapters, company reports, IEA |
| 5 | **Refineries & mills** | Where metal becomes alloy, bar, strip, polymer | Company reports, trade associations (e.g. ISSF for stainless) |
| 6 | **Component makers & assembly** | Who machines, molds, assembles, and where | Company sites, permits, DoD contract announcements |
| 7 | **Logistics** | Rail, ports, sea routes, chokepoints (Malacca, Hormuz, Bab el-Mandeb, Panama, Cape) | UN Comtrade / CEPII BACI (trade flows by HS code), US Census trade data, bills of lading (Panjiva/ImportGenius, paid), port authorities |
| 8 | **Politics & risk** | Export controls, sanctions, tariffs, conflict, labor/ESG, supply concentration | MOFCOM, US BIS/OFAC, Federal Register, EU sanctions, OECD, NGOs (Global Witness, Amnesty) |
| 9 | **Contracts & agreements** | Procurement contracts, G2G minerals deals, offtakes, arms sales | USAspending / FPDS / SAM.gov, defense.gov daily contracts, DSCA notifications, SIPRI Arms Transfers, EU TED, White House / State fact sheets |
| 10 | **Use & end of life** | Who uses it, recycling, demilitarization, pollution | Military/agency reports, recycling programs, environmental agencies |

## 3. The key design decision: chains live on the material, not the product

Hand-building ten layers for each of ~200 weapons isn't doable. So:

- **Material chains are built once and shared.** "Chromium 2026," "copper 2026," "antimony 2026" and so on, about 30 modern chains.
- **Historical material chains are time-sliced.** "Copper, Late Bronze Age Mediterranean" is a different chain from "Copper 2026." About 15 historical slices cover the timeline.
- **A product page declares only** its bill of materials plus its own documented links (layers 1, 6, 9). Everything upstream assembles itself from the shared material chains.

```
PRODUCT (M17) ──contains──► COMPONENT (slide) ──made of──► MATERIAL (stainless steel)
                                                              │
                         shared material chain ◄──────────────┘
          (stainless 2026: chromium + nickel + iron + molybdenum…  → each with its own mine/country/refinery chain)
```

The cost is ~45 deep material chains plus ~200 light product pages, instead of ~200 deep, mostly duplicated chains.

## 4. Data model (nodes & edges)

**Node types:** `product`, `component`, `material`, `element`, `ore_mineral`, `mine`, `processing_plant` (smelter/refinery/mill), `factory`, `port`, `route`, `country`, `company`, `agreement`, `policy`, `event`.

**Edge types:**
| Edge | From → To | Key attributes |
|---|---|---|
| `contains` | product → component → material | grams, % of mass |
| `requires` | material → element | % in alloy (range) |
| `extracted_at` | element/ore → mine | tonnes/year, year, source |
| `located_in` | mine/plant/factory → country | coordinates |
| `owned_by` | mine/plant/factory → company | % stake, year |
| `supplies` | node → node | **evidence level (L1–L4/H)**, volume, share %, year, source |
| `ships_via` | flow → port/route | mode (rail/sea/road), chokepoints |
| `governed_by` | flow/node → policy | effective dates, status, **last_checked** |
| `party_to` | country/company → agreement | signed date, value, scope |

```yaml
# Example edge, as stored
- edge: supplies
  from: country/south-africa
  to: material/ferrochrome@us-2026
  evidence: L3            # market inference
  share: 0.96             # of US chromite ore imports, 2021–24
  basis: "USGS MCS 2026, chromium chapter, import sources"
  year: 2024
  last_checked: 2026-10-13
```

## 5. Metrics shown on every material

- **Tonnage:** world production + top 5 countries, with year and source.
- **Concentration:** Herfindahl-Hirschman Index (HHI) of production by country, for **mining and processing separately**. Processing is usually more concentrated, and that's where the real risk sits. 🟡
- **Supply-risk score:** HHI weighted by country governance (World Bank Worldwide Governance Indicators). This is the same family of method the **EU Critical Raw Materials** assessment uses 🟡, so it's credible and reproducible.
- **Import reliance** of the country using the weapon (USGS publishes this for the US).
- **Live policy box** with "last checked" date.

## 6. Feature ideas that come out of the model (content, not design)

1. **"Rock to weapon" walk:** the ten layers as a scroll story for one product.
2. **"Where in the world":** every country that touched a product, with share.
3. **"What if":** e.g. *"If China's antimony ban on the US resumes on 27 Nov 2026 ⚠️, which weapons are exposed?"* The graph answers it automatically.
4. **"Then vs now":** the same material in two eras (copper for a Bronze Age sword vs copper for 9 mm brass).
5. **"Most of a gun's minerals are in its ammunition"**: see the M17 example (§5 there). A strong, counter-intuitive hook.

## 7. Maintenance reality

| Data | Changes | Update method |
|---|---|---|
| Country production | yearly (USGS, February) | scripted import |
| Trade flows | monthly | scripted import (Comtrade/BACI API) |
| Policy (export controls, tariffs, sanctions) | weekly–monthly | manual, with `last_checked` |
| Contracts | as announced | manual + DoD daily contract feed |
| Mine ownership | occasional | manual |

Without scripts this goes stale within a year. **This is the main reason the data model has to be fixed before design.**

## 8. Data access problem in this environment

This environment's network policy **blocks `pubs.usgs.gov`** (proxy returned 403), so USGS figures in the M17 example come from secondary sources that cite USGS, marked as such. To pull primary data, add `pubs.usgs.gov`, `usgs.gov`, `comtradeapi.un.org`, `cepii.fr` to the environment's allowed domains (Network access settings: https://code.claude.com/docs/en/cloud-environments#network-access).
