import { error, redirect } from "@sveltejs/kit";
import { canModifyResource } from "./permissions";

export interface GetUserOptions {
  /** Must be an admin */
  admin?: boolean;
  /** If unauthed, redirect to signin with this url as the redirect param */
  url?: URL;

  studio_id?: string;
  teacher_id?: string;
}

const DEFAULT_OPTIONS: GetUserOptions = {
  admin: false,
  url: undefined,
  studio_id: undefined,
  teacher_id: undefined,
};

/** The catch-all function to get the current user.
 * Check roles.
 * Redirect to signin if not logged in.
 */
export const getUser = async (locals: App.Locals, options?: GetUserOptions) => {
  const { admin, url, studio_id, teacher_id } = Object.assign(
    { ...DEFAULT_OPTIONS },
    options ?? {},
  );

  const session = await locals.auth.validate();
  if (!session) throw redirect(302, `/signin?redirect=${url?.pathname ?? "/"}`);
  const { user } = session;

  if (admin && !user.admin) throw error(403, "Forbidden");

  if (studio_id && !canModifyResource(user, "studio", studio_id)) {
    throw error(403, "You cannot edit this studio");
  }

  if (teacher_id && !canModifyResource(user, "teacher", teacher_id)) {
    throw error(403, "You cannot edit this teacher");
  }

  return user;
};
