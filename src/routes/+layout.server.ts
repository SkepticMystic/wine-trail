import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

const anyoneAllowed = [
  "/",
  "/signup",
  "/signin",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
  "/unverified-email",
  "/studios",
  "/api/team/join",
];

// const rename = {
//   "post natal": "post-natal",
//   "vinyasa flow": "vinyasa",
//   "yinyasa": "yin",
// };

export const load: LayoutServerLoad = async ({ url, locals, fetch }) => {
  // const studios = await Studios.find({}).lean();

  // let i = 0;
  // for (const studio of studios) {
  //   console.log(`Updating studio ${++i} of ${studios.length}`);

  //   const logo = studio.logo.replace(/350w$/, "300w");

  //   await Studios.updateOne(
  //     { _id: studio._id },
  //     {
  //       $set: {
  //         logo,
  //       },
  //     },
  //   ).exec();
  // }

  // await Studios.updateMany(
  //   { "location.city": "online" },
  //   {
  //     $set: {
  //       onlineClasses: true,
  //     },
  //     $unset: {
  //       "location.city": 1,
  //     },
  //   },
  // );

  // console.log([...styles].sort());

  // let i = 0;
  // for (const studio of studios) {
  //   console.log(`Updating studio ${++i} of ${studios.length}`);
  //   const phone = studio.contact?.phone;
  //   if (!phone) continue;

  //   if (phone.length !== 10) {
  //     await Studios.updateOne(
  //       { _id: studio._id },
  //       {
  //         $unset: {
  //           "contact.phone": 1,
  //         },
  //       },
  //     ).exec();
  //   }
  // }

  // const scraped = await ScrapedStudios.find({}).lean();

  // let i = 0;
  // for (const studio of scraped) {
  //   console.log(`Studio ${++i} of ${scraped.length}`);

  //   const { sourceMoreInfoHref } = studio;
  //   if (!sourceMoreInfoHref) continue;

  //   const slug = sourceMoreInfoHref.split("/").pop();

  //   const styles = studio.styleStr?.split(",").map((s) =>
  //     s.toLowerCase().replaceAll("yoga", "").trim()
  //   );

  //   const phone = studio.contact?.phone;

  //   const update = await Studios.updateOne(
  //     { slug },
  //     {
  //       $set: {
  //         styles,
  //         "contact.phone": phone,
  //       },
  //     },
  //   ).exec();

  //   console.log(update.matchedCount, update.modifiedCount);
  // }

  // await fetch("/api/scrape/yogasouthafrica", { method: "POST" });

  const session = await locals.auth.validate();
  const user = session?.user ?? null;

  const { pathname } = url;
  const onUnauthedRoute = anyoneAllowed.some((route) =>
    route === "/" ? pathname === "/" : pathname.startsWith(route)
  );
  if (onUnauthedRoute) {
    return { user };
  }

  if (!user) {
    throw redirect(
      302,
      `/signin?redirect=${encodeURIComponent(pathname)}`,
    );
  }
  const { emailVerified } = user;

  if (!emailVerified) {
    if (pathname.startsWith("/unverified-email")) return { user };
    else throw redirect(302, "/unverified-email");
  }

  if (pathname.startsWith("/admin") && !user.admin) {
    throw redirect(302, "/");
  }

  return { user };
};
