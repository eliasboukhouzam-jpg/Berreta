import * as THREE from 'three';

// Small helpers for building procedural models from primitives.

export function mesh(geometry, material, pos = [0, 0, 0], rot = [0, 0, 0]) {
  const m = new THREE.Mesh(geometry, material);
  m.position.set(...pos);
  m.rotation.set(...rot);
  return m;
}

export const box = (w, h, d, mat, pos, rot) => mesh(new THREE.BoxGeometry(w, h, d), mat, pos, rot);

export const cyl = (rTop, rBottom, h, mat, pos, rot, seg = 32) =>
  mesh(new THREE.CylinderGeometry(rTop, rBottom, h, seg), mat, pos, rot);

export function group(...children) {
  const g = new THREE.Group();
  children.flat().forEach((c) => g.add(c));
  return g;
}

/**
 * Lathe along the X axis. `profile` is [[radius, x], ...].
 * Optional cutaway: phiLength < 2π leaves the top-front quadrant open, and
 * `capMaterial` closes the two cut faces so the wall thickness is visible.
 */
export function latheX(profile, material, { phiLength = Math.PI * 2, capMaterial = null, segments = 64 } = {}) {
  const pts = profile.map(([r, h]) => new THREE.Vector2(Math.max(r, 0), h));
  const geo = new THREE.LatheGeometry(pts, segments, 0, phiLength);
  geo.rotateZ(-Math.PI / 2); // lathe axis Y → X
  const out = new THREE.Group();
  out.add(new THREE.Mesh(geo, material));

  if (capMaterial && phiLength < Math.PI * 2) {
    const shape = new THREE.Shape(pts.map((p) => new THREE.Vector2(p.x, p.y)));
    const base = new THREE.ShapeGeometry(shape);
    // cap at φ = 0 → plane facing +z: (r, h) → (h, 0, r)
    // cap at φ = 1.5π → plane facing +y: (r, h) → (h, r, 0)
    const remap = (fn) => {
      const g = base.clone();
      const p = g.attributes.position;
      for (let i = 0; i < p.count; i++) {
        const [x, y, z] = fn(p.getX(i), p.getY(i));
        p.setXYZ(i, x, y, z);
      }
      g.computeVertexNormals();
      return g;
    };
    out.add(new THREE.Mesh(remap((r, h) => [h, 0, r]), capMaterial));
    out.add(new THREE.Mesh(remap((r, h) => [h, r, 0]), capMaterial));
  }
  return out;
}

export const sample = (fn, from, to, n) =>
  Array.from({ length: n + 1 }, (_, i) => {
    const h = from + ((to - from) * i) / n;
    return [fn(h), h];
  });
