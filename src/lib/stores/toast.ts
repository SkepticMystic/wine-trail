import { nanoid } from "nanoid";
import { writable } from "svelte/store";

export type Toast = {
  /** Random nanoid generated on addToast. Used to removeToast later */
  id: string;
  message: string;
  type: "success" | "error" | "info" | "warning";
  /** How many ms to show for before removing */
  duration_ms?: number;
  /** Only render toast if current $page.url.path.startsWith(route).
   * By default, shows on all routes
   */
  showOnRoutes?: string[];
};

export const toast = writable<Toast[]>([]);

/** Push a toast onto the store, generating and returning a nanoid */
export const addToast = (
  t: Omit<Toast, "id">,
  {
    clearQueue = false,
  }: {
    clearQueue?: boolean;
  } = {},
) => {
  const id = nanoid(6);

  toast.update((old) => {
    const newToast = { ...t, id };

    if (clearQueue) return [newToast];
    else return [...old, newToast];
  });

  return { id };
};

/** Remove a toast from the store by id */
export const removeToast = (id: Toast["id"]) => {
  toast.update((old) => old.filter((t) => t.id !== id));
};
