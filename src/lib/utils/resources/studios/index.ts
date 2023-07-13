import type { Studio } from "$lib/models/Studio";

export const fillInStudioBlanks = <S extends Studio>(studio: S) => {
  if (!studio.links) studio.links = {};
  if (!studio.contact) studio.contact = {};
  if (!studio.schedule) {
    studio.schedule = {
      kind: "none",
    };
  }

  return studio;
};
