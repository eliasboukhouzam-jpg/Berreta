import * as THREE from 'three';
import { ExplodedModel } from '../three/exploded.js';
import { M } from '../three/materials.js';
import { box, cyl, group, latheX, mesh, sample } from '../three/geom.js';

// Simplified Shahed-136 / Geran-2 style delta-wing loitering munition. Nose = +x.
// Fuselage radius as a function of position along the body.
const radius = (h) => {
  if (h >= 1.0) return 0.2 * Math.sqrt(Math.max(0, 1 - ((h - 1.0) / 0.6) ** 2));
  if (h >= -0.95) return 0.2;
  return 0.2 - 0.1 * ((-0.95 - h) / 0.45);
};
const segment = (from, to, mat, n = 18) => latheX([[0, from], ...sample(radius, from, to, n), [0, to]], mat);

export function buildShahed() {
  const m = new ExplodedModel('shahed', { scale: 0.95, offset: [0.05, 0, 0] });
  const skin = M.composite();

  // Delta wing planform (x forward, y = span), extruded thin then laid flat
  const shape = new THREE.Shape(
    [
      [0.85, 0],
      [-1.15, 1.25],
      [-1.38, 1.25],
      [-1.2, 0.22],
      [-1.2, -0.22],
      [-1.38, -1.25],
      [-1.15, -1.25],
    ].map(([x, y]) => new THREE.Vector2(x, y)),
  );
  const wingGeo = new THREE.ExtrudeGeometry(shape, { depth: 0.045, bevelEnabled: true, bevelThickness: 0.012, bevelSize: 0.012, bevelSegments: 2 });
  wingGeo.rotateX(-Math.PI / 2);
  const wing = mesh(wingGeo, skin, [0, -0.08, 0]);

  m.add('airframe', group(segment(-0.95, 0.55, skin), segment(-1.4, -0.95, skin), wing), {
    explode: [0, 0, 0],
    labelOffset: [-0.4, 0.05, 0.75],
  });

  m.add('warhead', group(segment(0.95, 1.6, M.compositeDark())), { explode: [1.05, 0, 0], labelOffset: [0.1, 0.28, 0] });

  m.add(
    'guidance',
    group(
      segment(0.55, 0.95, M.composite()),
      cyl(0.09, 0.09, 0.025, M.plastic(), [0.76, 0.205, 0]),
      box(0.18, 0.02, 0.12, M.pcb(), [0.74, 0.22, 0]),
    ),
    { explode: [0.45, 0.8, 0], labelOffset: [0, 0.25, 0] },
  );

  m.add('tank', group(cyl(0.16, 0.16, 0.9, M.aluminium(), [-0.05, 0, 0], [0, 0, Math.PI / 2])), {
    explode: [0, -0.9, 0],
    labelOffset: [0, -0.24, 0],
  });

  const fins = [1, -1].map((s) => {
    const f = box(0.32, 0.4, 0.025, M.compositeDark(), [-1.26, 0.06, s * 1.25], [0, 0, 0.28]);
    return f;
  });
  m.add('fins', group(fins), { explode: [0, 0.28, 0], spread: 0.25, labelOffset: [0, 0.32, -1.3] });

  m.add(
    'engine',
    group(
      box(0.26, 0.2, 0.2, M.darkSteel(), [-1.33, 0, 0]),
      ...[0.13, -0.13].map((y) => box(0.08, 0.1, 0.08, M.aluminium(), [-1.3, y, 0])),
      ...[0.13, -0.13].map((z) => box(0.08, 0.08, 0.1, M.aluminium(), [-1.3, 0, z])),
      cyl(0.02, 0.02, 0.2, M.steel(), [-1.5, 0, 0], [0, 0, Math.PI / 2], 12),
    ),
    { explode: [-0.8, 0.4, 0], labelOffset: [0, 0.22, 0] },
  );

  m.add(
    'prop',
    group(
      box(0.03, 0.66, 0.07, M.plastic(), [-1.6, 0, 0], [0.35, 0, 0]),
      cyl(0.0, 0.05, 0.08, M.plastic(), [-1.66, 0, 0], [0, 0, Math.PI / 2], 16),
    ),
    { explode: [-1.45, 0.2, 0], labelOffset: [0, 0.4, 0] },
  );

  return m;
}
