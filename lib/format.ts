import { site, type Lang } from "@/site.config";

/** Placeholder values for one language. */
const vars = (lang: Lang): Record<string, string> => ({
  area: site.area[lang],
  hours: site.hours[lang],
  responseWindow: site.responseWindow[lang],
  phoneDisplay: site.phoneDisplay,
  email: site.email,
});

/** Fills `{placeholder}` tokens from site.config. */
export const fmt = (str: string, lang: Lang) =>
  str.replace(/\{(\w+)\}/g, (m, key: string) => vars(lang)[key] ?? m);
