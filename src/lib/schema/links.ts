import { LINK_KINDS } from "$lib/const/links";
import { z } from "zod";

export const linksSchema = z.record(
  z.enum(LINK_KINDS),
  z
    .string()
    // Empty string -> undefined
    .transform((v) => v || undefined)
    .refine((v) => !v || v.startsWith("http"), 'Link must start with "http"')
    .optional(),
);
