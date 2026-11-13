import type { MetadataRoute } from "next";
import { site } from "@/site.config";

const pages = [
  { fr: "/", en: "/en" },
  { fr: "/confidentialite", en: "/en/privacy" },
];

/** sitemap.xml: every page in both languages, each with fr-CA/en-CA alternates. */
export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap((p) =>
    [p.fr, p.en].map((path) => ({
      url: site.domain + path,
      alternates: { languages: { "fr-CA": site.domain + p.fr, "en-CA": site.domain + p.en } },
    })),
  );
}
