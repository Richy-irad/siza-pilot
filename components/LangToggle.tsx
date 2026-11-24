"use client";

import { useSyncExternalStore } from "react";
import type { Dictionary } from "@/content";
import { track } from "@/lib/track";
import type { Lang } from "@/site.config";

const noop = () => () => {};
/** Display order: French always first. */
const LANGS: Lang[] = ["fr", "en"];
const cell =
  "flex min-h-12 min-w-12 items-center justify-center px-3 first:rounded-l-xl last:rounded-r-xl";

/**
 * FR | EN toggle that keeps the query string (and so `?src=`). Tracks `lang_switch`.
 * @param href the current page in the other language
 */
export function LangToggle({ dict, href }: { dict: Dictionary; href: string }) {
  const search = useSyncExternalStore(
    noop,
    () => window.location.search,
    () => "",
  );
  return (
    <nav
      aria-label={dict.langSwitch.navLabel}
      className="flex rounded-xl border border-border bg-surface text-sm font-semibold"
    >
      {LANGS.map((l) =>
        l === dict.lang ? (
          <span
            key={l}
            aria-current="page"
            className={`${cell} bg-bg text-ink`}
          >
            {l.toUpperCase()}
          </span>
        ) : (
          <a
            key={l}
            href={href + search}
            hrefLang={`${l}-CA`}
            lang={`${l}-CA`}
            aria-label={dict.langSwitch.ariaLabel}
            onClick={() => track("lang_switch", { from: dict.lang, to: l })}
            className={`${cell} text-primary hover:bg-bg`}
          >
            {l.toUpperCase()}
          </a>
        ),
      )}
    </nav>
  );
}
