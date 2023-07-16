/// <reference types="@sveltejs/kit" />
declare global {
  namespace App {
    interface Locals {
      auth: import("lucia").AuthRequest;
    }

    interface PageData {
      user: import("lucia").User | null;
    }
  }
}

/// <reference types="lucia" />
declare global {
  namespace Lucia {
    type Auth = import("$lib/auth/lucia").Auth;

    type DatabaseUserAttributes = {
      email: string;
      emailVerified: boolean;
      studio_ids?: string[];
      /** One user can be many teachers */
      teacher_ids?: string[];

      admin?: boolean;
    };

    type DatabaseSessionAttributes = {};
  }
}

// THIS IS IMPORTANT!!!
export {};
