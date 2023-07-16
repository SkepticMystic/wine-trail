export const PENDING_PATCH_STATUSES = [
  "pending",
  "approved",
  "rejected",
] as const;
export type PendingPatchStatus = typeof PENDING_PATCH_STATUSES[number];
