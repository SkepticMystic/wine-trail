import { Users } from "$lib/auth/lucia";
import { getUser } from "$lib/auth/server";
import { RESOURCE_KINDS } from "$lib/const/pendingPatches";
import { OTPs } from "$lib/models/OTPs";
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

  const [admin, pendingInvites, users] = await Promise.all([
    getUser(locals, { admin: true }),
    OTPs.find(
      {
        kind: resource_kind === "studio"
          ? "studio-owner-invite"
          : resource_kind === "teacher"
          ? "teacher-invite"
          : undefined,
      },
      { kind: 1, identifier: 1, data: 1 },
    ).lean(),
    Users.find(
      // It's a bit harder to filter on users (based on resource_kind), so just show all users, and filter on the frontend
      {},
      { email: 1, studio_ids: 1 },
    ).lean(),
  ]);

  return {
    pendingInvites: pendingInvites.map(_idToString),
    users: users.map(_idToString),
  };
}) satisfies PageServerLoad;
