import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Breadcrumbs } from "@/app/components/Breadcrumbs";
import { Hours } from "@/app/components/Hours";
import { LeadForm } from "@/app/components/LeadForm";
import { MapEmbed } from "@/app/components/MapEmbed";
import { PageHeader, Section } from "@/app/components/Section";
import { getDict, href } from "@/app/lib/i18n";
import { resolveLang } from "@/app/lib/i18n/server";
import { addressLine, getSettings, telHref } from "@/app/lib/settings";
import { pageMetadata } from "@/app/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]/kontakt">): Promise<Metadata> {
  const lang = await resolveLang(params);
  const t = getDict(lang).contact;
  return pageMetadata(lang, "/kontakt", t.metaTitle, t.metaDescription);
}

export default async function ContactPage({ params }: PageProps<"/[lang]/kontakt">) {
  const lang = await resolveLang(params);
  const dict = getDict(lang);
  const t = dict.contact;
  const settings = await getSettings();

  return (
    <>
      <PageHeader title={t.title} lead={t.lead}>
        <Breadcrumbs lang={lang} home={dict.common.home} items={[{ name: dict.nav.contact }]} />
      </PageHeader>
      <Section>
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="space-y-7 lg:col-span-2">
            <Info icon={MapPin} title={dict.common.address}>
              {settings.street}
              <br />
              {settings.zip} {settings.city}
            </Info>
            <Info icon={Phone} title={dict.common.phone}>
              <a href={telHref(settings.phone)} className="hover:underline">
                {settings.phone}
              </a>
            </Info>
            <Info icon={Mail} title={dict.common.email}>
              <a href={`mailto:${settings.email}`} className="hover:underline">
                {settings.email}
              </a>
            </Info>
            <Info icon={Clock} title={dict.common.openHours}>
              <Hours settings={settings} dict={dict} />
            </Info>
            <div className="rounded-md bg-secondary p-5">
              <h2 className="font-bold">{dict.contactExtra.helpTitle}</h2>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-muted-foreground">
                {dict.contactExtra.helpItems.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-muted-foreground">
                <strong className="text-foreground">{dict.contactExtra.replyTitle}:</strong> {dict.contactExtra.replyText}
              </p>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h2 className="mb-5 text-2xl font-bold">{t.form}</h2>
            <LeadForm lang={lang} type="contact" text={dict.form} privacyHref={href(lang, "/privatlivspolitik")} />
          </div>
        </div>
      </Section>

      <Section tone="gray">
        <h2 className="mb-6 text-2xl font-bold sm:text-3xl">{t.findUs}</h2>
        <MapEmbed address={addressLine(settings)} text={dict.map} />
      </Section>
    </>
  );
}

function Info({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ size?: number; className?: string; "aria-hidden"?: boolean }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <Icon size={20} className="mt-0.5 shrink-0 text-navy" aria-hidden />
      <div className="min-w-0 flex-1">
        <h2 className="font-bold">{title}</h2>
        <div className="mt-1.5 text-muted-foreground">{children}</div>
      </div>
    </div>
  );
}
