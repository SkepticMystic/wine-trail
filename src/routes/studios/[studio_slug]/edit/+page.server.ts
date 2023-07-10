import { getUser } from "$lib/auth/server";
import { Studios } from "$lib/models/Studio";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ locals, params }) => {
  const [user, studio] = await Promise.all([
    getUser(locals),
    Studios.findOne({ slug: params.studio_slug }).lean(),
  ]);

  if (!studio) {
    throw error(404, "Studio not found");
  }

  if (!user.admin && !user.studio_ids?.includes(studio._id.toString())) {
    throw error(403, "You do not own this studio");
  }

  return {};
}) satisfies PageServerLoad;
