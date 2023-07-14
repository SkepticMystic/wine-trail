import type { Studio } from "$lib/models/Studio";

export const buildLocationStr = (location: Studio["location"]) =>
  [
    location.houseNumber,
    location.street,
    location.town,
    location.city,
    location.postalCode,
    location.province,
    location.country,
  ]
    .filter(Boolean)
    .join(", ");
