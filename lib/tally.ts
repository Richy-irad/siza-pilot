import { site, type Lang } from "@/site.config";

declare global {
  interface Window {
    /** Tally embed.js API (loaded lazily). */
    Tally?: {
      openPopup: (
        formId: string,
        options?: {
          layout?: "default" | "modal";
          hiddenFields?: Record<string, string>;
        },
      ) => void;
    };
  }
}

/** Which form a button opens and what it pre-fills. */
export type TallyOpts = { notify?: boolean; category?: string };

/** Notify form for soon categories (when configured), else the request form for `lang`. */
export const tallyFormId = (lang: Lang, notify?: boolean) =>
  (notify && site.tally.notify) || site.tally[lang];

/** Hidden-field values sent to Tally: `src`, `lang`, and `category` when known. */
export const tallyFields = (
  lang: Lang,
  src: string,
  { category }: TallyOpts = {},
) => ({
  src,
  lang,
  ...(category && { category }),
});

/** Direct Tally form URL; no-JS fallback for the popup. Tally reads hidden fields from the query. */
export const tallyHref = (lang: Lang, src: string, opts: TallyOpts = {}) =>
  `https://tally.so/r/${tallyFormId(lang, opts.notify)}?${new URLSearchParams(tallyFields(lang, src, opts))}`;

/**
 * Opens the form as a Tally popup with hidden fields.
 * @returns false when embed.js hasn't loaded, so the caller lets the link open normally.
 * If the popup throws, opens the form in a new tab instead.
 */
export function openTallyPopup(lang: Lang, src: string, opts: TallyOpts = {}) {
  if (!window.Tally?.openPopup) return false;
  try {
    window.Tally.openPopup(tallyFormId(lang, opts.notify), {
      layout: "modal",
      hiddenFields: tallyFields(lang, src, opts),
    });
  } catch {
    window.open(tallyHref(lang, src, opts), "_blank", "noopener");
  }
  return true;
}
