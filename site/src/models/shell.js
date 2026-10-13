import * as THREE from 'three';
import { ExplodedModel } from '../three/exploded.js';
import { M, cutMaterial } from '../three/materials.js';
import { cyl, group, latheX, sample } from '../three/geom.js';

// Simplified 155 mm high-explosive projectile with a cut-away body. Nose = +x.
// Profile units: calibre radius 0.3. Proportions approximate, not a drawing of any real round.
const ogive = (h) => 0.11 + 0.19 * Math.sqrt(Math.max(0, 1 - ((h - 1.35) / 0.9) ** 2));
const inner = (h) => ogive(h) - 0.045;

export function buildShell() {
  const m = new ExplodedModel('shell', { scale: 0.8, offset: [-0.55, 0, 0] });
  const CUT = Math.PI * 1.5;

  const outerProfile = [
    [0, 0],
    [0.25, 0],
    [0.285, 0.1],
    [0.3, 0.3],
    [0.3, 1.35],
    ...sample(ogive, 1.35, 2.25, 14).slice(1),
    [0.075, 2.25],
    [0.075, 2.15],
    ...sample(inner, 2.15, 1.35, 14),
    [0.255, 0.35],
    [0.2, 0.12],
    [0, 0.12],
  ];
  const olive = M.olive();
  olive.side = THREE.DoubleSide; // the inner wall is seen through the cut-away
  const body = latheX(outerProfile, olive, { phiLength: CUT, capMaterial: cutMaterial() });
  const marking = latheX(
    [
      [0.296, 1.42],
      [0.302, 1.42],
      [0.299, 1.5],
      [0.292, 1.5],
    ],
    M.yellow(),
    { phiLength: CUT },
  );
  m.add('body', group(body, marking), { explode: [0, 0, 0], labelOffset: [0.2, -0.42, 0] });

  const fillProfile = [
    [0, 0.124],
    [0.197, 0.124],
    [0.251, 0.35],
    [0.251, 1.35],
    ...sample((h) => inner(h) - 0.004, 1.35, 2.14, 14).slice(1),
    [0, 2.14],
  ];
  m.add('fill', group(latheX(fillProfile, M.fill())), { explode: [0.15, 0.95, 0.55], labelOffset: [0, 0.34, 0] });

  m.add(
    'band',
    group(
      latheX(
        [
          [0.292, 0.3],
          [0.318, 0.31],
          [0.318, 0.41],
          [0.292, 0.42],
          [0.292, 0.3],
        ],
        M.copper(),
      ),
    ),
    { explode: [-0.55, -0.6, 0.15], labelOffset: [0, -0.4, 0] },
  );

  m.add(
    'fuze',
    group(
      latheX(
        [
          [0, 2.2],
          [0.108, 2.2],
          [0.108, 2.3],
          [0.1, 2.4],
          [0.07, 2.58],
          [0.035, 2.72],
          [0, 2.75],
        ],
        M.aluminium(),
      ),
      latheX(
        [
          [0.109, 2.24],
          [0.112, 2.24],
          [0.112, 2.28],
          [0.109, 2.28],
        ],
        M.copper(),
      ),
    ),
    { explode: [0.95, 0.25, 0], labelOffset: [0, 0.24, 0] },
  );

  const charge = (x) =>
    group(
      cyl(0.28, 0.28, 0.5, M.tan(), [x, 0, 0], [0, 0, Math.PI / 2], 40),
      cyl(0.285, 0.285, 0.04, M.darkSteel(), [x + 0.23, 0, 0], [0, 0, Math.PI / 2], 40),
      cyl(0.285, 0.285, 0.04, M.darkSteel(), [x - 0.23, 0, 0], [0, 0, Math.PI / 2], 40),
    );
  m.add('charges', group(charge(-0.42), charge(-0.96)), {
    explode: [-0.6, 0, 0],
    spread: 0.3,
    labelOffset: [0, 0.42, 0],
  });

  return m;
}
