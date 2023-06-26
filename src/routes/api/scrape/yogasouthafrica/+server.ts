import { type ScrapedStudio, ScrapedStudios } from "$lib/models/ScrapeStudios";
import { json } from "@sveltejs/kit";
import axios from "axios";
import { parse } from "node-html-parser";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({}) => {
  // Grap all the basic scraped studios
  // We're gonna fill in the gaps
  const studios = await ScrapedStudios.find({}).lean();

  let i = 0;
  for (const studio of studios) {
    console.log(`Studio ${++i} of ${studios.length}`);
    if (!studio.sourceMoreInfoHref) continue;

    // Get the more info page
    const { data: moreInfoPage } = await axios.get(studio.sourceMoreInfoHref);

    const moreInfoPageDoc = parse(
      moreInfoPage,
    );

    let section = moreInfoPageDoc.querySelector("section");
    if (!section) continue;

    let linksRow = section.querySelector(".image-subtitle");

    let styles = linksRow?.querySelector("p")?.innerText;

    let phone = linksRow?.querySelectorAll("p")?.pop()?.innerText;

    let linksArray = linksRow
      ? [...linksRow.querySelectorAll("a")].map((a) => ({
        type: a.innerText.toLowerCase(),
        href: a.attributes.href,
      }))
      : [];

    let links = linksArray.reduce((acc, l) => {
      if (!l) {}
      else if (l.type === "website") {
        acc.websiteHome = l.href;
      } else if (l.type === "facebook") {
        acc.facebook = l.href;
      } else if (l.type === "instagram") {
        acc.instagram = l.href;
      }

      return acc;
    }, {} as NonNullable<ScrapedStudio["links"]>);

    let description = section.querySelector(".sqs-html-content")?.innerText;

    let scheduleLink = section.querySelector(
      ".sqs-block-button-element--medium",
    )?.attributes.href;

    let schedule = scheduleLink
      ? {
        kind: "studio-site",
        data: scheduleLink,
      }
      : undefined;

    let moreImages = [...section.querySelectorAll(".gallery-block img")].map(
      (i) => {
        return i.attributes["data-src"];
      },
    );

    let coordinates: ScrapedStudio["location"]["coordinates"] = undefined;

    let map = section.querySelector(".map-block");
    if (map) {
      let mapData = JSON.parse(
        map.attributes["data-block-json"],
      ) as LeafletData;

      coordinates = {
        latitude: mapData.location.markerLat,
        longitude: mapData.location.markerLng,
      };
    }

    await ScrapedStudios.updateOne(
      { _id: studio._id },
      {
        $set: {
          dataSource: "yogasouthafrica.co.za",
          styleStr: styles?.toLowerCase().includes("yoga") ? styles : undefined,

          "contact.phone": /\d+/.test(phone ?? "") ? phone : undefined,

          links,
          description,
          moreImages,
          schedule,
          "location.coordinates": coordinates,
        },
      },
    );
  }

  return json({ success: true });
};

type LeafletData = {
  "location": {
    "mapLat": number;
    "mapLng": number;
    "mapZoom": number;
    "addressTitle": string;
    "addressLine1": string;
    "addressLine2": string;
    "addressCountry": string;
    "markerLat": number;
    "markerLng": number;
  };
  "vSize": number;
  "style": number;
  "labels": boolean;
  "terrain": boolean;
  "controls": boolean;
  "hSize": null;
  "floatDir": null;
};
