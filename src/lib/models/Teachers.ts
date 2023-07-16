import { YOGA_STYLES } from "$lib/const/styles";
import { contactSchema } from "$lib/schema/contact";
import { linksSchema } from "$lib/schema/links";
import mongoose from "mongoose";
import { z } from "zod";

export const modifyTeacherSchema = z.object({
  name: z
    .string()
    .min(1, "Name must be at least 1 character long"),

  description: z
    .string()
    .min(1, "Description must be at least 1 character long"),

  styles: z
    .array(
      z.enum(YOGA_STYLES),
    )
    .optional(),

  studio_ids: z
    .array(
      z.string(),
    )
    .optional(),

  links: linksSchema,
  contact: contactSchema,

  hidden: z
    .boolean()
    .optional(),
});

export const teacherSchema = modifyTeacherSchema.extend({
  /** Based off name */
  slug: z.string(),
});

export type ModifyTeacher = z.infer<typeof modifyTeacherSchema>;
export type Teacher = z.infer<typeof teacherSchema>;

const modelName = "Teachers";
export const Teachers = mongoose.model<Teacher>(
  modelName,
  new mongoose.Schema<Teacher>({
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    styles: {
      type: [String],
    },

    studio_ids: {
      type: [String],
      ref: "Studios",
    },

    links: {
      type: Object,
      default: {},
    },

    contact: {
      type: Object,
      default: {},
    },

    hidden: {
      type: Boolean,
    },
  }, { timestamps: true }),
  modelName,
);
