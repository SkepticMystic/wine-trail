import { getUser } from "$lib/auth/server";
import { modifyTeacherSchema, Teachers } from "$lib/models/Teachers";
import { Parsers } from "$lib/schema/parsers";
import { makeSlug, suc } from "$lib/utils";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ locals, request }) => {
  const [user, input] = await Promise.all([
    getUser(locals, { admin: true }),
    Parsers.request(request, modifyTeacherSchema),
  ]);

  const slug = makeSlug(input.name);

  const teacher = await Teachers.create({
    ...input,
    slug,
  });

  return json(suc({ teacher }));
};
