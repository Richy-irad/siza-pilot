import { LandingPage } from "@/components/LandingPage";
import { fr } from "@/content/fr";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(fr, { fr: "/", en: "/en" });

export default function Page() {
  return <LandingPage dict={fr} altHref="/en" />;
}
