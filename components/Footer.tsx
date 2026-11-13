import type { Dictionary } from "@/content";
import { container } from "@/lib/ui";
import { site } from "@/site.config";

export function Footer({ dict }: { dict: Dictionary }) {
  const { lang, footer } = dict;
  const items = [site.name, site.area[lang], site.hours[lang], site.phoneDisplay];
  return (
    <footer className="border-t border-border bg-surface">
      <div className={`${container} py-8 text-sm text-ink-muted`}>
        <p className="flex flex-wrap gap-x-2 gap-y-1">
          {items.map((t) => (
            <span key={t}>{t} ·</span>
          ))}
          <a href={dict.privacyHref} className="text-primary underline underline-offset-2">
            {footer.privacy}
          </a>
          <span>· {footer.copyright}</span>
        </p>
        <p className="mt-3">{footer.disclaimer}</p>
      </div>
    </footer>
  );
}
