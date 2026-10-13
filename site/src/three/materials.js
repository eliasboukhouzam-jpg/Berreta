import * as THREE from 'three';

// Surface finishes. Each call returns a fresh material so parts can be
// faded, highlighted and dissolved independently.

let stipple = null;
function stippleTexture() {
  if (stipple) return stipple;
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const g = c.getContext('2d');
  g.fillStyle = '#808080';
  g.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 9000; i++) {
    const v = 90 + Math.random() * 120;
    g.fillStyle = `rgb(${v},${v},${v})`;
    g.beginPath();
    g.arc(Math.random() * 256, Math.random() * 256, 0.6 + Math.random() * 1.4, 0, Math.PI * 2);
    g.fill();
  }
  stipple = new THREE.CanvasTexture(c);
  stipple.wrapS = stipple.wrapT = THREE.RepeatWrapping;
  stipple.repeat.set(0.06, 0.06); // extrude UVs are in millimetres
  return stipple;
}

const std = (color, metalness, roughness, extra = {}) => () =>
  new THREE.MeshStandardMaterial({ color, metalness, roughness, ...extra });

export const F = {
  // steels
  bruniton: std(0x1b1c1f, 0.75, 0.42), // Beretta-style matte black slide coating
  nitride: std(0x222428, 0.8, 0.46), // Glock-style nitrided slide
  blued: std(0x2a2d33, 0.95, 0.3),
  barrel: std(0x6b7076, 1, 0.26),
  barrelDark: std(0x3a3d42, 1, 0.34),
  parkerized: std(0x2f302e, 0.7, 0.62),
  spring: std(0x9aa0a6, 1, 0.28),
  chrome: std(0xc9ced3, 1, 0.12),
  // aluminium
  anodized: std(0x1d1f22, 0.6, 0.5),
  anodizedGray: std(0x34373b, 0.6, 0.48),
  barrettGray: std(0x3c3d39, 0.55, 0.58),
  // polymers
  polymer: () =>
    new THREE.MeshStandardMaterial({ color: 0x18191b, metalness: 0, roughness: 0.78, bumpMap: stippleTexture(), bumpScale: 1.2 }),
  polymerSmooth: std(0x151618, 0, 0.6),
  grip: std(0x121214, 0.05, 0.52),
  rubber: std(0x0e0e0f, 0, 0.92),
  // details
  white: std(0xe9e6df, 0, 0.5),
  brass: std(0xc9a24a, 1, 0.3),
  glass: std(0x0b1a26, 0.9, 0.04, { emissive: new THREE.Color(0x0a2233), emissiveIntensity: 0.4 }),
  // drone
  carbon: std(0x1b1c20, 0.4, 0.34),
  copper: std(0xc8743a, 1, 0.28),
  pcb: std(0x1d3a2a, 0.2, 0.6),
  chip: std(0x0f1012, 0.3, 0.5),
  prop: std(0xb9bdc2, 0.05, 0.42),
  wrap: std(0x2a2c31, 0.1, 0.55),
  label: std(0xd96a2b, 0.2, 0.5),
  olive: std(0x4d5434, 0.25, 0.68),
  fibre: std(0x6fa8a0, 0.2, 0.35),
};
