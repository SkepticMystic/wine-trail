import { RESOURCE_KINDS } from "$lib/const/resources";
import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

const anyoneAllowed: string[] = [
  "/",
  "/signup",
  "/signin",

  "/contact",
  "/about",

  "/legal",

  "/forgot-password",
  "/reset-password",
  "/verify-email",
  "/unverified-email",

  // All users can see the resource page, and accept an invite from it
  ...RESOURCE_KINDS.flatMap((kind) => [
    `/${kind}s`,
    `/api/${kind}s/join`,
  ]),
];

export const load: LayoutServerLoad = async ({ url, locals, fetch }) => {
  // NOTE: Delete all images (on db and host)
  // const images = await Images.find().lean();

  // let i = 0;
  // for (const image of images) {
  //   const resp = await fetch(`/api/images/${image._id}`, {
  //     method: "DELETE",
  //   });

  //   console.log(i++, resp.status, await resp.json());
  // }

  // NOTE: Upload all studio logos to host
  // const studios = await Studios.find({ logo: { $exists: 1 } }).lean();

  // let i = 0;
  // for (const studio of studios) {
  //   try {
  //     const resp = await fetch(`/api/images`, {
  //       method: "POST",
  //       body: JSON.stringify({
  //         host: "uploadjs",

  //         image_url: studio.logo.split("?")[0],
  //         image_kind: "logo",
  //         resource_kind: "studio",
  //         resource_id: studio._id.toString(),
  //       }),
  //     });
  //     console.log(i++, resp.status, await resp.json());
  //   } catch (error) {
  //     console.error(error);
  //   }
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
