import gsap from 'gsap';
import { fmt } from './ev.js';

// The weapon picker: each weapon is a "flavour" with its own colour world.
// Switching runs three things together: a molten dissolve on the 3D model,
// a gooey colour wipe across the screen, and a letter roll on the big type.

const SVGNS = 'http://www.w3.org/2000/svg';

function applyWorld(w) {
  const r = document.documentElement.style;
  r.setProperty('--bg', w.world.bg);
  r.setProperty('--bg2', w.world.bg2);
  r.setProperty('--ink', w.world.ink);
  r.setProperty('--accent', w.world.accent);
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', w.world.bg);
}

// Letters are wrapped per word so a long name breaks between words, never inside one.
function letters(el, text) {
  el.innerHTML = text
    .split(' ')
    .map((word) => `<span class="word">${[...word].map((ch) => `<span class="ch"><span>${ch}</span></span>`).join('')}</span>`)
    .join('<span class="sp"></span>');
  return el.querySelectorAll('.ch > span');
}

function wipe(color, dir, reduced) {
  if (reduced) return Promise.resolve();
  const g = document.getElementById('wipe-g');
  g.innerHTML = '';
  const W = window.innerWidth;
  const H = window.innerHeight;
  const big = Math.hypot(W, H) * 0.75;
  const startX = dir > 0 ? W * 1.05 : -W * 0.05;
  const circles = Array.from({ length: 7 }, (_, i) => {
    const c = document.createElementNS(SVGNS, 'circle');
    c.setAttribute('cx', String(startX + (dir > 0 ? -1 : 1) * (Math.random() * 0.25 * W)));
    c.setAttribute('cy', String((H * (i + 0.5)) / 7 + (Math.random() - 0.5) * 60));
    c.setAttribute('r', '0');
    c.setAttribute('fill', color);
    g.appendChild(c);
    return c;
  });
  return new Promise((resolve) => {
    gsap.to(circles, {
      attr: { r: big },
      duration: 1.05,
      ease: 'power3.inOut',
      stagger: { each: 0.045, from: 'random' },
      onComplete: resolve,
    });
  });
}

export function createSelector({ weapons, stage, reduced, onChange }) {
  const list = document.getElementById('picker-list');
  const nameEl = document.getElementById('hero-name');
  const markEl = document.getElementById('mark');
  const kindEl = document.getElementById('hero-kind');
  const metaEl = document.getElementById('hero-meta');
  const lineEl = document.getElementById('hero-line');
  const counter = document.getElementById('counter');
  let index = 0;
  let busy = false;

  list.innerHTML = weapons
    .map((w, i) => `<li><button data-i="${i}" aria-label="${w.name}"><span>${String(i + 1).padStart(2, '0')}</span>${w.mark}</button></li>`)
    .join('');

  const setCopy = (w, i) => {
    kindEl.textContent = w.kind;
    metaEl.innerHTML = `${w.maker} · ${w.origin} · ${w.year}`;
    lineEl.innerHTML = fmt(w.line);
    counter.textContent = `${String(i + 1).padStart(2, '0')} / ${String(weapons.length).padStart(2, '0')}`;
    list.querySelectorAll('button').forEach((b, k) => b.classList.toggle('is-on', k === i));
  };

  const show = (i) => {
    const w = weapons[i];
    applyWorld(w);
    letters(nameEl, w.name);
    letters(markEl, w.mark);
    setCopy(w, i);
    stage.switchTo(w.id, w.world, { instant: true });
    onChange(w, i);
  };

  async function go(i, dir) {
    i = (i + weapons.length) % weapons.length;
    if (busy || i === index) return;
    busy = true;
    const w = weapons[i];
    const outs = [...nameEl.querySelectorAll('.ch > span'), ...markEl.querySelectorAll('.ch > span')];
    gsap.to(outs, { yPercent: -110, duration: 0.45, ease: 'power3.in', stagger: 0.018 });
    gsap.to([kindEl, metaEl, lineEl], { autoAlpha: 0, y: -10, duration: 0.3 });

    const swap = stage.switchTo(w.id, w.world);
    await wipe(w.world.bg, dir, reduced);
    applyWorld(w);
    document.getElementById('wipe-g').innerHTML = '';
    const ins = [...letters(nameEl, w.name), ...letters(markEl, w.mark)];
    setCopy(w, i);
    gsap.fromTo(ins, { yPercent: 110 }, { yPercent: 0, duration: 0.7, ease: 'power3.out', stagger: 0.02 });
    gsap.to([kindEl, metaEl, lineEl], { autoAlpha: 1, y: 0, duration: 0.5, delay: 0.15, stagger: 0.06 });
    index = i;
    onChange(w, i);
    await swap;
    busy = false;
  }

  list.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (b) go(Number(b.dataset.i), Number(b.dataset.i) > index ? 1 : -1);
  });
  document.querySelectorAll('.picker .arrow').forEach((b) =>
    b.addEventListener('click', () => go(index + Number(b.dataset.dir), Number(b.dataset.dir))),
  );
  window.addEventListener('keydown', (e) => {
    if (window.scrollY > window.innerHeight * 0.5) return;
    if (e.key === 'ArrowRight') go(index + 1, 1);
    if (e.key === 'ArrowLeft') go(index - 1, -1);
  });
  let touchX = null;
  const hero = document.getElementById('hero');
  // a swipe that starts on the weapon turns it (see Stage.bindDrag) instead of switching
  hero.addEventListener('touchstart', (e) => (touchX = stage.dragging ? null : e.touches[0].clientX), { passive: true });
  hero.addEventListener('touchend', (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
    touchX = null;
  });

  show(0);
  return { go, get index() { return index; } };
}
