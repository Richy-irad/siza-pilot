import type { MetadataRoute } from "next";
import { site } from "@/site.config";

/** robots.txt: whole site indexable, points to the sitemap. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.domain}/sitemap.xml`,
  };
}
