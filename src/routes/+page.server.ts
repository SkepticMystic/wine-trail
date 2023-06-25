import { Studios } from "$lib/models/Studio";
import { _idToString } from "$lib/utils";
import type { PageServerLoad } from "./$types";

export const load = (async () => {
  const studios = await Studios.find({}).lean();

  return {
    studios: studios.map(_idToString),
  };
}) satisfies PageServerLoad;
