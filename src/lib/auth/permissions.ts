import type { User } from "lucia";

export const canModifyStudio = (user: User | null, studio_id: string) =>
  user?.admin || user?.studio_ids?.includes(studio_id);
