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
      className="relative block aspect-[4/3] overflow-hidden bg-secondary"
    >
      <img src={images[i]} alt={alt} loading="lazy" width={1024} className="h-full w-full object-cover" />
      <span className="absolute top-4 left-4 rounded-full bg-white/95 backdrop-blur px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
        {brand}
      </span>
      {n > 1 && (
        <>
          <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-primary/80 px-2.5 py-1 text-[11px] font-medium text-primary-foreground">
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
