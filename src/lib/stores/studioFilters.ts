import type { YogaStyle } from "$lib/const/styles";
import { writable } from "svelte/store";

export const studioFilters = writable<{
  styles: Set<YogaStyle>;
}>({
  styles: new Set(),
});
