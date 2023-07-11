import { dev } from "$app/environment";
import type { SID } from "$lib/interfaces";
import { mongoose as luciaMongooseAdapter } from "@lucia-auth/adapter-mongoose";
import { lucia } from "lucia";
import { sveltekit } from "lucia/middleware";
import mongoose, { Model } from "mongoose";

export const Users =
  <Model<SID<Lucia.DatabaseUserAttributes>>> mongoose.models["auth_user"] ||
  mongoose.model<Model<SID<Lucia.DatabaseUserAttributes>>>(
    "auth_user",
    new mongoose.Schema(
      {
        _id: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
        },
        emailVerified: {
          type: Boolean,
          required: true,
        },
        studio_ids: {
          type: [String],
          ref: "Studios",
        },

        admin: {
          type: Boolean,
        },
      },
      { _id: false },
    ),
  );

const Sessions = mongoose.models["auth_session"] ||
  mongoose.model(
    "auth_session",
    new mongoose.Schema(
      {
        _id: {
          type: String,
        },
        user_id: {
          type: String,
          required: true,
        },
        active_expires: {
          type: Number,
          required: true,
        },
        idle_expires: {
          type: Number,
          required: true,
        },
      },
      { _id: false },
    ),
  );

const Keys = mongoose.models["auth_key"] ||
  mongoose.model(
    "auth_key",
    new mongoose.Schema(
      {
        _id: {
          type: String,
        },
        user_id: {
          type: String,
          required: true,
        },
        hashed_password: {
          type: String,
        },
      },
      { _id: false },
    ),
  );

export const auth = lucia({
  env: dev ? "DEV" : "PROD",
  middleware: sveltekit(),

  adapter: luciaMongooseAdapter({
    User: Users,
    Session: Sessions,
    Key: Keys,
  }),

  getUserAttributes: (
    { email, emailVerified, admin, studio_ids },
  ) => ({
    // Included by default:
    // userId: id,
    admin,
    email,
    emailVerified,
    studio_ids,
  }),
});

export type Auth = typeof auth;
