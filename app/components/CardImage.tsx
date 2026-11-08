"use client";
import { useState } from "react";
import { Camera } from "lucide-react";

/** Card photo that previews the other photos: move the pointer across it, or swipe on touch screens. */
export function CardImage({
  images,
  alt,
  href,
  brand,
}: {
  images: string[];
  alt: string;
  href: string;
  brand: string;
}) {
  const [i, setI] = useState(0);
  const n = images.length;

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (n < 2) return;
    const r = e.currentTarget.getBoundingClientRect();
    const idx = Math.min(n - 1, Math.max(0, Math.floor(((e.clientX - r.left) / r.width) * n)));
    setI(idx);
  };

  return (
    <a
      href={href}
      onMouseMove={onMove}
      onMouseLeave={() => setI(0)}
      className="relative block aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-secondary"
    >
      <img
        key={images[i]}
        src={images[i]}
        alt={alt}
        loading="lazy"
        width={1024}
        className="animate-fade-in h-full w-full object-cover object-[center_58%] transition-transform duration-700 ease-out group-hover:scale-[1.05]"
      />
      <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/35 to-transparent" />
      <span className="absolute left-3 top-3 rounded-full bg-black/45 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
        {brand}
      </span>
      {n > 1 && (
        <>
          <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/45 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-md">
            <Camera size={12} /> {n}
          </span>
          <span className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
            {images.map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 rounded-full transition-all ${idx === i ? "w-5 bg-white" : "w-1.5 bg-white/60"}`}
              />
            ))}
          </span>
        </>
      )}
    </a>
  );
}
