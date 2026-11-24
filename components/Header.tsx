import { Phone } from "lucide-react";
import type { Dictionary } from "@/content";
import { telHref } from "@/lib/links";
import { btnPrimary, container } from "@/lib/ui";
import { LangToggle } from "./LangToggle";
import { Logo } from "./Logo";
import { TrackedLink } from "./TrackedLink";

/**
 * Top bar: logo (home link), FR | EN toggle and a small call button.
 * @param altHref the same page in the other language
 */
export function Header({
  dict,
  altHref,
}: {
  dict: Dictionary;
  altHref: string;
}) {
  return (
    <header
      className={`${container} flex items-center justify-between gap-2 py-3`}
    >
      <a
        href={dict.home}
        aria-label={dict.header.homeLabel}
        className="rounded-xl"
      >
        <Logo />
      </a>
      <div className="flex items-center gap-2">
        <LangToggle dict={dict} href={altHref} />
        <TrackedLink
          href={telHref()}
          event="call_click"
          lang={dict.lang}
          placement="header"
          className={`${btnPrimary} min-w-12 px-3 text-sm sm:px-4`}
        >
          <Phone className="size-5 sm:size-4" aria-hidden />
          {/* Icon-only on phones so the header fits at 320px; hero and sticky bar carry labeled Call buttons. */}
          <span className="sr-only sm:not-sr-only">{dict.header.call}</span>
        </TrackedLink>
      </div>
    </header>
  );
}
