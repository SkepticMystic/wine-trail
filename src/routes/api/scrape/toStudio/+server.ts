// const scraped = await ScrapedStudios.find({}).lean();

// let i = 0;
// for (const studio of scraped) {
//   console.log(`Studio ${++i} of ${scraped.length}`);

//   const slug = studio.sourceMoreInfoHref!.split("/").pop();

//   const logo = studio.imageSource;

//   const links: Studio["links"] = {
//     facebook: studio.links?.facebook
//       ?.split("?")[0]
//       .trim(),
//     instagram: studio.links?.instagram
//       ?.split("?")[0]
//       .trim(),
//     website: studio.links?.websiteHome
//       ?.split("?")[0]
//       .trim(),
//     email: studio.links?.email
//       ?.split("mailto:").pop()
//       ?.split("?")[0]
//       .trim(),
//   };

//   if (Object.keys(studio.location.coordinates ?? {}).length === 0) {
//     delete studio.location.coordinates;
//   }

//   const newStudioParse = studioSchema.safeParse({
//     slug,
//     logo,
//     links,
//     name: studio.name,
//     description: studio.description,
//     schedule: studio.schedule,
//     location: studio.location,
//     moreImages: studio.moreImages,
//   });

//   if (!newStudioParse.success) {
//     console.log(newStudioParse.error.issues[0]);
//     console.log(slug);
//     continue;
//   }

//   try {
//     await Studios.create(
//       newStudioParse.data,
//     );
//   } catch (error) {
//     if (error?.code !== 11000) {
//       console.log(error);
//     } else console.log("Duplicate");
//   }
// }
