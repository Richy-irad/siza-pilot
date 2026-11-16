/**
 * Single source of truth for operational facts: contact info, form IDs, hours,
 * area and which categories are live. Edit here, then redeploy.
 */
export const site = {
  name: "Tachaide",
  domain: "https://REPLACE.ca", // decide BEFORE flyers are printed
  phoneE164: "+15144315748", // calls + texts
  phoneDisplay: "(514) 431-5748",
  whatsappE164: null as string | null, // null hides WhatsApp buttons; e.g. "+15144315748" to show them
  email: "REPLACE@REPLACE", // privacy contact + providers
  // Form IDs only: the part after tally.so/r/
  tally: {
    fr: "D4GZ2E", // request form
    en: "D4GZ2E",
    notify: "2jAeEe" as string | null, // shared "notify me" form for soon categories; null → request form
  },
  umamiWebsiteId: "REPLACE_UMAMI_ID", // Umami Cloud → Settings → Websites
  hours: { fr: "lun.–sam., 8 h à 21 h", en: "Mon–Sat, 8 a.m.–9 p.m." },
  responseWindow: { fr: "moins de 30 minutes", en: "under 30 minutes" },
  area: { fr: "Île de Montréal et Laval", en: "Montreal island and Laval" },
  // status: "live" | "soon"
  categories: [
    { id: "roadside", status: "live" }, // "Roadside" or "Towing" wording decided by Nov 16 (see content)
    { id: "heating", status: "soon" },
    { id: "locksmith", status: "live" },
    { id: "plumbing", status: "soon" },
    { id: "flooding", status: "soon" },
  ],
  roadsideIncludesBoost: true, // false → show "Towing" copy variant only
  notice: null as null | { fr: string; en: string; until: string }, // e.g. holiday hours; until = "YYYY-MM-DD"
} as const;

/** Supported languages; `fr` is the default at `/`. */
export type Lang = "fr" | "en";
/** Category ids from `site.categories`. */
export type CategoryId = (typeof site.categories)[number]["id"];
/** `live` = request CTA; `soon` = notify-me CTA. */
export type CategoryStatus = "live" | "soon";
