"use client";

import type { ReactNode } from "react";
import { tallyHref } from "@/lib/links";
import { getSrc, useSrc } from "@/lib/src";
import { track } from "@/lib/track";
import { site, type Lang } from "@/site.config";

declare global {
  interface Window {
    Tally?: {
      openPopup: (
        formId: string,
        options?: { layout?: "default" | "modal"; hiddenFields?: Record<string, string> },
      ) => void;
    };
  }
}

type Props = {
  lang: Lang;
  placement: string;
  className: string;
  children: ReactNode;
  /** Set for "soon" categories: tracks notify_click instead of form_open. */
  category?: string;
};

/** Real link to the Tally form; enhanced into the Tally popup once embed.js loads. */
export function RequestButton({ lang, placement, className, children, category }: Props) {
  const src = useSrc();
  return (
    <a
      href={tallyHref(lang, src)}
      target="_blank"
      rel="noopener"
      className={className}
      onClick={(e) => {
        const src = getSrc();
        if (category) track("notify_click", { src, lang, category });
        else track("form_open", { src, lang, placement });
        if (!window.Tally?.openPopup) return;
        e.preventDefault();
        try {
          window.Tally.openPopup(site.tally[lang], { layout: "modal", hiddenFields: { src, lang } });
        } catch {
          window.open(tallyHref(lang, src), "_blank", "noopener");
        }
      }}
    >
      {children}
    </a>
  );
}
