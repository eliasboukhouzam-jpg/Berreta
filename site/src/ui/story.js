import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { alloys, ELEMENT_NAMES } from '../data/alloys.js';
import { elements } from '../data/elements.js';
import { fmt } from './ev.js';

// The scroll story for the selected weapon, rebuilt whenever the weapon changes:
// take it apart → each part and its material → follow one material across the globe → back in the gun.

const ANGLES = [
  [0.4, 0.3],
  [0.75, 0.38],
  [0.15, 0.26],
  [0.95, 0.42],
  [0.3, 0.5],
  [0.6, 0.22],
  [0.05, 0.35],
  [0.85, 0.3],
];
const pad = (n) => String(n).padStart(2, '0');
let triggers = [];

function share(table, v) {
  return table.unit.startsWith('%') ? v : (v / table.world) * 100;
}

function topFrom(el, n = 3) {
  const t = el.mining;
  return t.rows
    .slice(0, n)
    .map(([c, v]) => `${c.replace('United States of America', 'USA').replace('Dem. Rep. Congo', 'DR Congo')} <b>${Math.round(share(t, v))}%</b>`)
    .join(' · ');
}

function tiles(alloy) {
  return `<ul class="tiles">${alloy.recipe
    .map(([sym, pct]) => {
      const [name, z] = ELEMENT_NAMES[sym] || [sym, ''];
      return `<li><span class="z">${z}</span><b>${sym}</b><small>${name}</small><em>${pct === null ? 'varies' : `${pct}%`}</em></li>`;
    })
    .join('')}</ul>`;
}

function board(table) {
  const max = Math.max(...table.rows.map((r) => r[1]));
  const unit = table.unit === 'qualitative' ? '' : table.unit;
  return `<ol class="board">${table.rows
    .map(([c, v]) => {
      const name = c.replace('United States of America', 'United States').replace('Dem. Rep. Congo', 'DR Congo');
      const right = table.unit === 'qualitative' ? '' : table.unit.startsWith('%') ? `${v}%` : `${v} ${unit} · ${Math.round(share(table, v))}%`;
      return `<li style="--w:${(v / max) * 100}%"><span>${name}</span><em>${right}</em><i></i></li>`;
    })
    .join('')}</ol><p class="board-note">${table.label} ${fmt(`{${table.ev}}`)}</p>`;
}

export function buildSteps(w) {
  const steps = [];
  const parts = w.parts;
  const nMaterials = new Set(parts.map((p) => p.alloy)).size;

  steps.push({
    label: 'Take it apart',
    state: { explode: 1, labels: true, rotY: 0.45, rotX: 0.3, zoom: 0.98 },
    html: `<span class="kicker">${w.name}</span><h3>${parts.length} parts. ${nMaterials} materials.</h3>
      <p>Taken apart the way its owner’s manual shows. Drag it to turn it. Keep scrolling: each part goes back to the ground it came from.</p>`,
  });

  parts.forEach((p, i) => {
    const alloy = alloys[p.alloy];
    const el = elements[p.element];
    const [rotY, rotX] = ANGLES[i % ANGLES.length];
    steps.push({
      label: `Part ${pad(i + 1)} · ${p.name}`,
      state: { explode: 1, labels: true, focus: p.id, rotY, rotX, zoom: 1.04 },
      html: `<span class="kicker">Part ${pad(i + 1)} / ${pad(parts.length)}</span><h3>${p.name}</h3><p>${fmt(p.line)}</p>
        <div class="alloy"><span class="alloy-name">${alloy.name} ${fmt(`{${alloy.ev}}`)}</span><small>${alloy.note}</small>${tiles(alloy)}</div>
        ${el ? `<div class="from"><span class="kicker">${el.ore}: mostly from</span><p>${topFrom(el)}</p></div>` : ''}`,
    });
  });

  // ---- The journey of one material ----------------------------------------
  const j = w.journey;
  const el = elements[j.element];
  const part = parts.find((p) => p.id === j.part);
  const firstMine = el.mines[0];
  const firstSite = el.sites[0] || firstMine;

  steps.push({
    label: j.title,
    state: { gun: 0, globe: 1 },
    globe: (g) => {
      g.showMining(el, 'mining');
      g.focus(firstMine.lat, firstMine.lon, 0.95);
    },
    html: `<span class="kicker">${j.title}</span><h3>From ${el.ore.toLowerCase()} to the ${part.name.toLowerCase()}.</h3>
      <p>${el.why}</p><p class="small">Countries glow by their share of world output. Drag the globe to turn it.</p>`,
  });

  steps.push({
    label: 'Who mines it',
    state: { gun: 0, globe: 1 },
    globe: (g) => {
      g.showMining(el, 'mining');
      g.focus(firstMine.lat, firstMine.lon, 1.0);
    },
    html: `<span class="kicker">Who mines it</span><h3>${el.mining.label}</h3>${board(el.mining)}`,
  });

  steps.push({
    label: 'The biggest mines',
    state: { gun: 0, globe: 1 },
    globe: (g) => {
      g.showMining(el, 'mines');
      g.focus(firstMine.lat, firstMine.lon, 1.15);
    },
    html: `<span class="kicker">The biggest mines</span><h3>Where the ground is opened.</h3>
      <ul class="mines">${el.mines
        .map((m) => `<li><b>${m.name}</b><span>${m.country.replace('United States of America', 'United States')}</span><small>${m.owner}</small></li>`)
        .join('')}</ul><p class="board-note">Owners as publicly reported ${fmt('{est}')}</p>`,
  });

  steps.push({
    label: 'Who refines it',
    state: { gun: 0, globe: 1 },
    globe: (g) => {
      g.showMining(el, 'processing');
      g.focus(firstSite.lat, firstSite.lon, 1.0);
    },
    html: `<span class="kicker">Who refines it</span><h3>${el.processing.label}</h3>${board(el.processing)}
      <p class="small">Refining is usually more concentrated than mining. That is where a supply chain breaks first.</p>`,
  });

  j.stops.forEach((s, k) => {
    steps.push({
      label: `Stop ${pad(k + 1)} · ${s.place}`,
      state: { gun: 0, globe: 1 },
      globe: (g) => {
        g.setJourney(j.stops, k);
        g.paint({});
        g.focus(s.lat, s.lon, 1.25);
      },
      html: `<span class="kicker">Stop ${pad(k + 1)} / ${pad(j.stops.length)} · ${s.kind}</span><h3>${s.place}</h3><p>${fmt(s.text)}</p>`,
    });
  });

  steps.push({
    label: 'What could break',
    state: { gun: 0, globe: 1 },
    globe: (g) => {
      g.setJourney(j.stops, j.stops.length);
      const mid = j.stops[Math.floor(j.stops.length / 2)];
      g.focus(mid.lat, mid.lon, 0.9);
    },
    html: `<span class="kicker">What could break this chain</span><h3>${j.stops.length} stops. No guarantees.</h3>
      <ul class="politics">${j.politics.map((t) => `<li>${fmt(t)}</li>`).join('')}</ul>
      <p class="small">One plausible path. Metals from many mines are mixed at refineries, so no gun can be traced to a single mine.</p>`,
  });

  steps.push({
    label: 'Back in the gun',
    state: { explode: 0, gun: 1, globe: 0, rotY: 0.55, rotX: 0.14, zoom: 1.02 },
    html: `<span class="kicker">Back together</span><h3>One ${w.kind.toLowerCase()}. A whole planet inside it.</h3>
      <p>Every part you saw started as rock, oil or brine somewhere else.</p>
      <button class="next-btn" data-next>Next weapon →</button>`,
  });
  return steps;
}

export function renderStory(root, w) {
  const steps = buildSteps(w);
  root.innerHTML = steps
    .map((s, i) => `<section class="step${s.globe ? ' is-globe' : ''}" data-i="${i}"><div class="card">${s.html}</div></section>`)
    .join('');
  return steps;
}

export function bindStory(root, steps, stage, setSection) {
  triggers.forEach((t) => t.kill());
  triggers = [];
  root.querySelectorAll('.step').forEach((el, i) => {
    const s = steps[i];
    triggers.push(
      ScrollTrigger.create({
        trigger: el,
        start: 'top 55%',
        end: 'bottom 55%',
        onToggle: (self) => {
          if (!self.isActive) return;
          stage.setTarget(s.state);
          if (s.globe) s.globe(stage.globe);
          setSection(s.label);
        },
      }),
      ScrollTrigger.create({ trigger: el.firstElementChild, start: 'top 85%', end: 'bottom 15%', toggleClass: 'is-in' }),
    );
  });
}
