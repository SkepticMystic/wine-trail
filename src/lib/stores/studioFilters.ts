import type { YogaStyle } from "$lib/const/styles";
import type { Studio } from "$lib/models/Studio";
import { writable } from "svelte/store";

type StudioFilters = {
  styles: Set<YogaStyle>;
  location: Record<
    keyof Omit<
      Studio["location"],
      "coordinates" | "houseNumber" | "postalCode" | "street"
    >,
    Set<string>
  >;
};

export const DEFAULT_STUDIO_FILTERS: () => StudioFilters = () => ({
  styles: new Set(),
  location: {
    city: new Set(),
    country: new Set(),
    province: new Set(),
    town: new Set(),
  },
});

const store = writable<StudioFilters>({
  ...DEFAULT_STUDIO_FILTERS(),
});

export const studioFilters = {
  ...store,
};
