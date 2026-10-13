# 11 — The team's six reference sites: what to take for stories & drawing models

> Draft, 13 Oct 2026. Sites chosen by the team: why.zero.university · oryzo.ai · shopify.com/editions/winter2026 · landonorris.com · terminal-industries.com · animejs.com
> ⚠️ All six are **blocked by this environment's network policy** (proxy 403), so the notes come from award write-ups, studio case studies and search results, **not from opening the sites**. Items marked *(unverified)* need a screenshot review once access is allowed.
> Confidence: ✅ documented in a source · 🟡 likely · ⚠️ unverified.

---

## 0. What these six have in common, and the problem with that

All six are **motion-first, single-story showcase sites**: one argument, one product, one person. Most run on WebGL/Three.js + scroll-driven animation 🟡. **None of them has to hold 200 entries, value-chain tables and sources.** Our site is an encyclopedia with a database.

**So the rule is:** use the immersive style for a few **journeys**, and keep **entry and data pages calm, fast and readable**.

| Immersive (their style) | Calm (reading style) |
|---|---|
| The brief past: one continuous scroll through the 12 revolutions | The ~200 breakthrough cards & pages |
| Each of the 7 shifts (2014–2026) as a chapter | Value-chain tables, sources, data downloads |
| The exploded 3D model → value-chain transition | Material & place pages |

The cost is real too: these sites come from award-winning studios (Lusion, Off+Brand). Custom WebGL with 3D models is the most expensive part of any build 🟡. Budget it for the journeys only.

---

## 1. Site by site

### why.zero.university: *the argument you feel*
- **What it is:** a one-page story arguing the university degree is broken, for Zero University ✅. Recognized by Kyoorius 2026 and CSS Design Awards ✅ (Awwwards SOTD claimed, not confirmed ⚠️).
- **How it works:** a **gesture-based entry**, then **one continuous WebGL scroll** that stages the *collapse* of the old narrative and ends in a "city of company headquarters". Built with Three.js + GSAP in a single scroll timeline ✅ (Kyoorius write-up). The team's stated goal: make the argument **felt rather than read** ✅.
- **For our stories:** this is the template for the **brief past**. One continuous scroll where each of the **12 "rules that broke"** visibly collapses (walls fall in 1453, the knight falls in 1525…) and the scroll **lands in the present**: the 2014–2026 world where the deep chapters begin.
- **For drawing models:** each collapse is one staged scene. The style can be line art (see Anime.js below) instead of full 3D to keep it light.

### oryzo.ai: *an object with weight*
- **What it is:** a **fictional** AI-era product (a cork coaster) made by studio **Lusion** (Bristol) to show off craft ✅. CSS Winner Site of the Month (Apr 2026) ✅; Awwwards SOTD ✅ (listing).
- **How it works:** dark, minimal; a **3D object that moves with inertia and weight** (Three.js/WebGL) ✅. A signature **3D → 2D transition** where the model becomes part of a flat layout ✅. A strict palette (near-black + one orange) ✅. **Illustrations drawn by hand in Procreate, no AI** ✅ (Lusion BTS).
- **For drawing models:** two lessons.
  1. **Weapons must feel heavy.** A 47 kg shell and a 0.84 kg pistol should move differently. Weight sells realism without glamour.
  2. **The 3D → 2D transition is our value-chain move.** The exploded M17 model flattens into the supply-chain diagram: slide → stainless → chromium → South Africa.
- **For our look:** a two-colour discipline. Near-black + **one metal accent** (copper/bronze orange, the first weapons metal and still the metal of every cartridge) ⚠️ (design suggestion).
- ❌ A GitHub copy of the site's front end exists. Studying is fine, **copying needs Lusion's permission**.

### shopify.com/editions/winter2026: *a gallery of 150 items*
- **What it is:** Shopify's Winter '26 "RenAIssance" Edition, launched Dec 2025 ✅. The site is a **scroll-driven gallery of 3D-rendered Renaissance paintings, each anchored to one of 150+ product updates**, with parallax and subtle animation ✅ (RGD award listing).
- **The one example on the list that solves our problem:** many items, each its own artwork, in one journey.
- **For our stories:**
  - The **~200 breakthroughs as a gallery of plates**, each one artwork anchored to one breakthrough.
  - **Editions as a publishing model:** release the site in editions ("Edition 01: The Drone Decade", "Edition 02: The Minerals War"), and refresh value-chain data yearly when USGS publishes. That fits the maintenance reality in `07-value-chain-model.md` §7.
- **For drawing models:** an art-historical framing (paintings/plates) suits the brief past. A consistent artistic treatment across all eras.

### landonorris.com: *an archive with a graphic language*
- **What it is:** the F1 driver's site by agency **Off+Brand** ✅ (DesignRush case study).
- **How it works:** cursor-reactive blob-like overlays that **echo the graphic language of his helmet** ✅, a four-colour palette ✅, and a **helmet archive** section ✅. (Awwwards / WebGL details not confirmed ⚠️.)
- **For our stories:** the **archive** pattern. Our weapons and models as a collectible archive, each object with the same frame (like helmets).
- **For drawing models:** take the **graphic motif from the subject**. Our equivalent: **geological contour lines and ore strata** (the earth the weapons come from), used as the reactive motif ⚠️ (design suggestion). It ties every page to the minerals thesis without a single explosion.

### terminal-industries.com: *industrial & logistics visuals*
- **What it is:** an AI yard/logistics company 🟡 (unverified). A directory credits the site design to **Propagande** ⚠️.
- **For our stories:** the closest reference to **Layer 7 (logistics)** of the value chain: trucks, yards, containers, flows *(unverified, needs a look)*.
- **Action:** review once access is allowed. It may be the best model for the logistics and factory visuals.

### animejs.com: *the toolkit, not a style*
- **What it is:** the Anime.js JavaScript animation engine (v4; v4.3.x mentioned) ✅.
- **Relevant features** (per docs index and guides): **timelines** for sequencing ✅; **SVG line drawing** (lines that draw themselves) 🟡; **motion paths** (an element follows a path) 🟡; scroll-triggered animation (`onScroll`) 🟡. Scroll *scrubbing/pinning* support is disputed between sources ⚠️. Verify in docs.
- **For drawing models:**
  - The **line illustrations of the brief past can draw themselves** as you scroll. Light, elegant, cheaper than WebGL.
  - **Motion paths = logistics routes:** ore ships moving along real sea lanes (Bushveld → Richards Bay → sea; Chile → Panama), chokepoints lighting up.
  - **Timelines = the chronology itself.**

---

## 2. Combined direction (proposal)

| Element | Taken from | Our version |
|---|---|---|
| Entry | Why Zero (gesture entry) | Start with a single gesture: "draw the first edge" (stone flake) ⚠️ idea |
| The brief past | Why Zero (continuous scroll) + Shopify (gallery of artworks) + Anime.js (line drawing) | One scroll; 12 revolutions as hand-drawn plates that draw themselves; each "rule" collapses; lands in 2014 |
| The deep present | Oryzo (objects with weight) | 3D models (FPV, Shahed, shell, M17…) that feel heavy |
| Value chain | Oryzo (3D → 2D) + Anime.js (motion paths) + Terminal Industries (logistics) | Exploded model flattens into the chain; ships and trains move on real routes |
| Archive | Lando Norris (helmet archive) | Every model and breakthrough in one archive grid |
| Graphic motif | Lando Norris (helmet language) | Geological contour lines and ore strata |
| Palette | Oryzo (2 colours) | Near-black + a copper accent ⚠️ |
| Publishing | Shopify Editions | Seasonal/yearly editions; data refresh with USGS each February |
| Illustrations | Oryzo (hand-drawn, no AI) | Hand-drawn by a commissioned illustrator, credited |

## 3. Screenshot review to do once domains are allowed
For each site: capture desktop + mobile at 5 scroll positions, note section structure, copy length per screen, palette, type, motion, load weight. Then write a one-page teardown each.

Domains to allow: `why.zero.university`, `zero.university`, `oryzo.ai`, `www.shopify.com`, `landonorris.com`, `terminal-industries.com`, `animejs.com` (plus the earlier list: `www.anduril.com`, `www.beretta.com`, `pubs.usgs.gov`, `usgs.gov`, `comtradeapi.un.org`, `cepii.fr`).

## Sources used for this file
- [Kyoorius 2026: Why Zero](https://winners.kyoorius.com/winners/2026/kda/16247-why-zero/) · [CSS Design Awards: Why Zero](https://www.cssdesignawards.com/sites/why-zero/49794/) · [Awwwards: Why Zero](https://www.awwwards.com/sites/why-zero) · [Orpetron: Why Zero](https://orpetron.com/sites/why-zero/) · [CSS Winner: Why Zero](https://www.csswinner.com/details/why-zero/19308) · [Zero](https://www.zero.university/)
- [Awwwards: Oryzo AI](https://www.awwwards.com/sites/oryzo-ai) · [Lusion BTS: Oryzo UX/UI & illustrations](https://blog.lusion.co/oryzo-bts-part-3-7-website-ux-ui-and-illustrations) · [Codrops: Lusion profile](https://tympanus.net/codrops/2026/04/13/lusion-where-digital-craft-meets-ambitious-experimentation/) · [CSS Winner: Oryzo](https://www.csswinner.com/details/oryzo-ai/19168) · [landing.love: Oryzo](https://www.landing.love/sites/oryzo/) · [Mesh3D gallery: Oryzo](https://mesh3d.gallery/website/oryzo-ai)
- [RGD: The RenAIssance Edition](https://rgd.ca/hiring-designers/award-winners/2026-in-house-award-winners/the-renaissance-edition) · [On Tap: Shopify Winter 2026 Edition](https://www.ontapgroup.com/blog/shopify-winter-2026-edition) · [Shopifreaks: RenAIssance highlights](https://www.shopifreaks.com/highlights-of-shopify-winter-26-edition-the-renaissance-edition/)
- [DesignRush: Lando Norris website](https://designrush.com/best-designs/websites/lando-norris-website-design)
- [DesignRush: distribution website designs](https://www.designrush.com/best-designs/websites/distribution?type=grid) (Terminal Industries listing)
- [Anime.js documentation](https://animejs.com/documentation/getting-started)
- [Digital Strategy Force: immersive experiences in 2026 Awwwards](https://digitalstrategyforce.com/journal/why-are-immersive-experiences-dominating-the-2026-awwwards/) (commentary)
