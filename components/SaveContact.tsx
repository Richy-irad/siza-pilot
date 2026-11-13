import { UserPlus } from "lucide-react";
import { vcardHref } from "@/lib/links";
import type { Lang } from "@/site.config";
import { TrackedLink } from "./TrackedLink";

/**
 * Link to `/siza.vcf` (adds Siza to phone contacts); tracked as `save_contact`.
 * @param placement sent with the event
 */
export function SaveContact({
  lang,
  placement,
  label,
  className,
}: {
  lang: Lang;
  placement: string;
  label: string;
  className: string;
}) {
  return (
    <TrackedLink href={vcardHref} event="save_contact" lang={lang} placement={placement} className={className}>
      <UserPlus className="size-5 shrink-0" aria-hidden />
      {label}
    </TrackedLink>
  );
}
