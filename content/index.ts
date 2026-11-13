import type { Lang } from "@/site.config";
import { en } from "./en";
import { fr } from "./fr";

export const dictionaries = { fr, en } as const;
export const getDictionary = (lang: Lang) => dictionaries[lang];
export type { Dictionary } from "./types";
