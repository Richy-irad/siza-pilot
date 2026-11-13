import {
  BadgeCheck,
  CircleDollarSign,
  PhoneCall,
  ShieldCheck,
} from "lucide-react";
import type { Dictionary } from "@/content";
import { card, container, h2 } from "@/lib/ui";

/** Icons for the four promise cards, in `dict.why.items` order. */
const ICONS = [PhoneCall, CircleDollarSign, BadgeCheck, ShieldCheck];

/** "Why Siza": four promise cards from `dict.why`. */
export function Promises({ dict }: { dict: Dictionary }) {
  return (
    <section className={`${container} py-10 sm:py-14`} aria-labelledby="why-h">
      <h2 id="why-h" className={h2}>
        {dict.why.heading}
      </h2>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {dict.why.items.map((item, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <li key={item.title} className={`${card} flex gap-4`}>
              <Icon className="size-6 shrink-0 text-accent" aria-hidden />
              <p>
                <strong className="block text-lg">{item.title}</strong>
                <span className="text-ink-muted">{item.body}</span>
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
