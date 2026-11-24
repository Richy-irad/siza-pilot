import { ShieldCheck } from "lucide-react";
import { site } from "@/site.config";

/** Navy rounded tile with a white ShieldCheck, followed by the brand name from site.config. */
export function Logo() {
  return (
    <span className="flex items-center gap-2">
      <span className="flex size-9 items-center sm:size-10 justify-center rounded-xl bg-primary-hover">
        <ShieldCheck className="size-5 text-white sm:size-6" aria-hidden />
      </span>
      <span className="text-lg font-bold text-ink sm:text-xl">{site.name}</span>
    </span>
  );
}
