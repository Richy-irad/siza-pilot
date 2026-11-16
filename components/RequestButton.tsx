"use client";

import type { MouseEvent, ReactNode } from "react";
import { getSrc, useSrc } from "@/lib/src";
import { openTallyPopup, tallyHref } from "@/lib/tally";
import { track } from "@/lib/track";
import type { CategoryId, Lang } from "@/site.config";

type Props = {
  /** Picks the FR or EN Tally form. */
  lang: Lang;
  /** Where the button sits (hero / services / final / sticky), sent with `form_open`. */
  placement: string;
  className: string;
  children: ReactNode;
  /** Category of the card the button sits on; sent to Tally and analytics. */
  category?: CategoryId;
  /** Soon category: opens the notify form (if configured) and tracks `notify_click`. */
  notify?: boolean;
};

/**
 * Opens a Tally form: the request form, or the notify form when `notify` is set
 * (falls back to the request form until `site.tally.notify` is configured).
 * Renders a real link to the form (works without JS); once embed.js has loaded, the
 * click opens the Tally popup with hidden `src`, `lang` and `category`.
 * Tracks `notify_click` or `form_open`.
 */
export function RequestButton({
  lang,
  placement,
  className,
  children,
  category,
  notify,
}: Props) {
  const src = useSrc();
  const opts = { notify, category };

  /** Tracks the click, then opens the popup; the link opens normally if Tally isn't loaded. */
  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    const src = getSrc(); // read at click time, not the pre-hydration value
    if (notify) track("notify_click", { src, lang, category: category ?? "" });
    else
      track("form_open", {
        src,
        lang,
        placement,
        ...(category && { category }),
      });
    if (openTallyPopup(lang, src, opts)) e.preventDefault();
  }

  return (
    <a
      href={tallyHref(lang, src, opts)}
      target="_blank"
      rel="noopener"
      className={className}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
