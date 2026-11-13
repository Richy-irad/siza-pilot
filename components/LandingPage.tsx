import type { Dictionary } from "@/content";
import { Faq } from "./Faq";
import { FinalCta } from "./FinalCta";
import { Footer } from "./Footer";
import { FounderStory } from "./FounderStory";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { HowItWorks } from "./HowItWorks";
import { InsuranceNote } from "./InsuranceNote";
import { NoticeBanner } from "./NoticeBanner";
import { Promises } from "./Promises";
import { ProviderStrip } from "./ProviderStrip";
import { SafetyStrip } from "./SafetyStrip";
import { Services } from "./Services";
import { StickyActionBar } from "./StickyActionBar";

export function LandingPage({ dict, altHref }: { dict: Dictionary; altHref: string }) {
  return (
    <>
      <NoticeBanner lang={dict.lang} />
      <Header dict={dict} altHref={altHref} />
      <main>
        <Hero dict={dict} />
        <SafetyStrip dict={dict} />
        <Services dict={dict} />
        <HowItWorks dict={dict} />
        <Promises dict={dict} />
        <InsuranceNote dict={dict} />
        <FounderStory dict={dict} />
        <Faq dict={dict} />
        <FinalCta dict={dict} />
      </main>
      <ProviderStrip dict={dict} />
      <Footer dict={dict} />
      <StickyActionBar dict={dict} />
    </>
  );
}
