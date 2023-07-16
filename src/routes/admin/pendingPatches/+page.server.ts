import { getUser } from "$lib/auth/server";
import { RESOURCE_KINDS } from "$lib/const/resources";
import { PendingPatches } from "$lib/models/PendingPatches";
import { Parsers } from "$lib/schema/parsers";
import { _idToString } from "$lib/utils";
import { z } from "zod";
import type { PageServerLoad } from "./$types";

export const load = (async ({ locals, url }) => {
  const { resource_kind } = Parsers.params(
    url,
    z.object({
      resource_kind: z.enum(RESOURCE_KINDS).optional(),
    }),
  );

  const [admin, pendingPatches] = await Promise.all([
    getUser(locals, { admin: true }),
    PendingPatches.find(
      { resource_kind, status: "pending" },
      { _id: 1, resource_kind: 1, updatedAt: 1, resource_id: 1 },
    ).lean(),
  ]);

  return {
    pendingPatches: pendingPatches.map(_idToString),
  };
}) satisfies PageServerLoad;
