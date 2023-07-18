import { getUser } from "$lib/auth/server";
import type { SID } from "$lib/interfaces";
import { type PendingPatch, PendingPatches } from "$lib/models/PendingPatches";
import { _idToString } from "$lib/utils";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ locals, params }) => {
  const [admin, pendingPatch] = await Promise.all([
    getUser(locals, { admin: true }),
    PendingPatches.findOne(
      { _id: params.pendingPatch_id },
    ).lean(),
  ]);

  if (!pendingPatch) {
    throw error(404, "Pending patch not found");
  }

  return {
    pendingPatch: _idToString(pendingPatch) as SID<PendingPatch>,
  };
}) satisfies PageServerLoad;
