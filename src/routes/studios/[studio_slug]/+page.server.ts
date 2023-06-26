import { Studios } from "$lib/models/Studio";
import { _idToString } from "$lib/utils";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params }) => {
  const studio = await Studios.findOne({ slug: params.studio_slug }).lean();

  if (!studio) {
    throw error(404, "We couldn't find that studio.");
  }

  return { studio: _idToString(studio) };
}) satisfies PageServerLoad;
