import type { NextConfig } from "next";

/** Serves `/tachaide.vcf` as `text/vcard` so phones open the add-contact sheet. */
const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [
      {
        source: "/tachaide.vcf",
        headers: [
          { key: "Content-Type", value: "text/vcard; charset=utf-8" },
          { key: "Content-Disposition", value: 'inline; filename="tachaide.vcf"' },
        ],
      },
    ];
  },
};

export default nextConfig;
