import { da } from "./da";
import { en } from "./en";
import type { Lang } from "./core";

export * from "./core";

export type Dict = typeof da;

const dicts: Record<Lang, Dict> = { da, en };

export const getDict = (lang: Lang): Dict => dicts[lang];
