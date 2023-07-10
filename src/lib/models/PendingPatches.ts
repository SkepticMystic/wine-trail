import {
  PENDING_PATCH_STATUSES,
  type PendingPatchStatus,
  RESOURCE_KINDS,
} from "$lib/const/pendingPatches";
import mongoose from "mongoose";
import type { ModifyStudio } from "./Studio";

type PendingStudioPatch = {
  resource_kind: "studio";
  patch: Partial<ModifyStudio>;
};

export type PendingPatch = {
  /** The YogaList user that owns the resource */
  user_id: string;
  status: PendingPatchStatus;
  resource_id: string;
} & PendingStudioPatch;

const modelName = "PendingPatches";
export const PendingPatches = mongoose.model<PendingPatch>(
  modelName,
  new mongoose.Schema({
    user_id: {
      type: String,
      required: true,
      ref: "auth_user",
    },
    status: {
      type: String,
      enum: PENDING_PATCH_STATUSES,
      required: true,
    },
    resource_kind: {
      type: String,
      enum: RESOURCE_KINDS,
      required: true,
    },
    resource_id: {
      type: String,
      required: true,
    },
    patch: {
      type: Object,
      required: true,
    },
  }, { timestamps: true }),
  modelName,
);