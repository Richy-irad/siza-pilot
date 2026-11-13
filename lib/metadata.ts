import type { Metadata, Viewport } from "next";
import type { Dictionary } from "@/content";
import { site } from "@/site.config";

/** Open Graph locale per language. */
const LOCALE = { fr: "fr_CA", en: "en_CA" } as const;

/**
 * Page metadata: title, description, canonical, fr-CA/en-CA alternates, Open Graph and icons.
 * @param paths this page's FR and EN paths
 * @param title overrides the landing-page title
 */
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

/** Shared viewport: browser chrome tinted to the page background. */
export const viewport: Viewport = { themeColor: "#EAF4FE" };
