import { getUser } from "$lib/auth/server";
import { modifyStudioSchema, Studios } from "$lib/models/Studio";
import { Parsers } from "$lib/schema/parsers";
import { makeSlug, suc } from "$lib/utils";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ locals, request }) => {
  const [user, input] = await Promise.all([
    getUser(locals, { admin: true }),
    Parsers.request(request, modifyStudioSchema),
  ]);

  const slug = makeSlug(input.name);

  const studio = await Studios.create({
    ...input,
    slug,
  });

  return json(suc({ studio }));
};
