import type { ResourceKind } from "./resources";

export const IMAGE_KINDS = ["logo", "schedule", "other"] as const;
export type ImageKind = typeof IMAGE_KINDS[number];

export const IMAGE_KIND_MAX_COUNTS: Record<ImageKind, number> = {
  logo: 1,
  schedule: 1,
  other: 7,
};

export const IMAGE_HOSTS = [
  // "imgdb",
  "uploadjs",
] as const;
export type ImageHost = typeof IMAGE_HOSTS[number];

export const RESOURCE_IMAGE_KINDS: Record<ResourceKind, ImageKind[]> = {
  studio: ["logo", "schedule", "other"],
  teacher: ["logo", "other"],
};
