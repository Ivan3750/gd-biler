import { notFound } from "next/navigation";
import { isLang, type Lang } from "./index";

/** Reads the language from route params and 404s on anything that is not a supported language. */
export async function resolveLang(params: Promise<{ lang: string }>): Promise<Lang> {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  return lang;
}
