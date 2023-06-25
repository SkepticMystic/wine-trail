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
  "/api/team/join",
];

export const load: LayoutServerLoad = async ({ url, locals }) => {
  // const studios = await Studios.find({}).exec();

  // let i = 0;
  // for (const studio of studios) {
  //   console.log(`Updating studio ${++i} of ${studios.length}`);
  //   const description = studio.description.trim();

  //   await Studios.updateOne(
  //     { _id: studio._id },
  //     { $set: { description } },
  //   ).exec();
  // }

  const session = await locals.auth.validate();
  const user = session?.user ?? null;

  const { pathname } = url;
  const onUnauthedRoute = anyoneAllowed.some((route) => pathname === route);
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
