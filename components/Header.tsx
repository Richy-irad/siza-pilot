import { Phone } from "lucide-react";
import type { Dictionary } from "@/content";
import { telHref } from "@/lib/links";
import { btnPrimary, container } from "@/lib/ui";
import { LangToggle } from "./LangToggle";
import { Logo } from "./Logo";
import { TrackedLink } from "./TrackedLink";

/** `altHref`: the same page in the other language. */
export function Header({ dict, altHref }: { dict: Dictionary; altHref: string }) {
  return (
    <header className={`${container} flex items-center justify-between gap-3 py-3`}>
      <a href={dict.home} aria-label={dict.header.homeLabel} className="rounded-xl">
        <Logo />
      </a>
      <div className="flex items-center gap-2">
        <LangToggle dict={dict} href={altHref} />
        <TrackedLink
          href={telHref()}
          event="call_click"
          lang={dict.lang}
          placement="header"
          className={`${btnPrimary} px-4 text-sm`}
        >
          <Phone className="size-4" aria-hidden />
          {dict.header.call}
        </TrackedLink>
      </div>
    </header>
  );
}
