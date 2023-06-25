import mongoose from "mongoose";
import { z } from "zod";

export const studioSchema = z.object({
  name: z.string(),
  description: z.string(),

  imageSource: z.string(),
  href: z.string().url(),

  location: z.object({
    country: z.string(),
    // region: z.string(),
    // town: z.string(),

    // coordinates: z.object({
    //   latitude: z.number(),
    //   longitude: z.number(),
    // }),
  }),
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
    description: {
      type: String,
      required: true,
    },

    imageSource: {
      type: String,
      required: true,
    },
    href: {
      type: String,
      required: true,
    },

    location: {
      country: {
        type: String,
        required: true,
      },
      //   region: {
      //     type: String,
      //     required: true,
      //   },
      //   town: {
      //     type: String,
      //     required: true,
      //   },

      //   coordinates: {
      //     latitude: {
      //       type: Number,
      //       required: true,
      //     },
      //     longitude: {
      //       type: Number,
      //       required: true,
      //     },
      //   },
    },
  }, { timestamps: true }),
  modelName,
);
