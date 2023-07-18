import { canModifyResource, canModifyStudio } from "$lib/auth/permissions";
import { Images } from "$lib/models/Images";
import { Studios } from "$lib/models/Studio";
import { Teachers } from "$lib/models/Teachers";
import { _idToString, shuffleArray } from "$lib/utils";
import {
  fillInStudioBlanks,
  fillInTeacherBlanks,
} from "$lib/utils/resources/studios";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ locals }) => {
  const [session, allStudios, allTeachers, allImages] = await Promise.all([
    locals.auth.validate(),
    Studios
      .find({}, { createdAt: 0, updatedAt: 0, __v: 0 })
      .lean(),
    Teachers
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
    .map(fillInStudioBlanks);

  const teachers = allTeachers
    .filter((s) => {
      // Owners can view their own
      // Admin can view all
      if (canModifyResource(session?.user, "teacher", s._id.toString())) {
        return true;
      }

      // Otherwise, only show non-hidden teachers
      return !s.hidden;
    })
    .map(_idToString)
    .map(fillInTeacherBlanks);

  const studio_ids = studios.map((s) => s._id.toString());
  const teacher_ids = teachers.map((s) => s._id.toString());

  const images = allImages
    .filter((i) =>
      (i.resource_kind === "studio" &&
        studio_ids.includes(i.resource_id.toString())) ||
      (i.resource_kind === "teacher" &&
        teacher_ids.includes(i.resource_id.toString()))
    )
    .map(_idToString);

  return json({
    images,
    studios: shuffleArray(studios),
    teachers: shuffleArray(teachers),
  });
};
