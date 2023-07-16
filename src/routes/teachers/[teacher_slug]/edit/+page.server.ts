import { canModifyResource } from "$lib/auth/permissions";
import { getUser } from "$lib/auth/server";
import { Teachers } from "$lib/models/Teachers";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ locals, params }) => {
  const [user, teacher] = await Promise.all([
    getUser(locals),
    Teachers.findOne({ slug: params.teacher_slug }).lean(),
  ]);

  if (!teacher) {
    throw error(404, "Teacher not found");
  }

  if (!canModifyResource(user, "teacher", teacher._id.toString())) {
    throw error(403, "You cannot edit this teacher");
  }

  return {};
}) satisfies PageServerLoad;
