import { getDict, localePath } from "@/app/lib/i18n";
import { getSettings, telHref } from "@/app/lib/settings";
import { getImages } from "@/app/lib/images";
import { HeaderClient } from "./HeaderClient";

export async function Header() {
  const [{ lang, t }, settings, images] = await Promise.all([getDict(), getSettings(), getImages()]);
  const nav = [
    { label: t.nav.cars, href: localePath(lang, "/biler") },
    { label: t.nav.sell, href: localePath(lang, "/saelg-din-bil") },
    { label: t.nav.workshop, href: localePath(lang, "/vaerksted") },
    { label: t.nav.about, href: localePath(lang, "/om-os") },
    { label: t.nav.contact, href: localePath(lang, "/kontakt") },
  ];
  return <HeaderClient phone={settings.phone} phoneHref={telHref(settings.phone)} logoSrc={images.logo} lang={lang} homeHref={localePath(lang, "/")} nav={nav} menuLabel={t.nav.menu} switchLabel={t.nav.switchTo} />;
}
