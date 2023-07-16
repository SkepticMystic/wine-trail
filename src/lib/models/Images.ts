import type { ImageHost, ImageKind } from "$lib/const/images";
import type { ResourceKind } from "$lib/const/resources";
import mongoose from "mongoose";
import type { FileDetails } from "upload-js-full";

type BaseImage = {
  host: ImageHost;

  resource_id: string;
  resource_kind: ResourceKind;

  image_kind: ImageKind;
};

export type Image =
  & BaseImage
  & (
    // | {
    //   host: "imgdb";
    //   data: IImgDB.SuccessReponse["data"];
    // }
    {
      host: "uploadjs";
      data: FileDetails;
    }
  );

const modelName = "Images";
export const Images = mongoose.model<Image>(
  modelName,
  new mongoose.Schema({
    resource_id: {
      type: String,
      required: true,
    },
    resource_kind: {
      type: String,
      required: true,
    },
    image_kind: {
      type: String,
      required: true,
    },
    host: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
  }, {
    timestamps: true,
  }),
  modelName,
);
