import * as THREE from 'three';
import { ExplodedModel } from '../three/exploded.js';

// Hero object: a raw ore rock with copper veins. "Every weapon starts as a rock."
function hash(x, y, z) {
  const s = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453;
  return s - Math.floor(s);
}
function noise(x, y, z) {
  const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
  const xf = x - xi, yf = y - yi, zf = z - zi;
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf), w = zf * zf * (3 - 2 * zf);
  const l = (a, b, t) => a + (b - a) * t;
  const c = (i, j, k) => hash(xi + i, yi + j, zi + k);
  return l(
    l(l(c(0, 0, 0), c(1, 0, 0), u), l(c(0, 1, 0), c(1, 1, 0), u), v),
    l(l(c(0, 0, 1), c(1, 0, 1), u), l(c(0, 1, 1), c(1, 1, 1), u), v),
    w,
  );
}
const fbm = (x, y, z) => noise(x, y, z) * 0.6 + noise(x * 2.1, y * 2.1, z * 2.1) * 0.28 + noise(x * 4.3, y * 4.3, z * 4.3) * 0.12;

export function buildRock() {
  const m = new ExplodedModel('rock', { scale: 1.15 });
  const geo = new THREE.IcosahedronGeometry(1, 5);
  const pos = geo.attributes.position;
  const colors = new Float32Array(pos.count * 3);
  const v = new THREE.Vector3();
  const stone = new THREE.Color(0x2b2724);
  const stone2 = new THREE.Color(0x4a443d);
  const copper = new THREE.Color(0xc8743a);
  const c = new THREE.Color();

  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const n = fbm(v.x * 1.4 + 3, v.y * 1.4, v.z * 1.4);
    const r = 0.78 + n * 0.5 + (v.y < -0.4 ? -0.08 : 0);
    v.multiplyScalar(r);
    v.y *= 0.82;
    pos.setXYZ(i, v.x, v.y, v.z);
    const vein = Math.abs(Math.sin(fbm(v.x * 2.2, v.y * 2.2 + 7, v.z * 2.2) * 18 + v.y * 3));
    c.copy(stone).lerp(stone2, noise(v.x * 6, v.y * 6, v.z * 6));
    if (vein < 0.12) c.lerp(copper, 1 - vein / 0.12);
    colors.set([c.r, c.g, c.b], i * 3);
  }
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geo.computeVertexNormals();
  const mat = new THREE.MeshStandardMaterial({ vertexColors: true, flatShading: true, metalness: 0.55, roughness: 0.55 });
  m.add('rock', new THREE.Mesh(geo, mat));
  return m;
}
