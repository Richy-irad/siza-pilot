import { LandingPage } from "@/components/LandingPage";
import { fr } from "@/content/fr";
import { pageMetadata } from "@/lib/metadata";

/** FR title, description, canonical `/` and hreflang alternates. */
export const metadata = pageMetadata(fr, { fr: "/", en: "/en" });

/** French landing page (default route `/`). */
export default function Page() {
  return <LandingPage dict={fr} altHref="/en" />;
}
