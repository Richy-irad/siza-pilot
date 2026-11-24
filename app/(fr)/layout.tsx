import { RootShell } from "@/components/RootShell";
import { fr } from "@/content/fr";

export { viewport } from "@/lib/metadata";

/** Root layout for French routes (`/`, `/confidentialite`): `<html lang="fr-CA">`. */
export default function FrenchLayout({ children }: { children: React.ReactNode }) {
  return <RootShell dict={fr}>{children}</RootShell>;
}
