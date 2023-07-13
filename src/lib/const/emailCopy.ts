import { APP_URL } from ".";

export const EMAIL_COPIES = {
  "studio-owner-invite": {
    subject: "Join your studio on YogaList",
    body: (
      { studio_name, invite_link }: {
        studio_name: string;
        invite_link: string;
      },
    ) =>
      `<p>Hello there,</p>
    
    <p>
      I hope this email finds you well. I'm Ross from
      <strong>Yoga List</strong> ☯️, a platform connecting yogis with the best
      studios in South Africa.
    </p>
    
    <p>
      We're offering you a <strong>free</strong> listing for a limited time, where
      you can showcase ${studio_name} and attract more yogis. To include your studio,
      please <a href="${invite_link}">click here</a> to complete our form with:
    </p>
    
    <ul>
      <li>Studio description</li>
      <li>Logo and other photos</li>
      <li>Schedule and online class availability</li>
      <li>Styles of yoga</li>
      <li>Location</li>
      <li>Social links & contact info</li>
    </ul>
    
    <p>
      It's quick, and will help boost visibility of your studio and attract more
      yogis, contributing to the growing yoga community in South Africa.
    </p>
    
    <p>
      If you have any questions or need assistance, please reach out. We value your
      participation and look forward to collaborating. Thank you for your time and
      consideration.
    </p>
    
    <p>
        Warm regards,<br />
        YogaList
    </p>
    `,
  },

  pendingPatch: {
    studio: {
      approved: {
        subject: "Your studio has been updated",
        body: (
          { studio_name, studio_slug }: {
            studio_name: string;
            studio_slug: string;
            reason: string | undefined;
          },
        ) =>
          `<p>Hello there,</p>

        <p>
            We're happy to let you know that your changes to ${studio_name} have been approved!
        </p>

        <p>
            You can view your studio's page here: <a href="${APP_URL}/studios/${studio_slug}">${studio_name}</a>
        </p>

        <p>
            Thank you for your contribution to the growing yoga community in South Africa.
        </p>

        <p>
            Warm regards,<br />
            YogaList
        </p>
                `,
      },

      rejected: {
        subject: "Your studio update has been rejected",
        body: (
          { studio_name, studio_slug, reason }: {
            studio_name: string;
            studio_slug: string;
            reason: string | undefined;
          },
        ) =>
          `<p>Hello there,</p>

        <p>
            We're sorry to let you know that your changes to ${studio_name} have been rejected. For the following reason(s):
        </p>

        <blockquote>${reason}</blockquote>

        <p>
            You can submit a new edit <a href="${APP_URL}/studios/${studio_slug}/edit">here</a>.
            Please feel free to reach out if you have any questions or need assistance.
        </p>

        <p>
            Warm regards,<br />
            YogaList
        </p>
        `,
      },
    },
  },
};
