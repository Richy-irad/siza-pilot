"use client";

import { ClipboardList, MessageSquare, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import type { Dictionary } from "@/content";
import { smsHref, telHref } from "@/lib/links";
import { useSrc } from "@/lib/src";
import { RequestButton } from "./RequestButton";
import { TrackedLink } from "./TrackedLink";

const btn =
  "flex min-h-12 flex-1 flex-col items-center justify-center gap-0.5 rounded-xl text-sm font-semibold";

/** Mobile-only bottom bar; shows once #hero has scrolled out of view. */
export function StickyActionBar({ dict }: { dict: Dictionary }) {
  const src = useSrc();
  const [visible, setVisible] = useState(false);
  const { lang, sticky } = dict;

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const io = new IntersectionObserver(([e]) => setVisible(!e.isIntersecting));
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <div
      aria-hidden={!visible}
      inert={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur transition-opacity duration-200 sm:hidden ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div className="flex gap-2">
        <TrackedLink href={telHref()} event="call_click" lang={lang} placement="sticky" className={`${btn} border border-border text-primary`}>
          <Phone className="size-5" aria-hidden />
          {sticky.call}
        </TrackedLink>
        <TrackedLink href={smsHref(dict, src)} event="sms_click" lang={lang} placement="sticky" className={`${btn} border border-border text-primary`}>
          <MessageSquare className="size-5" aria-hidden />
          {sticky.text}
        </TrackedLink>
        <RequestButton lang={lang} placement="sticky" className={`${btn} bg-primary text-white`}>
          <ClipboardList className="size-5" aria-hidden />
          {sticky.form}
        </RequestButton>
      </div>
    </div>
  );
}
