import { PrivacyPage } from "@/components/PrivacyPage";
import { en } from "@/content/en";
import { pageMetadata } from "@/lib/metadata";

/** FR and EN URLs of the privacy notice, for hreflang and the language toggle. */
const paths = { fr: "/confidentialite", en: "/en/privacy" };
/** EN privacy page title, canonical and hreflang alternates. */
export const metadata = pageMetadata(en, paths, en.meta.privacyTitle);

/** English privacy notice (Law 25). Draft: have it reviewed before launch. */
export default function Page() {
  return <PrivacyPage dict={en} altHref={paths.fr} />;
}
