import * as THREE from 'three';
import gsap from 'gsap';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { Globe } from './globe.js';

const damp = (a, b, lambda, dt) => a + (b - a) * (1 - Math.exp(-lambda * dt));

export const DEFAULT_STATE = {
  explode: 0,
  rotY: 0.5,
  rotX: 0.18,
  zoom: 1,
  focus: null,
  labels: false,
  gun: 1,
  globe: 0,
  hero: false,
};

/**
 * One fixed WebGL canvas for the whole site: the selected weapon and the globe.
 * Scroll code sets a target state; the stage eases toward it every frame.
 */
export class Stage {
  constructor({ canvas, labelLayer, reducedMotion = false }) {
    this.reduced = reducedMotion;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    this.scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(this.renderer);
    this.scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    this.scene.environmentIntensity = 0.85;

    this.camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);
    this.camera.position.set(0, 0, 9);

    this.key = new THREE.DirectionalLight(0xffffff, 2.6);
    this.key.position.set(3, 5, 6);
    this.rim = new THREE.DirectionalLight(0xff7a3d, 4);
    this.rim.position.set(-5, 3, -5);
    const fill = new THREE.DirectionalLight(0xbfd2e6, 0.7);
    fill.position.set(-4, -3, 4);
    this.scene.add(this.key, this.rim, fill, new THREE.HemisphereLight(0xffffff, 0x101010, 0.35));

    this.labelLayer = labelLayer;
    this.labels = new CSS2DRenderer({ element: labelLayer });
    this.models = new Map();
    this.active = null;
    this.target = { ...DEFAULT_STATE };
    this.cur = { explode: 0, rotY: 0.5, rotX: 0.18, zoom: 1, dim: 0, labels: 0, gun: 1 };
    this.pointer = { x: 0, y: 0, sx: 0, sy: 0 };
    this.layout = { x: 0, y: 0, scale: 1, mobile: false };

    this.globe = new Globe(labelLayer);
    this.globe.pixelRatio = this.renderer.getPixelRatio();
    this.globe.camera = this.camera;
    this.scene.add(this.globe.group);

    window.addEventListener('pointermove', (e) => {
      this.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    });
    window.addEventListener('resize', () => this.resize());
    this.resize();

    this.vel = new THREE.Vector2(); // drag inertia in rad/s (x: tilt, y: turn)
    this.dragging = false;
    this.held = false; // a drag holds the pose (no idle sway or pointer parallax) until the next step
    this.bindDrag();

    this.timer = new THREE.Timer();
    this.timer.connect(document);
    this.renderer.setAnimationLoop((time) => this.frame(time));
  }

  /** The active weapon's bounding rectangle on screen in CSS pixels, or null while it is hidden. */
  gunRect() {
    const m = this.models.get(this.active);
    if (!m || this.cur.gun < 0.5 || this.globe.presence > 0.5) return null;
    const box = new THREE.Box3().setFromObject(m.pivot);
    const r = { x0: Infinity, y0: Infinity, x1: -Infinity, y1: -Infinity };
    const v = new THREE.Vector3();
    for (let i = 0; i < 8; i++) {
      v.set(i & 1 ? box.max.x : box.min.x, i & 2 ? box.max.y : box.min.y, i & 4 ? box.max.z : box.min.z).project(this.camera);
      const x = ((v.x + 1) / 2) * window.innerWidth;
      const y = ((1 - v.y) / 2) * window.innerHeight;
      r.x0 = Math.min(r.x0, x);
      r.x1 = Math.max(r.x1, x);
      r.y0 = Math.min(r.y0, y);
      r.y1 = Math.max(r.y1, y);
    }
    return r;
  }

  /**
   * Drag the weapon to turn it. Mouse drags turn and tilt; touch drags only turn it sideways,
   * so vertical swipes still scroll. The pose holds until the next scroll step.
   */
  bindDrag() {
    const root = document.documentElement;
    const skip = '.card, button, a, .picker, .topbar, .footer';
    let drag = null;
    const over = (e) => {
      if (e.target.closest?.(skip)) return false;
      const r = this.gunRect();
      const pad = 16;
      return Boolean(r) && e.clientX > r.x0 - pad && e.clientX < r.x1 + pad && e.clientY > r.y0 - pad && e.clientY < r.y1 + pad;
    };
    window.addEventListener('pointerdown', (e) => {
      if (e.button !== 0 || !over(e)) return;
      if (e.pointerType === 'mouse') e.preventDefault();
      drag = { id: e.pointerId, x: e.clientX, y: e.clientY, t: performance.now(), k: 3.4 / window.innerWidth, touch: e.pointerType !== 'mouse' };
      this.dragging = true;
      this.held = true;
      this.vel.set(0, 0);
      root.classList.add('is-turning');
    });
    window.addEventListener('pointermove', (e) => {
      if (!drag) {
        if (e.pointerType === 'mouse') root.classList.toggle('is-turnable', over(e));
        return;
      }
      if (e.pointerId !== drag.id) return;
      const now = performance.now();
      const dt = Math.max(8, now - drag.t) / 1000;
      const turn = (e.clientX - drag.x) * drag.k * Math.PI;
      const tilt = drag.touch ? 0 : (e.clientY - drag.y) * drag.k * Math.PI;
      this.target.rotY += turn;
      this.target.rotX = THREE.MathUtils.clamp(this.target.rotX + tilt, -1.2, 1.2);
      this.vel.lerp(new THREE.Vector2(tilt / dt, turn / dt), 0.5);
      Object.assign(drag, { x: e.clientX, y: e.clientY, t: now });
    });
    const end = (e) => {
      if (!drag || e.pointerId !== drag.id) return;
      if (performance.now() - drag.t > 80) this.vel.set(0, 0); // held still before letting go: no fling
      drag = null;
      this.dragging = false;
      root.classList.remove('is-turning');
    };
    window.addEventListener('pointerup', end);
    window.addEventListener('pointercancel', end);
  }

  register(model, parts = []) {
    const pivot = new THREE.Group();
    const bob = new THREE.Group();
    pivot.add(bob);
    bob.add(model.root);
    pivot.visible = false;
    this.scene.add(pivot);
    model.pivot = pivot;
    model.bob = bob;
    for (const part of model.parts.values()) {
      const info = parts.find((p) => p.id === part.id);
      if (!info) continue;
      const el = document.createElement('div');
      el.className = 'part-label';
      el.innerHTML = `<span class="pl-inner"><b>${info.name}</b></span>`;
      const obj = new CSS2DObject(el);
      obj.position.copy(part.anchor);
      part.holder.add(obj);
      part.label = { obj, el: el.firstElementChild };
      part.label.el.style.opacity = '0';
    }
    this.models.set(model.id, model);
  }

  /** Swap weapons with a molten dissolve: out, then in. */
  switchTo(id, world, { instant = false } = {}) {
    const next = this.models.get(id);
    const prev = this.models.get(this.active);
    this.resetPose();
    this.rim.color.set(world.glow);
    this.globe.setPalette(world.accent, world.ink, world.bg);
    for (const m of this.models.values()) m.setEdgeColor(world.glow);
    if (instant || !prev || prev === next) {
      this.active = id;
      next.dissolve.uDissolve.value = 0;
      return Promise.resolve();
    }
    gsap.killTweensOf([prev.dissolve.uDissolve, next.dissolve.uDissolve]);
    return new Promise((resolve) => {
      gsap.to(prev.dissolve.uDissolve, {
        value: 1,
        duration: this.reduced ? 0.01 : 0.55,
        ease: 'power2.in',
        onComplete: () => {
          this.active = id;
          next.dissolve.uDissolve.value = 1;
          this.spinKick = this.reduced ? 0 : 1.2;
          gsap.to(next.dissolve.uDissolve, { value: 0, duration: this.reduced ? 0.01 : 0.9, ease: 'power2.out', onComplete: resolve });
        },
      });
    });
  }

  setTarget(state) {
    this.pose = { ...DEFAULT_STATE, ...state };
    this.target = { ...this.pose };
    this.vel.set(0, 0);
    this.held = this.dragging;
  }

  /** Drop any drag and return to the current step's own pose. */
  resetPose() {
    if (!this.pose) return;
    this.target.rotY = this.pose.rotY;
    this.target.rotX = this.pose.rotX;
    this.vel.set(0, 0);
    this.held = false;
  }

  resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.renderer.setSize(w, h, false);
    this.labels.setSize(w, h);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    const halfH = this.camera.position.z * Math.tan(THREE.MathUtils.degToRad(this.camera.fov / 2));
    const halfW = halfH * this.camera.aspect;
    const mobile = w < 820 || this.camera.aspect < 0.9;
    this.layout = mobile
      ? { x: 0, y: halfH * 0.32, scale: Math.min(1, (halfW * 2) / 3.4), mobile, heroX: 0, heroY: halfH * 0.34, halfW, halfH }
      : { x: halfW * 0.3, y: -0.05, scale: Math.min(1.1, halfW / 3.4), mobile, heroX: halfW * 0.22, heroY: 0.3, halfW, halfH };
  }

  frame(time) {
    this.timer.update(time);
    const dt = Math.min(this.timer.getDelta(), 0.05);
    const t = this.timer.getElapsed();
    const T = this.target;
    const C = this.cur;
    const L = this.reduced ? 40 : 4;

    if (!this.dragging && this.vel.lengthSq() > 1e-6) {
      T.rotY += this.vel.y * dt;
      T.rotX = THREE.MathUtils.clamp(T.rotX + this.vel.x * dt, -1.2, 1.2);
      this.vel.multiplyScalar(Math.exp(-3.5 * dt));
    }
    // follows a drag tightly, eases slowly toward a scroll step's pose
    const follow = this.dragging ? 18 : L * 0.8;
    C.explode = damp(C.explode, T.explode, L, dt);
    C.rotY = damp(C.rotY, T.rotY, follow, dt);
    C.rotX = damp(C.rotX, T.rotX, follow, dt);
    C.free = damp(C.free ?? 1, this.held ? 0 : 1, 4, dt);
    C.zoom = damp(C.zoom, T.zoom, L, dt);
    C.dim = damp(C.dim, T.focus ? 1 : 0, 6, dt);
    C.labels = damp(C.labels, T.labels ? 1 : 0, 6, dt);
    C.gun = damp(C.gun, T.gun, T.gun ? 3 : 5, dt);
    C.hero = damp(C.hero ?? 1, T.hero ? 1 : 0, 3, dt);
    this.spinKick = damp(this.spinKick || 0, 0, 2.2, dt);
    this.pointer.sx = damp(this.pointer.sx, this.reduced ? 0 : this.pointer.x, 3, dt);
    this.pointer.sy = damp(this.pointer.sy, this.reduced ? 0 : this.pointer.y, 3, dt);

    const L2 = this.layout;
    for (const [id, m] of this.models) {
      const on = id === this.active && C.gun > 0.01;
      m.pivot.visible = on;
      if (!on) continue;
      const sway = this.reduced ? 0 : Math.sin(t * 0.45) * 0.22 * C.hero * C.free;
      m.pivot.rotation.set(C.rotX + this.pointer.sy * 0.06 * C.free, C.rotY + sway + this.spinKick + this.pointer.sx * 0.18 * C.free, 0);
      const s = m.baseScale * C.zoom * L2.scale * (0.7 + 0.3 * C.gun);
      m.pivot.scale.setScalar(s);
      m.pivot.position.set(
        THREE.MathUtils.lerp(L2.x, L2.heroX, C.hero),
        THREE.MathUtils.lerp(L2.y, L2.heroY, C.hero) + (1 - C.gun) * 0.6,
        0,
      );
      m.bob.position.y = this.reduced ? 0 : Math.sin(t * 1.1) * 0.03 * C.hero;
      m.apply({ explode: C.explode, focus: T.focus, dim: C.dim, labels: C.labels * C.gun, dt, mobile: L2.mobile });
      m.root.traverse((o) => {
        if (!o.isMesh) return;
        o.material.opacity *= C.gun;
        o.material.depthWrite = o.material.opacity > 0.9;
      });
    }

    this.globe.update(dt, T.globe, L2);

    this.renderer.render(this.scene, this.camera);
    this.labels.render(this.scene, this.camera);
  }
}
