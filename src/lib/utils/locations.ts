import type { Studio } from "$lib/models/Studio";

export const buildLocationArray = (location: Studio["location"]) =>
  [
    { preview: true, str: location.houseNumber },
    { preview: true, str: location.street },
    { preview: false, str: location.town },
    { preview: true, str: location.city },
    { preview: false, str: location.postalCode },
    { preview: true, str: location.province },
    { preview: true, str: location.country },
  ]
    .filter((l) => l.str) as { preview: boolean; str: string }[];

export const buildLocationStr = (
  locationArray: ReturnType<typeof buildLocationArray>,
  preview?: boolean,
) =>
  locationArray
    .filter((l) => !preview || l.preview)
    .map((l) => l.str)
    .join(", ");
