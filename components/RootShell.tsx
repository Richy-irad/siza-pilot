import { Inter } from "next/font/google";
import Script from "next/script";
import type { ReactNode } from "react";
import type { Dictionary } from "@/content";
import { site } from "@/site.config";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-inter", display: "optional" });
const umamiReady = !site.umamiWebsiteId.startsWith("REPLACE");

/** <html>/<body> shared by the FR and EN root layouts. */
export function RootShell({ dict, children }: { dict: Dictionary; children: ReactNode }) {
  return (
    <html lang={dict.htmlLang} className={`${inter.variable} antialiased`}>
      <body className="min-h-dvh pb-24 font-sans sm:pb-0">
        {children}
        <Script src="https://tally.so/widgets/embed.js" strategy="lazyOnload" />
        {umamiReady && (
          <Script
            src="https://cloud.umami.is/script.js"
            data-website-id={site.umamiWebsiteId}
            data-do-not-track="true"
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
