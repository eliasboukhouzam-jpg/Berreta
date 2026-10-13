import * as THREE from 'three';
import { ExplodedModel } from '../three/exploded.js';
import { F } from '../three/materials.js';
import { MM, extrude, boxMM, cylX, latheX, group } from '../three/profile.js';

// Barrett M82A1 (.50 BMG anti-materiel / sniper rifle), field-strip level.
// Side profile in mm (butt at x = 0, muzzle +x), bore at y = 210. Overall ~1448 mm. Exterior likeness only.
const BORE = 210;

function between(a, b, r, material) {
  const A = new THREE.Vector3(...a).multiplyScalar(MM);
  const B = new THREE.Vector3(...b).multiplyScalar(MM);
  const len = A.distanceTo(B);
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(r * MM, r * MM, len, 16), material);
  mesh.position.copy(A).add(B).multiplyScalar(0.5);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), B.clone().sub(A).normalize());
  return mesh;
}

const roundedSlot = (x0, x1, y0, y1) => {
  const r = (y1 - y0) / 2;
  return [
    ['M', x0 + r, y0],
    ['L', x1 - r, y0],
    ['Q', x1, y0, x1, y0 + r],
    ['Q', x1, y1, x1 - r, y1],
    ['L', x0 + r, y1],
    ['Q', x0, y1, x0, y1 - r],
    ['Q', x0, y0, x0 + r, y0],
  ];
};

const chevron = (x0) => [
  ['M', x0, BORE - 48],
  ['L', x0 + 30, BORE - 48],
  ['L', x0 + 48, BORE],
  ['L', x0 + 30, BORE + 48],
  ['L', x0, BORE + 48],
  ['L', x0 + 18, BORE],
];

export function buildBarrett() {
  const m = new ExplodedModel('barrett', { scale: 0.19, center: [7.18, 1.15, 0] });
  const gray = () => F.barrettGray();

  // ---- Buttstock + recoil pad ---------------------------------------------
  m.add(
    'stock',
    group(
      extrude(
        [
          ['M', 10, 60],
          ['L', 10, 250],
          ['Q', 10, 262, 22, 262],
          ['L', 330, 250],
          ['L', 330, 150],
          ['L', 160, 122],
          ['C', 100, 108, 50, 80, 26, 62],
          ['Q', 18, 58, 10, 60],
        ],
        46,
        gray(),
        { bevel: 4 },
      ),
      boxMM(-12, 10, 58, 264, 50, F.rubber(), 0, 4),
    ),
    { explode: [-2.4, 0, 0], labelOffset: [0, 0.8, 0] },
  );

  // ---- Lower receiver with trigger guard ---------------------------------
  m.add(
    'lower',
    group(
      extrude(
        [
          ['M', 300, 182],
          ['L', 790, 182],
          ['L', 790, 152],
          ['L', 566, 152],
          ['L', 562, 128],
          ['Q', 560, 118, 550, 118],
          ['L', 492, 118],
          ['Q', 482, 118, 480, 128],
          ['L', 478, 152],
          ['L', 330, 152],
          ['Q', 300, 152, 300, 182],
        ],
        40,
        gray(),
        {
          bevel: 2,
          holes: [
            [
              ['M', 490, 146],
              ['L', 554, 146],
              ['L', 552, 130],
              ['Q', 550, 124, 544, 124],
              ['L', 498, 124],
              ['Q', 491, 124, 490, 132],
            ],
          ],
        },
      ),
      extrude(
        [
          ['M', 516, 150],
          ['C', 523, 142, 523, 134, 516, 128],
          ['L', 512, 130],
          ['C', 517, 135, 516, 142, 512, 150],
        ],
        8,
        F.parkerized(),
        { bevel: 1 },
      ),
    ),
    { explode: [0, 0, 0], labelOffset: [0, -0.6, 0] },
  );

  // ---- Pistol grip -------------------------------------------------------
  m.add(
    'grip',
    group(
      extrude(
        [
          ['M', 440, 152],
          ['L', 476, 152],
          ['C', 474, 120, 462, 80, 452, 40],
          ['Q', 448, 30, 436, 32],
          ['L', 420, 36],
          ['Q', 410, 40, 414, 52],
          ['L', 434, 140],
          ['Q', 436, 150, 440, 152],
        ],
        32,
        F.polymer(),
        { bevel: 3 },
      ),
    ),
    { explode: [-0.2, -2.0, 0], labelOffset: [0, -0.6, 0] },
  );

  // ---- 10-round box magazine ---------------------------------------------
  m.add('magazine', group(boxMM(600, 700, 54, 152, 40, gray(), 0, 3), boxMM(596, 704, 46, 56, 44, F.parkerized(), 0, 2)), {
    explode: [0.4, -2.4, 0],
    labelOffset: [0, -0.7, 0],
  });

  // ---- Upper receiver: long ventilated box, rail, carry handle -------------
  const ribs = [];
  for (let x = 362; x < 756; x += 16) ribs.push(boxMM(x, x + 8, 272, 277, 22, F.parkerized(), 0, 0.6));
  m.add(
    'upper',
    group(
      extrude(
        [
          ['M', 300, 182],
          ['L', 1150, 182],
          ['L', 1150, 246],
          ['L', 1124, 262],
          ['L', 340, 262],
          ['L', 300, 246],
        ],
        56,
        gray(),
        { bevel: 2.4, holes: [0, 1, 2, 3].map((i) => roundedSlot(720 + i * 100, 790 + i * 100, 198, 246)) },
      ),
      boxMM(360, 760, 262, 272, 22, F.parkerized(), 0, 1),
      ribs,
      extrude(
        [
          ['M', 840, 262],
          ['L', 850, 300],
          ['L', 960, 300],
          ['L', 970, 262],
        ],
        14,
        gray(),
        {
          bevel: 1.5,
          holes: [
            [
              ['M', 860, 266],
              ['L', 866, 288],
              ['L', 946, 288],
              ['L', 952, 266],
            ],
          ],
        },
      ),
    ),
    { explode: [0, 2.4, 0], labelOffset: [0, 1.0, 0] },
  );

  // ---- Barrel ------------------------------------------------------------
  m.add('barrel', group(cylX(380, 1340, 14, BORE, F.barrelDark())), { explode: [0.4, 1.3, 0], labelOffset: [0, 0.5, 0] });

  // ---- Dual-chamber muzzle brake -----------------------------------------
  m.add(
    'brake',
    group(
      cylX(1336, 1448, 18, BORE, F.parkerized()),
      extrude(chevron(1344), 84, F.parkerized(), { bevel: 2 }),
      extrude(chevron(1392), 84, F.parkerized(), { bevel: 2 }),
    ),
    { explode: [2.0, 1.3, 0], labelOffset: [0, 0.8, 0] },
  );

  // ---- Telescopic sight ---------------------------------------------------
  const turretUp = new THREE.Mesh(new THREE.CylinderGeometry(12 * MM, 12 * MM, 30 * MM, 24), F.blued());
  turretUp.position.set(5.8, (314 + 26) * MM, 0);
  const turretSide = new THREE.Mesh(new THREE.CylinderGeometry(11 * MM, 11 * MM, 26 * MM, 24), F.blued());
  turretSide.rotation.x = Math.PI / 2;
  turretSide.position.set(5.8, 314 * MM, 26 * MM);
  m.add(
    'scope',
    group(
      cylX(420, 700, 15, 314, F.blued()),
      latheX(
        [
          [15, 690],
          [24, 712],
          [24, 780],
          [0, 780],
        ],
        314,
        F.blued(),
      ),
      cylX(779, 782, 21, 314, F.glass()),
      latheX(
        [
          [0, 380],
          [20, 380],
          [20, 420],
          [15, 440],
        ],
        314,
        F.blued(),
      ),
      cylX(377, 380, 17, 314, F.glass()),
      turretUp,
      turretSide,
      boxMM(470, 486, 277, 310, 30, F.blued(), 0, 1.5),
      boxMM(650, 666, 277, 310, 30, F.blued(), 0, 1.5),
    ),
    { explode: [0, 4.6, 0], labelOffset: [0, 0.6, 0] },
  );

  // ---- Bipod --------------------------------------------------------------
  m.add(
    'bipod',
    group(
      boxMM(1050, 1090, 160, 182, 40, F.parkerized(), 0, 2),
      between([1070, 165, 18], [1150, -110, 80], 8, F.parkerized()),
      between([1070, 165, -18], [1150, -110, -80], 8, F.parkerized()),
      boxMM(1132, 1172, -122, -108, 30, F.rubber(), 80, 3),
      boxMM(1132, 1172, -122, -108, 30, F.rubber(), -80, 3),
    ),
    { explode: [0.3, -2.3, 0], labelOffset: [0, -0.6, 0] },
  );

  return m;
}
