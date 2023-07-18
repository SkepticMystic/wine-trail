export const LINK_KINDS = [
  "facebook",
  "instagram",
  "twitter",
  "youtube",
  "website",
] as const;
export type LinkKind = typeof LINK_KINDS[number];

export const LINK_EMOJI: Record<LinkKind, string> = {
  facebook: "📘",
  instagram: "📸",
  twitter: "🐤",
  youtube: "▶️",
  website: "🌐",
};
