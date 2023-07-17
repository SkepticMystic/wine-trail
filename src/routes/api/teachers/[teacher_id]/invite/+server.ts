import { Users } from "$lib/auth/lucia";
import { getUser } from "$lib/auth/server";
import { OTP, OTPs } from "$lib/models/OTPs";
import { Teachers } from "$lib/models/Teachers";
import { Parsers } from "$lib/schema/parsers";
import { suc } from "$lib/utils";
import { error, json } from "@sveltejs/kit";
import { z } from "zod";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async (
  { locals, request, url, params },
) => {
  const [admin, invite] = await Promise.all([
    getUser(locals, { admin: true }),
    Parsers.request(
      request,
      z.object({
        email: z.string().email(),
      }),
    ),
  ]);

  const [teacher, existingInvite, existingTeacher] = await Promise.all([
    Teachers.findOne(
      { _id: params.teacher_id },
      { name: 1 },
    ).lean(),
    OTPs.exists({
      kind: "teacher-invite",
      "data.teacher_id": params.teacher_id,
      "identifier": `email:${invite.email}`,
    }).lean(),
    Users.exists({
      email: invite.email,
      teacher_ids: params.teacher_id,
    }).lean(),
  ]);
  if (!teacher) {
    throw error(404, "Teacher not found");
  } else if (existingInvite) {
    throw error(
      400,
      "Invite already sent. Teacher has not yet signed up.",
    );
  } else if (existingTeacher) {
    throw error(400, "User already owns this teacher");
  }

  await OTP.handleLinks["teacher-invite"]({
    url,
    idValue: invite.email,
    teacher_name: teacher.name,
    data: { teacher_id: params.teacher_id },
  });

  return json(suc());
};
