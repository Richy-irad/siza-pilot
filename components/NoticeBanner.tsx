"use client";

import { useSyncExternalStore } from "react";
import { site, type Lang } from "@/site.config";

const noop = () => () => {};
const today = () => new Date().toISOString().slice(0, 10);

/** Slim top banner from site.notice; hidden once `until` (YYYY-MM-DD) has passed. */
export function NoticeBanner({ lang }: { lang: Lang }) {
  const notice = site.notice;
  const expired = useSyncExternalStore(
    noop,
    () => !!notice && today() > notice.until,
    () => false,
  );
  if (!notice || expired) return null;
  return (
    <div role="status" className="bg-primary-hover px-4 py-2 text-center text-sm font-medium text-white">
      {notice[lang]}
    </div>
  );
}
