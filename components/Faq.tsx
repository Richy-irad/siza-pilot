import { ChevronDown } from "lucide-react";
import type { Dictionary } from "@/content";
import { container, h2 } from "@/lib/ui";
import { Rich } from "./Rich";

export function Faq({ dict }: { dict: Dictionary }) {
  return (
    <section className={`${container} py-10 sm:py-14`} aria-labelledby="faq-h">
      <h2 id="faq-h" className={h2}>
        {dict.faq.heading}
      </h2>
      <div className="mt-6 max-w-3xl divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface">
        {dict.faq.items.map((item) => (
          <details key={item.q} className="group">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 px-5 py-3 font-semibold [&::-webkit-details-marker]:hidden">
              <Rich text={item.q} lang={dict.lang} />
              <ChevronDown className="size-5 shrink-0 text-accent transition-transform group-open:rotate-180" aria-hidden />
            </summary>
            <p className="px-5 pb-4 text-ink-muted">
              <Rich text={item.a} lang={dict.lang} />
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
