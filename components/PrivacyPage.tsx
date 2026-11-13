import type { Dictionary } from "@/content";
import { card, container } from "@/lib/ui";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Rich } from "./Rich";

/**
 * Privacy notice layout shared by `/confidentialite` and `/en/privacy`.
 * @param altHref the privacy page in the other language
 */
export function PrivacyPage({ dict, altHref }: { dict: Dictionary; altHref: string }) {
  const { privacy, lang } = dict;
  return (
    <>
      <Header dict={dict} altHref={altHref} />
      <main className={`${container} py-8 sm:py-12`}>
        <a href={dict.home} className="text-sm font-semibold text-primary underline underline-offset-2">
          {privacy.back}
        </a>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{privacy.title}</h1>
        <dl className={`${card} mt-6 max-w-3xl space-y-5`}>
          {privacy.items.map((item) => (
            <div key={item.label}>
              <dt className="font-semibold">{item.label}</dt>
              <dd className="mt-1 text-ink-muted">
                <Rich text={item.body} lang={lang} />
              </dd>
            </div>
          ))}
        </dl>
      </main>
      <Footer dict={dict} />
    </>
  );
}
