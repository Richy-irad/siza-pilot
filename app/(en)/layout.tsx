import { RootShell } from "@/components/RootShell";
import { en } from "@/content/en";

export { viewport } from "@/lib/metadata";

/** Root layout for English routes under `/en`: `<html lang="en-CA">`. */
export default function EnglishLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RootShell dict={en}>{children}</RootShell>;
}
