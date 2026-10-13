import * as THREE from 'three';

// Noise dissolve with a glowing molten edge, injected into standard materials.
// One shared uniform set per model drives every one of its materials.
const NOISE = /* glsl */ `
  float dHash(vec3 p) { p = fract(p * 0.3183099 + 0.1); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
  float dNoise(vec3 x) {
    vec3 i = floor(x); vec3 f = fract(x); f = f * f * (3.0 - 2.0 * f);
    return mix(mix(mix(dHash(i + vec3(0,0,0)), dHash(i + vec3(1,0,0)), f.x),
                   mix(dHash(i + vec3(0,1,0)), dHash(i + vec3(1,1,0)), f.x), f.y),
               mix(mix(dHash(i + vec3(0,0,1)), dHash(i + vec3(1,0,1)), f.x),
                   mix(dHash(i + vec3(0,1,1)), dHash(i + vec3(1,1,1)), f.x), f.y), f.z);
  }
  float dFbm(vec3 p) { return dNoise(p) * 0.55 + dNoise(p * 2.3) * 0.3 + dNoise(p * 5.1) * 0.15; }
`;

export function createDissolve(color = 0xff7a2f) {
  return { uDissolve: { value: 0 }, uEdge: { value: new THREE.Color(color) } };
}

export function applyDissolve(material, uniforms) {
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uDissolve = uniforms.uDissolve;
    shader.uniforms.uEdge = uniforms.uEdge;
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vDPos;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvDPos = (modelMatrix * vec4(position, 1.0)).xyz;');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>\nuniform float uDissolve;\nuniform vec3 uEdge;\nvarying vec3 vDPos;\n${NOISE}`)
      .replace(
        '#include <clipping_planes_fragment>',
        `#include <clipping_planes_fragment>
         float dN = dFbm(vDPos * 3.2 + vec3(0.0, vDPos.y * 1.5, 0.0));
         if (uDissolve > 0.0 && dN < uDissolve * 1.1) discard;`,
      )
      .replace(
        '#include <emissivemap_fragment>',
        `#include <emissivemap_fragment>
         float dEdge = 1.0 - smoothstep(0.0, 0.07, dN - uDissolve * 1.1);
         totalEmissiveRadiance += uEdge * dEdge * step(0.001, uDissolve) * 4.0;`,
      );
  };
  material.customProgramCacheKey = () => 'dissolve';
  material.needsUpdate = true;
}
