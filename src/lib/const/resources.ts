export const RESOURCE_KINDS = ["studio", "teacher"] as const;
export type ResourceKind = typeof RESOURCE_KINDS[number];

export const RESOURCE_EMOJI: Record<ResourceKind, string> = {
  studio: "🏡",
  teacher: "👩‍🏫",
};
