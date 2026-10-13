import { ExplodedModel } from '../three/exploded.js';
import { F } from '../three/materials.js';
import { extrude, boxMM, cylX, springX, group, serrations } from '../three/profile.js';

// Glock 17 (Gen 4 style), field-strip level. Side profile in mm (muzzle = +x).
// Overall length ~204 mm, slide ~186 mm. Exterior likeness only.

export function buildGlock17() {
  const m = new ExplodedModel('glock', { scale: 1.08, center: [0.77, 0.65, 0] });

  // ---- Slide: square, nitrided steel -------------------------------------
  m.add(
    'slide',
    group(
      extrude(
        [
          ['M', 0, 100],
          ['L', 0, 126],
          ['Q', 0, 128, 2, 128],
          ['L', 179, 128],
          ['L', 186, 121],
          ['L', 186, 103],
          ['Q', 186, 100, 183, 100],
        ],
        25.5,
        F.nitride(),
        { bevel: 2.4 },
      ),
      serrations(6, 34, 9, 103, 125, 12.75, F.blued(), 0.6, 1.6),
      boxMM(50, 90, 112, 126.5, 0.6, F.rubber(), 12.9, 0.1),
      boxMM(52, 90, 127.2, 128.6, 15, F.barrelDark(), 0, 0.3),
      boxMM(6, 15, 128, 133.5, 20, F.polymerSmooth(), 0, 0.8),
      boxMM(173, 178, 128, 134, 4, F.polymerSmooth(), 0, 0.6),
      boxMM(172.6, 173.2, 130.5, 132.5, 2, F.white(), 0, 0.2),
      boxMM(-0.6, 0.6, 104, 124, 19, F.polymerSmooth(), 0, 0.3),
    ),
    { explode: [0.1, 0.6, 0], labelOffset: [0, 0.2, 0] },
  );

  // ---- Barrel with square hood ------------------------------------------
  m.add('barrel', group(cylX(36, 187, 6.8, 114, F.barrel()), boxMM(36, 92, 106, 127, 14, F.barrelDark())), {
    explode: [0.25, 1.05, 0],
    labelOffset: [0, 0.14, 0],
  });

  // ---- Recoil spring assembly -------------------------------------------
  m.add('spring', group(cylX(92, 182, 1.8, 105, F.polymerSmooth()), springX(94, 180, 4, 0.7, 18, 105, F.spring())), {
    explode: [0.2, 0.33, 0],
    labelOffset: [0, 0.1, 0],
  });

  // ---- Frame: injection-moulded polymer -----------------------------------
  const frame = extrude(
    [
      ['M', -9, 100],
      ['L', 176, 100],
      ['Q', 180, 100, 180, 96],
      ['L', 180, 89],
      ['Q', 180, 86, 177, 86],
      ['L', 126, 86],
      ['L', 128, 72],
      ['Q', 129, 62, 122, 59],
      ['L', 120, 58],
      ['L', 86, 57],
      ['Q', 75, 57, 70, 63],
      ['C', 66, 58, 62, 54, 63, 48],
      ['C', 64, 42, 58, 39, 57, 34],
      ['C', 56, 28, 51, 25, 50, 20],
      ['L', 46, 5],
      ['L', 44, 1],
      ['L', -31, 1],
      ['L', -33, 6],
      ['C', -28, 38, -21, 66, -15, 86],
      ['Q', -13, 92, -16, 96],
      ['Q', -17, 99, -12, 100],
    ],
    28,
    F.polymer(),
    {
      bevel: 2.2,
      holes: [
        [
          ['M', 78, 83],
          ['L', 120, 83],
          ['Q', 123, 83, 123, 79],
          ['L', 121, 69],
          ['Q', 119, 64, 113, 64],
          ['L', 87, 64],
          ['Q', 79, 64, 76, 69],
          ['L', 75, 79],
          ['Q', 75, 83, 78, 83],
        ],
      ],
    },
  );
  const trigger = extrude(
    [
      ['M', 98, 85],
      ['C', 103, 78, 102, 70, 96, 66],
      ['L', 93, 68],
      ['C', 97, 72, 96, 79, 94, 85],
    ],
    6,
    F.polymerSmooth(),
    { bevel: 0.8 },
  );
  const slideStop = boxMM(72, 92, 96, 100, 1.2, F.blued(), -14.6, 0.3);
  const tabs = [1, -1].map((s) => boxMM(108, 118, 92, 96, 1.2, F.blued(), s * 14.6, 0.3));
  m.add('frame', group(frame, trigger, slideStop, tabs), { explode: [0, 0, 0], labelOffset: [0.25, -0.2, 0] });

  // ---- Magazine ---------------------------------------------------------
  m.add(
    'magazine',
    group(
      extrude(
        [
          ['M', -28, 2],
          ['L', 40, 2],
          ['L', 60, 96],
          ['L', 0, 96],
        ],
        22,
        F.polymerSmooth(),
        { bevel: 1 },
      ),
      boxMM(-32, 46, -4, 2, 30, F.polymerSmooth(), 0, 1.6),
    ),
    { explode: [-0.14, -0.7, 0], labelOffset: [0, -0.3, 0] },
  );

  return m;
}
