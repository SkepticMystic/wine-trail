export const PENDING_PATCH_STATUSES = [
  "pending",
  "approved",
  "rejected",
] as const;
export type PendingPatchStatus = typeof PENDING_PATCH_STATUSES[number];

export const RESOURCE_KINDS = ["studio", "teacher"] as const;
export type ResourceKind = typeof RESOURCE_KINDS[number];
