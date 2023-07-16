export const SCHEDULE_KINDS = [
  "none",
  "studio-site",
  "book-a-mat",
  "image",
] as const;
export type ScheduleKind = typeof SCHEDULE_KINDS[number];
