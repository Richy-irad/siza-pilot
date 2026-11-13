import type { CategoryId, Lang } from "@/site.config";

/**
 * Shape shared by every language's copy. Strings may contain `**bold**`, `[label](href)`
 * and `{placeholder}` tokens ({area}, {hours}, {responseWindow}, {phoneDisplay}, {email});
 * see lib/format.ts and components/Rich.tsx.
 */
export type Dictionary = {
  lang: Lang;
  /** Value for `<html lang>`. */
  htmlLang: "fr-CA" | "en-CA";
  /** Landing page path in this language. */
  home: string;
  /** Privacy notice path in this language. */
  privacyHref: string;
  meta: { title: string; description: string; privacyTitle: string };
  langSwitch: { navLabel: string; ariaLabel: string };
  header: { call: string; homeLabel: string };
  hero: {
    badge: string;
    headline: string;
    sub: string;
    cta: string;
    underCta: string;
    save: string;
    trust: string[];
  };
  /** Contact button labels; `smsPrefill` starts SMS/WhatsApp messages. */
  contact: { call: string; text: string; whatsapp: string; smsPrefill: string };
  /** 911 strip; `**bold**` part renders in the danger colour. */
  safety: string;
  services: {
    heading: string;
    available: string;
    soon: string;
    getHelp: string;
    notify: string;
    /** Per-category copy; roadside uses the boost wording. */
    items: Record<CategoryId, { title: string; desc: string }>;
    /** Roadside copy used when `site.roadsideIncludesBoost` is false. */
    roadsideTowing: { title: string; desc: string };
  };
  how: { heading: string; steps: { title: string; body: string }[] };
  why: { heading: string; items: { title: string; body: string }[] };
  insurance: { title: string; body: string };
  founder: { heading: string; quote: string; name: string };
  faq: { heading: string; items: { q: string; a: string }[] };
  final: { heading: string; save: string; cta: string };
  provider: { lead: string; strong: string; call: string; or: string; email: string };
  footer: { privacy: string; copyright: string; disclaimer: string };
  /** Mobile sticky bar labels. */
  sticky: { call: string; text: string; form: string };
  privacy: { title: string; items: { label: string; body: string }[]; back: string };
};
