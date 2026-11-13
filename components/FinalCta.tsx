import { ArrowRight } from "lucide-react";
import type { Dictionary } from "@/content";
import { btnPrimary, btnSecondary, card, container } from "@/lib/ui";
import { ContactActions } from "./ContactActions";
import { RequestButton } from "./RequestButton";
import { SaveContact } from "./SaveContact";

/** Closing card: save-contact (primary here), request form, then call/text/WhatsApp. */
export function FinalCta({ dict }: { dict: Dictionary }) {
  const { final, lang } = dict;
  return (
    <section
      className={`${container} py-10 sm:py-14`}
      aria-labelledby="final-h"
    >
      <div className={`${card} mx-auto max-w-2xl text-center sm:p-10`}>
        <h2
          id="final-h"
          className="text-2xl font-bold tracking-tight text-balance sm:text-3xl"
        >
          {final.heading}
        </h2>
        <div className="mx-auto mt-6 flex max-w-md flex-col gap-3">
          <SaveContact
            lang={lang}
            placement="final"
            label={final.save}
            className={`${btnPrimary} w-full`}
          />
          <RequestButton
            lang={lang}
            placement="final"
            className={`${btnSecondary} w-full`}
          >
            {final.cta}
            <ArrowRight className="size-5" aria-hidden />
          </RequestButton>
          <ContactActions dict={dict} placement="final" />
        </div>
      </div>
    </section>
  );
}
