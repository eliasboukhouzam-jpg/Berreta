import { ExplodedModel } from '../three/exploded.js';
import { F } from '../three/materials.js';
import { extrude, boxMM, cylX, springX, group, serrations } from '../three/profile.js';

// Beretta 92FS, field-strip level. Side profile in mm (muzzle = +x).
// Overall length ~217 mm, height ~137 mm. Exterior likeness only.

export function buildBeretta92() {
  const m = new ExplodedModel('beretta', { scale: 1.05, center: [0.92, 0.68, 0] });

  // ---- Slide: open-top design that leaves the barrel visible ------------
  const slideMat = F.bruniton();
  const slide = extrude(
    [
      ['M', 0, 100],
      ['L', 0, 128],
      ['Q', 0, 132, 4, 132],
      ['L', 78, 132],
      ['C', 90, 132, 92, 117, 104, 117],
      ['L', 197, 117],
      ['Q', 208, 117, 210, 112],
      ['L', 210, 104],
      ['Q', 210, 100, 206, 100],
    ],
    29,
    slideMat,
    { bevel: 1.6 },
  );
  const levers = [1, -1].map((s) =>
    extrude(
      [
        ['M', 10, 113],
        ['L', 30, 113],
        ['Q', 35, 116.5, 30, 120],
        ['L', 10, 120],
      ],
      2.4,
      F.blued(),
      { z: s * 15.6, bevel: 0.6 },
    ),
  );
  const port = boxMM(62, 92, 111, 131.5, 0.6, F.rubber(), 14.6, 0.1);
  m.add(
    'slide',
    group(
      slide,
      levers,
      port,
      serrations(8, 36, 13, 104, 128, 14.5, F.blued()),
      boxMM(4, 13, 132, 137, 11, F.bruniton()),
      boxMM(198, 203, 117, 126, 3, F.bruniton()),
    ),
    { explode: [0.1, 0.62, 0], labelOffset: [0, 0.22, 0] },
  );

  // ---- Barrel -----------------------------------------------------------
  m.add('barrel', group(cylX(58, 212.5, 7, 116, F.barrel()), boxMM(58, 92, 108, 125, 16, F.barrelDark())), {
    explode: [0.3, 1.12, 0],
    labelOffset: [0, 0.14, 0],
  });

  // ---- Recoil spring + guide rod ---------------------------------------
  m.add('spring', group(cylX(98, 204, 1.6, 104, F.barrelDark()), springX(100, 200, 3.6, 0.7, 16, 104, F.spring())), {
    explode: [0.22, 0.34, 0],
    labelOffset: [0, 0.1, 0],
  });

  // ---- Frame: forged aluminium alloy, with trigger guard, hammer, trigger ----
  const frame = extrude(
    [
      ['M', -8, 100],
      ['L', 203, 100],
      ['Q', 206, 100, 206, 96],
      ['L', 206, 90],
      ['Q', 206, 87, 202, 87],
      ['L', 131, 87],
      ['L', 134, 70],
      ['Q', 135, 61, 126, 59],
      ['L', 88, 58],
      ['Q', 76, 58, 71, 66],
      ['C', 64, 50, 52, 30, 44, 8],
      ['L', 44, 3],
      ['L', -25, 3],
      ['L', -27, 8],
      ['C', -22, 40, -15, 70, -11, 90],
      ['Q', -10, 96, -8, 100],
    ],
    24,
    F.anodized(),
    {
      holes: [
        [
          ['M', 79, 84],
          ['L', 124, 84],
          ['Q', 128, 84, 128, 80],
          ['L', 126, 70],
          ['Q', 125, 64, 119, 64],
          ['L', 89, 64],
          ['Q', 81, 64, 78, 70],
          ['L', 76, 80],
          ['Q', 76, 84, 79, 84],
        ],
      ],
    },
  );
  const hammer = extrude(
    [
      ['M', -2, 100],
      ['L', 1, 103],
      ['L', 0, 118],
      ['Q', -2, 125, -9, 125],
      ['L', -14, 122],
      ['L', -11, 112],
      ['L', -6, 103],
    ],
    8,
    F.bruniton(),
    { bevel: 0.8 },
  );
  const trigger = extrude(
    [
      ['M', 97, 86],
      ['C', 102, 80, 102, 71, 96, 66],
      ['L', 92, 68],
      ['C', 96, 72, 96, 79, 93, 86],
    ],
    6,
    F.bruniton(),
    { bevel: 0.8 },
  );
  const takedown = boxMM(100, 110, 90, 96, 1.6, F.blued(), -12.8, 0.4);
  m.add('frame', group(frame, hammer, trigger, takedown), { explode: [0, 0, 0], labelOffset: [0.25, -0.2, 0] });

  // ---- Grip panels (spread sideways when exploded) ----------------------
  const panel = () =>
    extrude(
      [
        ['M', -20, 10],
        ['L', 38, 10],
        ['C', 46, 28, 55, 47, 62, 64],
        ['Q', 58, 78, 42, 84],
        ['L', 2, 92],
        ['Q', -7, 93, -9, 86],
        ['C', -13, 66, -17, 40, -20, 10],
      ],
      4,
      F.polymer(),
      { bevel: 1.2 },
    );
  const left = panel();
  const right = panel();
  left.position.z = -0.14;
  right.position.z = 0.14;
  m.add('grips', group(left, right), { explode: [0, -0.06, 0], spread: 2.2, labelOffset: [-0.1, -0.1, 0.4] });

  // ---- Magazine ---------------------------------------------------------
  m.add(
    'magazine',
    group(
      extrude(
        [
          ['M', -18, 4],
          ['L', 36, 4],
          ['L', 58, 94],
          ['L', 6, 94],
        ],
        18,
        F.blued(),
        { bevel: 0.8 },
      ),
      boxMM(-24, 42, -2, 4, 24, F.polymerSmooth(), 0, 1.4),
    ),
    { explode: [-0.12, -0.72, 0], labelOffset: [0, -0.3, 0] },
  );

  return m;
}
