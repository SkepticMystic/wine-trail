export const IMAGE_KINDS = ["logo", "other"] as const;
export type ImageKind = typeof IMAGE_KINDS[number];

export const IMAGE_KIND_MAX_COUNTS: Record<ImageKind, number> = {
  logo: 1,
  other: 7,
};

export const IMAGE_HOSTS = ["imgdb", "uploadjs"] as const;
export type ImageHost = typeof IMAGE_HOSTS[number];
