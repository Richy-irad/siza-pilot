import type { Dictionary } from "@/content";
import { card, container, h2 } from "@/lib/ui";

/** Founder quote explaining why Siza exists. */
export function FounderStory({ dict }: { dict: Dictionary }) {
  return (
    <section className={`${container} py-10 sm:py-14`} aria-labelledby="founder-h">
      <h2 id="founder-h" className={h2}>
        {dict.founder.heading}
      </h2>
      <figure className={`${card} mt-6 max-w-3xl`}>
        <blockquote className="text-base leading-relaxed sm:text-lg">{dict.founder.quote}</blockquote>
        <figcaption className="mt-4 font-semibold">— {dict.founder.name}</figcaption>
      </figure>
    </section>
  );
}
