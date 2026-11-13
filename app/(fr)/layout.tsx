import { RootShell } from "@/components/RootShell";
import { fr } from "@/content/fr";

export { viewport } from "@/lib/metadata";

export default function FrenchLayout({ children }: { children: React.ReactNode }) {
  return <RootShell dict={fr}>{children}</RootShell>;
}
