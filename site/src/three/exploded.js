import * as THREE from 'three';
import { createDissolve, applyDissolve } from './dissolve.js';

const FOCUS = new THREE.Color(0xffffff);
const BLACK = new THREE.Color(0x000000);
const damp = (a, b, lambda, dt) => a + (b - a) * (1 - Math.exp(-lambda * dt));
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/**
 * A model made of named parts. Each part sits at its assembled position and
 * travels along its own explode vector (scene units, before model scale).
 * All materials share one dissolve uniform set for the weapon-switch effect.
 */
export class ExplodedModel {
  constructor(id, { scale = 1, center = [0, 0, 0], edge = 0xff7a2f } = {}) {
    this.id = id;
    this.baseScale = scale;
    this.root = new THREE.Group();
    this.root.position.set(-center[0], -center[1], -center[2]);
    this.parts = new Map();
    this.dissolve = createDissolve(edge);
  }

  add(id, object, { explode = [0, 0, 0], spread = 0, labelOffset = [0, 0.12, 0] } = {}) {
    const holder = new THREE.Group();
    holder.add(object);
    this.root.add(holder);
    object.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(object);
    const anchor = box.getCenter(new THREE.Vector3()).add(new THREE.Vector3(...labelOffset));

    const meshes = [];
    object.traverse((o) => {
      if (!o.isMesh) return;
      o.material = o.material.clone();
      o.material.transparent = true;
      applyDissolve(o.material, this.dissolve);
      meshes.push(o);
    });

    this.parts.set(id, {
      id,
      holder,
      explode: new THREE.Vector3(...explode),
      spread,
      kids: spread ? object.children.map((c) => ({ obj: c, base: c.position.clone() })) : [],
      meshes,
      anchor,
      focus: 0,
      label: null,
    });
    return this;
  }

  setEdgeColor(hex) {
    this.dissolve.uEdge.value.set(hex);
  }

  apply({ explode, focus, dim, labels, dt, mobile }) {
    const e = ease(THREE.MathUtils.clamp(explode, 0, 1));
    for (const p of this.parts.values()) {
      p.holder.position.copy(p.explode).multiplyScalar(e);
      for (const k of p.kids) k.obj.position.copy(k.base).multiplyScalar(1 + p.spread * e);
      p.focus = damp(p.focus, focus === p.id ? 1 : 0, 6, dt);
      const opacity = 1 - 0.82 * dim * (1 - p.focus);
      for (const m of p.meshes) {
        m.material.opacity = opacity;
        m.material.depthWrite = opacity > 0.9;
        if (m.material.emissive) m.material.emissive.copy(BLACK).lerp(FOCUS, 0.06 * p.focus);
      }
      if (p.label) {
        const vis = mobile ? p.focus : focus ? 0.2 + 0.8 * p.focus : 1;
        p.label.el.style.opacity = String(labels * vis);
        p.label.el.classList.toggle('is-focus', p.focus > 0.5);
      }
    }
  }
}
