import { APP_CONTACT_INFO } from "$lib/const/contact";
import { Parsers } from "$lib/schema/parsers";
import { suc } from "$lib/utils";
import { sendEmail } from "$lib/utils/email";
import { json } from "@sveltejs/kit";
import { z } from "zod";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
  const { email, message, name } = await Parsers.request(
    request,
    z.object({
      name: z
        .string()
        .min(2, "Name must be at least 2 characters long")
        .max(255, "Name must be less than 255 characters long"),
      email: z
        .string()
        .email("Email must be a valid email address"),
      message: z
        .string()
        .min(3, "Message must be at least 3 characters long")
        .max(2000, "Message must be less than 2000 characters long"),
    }),
  );

  const result = await sendEmail({
    to: APP_CONTACT_INFO.email,
    subject: `New message from ${name}`,
    text: `
      Name: ${name}
      Email: ${email}
      Message: "${message}"
      `,
  });

  console.log(result);

  return json(suc());
};
