import { Droplets, Flame, KeyRound, Snowflake, Truck, Wrench, type LucideIcon } from "lucide-react";
import type { Dictionary } from "@/content";
import { btnPrimary, btnSecondary, card, container, h2 } from "@/lib/ui";
import { site, type CategoryId, type CategoryStatus } from "@/site.config";
import { RequestButton } from "./RequestButton";

const ICONS: Record<CategoryId, LucideIcon[]> = {
  roadside: [Truck],
  heating: [Flame, Snowflake],
  locksmith: [KeyRound],
  plumbing: [Wrench],
  flooding: [Droplets],
};

export function Services({ dict }: { dict: Dictionary }) {
  const { services, lang } = dict;
  const categories = [...site.categories]
    .map((c) => ({ id: c.id as CategoryId, live: (c.status as CategoryStatus) === "live" }))
    .sort((a, b) => Number(b.live) - Number(a.live));

  return (
    <section className={`${container} py-10 sm:py-14`} aria-labelledby="services-h">
      <h2 id="services-h" className={h2}>
        {services.heading}
      </h2>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map(({ id, live }) => {
          const copy =
            id === "roadside" && !site.roadsideIncludesBoost ? services.roadsideTowing : services.items[id];
          return (
            <li key={id} className={`${card} flex flex-col ${live ? "ring-2 ring-primary/15" : ""}`}>
              <div className="flex items-start justify-between gap-3">
                <span className="flex gap-1 text-accent">
                  {ICONS[id].map((Icon, i) => (
                    <Icon key={i} className="size-7" aria-hidden />
                  ))}
                </span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    live ? "bg-success/10 text-success" : "bg-ink/5 text-ink-muted"
                  }`}
                >
                  {live ? services.available : services.soon}
                </span>
              </div>
              <h3 className="mt-3 text-lg font-bold">{copy.title}</h3>
              <p className="mt-1 flex-1 text-ink-muted">{copy.desc}</p>
              <RequestButton
                lang={lang}
                placement="services"
                category={live ? undefined : id}
                className={`${live ? btnPrimary : btnSecondary} mt-4 w-full`}
              >
                {live ? services.getHelp : services.notify}
              </RequestButton>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
