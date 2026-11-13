"use client";

import { MessageCircle, MessageSquare, Phone } from "lucide-react";
import type { Dictionary } from "@/content";
import { smsHref, telHref, waHref } from "@/lib/links";
import { useSrc } from "@/lib/src";
import { TrackedLink } from "./TrackedLink";

/**
 * Call / Text / WhatsApp buttons. SMS and WhatsApp messages are prefilled with `Ref: {src}`.
 * @param placement sent with each click event
 */
export function ContactActions({
  dict,
  placement,
}: {
  dict: Dictionary;
  placement: string;
}) {
  const src = useSrc();
  const { lang, contact } = dict;
  const cls =
    "inline-flex min-h-12 items-center justify-center gap-1.5 rounded-xl border border-border bg-surface px-1 py-3 text-[15px] font-semibold text-primary transition-colors hover:border-accent hover:bg-bg sm:gap-2 sm:px-5 sm:text-base";
  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-3">
      <TrackedLink
        href={telHref()}
        event="call_click"
        lang={lang}
        placement={placement}
        className={cls}
      >
        <Phone className="size-4 shrink-0 text-accent sm:size-5" aria-hidden />
        {contact.call}
      </TrackedLink>
      <TrackedLink
        href={smsHref(dict, src)}
        event="sms_click"
        lang={lang}
        placement={placement}
        className={cls}
      >
        <MessageSquare
          className="size-4 shrink-0 text-accent sm:size-5"
          aria-hidden
        />
        {contact.text}
      </TrackedLink>
      <TrackedLink
        href={waHref(dict, src)}
        event="whatsapp_click"
        lang={lang}
        placement={placement}
        className={cls}
        target="_blank"
        rel="noopener"
      >
        <MessageCircle
          className="size-4 shrink-0 text-accent sm:size-5"
          aria-hidden
        />
        {contact.whatsapp}
      </TrackedLink>
    </div>
  );
}
