import '@fontsource-variable/big-shoulders-display';
import '@fontsource-variable/archivo/wdth.css';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/500.css';
import './styles.css';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import { Stage } from './three/stage.js';
import { buildBeretta92 } from './models/beretta92.js';
import { buildGlock17 } from './models/glock17.js';
import { buildM16 } from './models/m16a2.js';
import { buildBarrett } from './models/barrett.js';
import { buildFpv } from './models/fpv.js';
import { weapons } from './data/weapons.js';
import { createSelector } from './ui/selector.js';
import { renderStory, bindStory } from './ui/story.js';

gsap.registerPlugin(ScrollTrigger);
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let lenis = null;
if (!reduced) {
  lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 0.9 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

const stage = new Stage({ canvas: document.getElementById('stage'), labelLayer: document.getElementById('labels'), reducedMotion: reduced });
const builders = { beretta: buildBeretta92, glock: buildGlock17, m16: buildM16, barrett: buildBarrett, fpv: buildFpv };
weapons.forEach((w) => stage.register(builders[w.id](), w.parts));

const sectionLabel = document.getElementById('section-label');
const setSection = (t) => sectionLabel.textContent !== t && (sectionLabel.textContent = t);
const storyRoot = document.getElementById('story');
const HERO = { hero: true, explode: 0, rotY: 0.55, rotX: 0.12, zoom: 1, gun: 1, globe: 0 };

let current = null;
const selector = createSelector({
  weapons,
  stage,
  reduced,
  onChange: (w) => {
    if (current === w.id) return;
    current = w.id;
    const steps = renderStory(storyRoot, w);
    bindStory(storyRoot, steps, stage, setSection);
    storyRoot.querySelector('[data-next]')?.addEventListener('click', () => {
      const go = () => selector.go(selector.index + 1, 1);
      if (lenis) lenis.scrollTo(0, { duration: 1.6, onComplete: go });
      else {
        window.scrollTo(0, 0);
        go();
      }
    });
    ScrollTrigger.refresh();
  },
});

ScrollTrigger.create({
  trigger: '#hero',
  start: 'top bottom',
  end: 'bottom 45%',
  onToggle: (self) => {
    if (!self.isActive) return;
    stage.setTarget(HERO);
    setSection('Pick a weapon');
  },
});
stage.setTarget(HERO);

gsap.to('.hero-copy, .picker, .scroll-cue', {
  autoAlpha: 0,
  y: -40,
  ease: 'none',
  scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom 40%', scrub: true },
});
gsap.to('.mark', {
  autoAlpha: 0.15,
  scale: 0.92,
  ease: 'none',
  scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true },
});
gsap.to('#progress', {
  scaleX: 1,
  ease: 'none',
  scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.3 },
});

document.fonts?.ready.then(() => ScrollTrigger.refresh());
