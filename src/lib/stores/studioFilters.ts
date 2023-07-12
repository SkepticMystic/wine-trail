import type { YogaStyle } from "$lib/const/styles";
import type { Studio } from "$lib/models/Studio";
import { writable } from "svelte/store";

export const studioFilters = writable<{
  styles: Set<YogaStyle>;
  location: Record<
    keyof Omit<
      Studio["location"],
      "coordinates" | "houseNumber" | "postalCode" | "street"
    >,
    Set<string>
  >;
}>({
  styles: new Set(),
  location: {
    city: new Set(),
    country: new Set(),
    province: new Set(),
    town: new Set(),
  },
});
