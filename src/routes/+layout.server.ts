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
  "/api/studios/join",
];

export const load: LayoutServerLoad = async ({ url, locals, fetch }) => {
  // const studios = await Studios.find({ logo: { $exists: 1 } }).lean();

  // for (const studio of studios) {
  //   try {
  //     const resp = await fetch(`/api/images`, {
  //       method: "POST",
  //       body: JSON.stringify({
  //         host: "uploadjs",

  //         image_url: studio.logo,
  //         image_kind: "logo",
  //         resource_kind: "studio",
  //         resource_id: studio._id.toString(),
  //       }),
  //     });
  //     console.log(resp.status, await resp.json());
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
