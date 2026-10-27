import type { Metadata } from "next";
import { Breadcrumbs } from "@/app/components/Breadcrumbs";
import { Hours } from "@/app/components/Hours";
import { LeadForm } from "@/app/components/LeadForm";
import { PageHeader, Section } from "@/app/components/Section";
import { input } from "@/app/components/ui";
import { carTitle, listPublicCars } from "@/app/lib/cars";
import { getDict, href } from "@/app/lib/i18n";
import { resolveLang } from "@/app/lib/i18n/server";
import { getSettings } from "@/app/lib/settings";
import { pageMetadata } from "@/app/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]/book-proevetur">): Promise<Metadata> {
  const lang = await resolveLang(params);
  const t = getDict(lang).book;
  return pageMetadata(lang, "/book-proevetur", t.metaTitle, t.metaDescription);
}

export default async function BookPage({ params, searchParams }: PageProps<"/[lang]/book-proevetur">) {
  const lang = await resolveLang(params);
  const dict = getDict(lang);
  const t = dict.book;
  const sp = await searchParams;
  const wanted = Array.isArray(sp.car) ? sp.car[0] : sp.car;
  const [settings, cars] = await Promise.all([getSettings(), listPublicCars()]);
  const bookable = cars.filter((c) => c.status === "available");
  const today = new Date().toLocaleDateString("sv-SE", { timeZone: "Europe/Copenhagen" });

  return (
    <>
      <PageHeader title={t.title} lead={t.lead}>
        <Breadcrumbs lang={lang} home={dict.common.home} items={[{ name: dict.info.items.book }]} />
      </PageHeader>
      <Section>
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <LeadForm
              lang={lang}
              type="testdrive"
              text={dict.form}
              privacyHref={href(lang, "/privatlivspolitik")}
              messageLabel={t.messageLabel}
              messagePlaceholder={t.messagePlaceholder}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="text-sm font-medium sm:col-span-2">
                  {t.car}
                  <select name="carId" defaultValue={bookable.some((c) => c.id === wanted) ? wanted : ""} className={input}>
                    <option value="">{t.anyCar}</option>
                    {bookable.map((c) => (
                      <option key={c.id} value={c.id}>
                        {carTitle(c)} ({c.year})
                      </option>
                    ))}
                  </select>
                </label>
                <label className="text-sm font-medium">
                  {t.date} *
                  <input name="d_date" type="date" required min={today} className={input} />
                </label>
                <label className="text-sm font-medium">
                  {t.time}
                  <select name="d_time" defaultValue={t.times[2]} className={input}>
                    {t.times.map((x) => (
                      <option key={x}>{x}</option>
                    ))}
                  </select>
                </label>
              </div>
            </LeadForm>
          </div>
          <aside className="lg:col-span-2">
            <h2 className="mb-3 text-xl font-bold">{dict.common.openHours}</h2>
            <Hours settings={settings} dict={dict} />
            <p className="mt-6 rounded-md bg-secondary p-4 text-muted-foreground">{t.bring}</p>
          </aside>
        </div>
      </Section>
    </>
  );
}
