import type { Dictionary } from "@/content";
import { card, container, h2 } from "@/lib/ui";

/** "How it works": three numbered steps from `dict.how`. */
export function HowItWorks({ dict }: { dict: Dictionary }) {
  return (
    <section className={`${container} py-10 sm:py-14`} aria-labelledby="how-h">
      <h2 id="how-h" className={h2}>
        {dict.how.heading}
      </h2>
      <ol className="mt-6 grid gap-4 sm:grid-cols-3">
        {dict.how.steps.map((s, i) => (
          <li key={s.title} className={card}>
            <span
              className="flex size-9 items-center justify-center rounded-full bg-primary text-base font-bold text-white"
              aria-hidden
            >
              {i + 1}
            </span>
            <p className="mt-3">
              <strong className="block text-lg">{s.title}</strong>
              <span className="text-ink-muted">{s.body}</span>
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
