import { COUNTRIES } from "$lib/const/locations";
import { YOGA_STYLES } from "$lib/const/styles";
import { contactSchema } from "$lib/schema/contact";
import { linksSchema } from "$lib/schema/links";
import mongoose from "mongoose";
import { z } from "zod";

export const modifyStudioSchema = z.object({
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

  onlineClasses: z
    .boolean()
    .optional(),

  links: linksSchema,
  contact: contactSchema,

  location: z
    .object({
      country: z
        .enum(COUNTRIES, {
          invalid_type_error: "Country must be a valid country",
        }),

      province: z
        .string()
        .optional(),

      city: z
        .string()
        .optional(),

      town: z
        .string()
        .optional(),

      postalCode: z
        .string()
        .optional(),

      street: z
        .string()
        .optional(),

      houseNumber: z
        .string()
        .optional(),

      coordinates: z.object({
        latitude: z.number({
          required_error: "Please choose a valid location",
        }),
        longitude: z.number({
          required_error: "Please choose a valid location",
        }),
      }),
    }),

  // NOTE: ScheduleKind is not linked to the type
  schedule: z
    .discriminatedUnion("kind", [
      z.object({
        kind: z.literal("none"),
      }),
      z.object({
        kind: z.literal("image"),
      }),
      z.object({
        kind: z.enum(["studio-site", "book-a-mat"]),
        data: z
          .string({
            required_error:
              "Schedule URL is required. Either provide a URL, or choose 'None'.",
          })
          .url("Schedule URL must be a valid URL"),
      }),
    ]),

  hidden: z.boolean().optional(),
});

export const studioSchema = modifyStudioSchema.extend({
  /** Based off name */
  slug: z.string(),
});

export type ModifyStudio = z.infer<typeof modifyStudioSchema>;
export type Studio = z.infer<typeof studioSchema>;

const modelName = "Studios";
export const Studios = mongoose.model<Studio>(
  modelName,
  new mongoose.Schema<Studio>({
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

    onlineClasses: {
      type: Boolean,
    },

    links: {
      type: Object,
      default: {},
    },

    contact: {
      type: Object,
      default: {},
    },

    location: {
      type: Object,
      required: true,
    },

    schedule: {
      type: Object,
      default: {
        kind: "none",
      },
    },

    hidden: {
      type: Boolean,
    },
  }, { timestamps: true }),
  modelName,
);
