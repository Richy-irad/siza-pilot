import { ShieldCheck } from "lucide-react";

/** Navy rounded tile with a white ShieldCheck, followed by "Siza". */
export function Logo() {
  return (
    <span className="flex items-center gap-2">
      <span className="flex size-10 items-center justify-center rounded-xl bg-primary-hover">
        <ShieldCheck className="size-6 text-white" aria-hidden />
      </span>
      <span className="text-xl font-bold text-ink">Siza</span>
    </span>
  );
}
