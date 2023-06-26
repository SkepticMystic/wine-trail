export const YOGA_STYLES = [
  "acro",
  "aerial",
  "ashtanga",
  "beginners",
  "bhaki",
  "budokon",
  "children's",
  "forrest",
  "gentle",
  "hatha",
  "hot",
  "ishta",
  "iyengar",
  "jivamukti",
  "jnana",
  "karma",
  "kundalini",
  "meditation",
  "pilates",
  "post-natal",
  "power",
  "pranayama",
  "pre-natal",
  "raja",
  "restorative",
  "satyananda",
  "therapy",
  "vinyasa",
  "yin",
] as const;
export type YogaStyle = typeof YOGA_STYLES[number];

export const YOGA_STYLE_EMOJI: Record<YogaStyle, string> = {
  acro: "✈️",
  aerial: "🧚",
  ashtanga: "🧘",
  beginners: "🆕",
  bhaki: "🕉️", // Get better icon
  budokon: "🥋",
  "children's": "👶",
  forrest: "🌳",
  gentle: "🥰", // Get better icon
  hatha: "🧘", // Get better icon
  hot: "🔥",

  ishta: "🧘", // Get better icon
  iyengar: "🧘", // Get better icon
  jivamukti: "🧘", // Get better icon
  jnana: "🧘", // Get better icon
  karma: "🧘", // Get better icon
  kundalini: "🧘", // Get better icon
  meditation: "🧘",
  pilates: "🤸",
  "post-natal": "🤰",
  power: "💪",
  pranayama: "🌬️",
  "pre-natal": "🤰",
  raja: "🧘", // Get better icon
  restorative: "🧘", // Get better icon
  satyananda: "🧘", // Get better icon
  therapy: "🧘", // Get better icon
  vinyasa: "🍃",
  yin: "🐌",
};

const pull = [
  "alignment",
  "baby classes",
  "egyptian kemetic",
  "mom",
  "mom and baby classes",
  "nidra",
  "rocket",
];

const rename = {
  "post natal": "post-natal",
  "vinyasa flow": "vinyasa",
  "yinyasa": "yin",
};
