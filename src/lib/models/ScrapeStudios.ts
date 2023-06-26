import { COUNTRIES, type Country } from "$lib/const/locations";
import mongoose from "mongoose";

export type ScrapedStudio = {
  name: string;
  description?: string;
  imageSource: string;

  styleStr?: string;

  dataSource: "yogasouthafrica.co.za";
  sourceMoreInfoHref?: string;

  location: {
    country: Country;
    province?: string;
    city?: string;
    town?: string;

    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };

  links?: {
    websiteHome?: string;
    facebook?: string;
    instagram?: string;
  };

  contact?: {
    phone?: string;
    email?: string;
  };

  schedule?: {
    kind: "studio-site";
    data: string;
  } | {
    kind: "book-a-mat";
    data: string;
  };

  moreImages?: string[];
};

const modelName = "ScrapedStudios";
export const ScrapedStudios = mongoose.model<ScrapedStudio>(
  modelName,
  new mongoose.Schema<ScrapedStudio>({
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },

    styleStr: {
      type: String,
    },

    dataSource: {
      type: String,
      required: true,
    },

    imageSource: {
      type: String,
      required: true,
    },
    sourceMoreInfoHref: {
      type: String,
    },

    location: {
      country: {
        type: String,
        required: true,
        enum: COUNTRIES,
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

    links: {
      websiteHome: {
        type: String,
      },

      facebook: {
        type: String,
      },
      instagram: {
        type: String,
      },
    },

    contact: {
      phone: {
        type: String,
      },
      email: {
        type: String,
      },
    },

    moreImages: {
      type: [String],
    },
  }, { timestamps: true }),
  modelName,
);
