import type { Metadata, Viewport } from "next";
import type { Dictionary } from "@/content";
import { site } from "@/site.config";

const LOCALE = { fr: "fr_CA", en: "en_CA" } as const;

/** Metadata for one page given its FR and EN paths. */
export function pageMetadata(
  dict: Dictionary,
  paths: { fr: string; en: string },
  title = dict.meta.title,
): Metadata {
  const self = paths[dict.lang];
  return {
    metadataBase: new URL(site.domain),
    title,
    description: dict.meta.description,
    alternates: {
      canonical: self,
      languages: { "fr-CA": paths.fr, "en-CA": paths.en, "x-default": paths.fr },
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      title,
      description: dict.meta.description,
      url: self,
      locale: LOCALE[dict.lang],
      images: [{ url: "/og.png", width: 1200, height: 630, alt: dict.hero.headline }],
    },
    twitter: { card: "summary_large_image" },
    icons: { icon: "/icon.svg", apple: "/apple-icon.png" },
  };
}

export const viewport: Viewport = { themeColor: "#EAF4FE" };
