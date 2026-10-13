import * as THREE from 'three';

// Weapons are drawn in millimetres from side profiles (x = muzzle direction,
// y = up, z = width) and scaled to scene units (1 unit = 100 mm).
// Visual-grade only: external silhouettes, no internal mechanisms, no tolerances.
export const MM = 0.01;

/** Path from commands: ['M',x,y] ['L',x,y] ['Q',cx,cy,x,y] ['C',c1x,c1y,c2x,c2y,x,y]. Closed automatically. */
function draw(target, cmds) {
  for (const [op, ...a] of cmds) {
    if (op === 'M') target.moveTo(a[0], a[1]);
    else if (op === 'L') target.lineTo(a[0], a[1]);
    else if (op === 'Q') target.quadraticCurveTo(a[0], a[1], a[2], a[3]);
    else if (op === 'C') target.bezierCurveTo(a[0], a[1], a[2], a[3], a[4], a[5]);
  }
  return target;
}

export function shape(cmds, holes = []) {
  const s = draw(new THREE.Shape(), cmds);
  holes.forEach((h) => s.holes.push(draw(new THREE.Path(), h)));
  return s;
}

/** Extrude a side profile to a given width (mm), centred on z (mm). */
export function extrude(cmds, width, material, { holes = [], z = 0, bevel = 1.2, segments = 3, curve = 28 } = {}) {
  const b = Math.min(bevel, width / 2 - 0.1);
  const geo = new THREE.ExtrudeGeometry(shape(cmds, holes), {
    depth: Math.max(0.1, width - 2 * b),
    bevelEnabled: b > 0,
    bevelThickness: b,
    bevelSize: b,
    bevelSegments: segments,
    curveSegments: curve,
  });
  geo.translate(0, 0, -(width - 2 * b) / 2 + z);
  geo.scale(MM, MM, MM);
  geo.computeVertexNormals();
  return new THREE.Mesh(geo, material);
}

/** Box from mm extents: x0..x1, y0..y1, width w centred on z. */
export function boxMM(x0, x1, y0, y1, w, material, z = 0, round = 0.6) {
  return extrude(
    [
      ['M', x0, y0],
      ['L', x1, y0],
      ['L', x1, y1],
      ['L', x0, y1],
    ],
    w,
    material,
    { z, bevel: round, segments: 2, curve: 4 },
  );
}

/** Cylinder along X from x0 to x1 (mm), radius r, centred at (y, z). */
export function cylX(x0, x1, r, y, material, z = 0, seg = 40) {
  const g = new THREE.CylinderGeometry(r * MM, r * MM, (x1 - x0) * MM, seg);
  g.rotateZ(-Math.PI / 2);
  const m = new THREE.Mesh(g, material);
  m.position.set(((x0 + x1) / 2) * MM, y * MM, z * MM);
  return m;
}

/** Lathe along X: profile [[radius, x], ...] in mm, axis at (y, z). */
export function latheX(profile, y, material, z = 0, seg = 48) {
  const pts = profile.map(([r, x]) => new THREE.Vector2(Math.max(0, r) * MM, x * MM));
  const g = new THREE.LatheGeometry(pts, seg);
  g.rotateZ(-Math.PI / 2);
  const m = new THREE.Mesh(g, material);
  m.position.set(0, y * MM, z * MM);
  return m;
}

/** Coil spring along X (visual), from x0 to x1, coil radius r, wire radius w. */
export function springX(x0, x1, r, w, turns, y, material, z = 0) {
  class Helix extends THREE.Curve {
    getPoint(t, target = new THREE.Vector3()) {
      const a = t * turns * Math.PI * 2;
      return target.set((x0 + (x1 - x0) * t) * MM, (y + r * Math.cos(a)) * MM, (z + r * Math.sin(a)) * MM);
    }
  }
  return new THREE.Mesh(new THREE.TubeGeometry(new Helix(), turns * 24, w * MM, 8, false), material);
}

/** Group helper. */
export function group(...children) {
  const g = new THREE.Group();
  children.flat().filter(Boolean).forEach((c) => g.add(c));
  return g;
}

/** Repeated grooves (e.g. slide serrations) as thin raised ribs on both faces. */
export function serrations(x0, x1, count, y0, y1, halfWidth, material, depth = 0.5, rib = 1.1) {
  const ribs = [];
  const step = (x1 - x0) / (count - 1);
  for (let i = 0; i < count; i++) {
    const x = x0 + i * step;
    for (const s of [1, -1]) ribs.push(boxMM(x - rib / 2, x + rib / 2, y0, y1, depth, material, s * (halfWidth + depth / 2 - 0.1), 0.2));
  }
  return ribs;
}
