import { ExplodedModel } from '../three/exploded.js';
import { F } from '../three/materials.js';
import { extrude, boxMM, cylX, latheX, group } from '../three/profile.js';

// M16A2, field-strip level. Side profile in mm (butt at x = 0, muzzle +x), bore at y = 214.
// Overall length ~1006 mm. Exterior likeness only.
const BORE = 214;

function ribbedHandguard() {
  const pts = [[21, 586]];
  for (let x = 588, i = 0; x <= 884; x += 6, i++) pts.push([i % 2 ? 25.5 : 24, x]);
  pts.push([21, 890]);
  return latheX(pts, BORE, F.polymerSmooth());
}

export function buildM16() {
  const m = new ExplodedModel('m16', { scale: 0.27, center: [5.03, 1.27, 0] });

  // ---- Fixed A2 buttstock ------------------------------------------------
  m.add(
    'stock',
    group(
      extrude(
        [
          ['M', 8, 56],
          ['L', 8, 210],
          ['Q', 8, 216, 16, 216],
          ['L', 250, 208],
          ['L', 250, 172],
          ['C', 190, 150, 100, 92, 22, 56],
          ['Q', 14, 52, 8, 56],
        ],
        42,
        F.polymerSmooth(),
        { bevel: 4 },
      ),
      boxMM(0, 9, 54, 216, 44, F.parkerized(), 0, 2),
    ),
    { explode: [-2.2, 0, 0], labelOffset: [0, 0.6, 0] },
  );

  // ---- Lower receiver (forged aluminium) with magazine well & trigger guard ----
  const lower = extrude(
    [
      ['M', 250, 172],
      ['L', 250, 200],
      ['L', 468, 200],
      ['L', 468, 186],
      ['L', 452, 180],
      ['L', 452, 128],
      ['Q', 452, 120, 444, 120],
      ['L', 388, 118],
      ['Q', 380, 118, 380, 126],
      ['L', 380, 150],
      ['L', 374, 150],
      ['L', 372, 126],
      ['Q', 370, 117, 360, 117],
      ['L', 312, 117],
      ['Q', 300, 117, 298, 128],
      ['L', 296, 150],
      ['L', 268, 152],
      ['Q', 254, 156, 250, 172],
    ],
    30,
    F.anodized(),
    {
      bevel: 1.6,
      holes: [
        [
          ['M', 304, 146],
          ['L', 368, 146],
          ['L', 366, 128],
          ['Q', 364, 123, 357, 123],
          ['L', 314, 123],
          ['Q', 307, 123, 305, 130],
        ],
      ],
    },
  );
  const trigger = extrude(
    [
      ['M', 330, 150],
      ['C', 336, 142, 336, 134, 330, 128],
      ['L', 327, 130],
      ['C', 331, 135, 330, 142, 327, 150],
    ],
    6,
    F.parkerized(),
    { bevel: 0.8 },
  );
  const selector = boxMM(290, 312, 176, 182, 2, F.parkerized(), -16, 0.6);
  m.add('lower', group(lower, trigger, selector), { explode: [0, 0, 0], labelOffset: [0, -0.4, 0] });

  // ---- Pistol grip ------------------------------------------------------
  m.add(
    'grip',
    group(
      extrude(
        [
          ['M', 268, 152],
          ['L', 302, 152],
          ['C', 300, 134, 292, 122, 296, 112],
          ['C', 299, 104, 290, 98, 286, 84],
          ['L', 276, 54],
          ['Q', 273, 46, 262, 47],
          ['L', 248, 50],
          ['Q', 239, 53, 241, 62],
          ['L', 262, 142],
          ['Q', 264, 150, 268, 152],
        ],
        30,
        F.polymer(),
        { bevel: 3 },
      ),
    ),
    { explode: [-0.3, -2.0, 0], labelOffset: [0, -0.5, 0] },
  );

  // ---- Upper receiver with A2 carry handle -------------------------------
  const upper = extrude(
    [
      ['M', 262, 200],
      ['L', 570, 200],
      ['L', 570, 210],
      ['L', 580, 210],
      ['L', 580, 224],
      ['L', 262, 228],
    ],
    30,
    F.anodized(),
    { bevel: 1.6 },
  );
  const handle = extrude(
    [
      ['M', 282, 226],
      ['L', 294, 288],
      ['L', 444, 288],
      ['Q', 452, 288, 452, 280],
      ['L', 452, 226],
    ],
    22,
    F.anodized(),
    {
      bevel: 1.6,
      holes: [
        [
          ['M', 304, 232],
          ['L', 310, 276],
          ['L', 438, 276],
          ['L', 438, 232],
        ],
      ],
    },
  );
  m.add(
    'upper',
    group(
      upper,
      handle,
      boxMM(286, 310, 288, 304, 18, F.anodized(), 0, 1.2),
      boxMM(330, 400, 204, 220, 0.6, F.rubber(), 15.4, 0.1),
      cylX(292, 318, 7, 212, F.anodized(), 16),
      boxMM(248, 266, 218, 228, 24, F.anodized(), 0, 1),
    ),
    { explode: [0, 2.4, 0], labelOffset: [0, 0.9, 0] },
  );

  // ---- Bolt carrier group (sits inside the upper) ------------------------
  m.add('bolt', group(boxMM(272, 440, 204, 224, 18, F.barrelDark(), 0, 1.5)), {
    explode: [-2.2, 4.4, 0],
    labelOffset: [0, 0.4, 0],
  });

  // ---- Barrel, front sight base, flash hider -----------------------------
  m.add(
    'barrel',
    group(
      cylX(580, 965, 9.5, BORE, F.parkerized()),
      latheX(
        [
          [26, 566],
          [31, 568],
          [31, 584],
          [26, 586],
        ],
        BORE,
        F.parkerized(),
      ),
      extrude(
        [
          ['M', 896, 200],
          ['L', 944, 200],
          ['L', 936, 252],
          ['L', 928, 264],
          ['L', 916, 264],
          ['L', 908, 252],
        ],
        22,
        F.parkerized(),
        { bevel: 1.4 },
      ),
      boxMM(916, 936, 186, 200, 10, F.parkerized(), 0, 1),
      latheX(
        [
          [0, 962],
          [11, 962],
          [11, 1006],
          [0, 1006],
        ],
        BORE,
        F.parkerized(),
      ),
      boxMM(974, 1000, 223, 226, 6, F.rubber(), 0, 0.4),
    ),
    { explode: [2.6, 2.4, 0], labelOffset: [0, 0.6, 0] },
  );

  // ---- Ribbed round handguard -------------------------------------------
  m.add('handguard', group(ribbedHandguard()), { explode: [1.2, -1.6, 0], labelOffset: [0, -0.5, 0] });

  // ---- 30-round curved magazine -----------------------------------------
  m.add(
    'magazine',
    group(
      extrude(
        [
          ['M', 386, 124],
          ['L', 446, 124],
          ['C', 449, 74, 460, 26, 478, -28],
          ['L', 476, -36],
          ['L', 414, -50],
          ['L', 410, -44],
          ['C', 398, -2, 390, 60, 386, 124],
        ],
        22,
        F.anodizedGray(),
        { bevel: 1.4 },
      ),
    ),
    { explode: [0.6, -2.8, 0], labelOffset: [0, -0.8, 0] },
  );

  return m;
}
