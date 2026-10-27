"use client";
import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  images: string[];
  alt: string;
  text: { image: string; of: string; prev: string; next: string };
  badge?: React.ReactNode;
};

export function Gallery({ images, alt, text, badge }: Props) {
  const [i, setI] = useState(0);
  const go = (d: number) => setI((n) => (n + d + images.length) % images.length);

  if (images.length === 0) return <div className="aspect-[4/3] rounded-md bg-secondary" />;

  return (
    <div
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(-1);
        if (e.key === "ArrowRight") go(1);
      }}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-border bg-secondary">
        <Image
          key={images[i]}
          src={images[i]}
          alt={`${alt} – ${text.image} ${i + 1}`}
          fill
          priority
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover"
        />
        {badge}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label={text.prev}
              className="absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-md bg-background/90 hover:bg-background"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label={text.next}
              className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-md bg-background/90 hover:bg-background"
            >
              <ChevronRight size={20} />
            </button>
            <p className="absolute bottom-3 right-3 rounded-sm bg-primary/80 px-2 py-1 text-xs text-primary-foreground">
              {i + 1} {text.of} {images.length}
            </p>
          </>
        )}
      </div>

      {images.length > 1 && (
        <ul className="mt-3 grid grid-cols-4 gap-3 sm:grid-cols-6">
          {images.map((src, n) => (
            <li key={src}>
              <button
                type="button"
                onClick={() => setI(n)}
                aria-label={`${text.image} ${n + 1}`}
                aria-current={n === i}
                className={`relative block aspect-[4/3] w-full overflow-hidden rounded-md border-2 ${
                  n === i ? "border-foreground" : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <Image src={src} alt="" fill sizes="120px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
