import { error, redirect } from "@sveltejs/kit";

export interface GetUserOptions {
  /** Must be an admin */
  admin?: boolean;
  /** If unauthed, redirect to signin with this url as the redirect param */
  url?: URL;
}

const DEFAULT_OPTIONS: GetUserOptions = {
  admin: false,
  url: undefined,
};

/** The catch-all function to get the current user.
 * Check roles.
 * Redirect to signin if not logged in.
 */
export const getUser = async (locals: App.Locals, options?: GetUserOptions) => {
  const { admin, url } = Object.assign(
    { ...DEFAULT_OPTIONS },
    options ?? {},
  );

  const session = await locals.auth.validate();
  if (!session) throw redirect(302, `/signin?redirect=${url?.pathname ?? "/"}`);
  const { user } = session;

  if (admin && !user.admin) throw error(403, "Forbidden");

  return user;
};
