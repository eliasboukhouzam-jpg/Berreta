import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';

const damp = (a, b, lambda, dt) => a + (b - a) * (1 - Math.exp(-lambda * dt));

export const DEFAULT_STATE = { explode: 0, rotY: 0.6, rotX: 0.3, zoom: 1, focus: null, show: [], labels: false, spin: false };

/**
 * One fixed WebGL canvas for the whole site. Scroll code sets the active model
 * and a target state; the stage eases toward it every frame.
 */
export class Stage {
  constructor({ canvas, labelLayer, reducedMotion = false }) {
    this.reduced = reducedMotion;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    this.scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(this.renderer);
    this.scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    this.scene.environmentIntensity = 0.75;

    this.camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
    this.camera.position.set(0, 0, 9);

    const key = new THREE.DirectionalLight(0xfff1e0, 2.4);
    key.position.set(4, 6, 5);
    const rim = new THREE.DirectionalLight(0xc8743a, 3.2);
    rim.position.set(-6, 2.5, -5);
    const fill = new THREE.DirectionalLight(0x9fb4c8, 0.6);
    fill.position.set(-4, -3, 4);
    this.scene.add(key, rim, fill, new THREE.HemisphereLight(0xece6dc, 0x0b0b0c, 0.3));

    this.labels = new CSS2DRenderer({ element: labelLayer });
    this.models = new Map();
    this.active = null;
    this.target = { ...DEFAULT_STATE };
    this.cur = { explode: 0, rotY: 0.6, rotX: 0.3, zoom: 1, dim: 0, labels: 0 };
    this.pointer = { x: 0, y: 0, sx: 0, sy: 0 };
    this.layout = { x: 0, y: 0, scale: 1, mobile: false };

    window.addEventListener('pointermove', (e) => {
      this.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    });
    window.addEventListener('resize', () => this.resize());
    this.resize();

    this.clock = new THREE.Clock();
    this.renderer.setAnimationLoop(() => this.frame());
  }

  register(model, partsInfo = {}) {
    const pivot = new THREE.Group();
    pivot.add(model.root);
    pivot.visible = false;
    this.scene.add(pivot);
    model.pivot = pivot;

    for (const part of model.parts.values()) {
      const info = partsInfo[part.id];
      if (!info) continue;
      const el = document.createElement('div');
      el.className = 'part-label';
      el.innerHTML = `<span class="pl-inner"><b>${info.name}</b><small>${info.mat}</small></span>`;
      const obj = new CSS2DObject(el);
      obj.position.copy(part.anchor);
      part.holder.add(obj);
      part.label = { obj, el: el.firstElementChild };
      part.label.el.style.opacity = '0';
    }
    this.models.set(model.id, model);
  }

  setActive(id) {
    this.active = id;
  }

  setTarget(state) {
    this.target = { ...DEFAULT_STATE, ...state };
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
      ? { x: 0, y: halfH * 0.3, scale: Math.min(1, (halfW * 2) / 4.4), mobile }
      : { x: halfW * 0.3, y: 0, scale: Math.min(1, halfW / 3.6), mobile };
  }

  frame() {
    const dt = Math.min(this.clock.getDelta(), 0.05);
    const t = this.clock.elapsedTime;
    const T = this.target;
    const C = this.cur;
    const L = this.reduced ? 40 : 4.5;

    C.explode = damp(C.explode, T.explode, L, dt);
    C.rotY = damp(C.rotY, T.rotY, L * 0.8, dt);
    C.rotX = damp(C.rotX, T.rotX, L * 0.8, dt);
    C.zoom = damp(C.zoom, T.zoom, L, dt);
    C.dim = damp(C.dim, T.focus ? 1 : 0, 6, dt);
    C.labels = damp(C.labels, T.labels ? 1 : 0, 6, dt);
    this.pointer.sx = damp(this.pointer.sx, this.reduced ? 0 : this.pointer.x, 3, dt);
    this.pointer.sy = damp(this.pointer.sy, this.reduced ? 0 : this.pointer.y, 3, dt);

    let anyVisible = false;
    for (const [id, m] of this.models) {
      const want = id === this.active ? 1 : 0;
      m.presence = damp(m.presence, want, 4, dt);
      if (want === 0 && m.presence < 0.005) {
        m.presence = 0;
        m.pivot.visible = false;
        continue;
      }
      m.pivot.visible = true;
      anyVisible = true;

      const sway = this.reduced ? 0 : Math.sin(t * 0.5) * 0.04;
      const spin = T.spin && !this.reduced ? t * 0.2 : 0;
      m.pivot.rotation.set(C.rotX + this.pointer.sy * 0.08, C.rotY + spin + sway + this.pointer.sx * 0.2, 0);
      m.pivot.scale.setScalar(m.baseScale * C.zoom * this.layout.scale * (0.88 + 0.12 * m.presence));
      m.pivot.position.set(this.layout.x, this.layout.y + (1 - m.presence) * -0.25, 0);
      m.apply({
        explode: C.explode,
        focus: T.focus,
        dim: C.dim,
        show: T.show,
        labels: C.labels,
        presence: m.presence,
        dt,
        mobile: this.layout.mobile,
      });
    }

    if (anyVisible || this.wasVisible) {
      this.renderer.render(this.scene, this.camera);
      this.labels.render(this.scene, this.camera);
    }
    this.wasVisible = anyVisible;
  }
}
