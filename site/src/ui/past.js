import gsap from 'gsap';
import { revolutions } from '../content/revolutions.js';
import { plates } from '../art/plates.js';
import { badge } from './ev.js';

const REACH_MAX = Math.log10(2e7);
const ENERGY_MAX = 18;

const fmtReach = (m) => (m < 1000 ? `${m} m` : m >= 2e7 ? 'anywhere' : `${(m / 1000).toLocaleString('en')} km`);
const fmtEnergy = (j) => `10<sup>${Math.round(Math.log10(j))}</sup> J`;

export function renderPast(root) {
  const platesHtml = revolutions
    .map(
      (r, i) => `
    <article class="plate" data-i="${i}" aria-label="${r.weapon}">
      <div class="plate-art">
        <svg viewBox="0 0 400 300" aria-hidden="true">
          ${plates[r.id].map((d) => `<path d="${d}" />`).join('')}
        </svg>
        <span class="plate-index">${String(i + 1).padStart(2, '0')} / 12</span>
      </div>
      <div class="plate-text">
        <span class="plate-when">${r.when}</span>
        <p class="rule"><span class="rule-text">“${r.rule}”</span></p>
        <h3>${r.weapon}</h3>
        <p class="plate-line">${r.line}</p>
        <div class="plate-number"><b>${r.number}</b><span>${r.numberLabel} ${badge(r.numberEv)}</span></div>
        <span class="chip">${r.material}</span>
      </div>
    </article>`,
    )
    .join('');

  root.innerHTML = `
    <div class="past-stage">
      <header class="past-head">
        <span class="kicker">Part I · 2.6 million years → 2013</span>
        <h2>Twelve rules that broke</h2>
      </header>
      <div class="plates">${platesHtml}</div>
      <div class="dials" aria-label="Scale of evolution">
        <div class="dial"><span class="dial-name">Reach</span><span class="dial-bar"><i data-dial="reach"></i></span><span class="dial-val" data-val="reach">–</span></div>
        <div class="dial"><span class="dial-name">Energy per shot</span><span class="dial-bar"><i data-dial="energy"></i></span><span class="dial-val" data-val="energy">–</span></div>
        <div class="dial"><span class="dial-name">Who can own it</span><span class="dial-val dial-owner" data-val="owner">–</span></div>
        <span class="dial-note">Frontier values, orders of magnitude ${badge('est')}</span>
      </div>
      <ol class="rail" aria-hidden="true">${revolutions.map((r) => `<li title="${r.weapon}"></li>`).join('')}</ol>
    </div>`;
}

export function animatePast(root) {
  const stage = root.querySelector('.past-stage');
  const plateEls = [...root.querySelectorAll('.plate')];
  const rail = [...root.querySelectorAll('.rail li')];
  const reachBar = root.querySelector('[data-dial="reach"]');
  const energyBar = root.querySelector('[data-dial="energy"]');
  const reachVal = root.querySelector('[data-val="reach"]');
  const energyVal = root.querySelector('[data-val="energy"]');
  const ownerVal = root.querySelector('[data-val="owner"]');

  plateEls.forEach((p) =>
    p.querySelectorAll('path').forEach((path) => {
      const len = path.getTotalLength();
      path.style.strokeDasharray = `${len}`;
      path.style.strokeDashoffset = `${len}`;
    }),
  );

  let current = -1;
  const setDials = (i) => {
    if (i === current) return;
    current = i;
    const d = revolutions[i].dials;
    gsap.to(reachBar, { scaleX: Math.log10(d.reach) / REACH_MAX, duration: 0.6, ease: 'power2.out' });
    gsap.to(energyBar, { scaleX: Math.log10(d.energy) / ENERGY_MAX, duration: 0.6, ease: 'power2.out' });
    reachVal.textContent = fmtReach(d.reach);
    energyVal.innerHTML = fmtEnergy(d.energy);
    ownerVal.textContent = d.owner;
    rail.forEach((li, k) => li.classList.toggle('is-on', k <= i));
  };

  // Dials follow the timeline itself (which lags the scroll because of scrub),
  // so they always match the plate on screen.
  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    onUpdate: () => {
      const label = tl.currentLabel();
      if (label) setDials(Number(label.slice(1)));
    },
    scrollTrigger: {
      trigger: root,
      start: 'top top',
      end: () => `+=${window.innerHeight * plateEls.length * 1.15}`,
      scrub: 0.6,
      pin: stage,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  plateEls.forEach((plate, i) => {
    const at = `p${i}`;
    tl.addLabel(at);
    tl.fromTo(plate, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.12 }, at);
    tl.fromTo(
      plate.querySelectorAll('.plate-text > *'),
      { y: 26, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.3, stagger: 0.035, ease: 'power2.out' },
      `${at}+=0.02`,
    );
    tl.to(plate.querySelectorAll('path'), { strokeDashoffset: 0, duration: 0.6, stagger: 0.025, ease: 'power1.inOut' }, at);
    tl.fromTo(
      plate.querySelector('.rule-text'),
      { backgroundSize: '0% 2px' },
      { backgroundSize: '100% 2px', duration: 0.26, ease: 'power2.inOut' },
      `${at}+=0.42`,
    );
    tl.to({}, { duration: 0.3 });
    if (i < plateEls.length - 1) tl.to(plate, { autoAlpha: 0, y: -24, duration: 0.14 });
  });

  setDials(0);
  return tl;
}
