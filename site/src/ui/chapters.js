import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { chapters, nextChapters } from '../content/chapters.js';
import { DEFAULT_STATE } from '../three/stage.js';
import { fmt } from './ev.js';

const lerp = (a, b, t) => a + (b - a) * t;
const smooth = (e0, e1, x) => {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
};

function stepBody(step) {
  let html = '';
  if (step.body) html += `<p>${fmt(step.body)}</p>`;
  if (step.timeline) {
    html += `<ol class="mini-timeline">${step.timeline
      .map(([y, t]) => `<li><span class="mt-year">${y}</span><span class="mt-text">${fmt(t)}</span></li>`)
      .join('')}</ol>`;
  }
  if (step.chain) {
    html += `<ul class="chain">${step.chain
      .map(([el, part, where]) => `<li><b>${el}</b><span>${part}</span><em>${where}</em></li>`)
      .join('')}</ul>`;
  }
  return html;
}

export function renderChapters(root, nextRoot) {
  root.innerHTML = chapters
    .map(
      (ch) => `
    <section class="chapter" id="ch-${ch.id}" data-chapter="${ch.id}">
      ${ch.steps
        .map(
          (s, i) => `
        <div class="step${i === 0 ? ' step-first' : ''}">
          <div class="card">
            <span class="kicker">${s.kicker}</span>
            ${i === 0 ? `<span class="chapter-no">${ch.index}</span>` : ''}
            <h3>${s.title}</h3>
            ${stepBody(s)}
          </div>
        </div>`,
        )
        .join('')}
    </section>
    <div class="chapter-gap" aria-hidden="true"></div>`,
    )
    .join('');

  nextRoot.innerHTML = `
    <span class="kicker">Next chapters · in production</span>
    <h2>The rest of the decade</h2>
    <ul class="next-grid">${nextChapters
      .map(([name, years, line]) => `<li><span class="kicker">${years}</span><b>${name}</b><span>${line}</span></li>`)
      .join('')}</ul>`;
}

function stateAt(steps, p) {
  const n = steps.length;
  const s = p * (n - 1);
  const i = Math.min(n - 2, Math.max(0, Math.floor(s)));
  const k = smooth(0.2, 0.8, s - i);
  const a = { ...DEFAULT_STATE, ...steps[i].state };
  const b = { ...DEFAULT_STATE, ...steps[i + 1].state };
  const near = k < 0.5 ? a : b;
  return {
    explode: lerp(a.explode, b.explode, k),
    rotY: lerp(a.rotY, b.rotY, k),
    rotX: lerp(a.rotX, b.rotX, k),
    zoom: lerp(a.zoom, b.zoom, k),
    focus: near.focus,
    show: near.show,
    labels: near.labels,
  };
}

export function bindChapters(stage, onChapter) {
  chapters.forEach((ch) => {
    const el = document.getElementById(`ch-${ch.id}`);
    ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: 'bottom bottom',
      onToggle: (self) => {
        if (self.isActive) {
          stage.setActive(ch.model);
          onChapter?.(ch);
        } else if (stage.active === ch.model) {
          stage.setActive(null);
        }
      },
      onUpdate: (self) => stage.setTarget(stateAt(ch.steps, self.progress)),
    });
    el.querySelectorAll('.card').forEach((card) => {
      ScrollTrigger.create({
        trigger: card,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleClass: 'is-in',
      });
    });
  });
}
