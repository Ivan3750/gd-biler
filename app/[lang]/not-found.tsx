"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Section } from "@/app/components/Section";
import { btnPrimary } from "@/app/components/ui";
import { href } from "@/app/lib/i18n/core";

const text = {
  da: { title: "Siden findes ikke", text: "Den side, du leder efter, er flyttet eller findes ikke længere.", cta: "Til forsiden" },
  en: { title: "Page not found", text: "The page you are looking for has moved or no longer exists.", cta: "Go to the home page" },
};

export default function NotFound() {
  // Not-found pages get no route params, so the language is read from the URL.
  const lang = usePathname().startsWith("/en") ? "en" : "da";
  const t = text[lang];
  return (
    <Section>
      <div className="mx-auto max-w-xl py-10 text-center">
        <p className="text-6xl font-bold text-brand">404</p>
        <h1 className="mt-4 text-3xl font-bold">{t.title}</h1>
        <p className="mt-3 text-lg text-muted-foreground">{t.text}</p>
        <Link href={href(lang, "/")} className={`${btnPrimary} mt-8`}>
          {t.cta}
        </Link>
      </div>
    </Section>
  );
}
