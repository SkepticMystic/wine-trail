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

export const load: LayoutServerLoad = async ({ url, locals }) => {
  // const studios = await Studios.find({}).lean();

  // let i = 0;
  // for (const studio of studios) {
  //   console.log(`Updating studio ${++i} of ${studios.length}`);
  //   const email = studio.links?.email;
  //   if (!email) continue;

  //   await Studios.updateOne(
  //     { _id: studio._id },
  //     {
  //       $set: { "contact.email": email },
  //       $unset: { "links.email": 1 },
  //     },
  //   ).exec();
  // }

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
