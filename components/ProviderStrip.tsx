import type { Dictionary } from "@/content";
import { telHref } from "@/lib/links";
import { container } from "@/lib/ui";
import { site } from "@/site.config";
import { TrackedLink } from "./TrackedLink";

const link = "font-semibold text-primary underline underline-offset-2";

export function ProviderStrip({ dict }: { dict: Dictionary }) {
  const { provider, lang } = dict;
  return (
    <aside className={`${container} pb-8`}>
      <p className="rounded-2xl border border-dashed border-border bg-surface/60 p-4 text-sm text-ink-muted">
        {provider.lead} <strong className="text-ink">{provider.strong}</strong> →{" "}
        <TrackedLink href={telHref()} event="call_click" lang={lang} placement="provider" className={link}>
          {provider.call}
        </TrackedLink>{" "}
        {provider.or}{" "}
        <a href={`mailto:${site.email}`} className={link}>
          {provider.email}
        </a>
        .
      </p>
    </aside>
  );
}
