import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import heroImg from "@/app/assets/hero.jpg";
import { href, type Dict, type Lang } from "@/app/lib/i18n";
import { btnOnNavy, btnOutlineOnNavy, container, input } from "../ui";

const PRICE_STEPS = [20000, 30000, 40000, 50000, 75000, 100000];

type Props = {
  lang: Lang;
  dict: Dict;
  title: string;
  subtitle: string;
  brands: string[];
  bodies: string[];
  currency: string;
};

export function Hero({ lang, dict, title, subtitle, brands, bodies, currency }: Props) {
  const t = dict.home.search;
  return (
    <section className="relative overflow-hidden bg-navy text-navy-foreground">
      <Image src={heroImg} alt="" fill priority sizes="100vw" className="anim-fade object-cover opacity-35" />
      <div className={`${container} relative py-20 lg:py-28`}>
        <div className="anim-rise mb-5 h-0.5 w-10 bg-brand" aria-hidden />
        <h1 className="anim-rise max-w-3xl text-balance text-4xl font-bold sm:text-5xl">{title}</h1>
        <p className="anim-rise delay-1 mt-5 max-w-xl text-lg leading-relaxed text-white/80">{subtitle}</p>

        <div className="anim-rise delay-2 mt-8 flex flex-wrap gap-3">
          <Link href={href(lang, "/biler")} className={btnOnNavy}>
            {dict.common.seeCars}
          </Link>
          <Link href={href(lang, "/book-proevetur")} className={btnOutlineOnNavy}>
            {dict.home.book}
          </Link>
        </div>

        <form action={href(lang, "/biler")} className="anim-rise delay-3 mt-12 grid max-w-4xl gap-3 rounded-md bg-background p-4 text-foreground sm:grid-cols-2 lg:grid-cols-4">
          <label className="text-sm font-medium">
            {t.brand}
            <select name="brand" defaultValue="" className={input}>
              <option value="">{t.allBrands}</option>
              {brands.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </label>
          <label className="text-sm font-medium">
            {t.body}
            <select name="body" defaultValue="" className={input}>
              <option value="">{t.allTypes}</option>
              {bodies.map((b) => (
                <option key={b} value={b}>
                  {dict.body[b]}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm font-medium">
            {t.price}
            <select name="maxPrice" defaultValue="" className={input}>
              <option value="">{t.anyPrice}</option>
              {PRICE_STEPS.map((p) => (
                <option key={p} value={p}>
                  {p.toLocaleString(lang === "da" ? "da-DK" : "en-GB")} {currency}
                </option>
              ))}
            </select>
          </label>
          <button className="inline-flex items-center justify-center gap-2 self-end rounded-md bg-primary px-6 py-3 text-[15px] font-semibold text-primary-foreground hover:bg-primary/85">
            <Search size={16} aria-hidden /> {t.button}
          </button>
        </form>
      </div>
    </section>
  );
}
