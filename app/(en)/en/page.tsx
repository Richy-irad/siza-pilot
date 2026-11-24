import { LandingPage } from "@/components/LandingPage";
import { en } from "@/content/en";
import { pageMetadata } from "@/lib/metadata";

/** EN title, description, canonical `/en` and hreflang alternates. */
export const metadata = pageMetadata(en, { fr: "/", en: "/en" });

/** English landing page (`/en`). */
export default function Page() {
  return <LandingPage dict={en} altHref="/" />;
}
