import { TriangleAlert } from "lucide-react";
import type { Dictionary } from "@/content";
import { container } from "@/lib/ui";
import { Rich } from "./Rich";

export function SafetyStrip({ dict }: { dict: Dictionary }) {
  return (
    <aside className={container}>
      <p className="flex gap-3 rounded-2xl border border-border bg-surface p-4 text-sm text-ink sm:text-base">
        <TriangleAlert className="mt-0.5 size-5 shrink-0 text-danger" aria-hidden />
        <span className="[&_strong]:text-danger">
          <Rich text={dict.safety} lang={dict.lang} />
        </span>
      </p>
    </aside>
  );
}
