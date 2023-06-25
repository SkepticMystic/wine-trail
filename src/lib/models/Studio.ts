import { COUNTRIES } from "$lib/const/locations";
import mongoose from "mongoose";
import { z } from "zod";

export const studioSchema = z.object({
  name: z.string(),
  /** Based off name */
  slug: z.string(),
  description: z.string(),

  logo: z.string(),
  moreImages: z.array(z.string()).optional(),

  links: z.object({
    website: z.string().url().optional(),
    facebook: z.string().url().optional(),
    instagram: z.string().url().optional(),
    email: z.string().email().optional(),
  }),

  location: z.object({
    country: z.enum(COUNTRIES),
    province: z.string().optional(),
    city: z.string().optional(),
    town: z.string().optional(),

    coordinates: z.object({
      latitude: z.number(),
      longitude: z.number(),
    }).optional(),
  }),

  schedule: z.object({
    kind: z.enum(["studio-site", "book-a-mat"]),
    data: z.string(),
  }).optional(),
});

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

    logo: {
      type: String,
      required: true,
    },
    moreImages: {
      type: [String],
    },

    links: {
      website: {
        type: String,
      },
      facebook: {
        type: String,
      },
      instagram: {
        type: String,
      },
      email: {
        type: String,
      },
    },

    location: {
      country: {
        type: String,
        required: true,
      },
      province: {
        type: String,
      },
      city: {
        type: String,
      },
      town: {
        type: String,
      },

      coordinates: {
        latitude: {
          type: Number,
        },
        longitude: {
          type: Number,
        },
      },
    },

    schedule: Object,
  }, { timestamps: true }),
  modelName,
);
