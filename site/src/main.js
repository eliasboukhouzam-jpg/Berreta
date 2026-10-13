import '@fontsource/instrument-serif/400.css';
import '@fontsource/instrument-serif/400-italic.css';
import '@fontsource-variable/inter';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/500.css';
import './styles.css';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import { Stage } from './three/stage.js';
import { buildRock } from './models/rock.js';
import { buildFpv } from './models/fpv.js';
import { buildShahed } from './models/shahed.js';
import { buildShell } from './models/shell.js';
import { chapters } from './content/chapters.js';
import { renderPast, animatePast } from './ui/past.js';
import { renderChapters, bindChapters } from './ui/chapters.js';

gsap.registerPlugin(ScrollTrigger);

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---- Content -------------------------------------------------------------
renderPast(document.getElementById('past'));
renderChapters(document.getElementById('chapters'), document.getElementById('next'));

// ---- Smooth scroll -------------------------------------------------------
if (!reducedMotion) {
  const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 0.9 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

// ---- 3D stage ------------------------------------------------------------
const stage = new Stage({
  canvas: document.getElementById('stage'),
  labelLayer: document.getElementById('labels'),
  reducedMotion,
});
const partsOf = (id) => chapters.find((c) => c.model === id)?.parts ?? {};
stage.register(buildRock());
stage.register(buildFpv(), partsOf('fpv'));
stage.register(buildShahed(), partsOf('shahed'));
stage.register(buildShell(), partsOf('shell'));

const HERO_STATE = { explode: 0, rotY: 0.4, rotX: 0.35, zoom: 1, spin: true };
stage.setActive('rock');
stage.setTarget(HERO_STATE);

// ---- Section label + progress -------------------------------------------
const sectionLabel = document.getElementById('section-label');
const setSection = (text) => {
  if (sectionLabel.textContent !== text) sectionLabel.textContent = text;
};
gsap.to('#progress', {
  scaleX: 1,
  ease: 'none',
  scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.3 },
});

// Hero
ScrollTrigger.create({
  trigger: '#hero',
  start: 'top top',
  end: 'bottom top',
  onLeave: () => stage.active === 'rock' && stage.setActive(null),
  onEnterBack: () => {
    stage.setActive('rock');
    stage.setTarget(HERO_STATE);
    setSection('Introduction');
  },
});
gsap.to('.hero-inner', {
  y: -80,
  autoAlpha: 0,
  ease: 'none',
  scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom 30%', scrub: true },
});

// Part I
animatePast(document.getElementById('past'));
ScrollTrigger.create({
  trigger: '#past',
  start: 'top center',
  end: 'bottom center',
  onToggle: (self) => self.isActive && setSection('Part I · Twelve rules that broke'),
});

// The 2014 landing
gsap.fromTo(
  '.landing-year',
  { scale: 0.6, autoAlpha: 0 },
  { scale: 1, autoAlpha: 1, ease: 'none', scrollTrigger: { trigger: '#landing', start: 'top 85%', end: 'center center', scrub: true } },
);
ScrollTrigger.create({
  trigger: '#landing',
  start: 'top center',
  end: 'bottom center',
  onToggle: (self) => self.isActive && setSection('Part II · The drone decade'),
});

// Part II chapters
bindChapters(stage, (ch) => setSection(`Part II · ${ch.index} ${ch.title}`));

// Recompute after fonts settle (layout shifts change pin positions)
document.fonts?.ready.then(() => ScrollTrigger.refresh());
