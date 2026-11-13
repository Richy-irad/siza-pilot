import type { CategoryId, Lang } from "@/site.config";

// Copy strings may contain `**bold**`, `[label](href)` and `{placeholder}` tokens
// ({area}, {hours}, {responseWindow}, {phoneDisplay}, {email}); see lib/format.ts.
export type Dictionary = {
  lang: Lang;
  htmlLang: "fr-CA" | "en-CA";
  home: string;
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
  contact: { call: string; text: string; whatsapp: string; smsPrefill: string };
  safety: string;
  services: {
    heading: string;
    available: string;
    soon: string;
    getHelp: string;
    notify: string;
    items: Record<CategoryId, { title: string; desc: string }>;
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
  sticky: { call: string; text: string; form: string };
  privacy: { title: string; items: { label: string; body: string }[]; back: string };
};
