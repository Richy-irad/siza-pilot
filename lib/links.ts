import type { Dictionary } from "@/content";
import { site, type Lang } from "@/site.config";

const prefill = (dict: Dictionary, src: string) =>
  encodeURIComponent(`${dict.contact.smsPrefill} (Ref: ${src})`);

export const telHref = () => `tel:${site.phoneE164}`;

// `?&body=` works on both iOS and Android.
export const smsHref = (dict: Dictionary, src: string) =>
  `sms:${site.phoneE164}?&body=${prefill(dict, src)}`;

export const waHref = (dict: Dictionary, src: string) =>
  `https://wa.me/${site.whatsappE164.replace(/\D/g, "")}?text=${prefill(dict, src)}`;

export const tallyHref = (lang: Lang, src: string) =>
  `https://tally.so/r/${site.tally[lang]}?src=${encodeURIComponent(src)}&lang=${lang}`;

export const vcardHref = "/siza.vcf";
