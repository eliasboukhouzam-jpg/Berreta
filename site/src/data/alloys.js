// What each part is made of. Recipes are typical published compositions for the
// alloy family (mass %, rounded); the exact grade each maker uses is often not public.
// ev: doc documented · con consensus · est estimate / verify.

export const alloys = {
  'al-7075': {
    name: 'Aluminium alloy 7075',
    note: 'Aerospace-grade alloy, forged then machined. Italian makers call it Ergal.',
    recipe: [
      ['Al', 90.0],
      ['Zn', 5.6],
      ['Mg', 2.5],
      ['Cu', 1.6],
      ['Cr', 0.23],
    ],
    ev: 'con',
  },
  'steel-crmo': {
    name: 'Chromium-molybdenum steel',
    note: 'Tough, heat-treatable steel used for slides, barrels and receivers.',
    recipe: [
      ['Fe', 97.0],
      ['Cr', 1.0],
      ['Mn', 0.9],
      ['C', 0.45],
      ['Mo', 0.2],
    ],
    ev: 'con',
  },
  'steel-barrel': {
    name: 'Cr-Mo-V barrel steel, chrome-lined bore',
    note: 'Barrel steel with a hard-chromium layer inside the bore against heat and wear.',
    recipe: [
      ['Fe', 96.8],
      ['Cr', 1.0],
      ['Mn', 0.9],
      ['C', 0.5],
      ['Mo', 0.2],
      ['V', 0.2],
    ],
    ev: 'con',
  },
  'spring-steel': {
    name: 'Spring steel wire',
    note: 'High-carbon steel drawn into wire and coiled.',
    recipe: [
      ['Fe', 98.4],
      ['C', 0.8],
      ['Mn', 0.6],
      ['Si', 0.2],
    ],
    ev: 'con',
  },
  'nylon-6': {
    name: 'Polyamide 6 (nylon), glass-reinforced',
    note: 'Made from oil and gas. Shares below are for the polymer itself; glass fibre is added on top (share not public).',
    recipe: [
      ['C', 63.7],
      ['O', 14.1],
      ['N', 12.4],
      ['H', 9.8],
    ],
    ev: 'doc',
  },
  polymer: {
    name: 'Engineering polymer',
    note: 'Moulded plastic made from oil and gas feedstocks.',
    recipe: [
      ['C', 64],
      ['O', 14],
      ['N', 12],
      ['H', 10],
    ],
    ev: 'est',
  },
  'optical-glass': {
    name: 'High-index optical glass',
    note: 'Silica glass with lanthanum oxide for sharper lenses. Recipes are proprietary.',
    recipe: [
      ['Si', null],
      ['La', null],
      ['B', null],
      ['O', null],
    ],
    ev: 'con',
  },
  ndfeb: {
    name: 'Neodymium-iron-boron magnet',
    note: 'The strongest permanent magnets, used in every brushless motor.',
    recipe: [
      ['Fe', 66],
      ['Nd', 26],
      ['Pr', 5],
      ['Dy', 2],
      ['B', 1],
    ],
    ev: 'con',
  },
  'li-ion': {
    name: 'Lithium-polymer cell',
    note: 'Cathode, graphite anode, copper and aluminium foils. Shares vary by chemistry.',
    recipe: [
      ['Co', null],
      ['Li', null],
      ['C', null],
      ['Cu', null],
      ['Al', null],
    ],
    ev: 'con',
  },
  'carbon-fibre': {
    name: 'Carbon-fibre composite',
    note: 'Fibres spun from a petroleum-based precursor, set in epoxy resin.',
    recipe: [
      ['C', 95],
      ['O', 3],
      ['N', 2],
    ],
    ev: 'est',
  },
  copper: {
    name: 'Copper wire',
    note: 'Motor windings and wiring.',
    recipe: [['Cu', 99.9]],
    ev: 'doc',
  },
};

export const ELEMENT_NAMES = {
  Al: ['Aluminium', 13],
  Zn: ['Zinc', 30],
  Mg: ['Magnesium', 12],
  Cu: ['Copper', 29],
  Cr: ['Chromium', 24],
  Fe: ['Iron', 26],
  Mn: ['Manganese', 25],
  C: ['Carbon', 6],
  Mo: ['Molybdenum', 42],
  V: ['Vanadium', 23],
  Si: ['Silicon', 14],
  O: ['Oxygen', 8],
  N: ['Nitrogen', 7],
  H: ['Hydrogen', 1],
  La: ['Lanthanum', 57],
  B: ['Boron', 5],
  Nd: ['Neodymium', 60],
  Pr: ['Praseodymium', 59],
  Dy: ['Dysprosium', 66],
  Co: ['Cobalt', 27],
  Li: ['Lithium', 3],
};
