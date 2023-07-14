export const CONTACT_KINDS = ["phone", "email"] as const;
export type ContactKind = typeof CONTACT_KINDS[number];

export const CONTACT_EMOJI: Record<ContactKind, string> = {
  phone: "📞",
  email: "📧",
};

export const APP_CONTACT_INFO = {
  email: "hello@yogalist.co.za",
};
