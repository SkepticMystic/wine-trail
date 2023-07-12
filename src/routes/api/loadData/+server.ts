import { canModifyStudio } from "$lib/auth/permissions";
import { Images } from "$lib/models/Images";
import { Studios } from "$lib/models/Studio";
import { _idToString, shuffleArray } from "$lib/utils";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ locals }) => {
  const [session, allStudios, allImages] = await Promise.all([
    locals.auth.validate(),
    Studios
      .find({}, { createdAt: 0, updatedAt: 0, __v: 0 })
      .lean(),
    Images
      .find({}, {
        _id: 1,
        data: 1,
        host: 1,
        image_kind: 1,
        resource_id: 1,
        resource_kind: 1,
      })
      .lean(),
  ]);

  const studios = allStudios
    .filter((s) => {
      // Owners can view their own
      // Admin can view all
      if (canModifyStudio(session?.user, s._id.toString())) {
        return true;
      }

      // Otherwise, only show non-hidden studios
      return !s.hidden;
    })
    .map(_idToString)
    .map((s) => {
      if (!s.links) s.links = {};
      if (!s.contact) s.contact = {};
      if (!s.schedule) {
        s.schedule = {
          kind: "none",
        };
      }

      return s;
    });

  const studio_ids = studios.map((s) => s._id.toString());

  const images = allImages
    .filter((i) =>
      i.resource_kind === "studio" &&
      studio_ids.includes(i.resource_id.toString())
    )
    .map(_idToString);

  return json({
    images,
    studios: shuffleArray(studios),
  });
};
