import { PrivacyPage } from "@/components/PrivacyPage";
import { fr } from "@/content/fr";
import { pageMetadata } from "@/lib/metadata";

const paths = { fr: "/confidentialite", en: "/en/privacy" };
export const metadata = pageMetadata(fr, paths, fr.meta.privacyTitle);

export default function Page() {
  return <PrivacyPage dict={fr} altHref={paths.en} />;
}
