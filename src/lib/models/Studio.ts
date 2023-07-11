import { COUNTRIES } from "$lib/const/locations";
import { YOGA_STYLES } from "$lib/const/styles";
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

  logo: z
    .string()
    .url("Logo must be a valid URL"),
  moreImages: z
    .array(
      z.string().url("Image must be a valid URL"),
    ).optional(),

  onlineClasses: z
    .boolean()
    .optional(),

  links: z.object({
    website: z
      .string()
      .url("Website must be a valid URL")
      .optional(),
    facebook: z
      .string()
      .url("Facebook must be a valid URL")
      .optional(),
    instagram: z
      .string()
      .url("Instagram must be a valid URL")
      .optional(),
  }),

  contact: z.object({
    phone: z
      .string()
      .optional(),
    email: z
      .string()
      .email("Email must be a valid email address")
      .optional(),
  }),

  location: z
    .object({
      country: z
        .enum(COUNTRIES, {
          invalid_type_error: "Country must be a valid country",
        }),
      province: z
        .string()
        .toLowerCase()
        .optional(),
      city: z
        .string()
        .toLowerCase()
        .optional(),
      town: z
        .string()
        .toLowerCase()
        .optional(),

      coordinates: z.object({
        latitude: z.number(),
        longitude: z.number(),
      }).optional(),
    }),

  schedule: z
    .discriminatedUnion("kind", [
      z.object({
        kind: z.literal("none"),
      }),
      z.object({
        kind: z.enum(["studio-site", "book-a-mat"]),
        data: z
          .string()
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

    logo: {
      type: String,
      required: true,
    },
    moreImages: {
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

    schedule: Object,

    // TODO: Implement
    hidden: {
      type: Boolean,
    },
  }, { timestamps: true }),
  modelName,
);
