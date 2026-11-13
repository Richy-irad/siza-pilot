import { LandingPage } from "@/components/LandingPage";
import { en } from "@/content/en";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(en, { fr: "/", en: "/en" });

export default function Page() {
  return <LandingPage dict={en} altHref="/" />;
}
