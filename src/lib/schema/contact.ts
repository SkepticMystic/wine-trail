import { z } from "zod";

export const contactSchema = z.object({
  phone: z
    .string()
    .transform((v) => v || undefined)
    .optional(),

  email: z
    .string()
    .transform((v) => v || undefined)
    .refine(
      (v) => !v || z.string().email().safeParse(v).success,
      "Email must be a valid email address",
    )
    .optional(),
});
