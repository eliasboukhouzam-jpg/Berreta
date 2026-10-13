import * as THREE from 'three';
import { ExplodedModel } from '../three/exploded.js';
import { F } from '../three/materials.js';
import { box, cyl, group } from '../three/geom.js';

// Generic 7-inch FPV quadcopter as used for strike missions. Nose = +x. Exterior likeness only.
const CORNERS = [
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
];
const ARM_END = 0.67;

function blade(a) {
  const shape = new THREE.Shape();
  shape.moveTo(0.02, -0.022);
  shape.quadraticCurveTo(0.2, -0.05, 0.34, -0.012);
  shape.quadraticCurveTo(0.36, 0, 0.34, 0.014);
  shape.quadraticCurveTo(0.2, 0.03, 0.02, 0.022);
  const geo = new THREE.ExtrudeGeometry(shape, { depth: 0.006, bevelEnabled: false, curveSegments: 16 });
  geo.rotateX(-Math.PI / 2);
  const mesh = new THREE.Mesh(geo, F.prop());
  mesh.rotation.order = 'YXZ';
  mesh.rotation.set(0, -a, 0.18);
  return mesh;
}

export function buildFpv() {
  const m = new ExplodedModel('fpv', { scale: 1.15, center: [0, 0.12, 0] });
  const carbon = F.carbon();

  const arms = CORNERS.map(([sx, sz]) => box(1.0, 0.04, 0.11, carbon, [sx * 0.34, 0, sz * 0.34], [0, -Math.atan2(sz, sx), 0]));
  const standoffs = CORNERS.map(([sx, sz]) => cyl(0.016, 0.016, 0.24, F.anodizedGray(), [sx * 0.2, 0.13, sz * 0.1]));
  m.add('frame', group(box(0.62, 0.035, 0.3, carbon, [0, 0, 0]), arms, box(0.5, 0.025, 0.26, F.carbon(), [0, 0.26, 0]), standoffs), {
    explode: [0, -0.15, 0],
    labelOffset: [0.55, -0.05, 0.55],
  });

  const motor = (sx, sz) => {
    const g = group(
      cyl(0.1, 0.1, 0.03, F.barrelDark(), [0, 0.015, 0]),
      cyl(0.092, 0.092, 0.05, F.copper(), [0, 0.055, 0]),
      cyl(0.108, 0.104, 0.07, F.blued(), [0, 0.11, 0]),
      cyl(0.012, 0.012, 0.06, F.spring(), [0, 0.17, 0], [0, 0, 0], 12),
    );
    g.position.set(sx * ARM_END, 0.02, sz * ARM_END);
    return g;
  };
  m.add('motors', group(CORNERS.map(([sx, sz]) => motor(sx, sz))), { explode: [0, 0.26, 0], spread: 0.24, labelOffset: [0.85, 0.12, 0.85] });

  const prop = (sx, sz) => {
    const g = group([0, 1, 2].map((i) => blade((i * Math.PI * 2) / 3)), cyl(0.03, 0.03, 0.03, F.polymerSmooth(), [0, 0, 0], [0, 0, 0], 16));
    g.position.set(sx * ARM_END, 0.22, sz * ARM_END);
    return g;
  };
  m.add('props', group(CORNERS.map(([sx, sz]) => prop(sx, sz))), { explode: [0, 0.62, 0], spread: 0.3, labelOffset: [-0.9, 0.12, -0.9] });

  m.add(
    'battery',
    group(
      box(0.56, 0.2, 0.26, F.wrap(), [-0.02, 0.38, 0]),
      box(0.565, 0.05, 0.262, F.label(), [-0.02, 0.38, 0]),
      box(0.06, 0.225, 0.272, F.rubber(), [0.1, 0.38, 0]),
    ),
    { explode: [0, 0.92, 0], labelOffset: [0, 0.22, 0] },
  );

  const chips = [
    box(0.08, 0.02, 0.08, F.chip(), [0.02, 0.165, 0.03]),
    box(0.05, 0.02, 0.05, F.chip(), [-0.08, 0.165, -0.06]),
    box(0.04, 0.02, 0.07, F.chip(), [0.09, 0.095, -0.08]),
  ];
  m.add('stack', group(box(0.3, 0.012, 0.3, F.pcb(), [0, 0.08, 0]), box(0.3, 0.012, 0.3, F.pcb(), [0, 0.15, 0]), chips), {
    explode: [-0.1, 0.32, 0.85],
    labelOffset: [0, 0.16, 0.1],
  });

  m.add(
    'camera',
    group(box(0.12, 0.12, 0.12, F.polymerSmooth(), [0.38, 0.14, 0]), cyl(0.042, 0.042, 0.07, F.glass(), [0.47, 0.14, 0], [0, 0, Math.PI / 2], 24)),
    { explode: [0.78, 0.22, 0], labelOffset: [0.05, 0.15, 0] },
  );

  m.add(
    'vtx',
    group(
      box(0.12, 0.012, 0.1, F.pcb(), [-0.31, 0.2, 0]),
      cyl(0.008, 0.008, 0.26, F.polymerSmooth(), [-0.42, 0.3, 0], [0, 0, 0.7], 8),
      cyl(0.03, 0.03, 0.05, F.polymerSmooth(), [-0.51, 0.4, 0], [0, 0, 0.7], 16),
    ),
    { explode: [-0.78, 0.38, 0], labelOffset: [-0.05, 0.2, 0] },
  );

  m.add(
    'payload',
    group(
      cyl(0.07, 0.07, 0.5, F.olive(), [0.08, -0.13, 0], [0, 0, Math.PI / 2]),
      cyl(0.0, 0.07, 0.18, F.olive(), [0.42, -0.13, 0], [0, 0, -Math.PI / 2]),
      cyl(0.072, 0.072, 0.03, F.brass(), [0.2, -0.13, 0], [0, 0, Math.PI / 2]),
      cyl(0.05, 0.05, 0.08, F.barrelDark(), [-0.21, -0.13, 0], [0, 0, Math.PI / 2]),
    ),
    { explode: [0.15, -0.72, 0], labelOffset: [0, -0.16, 0] },
  );

  return m;
}
