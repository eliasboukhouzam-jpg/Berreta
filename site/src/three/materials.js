import * as THREE from 'three';

// One place for every surface in the site. Each call returns a fresh material
// so parts can be faded and highlighted independently.
const std = (color, metalness, roughness, extra = {}) => () =>
  new THREE.MeshStandardMaterial({ color, metalness, roughness, ...extra });

export const M = {
  carbon: std(0x1c1d21, 0.4, 0.36),
  plate: std(0x26272b, 0.45, 0.42),
  steel: std(0x9ea5ac, 1, 0.3),
  darkSteel: std(0x4b5057, 1, 0.38),
  aluminium: std(0xc5c9cd, 1, 0.42),
  copper: std(0xc8743a, 1, 0.28),
  pcb: std(0x1e3a2b, 0.2, 0.6),
  chip: std(0x101113, 0.3, 0.5),
  plastic: std(0x2b2c30, 0.05, 0.62),
  prop: std(0x8d939a, 0.05, 0.48),
  wrap: std(0x2a2c31, 0.1, 0.55),
  label: std(0xc8743a, 0.2, 0.5),
  olive: std(0x4d5434, 0.25, 0.68),
  yellow: std(0xc9a63c, 0.2, 0.6),
  fill: std(0xd9c98e, 0.0, 0.92),
  composite: std(0xb7b9b2, 0.05, 0.66),
  compositeDark: std(0x8e918a, 0.05, 0.7),
  glass: std(0x0d1820, 0.6, 0.06),
  fibre: std(0x6fa8a0, 0.2, 0.35),
  tan: std(0xa8905f, 0.05, 0.85),
  rubber: std(0x151516, 0, 0.9),
};

export const cutMaterial = () =>
  new THREE.MeshStandardMaterial({ color: 0x8a8f95, metalness: 0.9, roughness: 0.45, side: THREE.DoubleSide });
