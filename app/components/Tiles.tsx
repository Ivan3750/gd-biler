import { ArrowUpRight } from "lucide-react";
import { getDict, localePath } from "@/app/lib/i18n";
import { getImages } from "@/app/lib/images";

/** Three large photo links to the main sections of the site. */
export async function Tiles() {
  const [{ lang, t }, images] = await Promise.all([getDict(), getImages()]);
  const tiles = [
    { title: t.nav.cars, text: t.tiles.cars, href: "/biler", img: images.tileCars },
    { title: t.nav.workshop, text: t.tiles.workshop, href: "/vaerksted", img: images.tileWorkshop },
    { title: t.nav.about, text: t.tiles.about, href: "/om-os", img: images.tileAbout },
  ];

  return (
    <section className="bg-background pb-4 lg:pb-8">
      <div className="mx-auto grid max-w-7xl gap-4 px-6 sm:grid-cols-3 lg:gap-6 lg:px-10">
        {tiles.map((x) => (
          <a
            key={x.href}
            href={localePath(lang, x.href)}
            className="group relative flex aspect-[4/3] items-end overflow-hidden rounded-2xl bg-navy sm:aspect-[3/4] lg:aspect-[4/5]"
          >
            <img
              src={x.img}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
            <div className="relative flex w-full items-end justify-between gap-4 p-6 text-white">
              <div>
                <h3 className="text-3xl font-semibold tracking-tight">{x.title}</h3>
                <p className="mt-1 text-sm text-white/75">{x.text}</p>
              </div>
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-primary transition-transform group-hover:rotate-12">
                <ArrowUpRight size={18} />
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
