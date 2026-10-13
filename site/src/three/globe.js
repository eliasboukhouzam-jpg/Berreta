import * as THREE from 'three';
import { feature } from 'topojson-client';
import world from 'world-atlas/countries-110m.json';
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';

// Dotted globe: land is drawn as dots (Natural Earth borders via world-atlas), producing
// countries glow by share, mines rise as pillars, a journey draws arcs from stop to stop.
export const R = 1.5;
const damp = (a, b, l, dt) => a + (b - a) * (1 - Math.exp(-l * dt));
const wrap = (a) => Math.atan2(Math.sin(a), Math.cos(a));

export function latLon(lat, lon, r = R) {
  const phi = ((lon + 180) / 360) * Math.PI * 2;
  const theta = ((90 - lat) / 180) * Math.PI;
  return new THREE.Vector3(-r * Math.cos(phi) * Math.sin(theta), r * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta));
}

const countries = feature(world, world.objects.countries).features;

function idCanvas(W, H) {
  const c = document.createElement('canvas');
  c.width = W;
  c.height = H;
  const g = c.getContext('2d', { willReadFrequently: true });
  g.imageSmoothingEnabled = false;
  const ring = (coords) => {
    // unwrap longitudes so rings crossing the antimeridian stay continuous
    let prev = coords[0][0];
    let off = 0;
    const pts = coords.map(([lon, lat]) => {
      if (lon - prev > 180) off -= 360;
      else if (prev - lon > 180) off += 360;
      prev = lon;
      return [((lon + off + 180) / 360) * W, ((90 - lat) / 180) * H];
    });
    for (const shift of [-W, 0, W]) {
      g.beginPath();
      pts.forEach(([x, y], i) => (i ? g.lineTo(x + shift, y) : g.moveTo(x + shift, y)));
      g.closePath();
      g.fill();
    }
  };
  countries.forEach((f, i) => {
    const id = i + 1;
    g.fillStyle = `rgb(${id & 255},${(id >> 8) & 255},0)`;
    const geom = f.geometry;
    if (!geom) return;
    const polys = geom.type === 'Polygon' ? [geom.coordinates] : geom.coordinates;
    polys.forEach((poly) => ring(poly[0]));
  });
  return g.getImageData(0, 0, W, H).data;
}

const DOT_VS = /* glsl */ `
  attribute vec3 aColor; attribute float aSize;
  uniform float uScale; uniform float uOpacity;
  varying vec3 vColor; varying float vA;
  void main() {
    vColor = aColor;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * uScale / -mv.z;
    vA = uOpacity;
    gl_Position = projectionMatrix * mv;
  }`;
const DOT_FS = /* glsl */ `
  varying vec3 vColor; varying float vA;
  void main() {
    vec2 c = gl_PointCoord - 0.5; float d = length(c);
    if (d > 0.5) discard;
    gl_FragColor = vec4(vColor, smoothstep(0.5, 0.15, d) * vA);
  }`;

export class Globe {
  constructor(labelHost) {
    this.group = new THREE.Group();
    this.spin = new THREE.Group();
    this.spin.rotation.order = 'XYZ';
    this.group.add(this.spin);
    this.labelHost = labelHost;
    this.presence = 0;
    this.accent = new THREE.Color('#ff7a3d');
    this.ink = new THREE.Color('#f2ead8');
    this.target = { x: 0.35, y: 0, zoom: 1 };
    this.vel = new THREE.Vector2(); // drag inertia in rad/s (x: tilt, y: spin)
    this.dragging = false;
    this.journey = { stops: [], index: -1, arcs: [], progress: [] };
    this.buildBase();
    this.buildDots();
    this.markers = new THREE.Group();
    this.arcGroup = new THREE.Group();
    this.spin.add(this.markers, this.arcGroup);
    this.materials = [];
  }

  buildBase() {
    this.baseMat = new THREE.MeshBasicMaterial({ color: 0x050506, transparent: true, opacity: 0 });
    const base = new THREE.Mesh(new THREE.SphereGeometry(R * 0.992, 64, 48), this.baseMat);
    // Fixed draw order: base, then dots, then markers. Depth sorting alone fails because the dot
    // cloud's bounding centre sits in the north, so a south-facing globe drew the base over the dots.
    base.renderOrder = -2;
    this.spin.add(base);
    this.atmoMat = new THREE.ShaderMaterial({
      uniforms: { uColor: { value: this.accent.clone() }, uOpacity: { value: 0 } },
      vertexShader: `varying vec3 vN; varying vec3 vV; void main(){ vN = normalize(normalMatrix * normal); vec4 mv = modelViewMatrix * vec4(position,1.0); vV = normalize(-mv.xyz); gl_Position = projectionMatrix * mv; }`,
      fragmentShader: `uniform vec3 uColor; uniform float uOpacity; varying vec3 vN; varying vec3 vV; void main(){ float d = abs(dot(vN, vV)); float f = pow(clamp(1.0 - d, 0.0, 1.0), 5.0); gl_FragColor = vec4(uColor, f * 0.55 * uOpacity); }`,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      depthWrite: false,
    });
    const atmo = new THREE.Mesh(new THREE.SphereGeometry(R * 1.06, 64, 48), this.atmoMat);
    this.group.add(atmo);
  }

  buildDots() {
    const W = 1440;
    const H = 720;
    const data = idCanvas(W, H);
    const pos = [];
    const owner = [];
    const STEP = 0.9;
    for (let lat = -58; lat <= 84; lat += STEP) {
      const n = Math.max(1, Math.floor((360 * Math.cos((lat * Math.PI) / 180)) / STEP));
      for (let k = 0; k < n; k++) {
        const lon = -180 + ((k + 0.5) * 360) / n;
        const px = Math.min(W - 1, Math.floor(((lon + 180) / 360) * W));
        const py = Math.min(H - 1, Math.floor(((90 - lat) / 180) * H));
        const o = (py * W + px) * 4;
        const id = data[o] + data[o + 1] * 256;
        if (!id || id > countries.length) continue;
        const v = latLon(lat, lon, R);
        pos.push(v.x, v.y, v.z);
        owner.push(id - 1);
      }
    }
    this.dotOwner = owner;
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    this.dotColor = new Float32Array(owner.length * 3);
    this.dotSize = new Float32Array(owner.length);
    geo.setAttribute('aColor', new THREE.BufferAttribute(this.dotColor, 3));
    geo.setAttribute('aSize', new THREE.BufferAttribute(this.dotSize, 1));
    this.dotMat = new THREE.ShaderMaterial({
      uniforms: { uScale: { value: 60 }, uOpacity: { value: 0 } },
      vertexShader: DOT_VS,
      fragmentShader: DOT_FS,
      transparent: true,
      depthWrite: false,
    });
    this.dots = new THREE.Points(geo, this.dotMat);
    this.dots.renderOrder = -1;
    this.spin.add(this.dots);
    this.paint({});
  }

  setPalette(accentHex, inkHex, bgHex) {
    this.accent.set(accentHex);
    this.ink.set(inkHex);
    if (bgHex) this.baseMat.color.set(bgHex).multiplyScalar(0.45);
    this.atmoMat.uniforms.uColor.value.set(accentHex);
    this.repaint();
  }

  /** values: { countryName: share 0..1 } */
  paint(values) {
    this.lastValues = values;
    const base = this.ink.clone().multiplyScalar(0.34);
    const c = new THREE.Color();
    for (let i = 0; i < this.dotOwner.length; i++) {
      const name = countries[this.dotOwner[i]].properties.name;
      const v = values[name] || 0;
      c.copy(base).lerp(this.accent, v > 0 ? 0.35 + 0.65 * Math.pow(v, 0.55) : 0);
      this.dotColor.set([c.r, c.g, c.b], i * 3);
      this.dotSize[i] = v > 0 ? 1.7 + 1.8 * Math.pow(v, 0.5) : 1.35;
    }
    this.dots.geometry.attributes.aColor.needsUpdate = true;
    this.dots.geometry.attributes.aSize.needsUpdate = true;
  }

  repaint() {
    if (this.lastValues) this.paint(this.lastValues);
    this.materials.forEach((m) => m.userData.accent && m.color.copy(this.accent));
  }

  clearMarkers() {
    this.markers.traverse((o) => {
      if (o.isCSS2DObject) o.element.remove();
    });
    this.markers.clear();
    this.materials = [];
  }

  label(text, sub, at, cls = '') {
    const el = document.createElement('div');
    el.className = `globe-label ${cls}`;
    el.innerHTML = `<span><b>${text}</b>${sub ? `<small>${sub}</small>` : ''}</span>`;
    const obj = new CSS2DObject(el);
    obj.position.copy(at);
    return obj;
  }

  pillar(lat, lon, height, labelText, sub) {
    const n = latLon(lat, lon, 1).normalize();
    const base = n.clone().multiplyScalar(R);
    const mat = new THREE.MeshBasicMaterial({ color: this.accent.clone(), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false });
    mat.userData.accent = true;
    this.materials.push(mat);
    const geo = new THREE.CylinderGeometry(0.007, 0.012, height, 10);
    geo.translate(0, height / 2, 0);
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.copy(base);
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), n);
    const ringMat = mat.clone();
    ringMat.userData.accent = true;
    this.materials.push(ringMat);
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.018, 0.03, 24), ringMat);
    ring.position.copy(base.clone().multiplyScalar(1.002));
    ring.lookAt(base.clone().multiplyScalar(2));
    const g = new THREE.Group();
    g.add(mesh, ring);
    if (labelText) g.add(this.label(labelText, sub, base.clone().add(n.clone().multiplyScalar(height + 0.02))));
    this.markers.add(g);
  }

  site(lat, lon, text, kind) {
    const n = latLon(lat, lon, 1).normalize();
    const p = n.clone().multiplyScalar(R * 1.004);
    const mat = new THREE.MeshBasicMaterial({ color: this.ink.clone(), transparent: true, depthWrite: false });
    this.materials.push(mat);
    const m = new THREE.Mesh(new THREE.OctahedronGeometry(0.022, 0), mat);
    m.position.copy(p);
    const g = new THREE.Group();
    g.add(m, this.label(text, kind, p.clone().add(n.clone().multiplyScalar(0.05)), 'is-site'));
    this.markers.add(g);
  }

  showMining(element, layer) {
    this.clearMarkers();
    const table = layer === 'processing' ? element.processing : element.mining;
    const max = Math.max(...table.rows.map((r) => r[1]));
    const values = {};
    table.rows.forEach(([name, v]) => (values[name] = v / max));
    this.paint(values);
    if (layer === 'mines') {
      const h = { 3: 0.34, 2: 0.22, 1: 0.14 };
      const labelled = [];
      const minDot = Math.cos(THREE.MathUtils.degToRad(6));
      element.mines.forEach((m, i) => {
        const dir = latLon(m.lat, m.lon, 1);
        const named = i < 4 && !labelled.some((d) => d.dot(dir) > minDot);
        if (named) labelled.push(dir);
        this.pillar(m.lat, m.lon, h[m.cls] || 0.15, named ? m.name : '', named ? m.country : '');
      });
    }
    if (layer === 'processing') element.sites.forEach((s) => this.site(s.lat, s.lon, s.name, s.kind));
    this.setJourney(null);
  }

  setJourney(stops, index = -1) {
    if (!stops) {
      this.arcGroup.clear();
      this.journey = { stops: [], index: -1, arcs: [], progress: [] };
      return;
    }
    if (this.journey.stops !== stops) {
      this.clearMarkers();
      this.arcGroup.clear();
      const arcs = [];
      stops.forEach((s, i) => {
        const p = latLon(s.lat, s.lon, R * 1.003);
        const mat = new THREE.MeshBasicMaterial({ color: this.ink.clone(), transparent: true, depthWrite: false });
        this.materials.push(mat);
        const dot = new THREE.Mesh(new THREE.SphereGeometry(0.02, 16, 12), mat);
        dot.position.copy(p);
        const g = new THREE.Group();
        g.add(dot, this.label(`${String(i + 1).padStart(2, '0')} · ${s.place}`, s.kind, p.clone().multiplyScalar(1.04), 'is-stop'));
        g.userData.stop = i;
        // an earlier stop's label steps aside once a later stop within 10° is showing, so labels never stack
        const dir = latLon(s.lat, s.lon, 1);
        const near = stops.findIndex((t, j) => j > i && latLon(t.lat, t.lon, 1).dot(dir) > Math.cos(THREE.MathUtils.degToRad(10)));
        g.userData.nearNext = near === -1 ? Infinity : near;
        this.markers.add(g);
        if (i > 0) {
          const a = latLon(stops[i - 1].lat, stops[i - 1].lon, R);
          const b = latLon(s.lat, s.lon, R);
          const lift = R + 0.06 + a.distanceTo(b) * 0.28;
          const mid = a.clone().add(b).multiplyScalar(0.5).normalize().multiplyScalar(lift);
          const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
          const geo = new THREE.TubeGeometry(curve, 96, 0.0055, 8, false);
          const amat = new THREE.MeshBasicMaterial({ color: this.accent.clone(), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
          amat.userData.accent = true;
          this.materials.push(amat);
          const mesh = new THREE.Mesh(geo, amat);
          geo.setDrawRange(0, 0);
          this.arcGroup.add(mesh);
          arcs.push({ mesh, curve, total: geo.index.count });
        }
      });
      const shipMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true });
      this.materials.push(shipMat);
      this.ship = new THREE.Mesh(new THREE.SphereGeometry(0.016, 12, 10), shipMat);
      this.arcGroup.add(this.ship);
      this.journey = { stops, index, arcs, progress: arcs.map(() => 0) };
    }
    this.journey.index = index;
  }

  focus(lat, lon, zoom = 1) {
    const phi = ((lon + 180) / 360) * Math.PI * 2;
    this.target.y = Math.PI / 2 - phi;
    this.target.x = (lat * Math.PI) / 180 * 0.85;
    this.target.zoom = zoom;
    this.vel.set(0, 0);
  }

  /** The globe's circle on screen in CSS pixels, or null while it is not showing. */
  screenCircle() {
    if (this.presence < 0.5 || !this.camera) return null;
    const c = new THREE.Vector3().setFromMatrixPosition(this.group.matrixWorld).project(this.camera);
    const halfH = (this.camera.position.z - this.group.position.z) * Math.tan(THREE.MathUtils.degToRad(this.camera.fov / 2));
    return {
      x: ((c.x + 1) / 2) * window.innerWidth,
      y: ((1 - c.y) / 2) * window.innerHeight,
      r: ((R * this.group.scale.x) / halfH) * (window.innerHeight / 2),
    };
  }

  /**
   * Drag the globe to turn it. The drag holds until the next scroll step, which turns the globe
   * back to the place that step is about. On touch only sideways drags spin it, so vertical
   * swipes still scroll the page.
   */
  bindDrag(root) {
    let drag = null;
    const over = (e) => {
      const c = this.screenCircle();
      return c && !e.target.closest('.card') && Math.hypot(e.clientX - c.x, e.clientY - c.y) < c.r * 1.05;
    };
    root.addEventListener('pointerdown', (e) => {
      if (e.button !== 0 || !over(e)) return;
      if (e.pointerType === 'mouse') e.preventDefault();
      drag = { id: e.pointerId, x: e.clientX, y: e.clientY, t: performance.now(), k: Math.PI / 2 / this.screenCircle().r, touch: e.pointerType !== 'mouse' };
      this.dragging = true;
      this.vel.set(0, 0);
      root.classList.add('is-dragging');
    });
    window.addEventListener('pointermove', (e) => {
      if (!drag) {
        if (e.pointerType === 'mouse') root.classList.toggle('is-grab', Boolean(over(e)));
        return;
      }
      if (e.pointerId !== drag.id) return;
      const now = performance.now();
      const dt = Math.max(8, now - drag.t) / 1000;
      const spin = (e.clientX - drag.x) * drag.k;
      const tilt = drag.touch ? 0 : (e.clientY - drag.y) * drag.k;
      this.target.y += spin;
      this.target.x = THREE.MathUtils.clamp(this.target.x + tilt, -1.3, 1.3);
      this.vel.lerp(new THREE.Vector2(tilt / dt, spin / dt), 0.5);
      Object.assign(drag, { x: e.clientX, y: e.clientY, t: now });
    });
    const end = (e) => {
      if (!drag || e.pointerId !== drag.id) return;
      if (performance.now() - drag.t > 80) this.vel.set(0, 0); // held still before letting go: no fling
      drag = null;
      this.dragging = false;
      root.classList.remove('is-dragging');
    };
    window.addEventListener('pointerup', end);
    window.addEventListener('pointercancel', end);
  }

  update(dt, wanted, layout) {
    this.presence = damp(this.presence, wanted, wanted ? 3 : 6, dt);
    const p = this.presence;
    this.group.visible = p > 0.02;
    // the dark base sphere only occludes once it is nearly opaque, so a fading globe never hides the gun
    this.baseMat.depthWrite = p > 0.6;
    if (!this.group.visible) {
      this.labelHost.dataset.globe = 'off';
      return;
    }
    this.labelHost.dataset.globe = 'on';
    if (!this.dragging && this.vel.lengthSq() > 1e-6) {
      this.target.y += this.vel.y * dt;
      this.target.x = THREE.MathUtils.clamp(this.target.x + this.vel.x * dt, -1.3, 1.3);
      this.vel.multiplyScalar(Math.exp(-3.5 * dt));
    }
    // follows a drag tightly, eases slowly toward a scroll step's focus
    const follow = this.dragging ? 18 : 2.6;
    const dy = wrap(this.target.y - this.spin.rotation.y);
    this.spin.rotation.y += dy * (1 - Math.exp(-follow * dt));
    this.spin.rotation.x = damp(this.spin.rotation.x, this.target.x, follow, dt);
    // on phones the card sits at the bottom, so the globe rides higher to stay clear of it
    const s = (layout.mobile ? 0.7 : 0.74) * layout.scale * this.target.zoom * (0.85 + 0.15 * p);
    this.group.scale.setScalar(damp(this.group.scale.x || s, s, 3, dt));
    this.group.position.set(layout.x, layout.mobile ? layout.halfH * 0.44 : layout.y, 0);
    this.baseMat.opacity = 0.96 * p;
    this.dotMat.uniforms.uOpacity.value = p;
    this.dotMat.uniforms.uScale.value = 19 * this.group.scale.x * (this.pixelRatio || 1);
    this.atmoMat.uniforms.uOpacity.value = p;
    this.materials.forEach((m) => (m.opacity = p));
    this.group.updateMatrixWorld(true);
    const center = new THREE.Vector3().setFromMatrixPosition(this.group.matrixWorld);
    const toCam = new THREE.Vector3();
    const wp = new THREE.Vector3();
    this.markers.traverse((o) => {
      if (o.isCSS2DObject) {
        const { stop: stopIdx, nearNext } = o.parent.userData;
        const ji = this.journey.index;
        let vis = stopIdx === undefined ? 1 : stopIdx === ji ? 1 : stopIdx < ji && nearNext > ji ? 0.45 : 0;
        o.getWorldPosition(wp);
        // flip a label to the left of its pin when it would run off the right edge of the screen
        o.userData.w ||= o.element.firstElementChild.offsetWidth;
        const screenX = ((wp.clone().project(this.camera).x + 1) / 2) * window.innerWidth;
        const roomRight = window.innerWidth - 12 - screenX;
        o.element.classList.toggle('is-left', o.userData.w > roomRight && screenX - 12 > roomRight);
        toCam.copy(this.camera.position).sub(center).normalize();
        const facing = wp.sub(center).normalize().dot(toCam);
        vis *= THREE.MathUtils.smoothstep(facing, 0.05, 0.3);
        o.element.style.opacity = String(p * vis);
        o.element.style.visibility = vis > 0.02 ? 'visible' : 'hidden';
      }
    });

    // arcs draw progressively up to the active stop; the ship rides the newest one
    const { arcs, index, progress } = this.journey;
    arcs.forEach((a, i) => {
      const want = i < index ? 1 : 0;
      progress[i] = damp(progress[i], want, want ? 1.6 : 8, dt);
      a.mesh.geometry.setDrawRange(0, Math.floor(a.total * progress[i] / 3) * 3);
    });
    if (this.ship) {
      const k = index - 1;
      if (k >= 0 && arcs[k]) {
        this.ship.visible = true;
        this.ship.position.copy(arcs[k].curve.getPoint(Math.min(1, progress[k])));
      } else this.ship.visible = false;
    }
  }
}
