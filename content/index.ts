import type { Lang } from "@/site.config";
import { en } from "./en";
import { fr } from "./fr";

/** All dictionaries, keyed by language. */
export const dictionaries = { fr, en } as const;
/** Copy for one language. */
export const getDictionary = (lang: Lang) => dictionaries[lang];
export type { Dictionary } from "./types";
