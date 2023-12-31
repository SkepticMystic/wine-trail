import {
  PENDING_PATCH_STATUSES,
  type PendingPatchStatus,
} from "$lib/const/pendingPatches";
import { RESOURCE_KINDS, type ResourceKind } from "$lib/const/resources";
import type { SID } from "$lib/interfaces";
import mongoose from "mongoose";
import type { ModifyStudio } from "./Studio";
import type { ModifyTeacher } from "./Teachers";

type PendingPatchBase = {
  /** The YogaList user that owns the resource and last updated or created the patch */
  user_id: string;
  status: PendingPatchStatus;
  resource_id: string;
  resource_kind: ResourceKind;
};

type PendingStudioPatch = PendingPatchBase & {
  resource_kind: "studio";
  patch: SID<ModifyStudio>;
};

type PendingTeacherPatch = PendingPatchBase & {
  resource_kind: "teacher";
  patch: SID<ModifyTeacher>;
};

export type PendingPatch =
  | PendingStudioPatch
  | PendingTeacherPatch;

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
