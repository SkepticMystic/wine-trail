import { Studios } from "$lib/models/Studio";
import { _idToString, shuffleArray } from "$lib/utils";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ locals }) => {
  const [session, studios] = await Promise.all([
    locals.auth.validate(),
    Studios.find(
      {},
      { createdAt: 0, updatedAt: 0, __v: 0 },
    ).lean(),
  ]);

  return json({
    studios: shuffleArray(
      studios
        .filter((s) => {
          // Admins can view all
          if (session?.user?.admin) {
            return true;
          }

          // Users can view their own studios, even if hidden
          if (session?.user?.studio_ids?.includes(s._id.toString())) {
            return true;
          }

          // Otherwise, only show non-hidden studios
          return !s.hidden;
        })
        .map(_idToString)
        .map((s) => {
          if (!s.links) {
            s.links = {};
          }
          if (!s.contact) {
            s.contact = {};
          }
          if (!s.schedule) {
            s.schedule = {
              kind: "none",
            };
          }

          return s;
        }),
    ),
  });
};
