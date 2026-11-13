import type { Dictionary } from "@/content";
import { site, type Lang } from "@/site.config";

/** Encoded SMS/WhatsApp prefill: greeting + ` (Ref: {src})`. */
const prefill = (dict: Dictionary, src: string) =>
  encodeURIComponent(`${dict.contact.smsPrefill} (Ref: ${src})`);

/** `tel:` link to the Siza number. */
export const telHref = () => `tel:${site.phoneE164}`;

/** `sms:` link with prefilled body; the `?&body=` form works on both iOS and Android. */
export const smsHref = (dict: Dictionary, src: string) =>
  `sms:${site.phoneE164}?&body=${prefill(dict, src)}`;

/** WhatsApp click-to-chat link (digits only) with the same prefill as SMS. */
export const waHref = (dict: Dictionary, src: string) =>
  `https://wa.me/${site.whatsappE164.replace(/\D/g, "")}?text=${prefill(dict, src)}`;

/** Direct Tally form URL; no-JS fallback for the popup. Tally reads `src`/`lang` from the query. */
export const tallyHref = (lang: Lang, src: string) =>
  `https://tally.so/r/${site.tally[lang]}?src=${encodeURIComponent(src)}&lang=${lang}`;

/** Contact card served from `public/` with a `text/vcard` header (see next.config.ts). */
export const vcardHref = "/siza.vcf";
