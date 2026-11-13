import { PrivacyPage } from "@/components/PrivacyPage";
import { fr } from "@/content/fr";
import { pageMetadata } from "@/lib/metadata";

/** FR and EN URLs of the privacy notice, for hreflang and the language toggle. */
const paths = { fr: "/confidentialite", en: "/en/privacy" };
/** FR privacy page title, canonical and hreflang alternates. */
export const metadata = pageMetadata(fr, paths, fr.meta.privacyTitle);

/** French privacy notice (Law 25). Draft: have it reviewed before launch. */
export default function Page() {
  return <PrivacyPage dict={fr} altHref={paths.en} />;
}
