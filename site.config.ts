export const site = {
  name: "Siza",
  domain: "https://REPLACE.ca", // decide BEFORE flyers are printed
  phoneE164: "+1REPLACE", // calls + texts
  phoneDisplay: "(514) REPLACE",
  whatsappE164: "+1REPLACE", // can be the same number (WhatsApp Business)
  email: "REPLACE@REPLACE", // privacy contact + providers
  tally: { fr: "REPLACE_FR_FORM_ID", en: "REPLACE_EN_FORM_ID" },
  umamiWebsiteId: "REPLACE_UMAMI_ID", // Umami Cloud → Settings → Websites
  hours: { fr: "lun.–sam., 8 h à 21 h", en: "Mon–Sat, 8 a.m.–9 p.m." },
  responseWindow: { fr: "moins de 30 minutes", en: "under 30 minutes" },
  area: { fr: "Île de Montréal et Laval", en: "Montreal island and Laval" },
  // status: "live" | "soon"
  categories: [
    { id: "roadside", status: "live" }, // "Roadside" or "Towing" wording decided by Nov 16 (see content)
    { id: "heating", status: "soon" },
    { id: "locksmith", status: "soon" },
    { id: "plumbing", status: "soon" },
    { id: "flooding", status: "soon" },
  ],
  roadsideIncludesBoost: true, // false → show "Towing" copy variant only
  notice: null as null | { fr: string; en: string; until: string }, // e.g. holiday hours; until = "YYYY-MM-DD"
} as const;

export type Lang = "fr" | "en";
export type CategoryId = (typeof site.categories)[number]["id"];
export type CategoryStatus = "live" | "soon";
