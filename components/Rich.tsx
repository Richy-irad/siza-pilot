import type { ReactNode } from "react";
import { fmt } from "@/lib/format";
import type { Lang } from "@/site.config";

/** Matches `**bold**` or `[label](href)`. */
const TOKEN = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)/g;

/** Renders a copy string: fills {placeholders}, `**bold**` and `[label](href)`. */
export function Rich({ text, lang }: { text: string; lang: Lang }) {
  const str = fmt(text, lang);
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of str.matchAll(TOKEN)) {
    out.push(str.slice(last, m.index));
    if (m[1]) out.push(<strong key={m.index}>{m[1]}</strong>);
    else
      out.push(
        <a key={m.index} href={m[3]} className="font-medium text-primary underline underline-offset-2">
          {m[2]}
        </a>,
      );
    last = m.index + m[0].length;
  }
  out.push(str.slice(last));
  return <>{out}</>;
}
