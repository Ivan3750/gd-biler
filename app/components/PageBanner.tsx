import type { ReactNode } from "react";
import { getImages } from "@/app/lib/images";

/** Dark banner with the hero photo, shared by the info pages. */
export async function PageBanner({
  badge,
  title,
  text,
  children,
}: {
  badge: string;
  title: readonly string[];
  text: string;
  children?: ReactNode;
}) {
  const images = await getImages();
  return (
    <section id="top" className="relative w-full overflow-hidden bg-navy text-white">
      <img
        src={images.hero}
        alt=""
        width={1920}
        height={1280}
        className="absolute inset-0 h-full w-full object-cover opacity-90"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.12 0.03 254 / 0.6) 0%, oklch(0.10 0.03 254 / 0.75) 60%, oklch(0.08 0.02 254 / 0.95) 100%)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-36 pb-14 lg:px-10 lg:pt-44 lg:pb-20">
        <div className="max-w-3xl animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-white/90">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            {badge}
          </span>
          <h1 className="mt-6 text-balance text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            {title[0]}
            <br />
            <span className="text-white/70">{title[1]}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/75 leading-relaxed">{text}</p>
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </div>
      </div>
    </section>
  );
}
