import { ExplodedModel } from '../three/exploded.js';
import { M } from '../three/materials.js';
import { box, cyl, group } from '../three/geom.js';

// Generic 7-inch FPV strike quadcopter. Nose = +x. Simplified and non-specific.
const CORNERS = [
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
];
const ARM_END = 0.67;

export function buildFpv() {
  const m = new ExplodedModel('fpv', { scale: 1.05 });
  const carbon = M.carbon();

  // Frame: bottom plate, four arms, top plate, standoffs
  const arms = CORNERS.map(([sx, sz]) =>
    box(1.0, 0.04, 0.11, carbon, [sx * 0.34, 0, sz * 0.34], [0, -Math.atan2(sz, sx), 0]),
  );
  const standoffs = CORNERS.map(([sx, sz]) => cyl(0.016, 0.016, 0.24, M.aluminium(), [sx * 0.2, 0.13, sz * 0.1]));
  m.add('frame', group(box(0.62, 0.035, 0.3, carbon, [0, 0, 0]), arms, box(0.5, 0.025, 0.26, M.plate(), [0, 0.26, 0]), standoffs), {
    explode: [0, -0.15, 0],
    labelOffset: [0.55, -0.05, 0.55],
  });

  // Motors ×4 (spread outward from the centre)
  const motor = (sx, sz) => {
    const g = group(
      cyl(0.1, 0.1, 0.03, M.darkSteel(), [0, 0.015, 0]),
      cyl(0.092, 0.092, 0.05, M.copper(), [0, 0.055, 0]),
      cyl(0.108, 0.104, 0.07, M.darkSteel(), [0, 0.11, 0]),
      cyl(0.012, 0.012, 0.06, M.steel(), [0, 0.17, 0], [0, 0, 0], 12),
    );
    g.position.set(sx * ARM_END, 0.02, sz * ARM_END);
    return g;
  };
  m.add('motors', group(CORNERS.map(([sx, sz]) => motor(sx, sz))), {
    explode: [0, 0.26, 0],
    spread: 0.24,
    labelOffset: [0.85, 0.12, 0.85],
  });

  // Propellers ×4: three blades each
  const prop = (sx, sz) => {
    const blades = [0, 1, 2].map((i) => {
      const a = (i * Math.PI * 2) / 3;
      const b = box(0.34, 0.008, 0.06, M.prop(), [Math.cos(a) * 0.17, 0, Math.sin(a) * 0.17], [0.22, -a, 0]);
      return b;
    });
    const g = group(blades, cyl(0.03, 0.03, 0.03, M.plastic(), [0, 0, 0], [0, 0, 0], 16));
    g.position.set(sx * ARM_END, 0.22, sz * ARM_END);
    return g;
  };
  m.add('props', group(CORNERS.map(([sx, sz]) => prop(sx, sz))), {
    explode: [0, 0.62, 0],
    spread: 0.3,
    labelOffset: [-0.9, 0.12, -0.9],
  });

  // Battery on top
  m.add(
    'battery',
    group(
      box(0.56, 0.2, 0.26, M.wrap(), [-0.02, 0.38, 0]),
      box(0.565, 0.05, 0.262, M.label(), [-0.02, 0.38, 0]),
      box(0.06, 0.225, 0.272, M.rubber(), [0.1, 0.38, 0]),
    ),
    { explode: [0, 0.92, 0], labelOffset: [0, 0.22, 0] },
  );

  // Flight controller / ESC stack between the plates
  const chips = [
    box(0.08, 0.02, 0.08, M.chip(), [0.02, 0.165, 0.03]),
    box(0.05, 0.02, 0.05, M.chip(), [-0.08, 0.165, -0.06]),
    box(0.04, 0.02, 0.07, M.chip(), [0.09, 0.095, -0.08]),
  ];
  m.add('stack', group(box(0.3, 0.012, 0.3, M.pcb(), [0, 0.08, 0]), box(0.3, 0.012, 0.3, M.pcb(), [0, 0.15, 0]), chips), {
    explode: [-0.1, 0.32, 0.85],
    labelOffset: [0, 0.16, 0.1],
  });

  // Camera at the nose
  m.add(
    'camera',
    group(box(0.12, 0.12, 0.12, M.plastic(), [0.38, 0.14, 0]), cyl(0.042, 0.042, 0.07, M.glass(), [0.47, 0.14, 0], [0, 0, Math.PI / 2], 24)),
    { explode: [0.78, 0.22, 0], labelOffset: [0.05, 0.15, 0] },
  );

  // Radio / video transmitter + antenna at the rear
  m.add(
    'vtx',
    group(
      box(0.12, 0.012, 0.1, M.pcb(), [-0.31, 0.2, 0]),
      cyl(0.008, 0.008, 0.26, M.plastic(), [-0.42, 0.3, 0], [0, 0, 0.7], 8),
      cyl(0.03, 0.03, 0.05, M.plastic(), [-0.51, 0.4, 0], [0, 0, 0.7], 16),
    ),
    { explode: [-0.78, 0.38, 0], labelOffset: [-0.05, 0.2, 0] },
  );

  // Payload slung under the frame (generic shape)
  m.add(
    'payload',
    group(
      cyl(0.07, 0.07, 0.5, M.olive(), [0.08, -0.13, 0], [0, 0, Math.PI / 2]),
      cyl(0.0, 0.07, 0.18, M.olive(), [0.42, -0.13, 0], [0, 0, -Math.PI / 2]),
      cyl(0.072, 0.072, 0.03, M.yellow(), [0.2, -0.13, 0], [0, 0, Math.PI / 2]),
      cyl(0.05, 0.05, 0.08, M.darkSteel(), [-0.21, -0.13, 0], [0, 0, Math.PI / 2]),
    ),
    { explode: [0.15, -0.72, 0], labelOffset: [0, -0.16, 0] },
  );

  // Optional fibre-optic spool (shown from the 2024 step)
  m.add(
    'spool',
    group(
      cyl(0.1, 0.1, 0.17, M.fibre(), [-0.36, -0.12, 0], [0, 0, Math.PI / 2]),
      cyl(0.12, 0.12, 0.012, M.plastic(), [-0.27, -0.12, 0], [0, 0, Math.PI / 2]),
      cyl(0.12, 0.12, 0.012, M.plastic(), [-0.45, -0.12, 0], [0, 0, Math.PI / 2]),
    ),
    { explode: [-0.7, -0.55, 0], optional: true, labelOffset: [0, -0.18, 0] },
  );

  return m;
}
