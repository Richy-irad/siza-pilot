import type { Dictionary } from "@/content";
import { site } from "@/site.config";

/** Encoded SMS/WhatsApp prefill: greeting + ` (Ref: {src})`. */
const prefill = (dict: Dictionary, src: string) =>
  encodeURIComponent(`${dict.contact.smsPrefill} (Ref: ${src})`);

/** `tel:` link to the Tachaide number. */
export const telHref = () => `tel:${site.phoneE164}`;

/** `sms:` link with prefilled body; the `?&body=` form works on both iOS and Android. */
export const smsHref = (dict: Dictionary, src: string) =>
  `sms:${site.phoneE164}?&body=${prefill(dict, src)}`;

/** WhatsApp click-to-chat link (digits only) with the same prefill as SMS. */
export const waHref = (number: string, dict: Dictionary, src: string) =>
  `https://wa.me/${number.replace(/\D/g, "")}?text=${prefill(dict, src)}`;

/** Contact card served from `public/` with a `text/vcard` header (see next.config.ts). */
export const vcardHref = "/tachaide.vcf";
