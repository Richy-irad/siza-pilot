"use client";

import type { AnchorHTMLAttributes } from "react";
import { getSrc } from "@/lib/src";
import { track, type EventName } from "@/lib/track";
import type { Lang } from "@/site.config";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  event: EventName;
  lang: Lang;
  placement: string;
};

/** Anchor that fires an analytics event (with src, lang, placement) on click. */
export function TrackedLink({ event, lang, placement, onClick, ...rest }: Props) {
  return (
    <a
      {...rest}
      onClick={(e) => {
        track(event, { src: getSrc(), lang, placement });
        onClick?.(e);
      }}
    />
  );
}
