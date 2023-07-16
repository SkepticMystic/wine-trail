import type { ResourceKind } from "$lib/const/pendingPatches";
import type { User } from "lucia";

export const canModifyResource = (
  user: User | null | undefined,
  resource_kind: ResourceKind,
  resource_id: string,
) => {
  if (user?.admin) return true;

  switch (resource_kind) {
    case "studio": {
      return user?.studio_ids?.includes(resource_id);
    }

    case "teacher": {
      return user?.teacher_ids?.includes(resource_id);
    }

    default: {
      throw new Error(`Unknown resource kind: ${resource_kind}`);
    }
  }
};

export const canModifyStudio = (
  user: User | null | undefined,
  studio_id: string,
) => canModifyResource(user, "studio", studio_id);
