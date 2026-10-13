// Evidence badges: every claim on the site carries one.
export const EVIDENCE = {
  doc: 'Documented',
  con: 'Consensus',
  est: 'Estimate, to verify',
};

export const badge = (k) => `<span class="ev ev-${k}" title="${EVIDENCE[k]}" aria-label="${EVIDENCE[k]}"></span>`;

export const fmt = (s = '') => s.replace(/\{(doc|con|est)\}/g, (_, k) => badge(k));
