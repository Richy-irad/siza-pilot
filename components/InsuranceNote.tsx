import { Info } from "lucide-react";
import type { Dictionary } from "@/content";
import { card, container } from "@/lib/ui";

/** Honest reminder that insurer/CAA roadside assistance is often free. */
export function InsuranceNote({ dict }: { dict: Dictionary }) {
  return (
    <aside className={container}>
      <p className={`${card} flex gap-3 text-sm sm:text-base`}>
        <Info className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden />
        <span>
          <strong>{dict.insurance.title}</strong> <span className="text-ink-muted">{dict.insurance.body}</span>
        </span>
      </p>
    </aside>
  );
}
