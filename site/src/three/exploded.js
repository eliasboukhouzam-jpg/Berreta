import * as THREE from 'three';

const COPPER = new THREE.Color(0xc8743a);
const BLACK = new THREE.Color(0x000000);
const damp = (a, b, lambda, dt) => a + (b - a) * (1 - Math.exp(-lambda * dt));
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/**
 * A model made of named parts. Each part sits at its assembled position and
 * travels along its own `explode` vector as the scroll pulls the model apart.
 */
export class ExplodedModel {
  constructor(id, { scale = 1, offset = [0, 0, 0] } = {}) {
    this.id = id;
    this.baseScale = scale;
    this.root = new THREE.Group();
    this.root.position.set(...offset);
    this.parts = new Map();
    this.presence = 0;
  }

  add(id, object, { explode = [0, 0, 0], spread = 0, optional = false, labelOffset = [0, 0.18, 0] } = {}) {
    const holder = new THREE.Group();
    holder.add(object);
    this.root.add(holder);

    object.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(object);
    const anchor = box.getCenter(new THREE.Vector3()).add(new THREE.Vector3(...labelOffset));

    const meshes = [];
    object.traverse((o) => {
      if (o.isMesh) {
        o.material = o.material.clone();
        o.material.transparent = true;
        meshes.push(o);
      }
    });

    this.parts.set(id, {
      id,
      holder,
      object,
      explode: new THREE.Vector3(...explode),
      spread,
      kids: spread ? object.children.map((c) => ({ obj: c, base: c.position.clone() })) : [],
      meshes,
      optional,
      anchor,
      vis: optional ? 0 : 1,
      focus: 0,
      label: null,
    });
    return this;
  }

  apply({ explode, focus, dim, show = [], labels, presence, dt, mobile }) {
    const e = ease(THREE.MathUtils.clamp(explode, 0, 1));
    for (const p of this.parts.values()) {
      p.holder.position.copy(p.explode).multiplyScalar(e);
      for (const k of p.kids) k.obj.position.copy(k.base).multiplyScalar(1 + p.spread * e);

      const wantVis = p.optional ? (show.includes(p.id) ? 1 : 0) : 1;
      p.vis = damp(p.vis, wantVis, 5, dt);
      p.focus = damp(p.focus, focus === p.id ? 1 : 0, 6, dt);

      const opacity = presence * p.vis * (1 - 0.86 * dim * (1 - p.focus));
      for (const m of p.meshes) {
        m.material.opacity = opacity;
        m.material.depthWrite = opacity > 0.9;
        m.visible = opacity > 0.01;
        if (m.material.emissive) m.material.emissive.copy(BLACK).lerp(COPPER, 0.32 * p.focus);
      }

      if (p.label) {
        const labelVis = mobile ? p.focus : focus ? 0.25 + 0.75 * p.focus : 0.9;
        p.label.el.style.opacity = String(labels * presence * p.vis * labelVis);
        p.label.el.classList.toggle('is-focus', p.focus > 0.5);
      }
    }
  }
}
