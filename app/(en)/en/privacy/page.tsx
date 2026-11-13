import { PrivacyPage } from "@/components/PrivacyPage";
import { en } from "@/content/en";
import { pageMetadata } from "@/lib/metadata";

const paths = { fr: "/confidentialite", en: "/en/privacy" };
export const metadata = pageMetadata(en, paths, en.meta.privacyTitle);

export default function Page() {
  return <PrivacyPage dict={en} altHref={paths.fr} />;
}
