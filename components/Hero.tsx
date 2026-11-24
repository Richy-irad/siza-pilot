import { ShieldCheck } from "lucide-react";
import type { Dictionary } from "@/content";
import { fmt } from "@/lib/format";
import { btnPrimary, container } from "@/lib/ui";
import { ContactActions } from "./ContactActions";
import { RequestButton } from "./RequestButton";
import { SaveContact } from "./SaveContact";

/**
 * Above-the-fold block: pilot badge, headline, primary form CTA, contact row,
 * save-contact link and trust line. Its `#hero` id drives the sticky action bar.
 */
export function Hero({ dict }: { dict: Dictionary }) {
  const { hero, lang } = dict;
  return (
    <section id="hero" className={`${container} pt-4 pb-6 sm:pt-12 sm:pb-10`}>
      <div className="max-w-2xl">
        <p className="inline-flex rounded-full border border-border bg-surface px-3 py-1 text-sm font-medium text-ink-muted">
          {fmt(hero.badge, lang)}
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-balance sm:text-5xl">
          {hero.headline}
        </h1>
        <p className="mt-4 max-w-[60ch] text-base text-ink-muted sm:text-lg">
          {hero.sub}
        </p>

        <div className="mt-6 max-w-md">
          <RequestButton
            lang={lang}
            placement="hero"
            className={`${btnPrimary} w-full py-4 text-lg`}
          >
            {hero.cta}
          </RequestButton>
          <p className="mt-2 text-center text-sm text-ink-muted">
            {fmt(hero.underCta, lang)}
          </p>
          <div className="mt-4">
            <ContactActions dict={dict} placement="hero" />
          </div>
          <SaveContact
            lang={lang}
            placement="hero"
            label={hero.save}
            className="mt-4 flex min-h-12 items-center gap-2 rounded-xl text-sm font-semibold text-primary underline underline-offset-4 sm:text-base"
          />
        </div>

        <ul className="mt-5 flex flex-col gap-2 text-sm text-ink-muted sm:flex-row sm:flex-wrap sm:gap-x-5">
          {hero.trust.map((t) => (
            <li key={t} className="flex items-center gap-2">
              <ShieldCheck
                className="size-4 shrink-0 text-accent"
                aria-hidden
              />
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
