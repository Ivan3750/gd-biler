"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";

type Labels = { photo: string; of: string; prev: string; next: string; close: string; enlarge: string };

const SWIPE_PX = 40;

export function Gallery({ images, alt, labels }: { images: string[]; alt: string; labels: Labels }) {
  const [i, setI] = useState(0);
  const [open, setOpen] = useState(false);
  const n = images.length;
  const touchX = useRef<number | null>(null);
  const strip = useRef<HTMLUListElement>(null);

  const go = useCallback((d: number) => setI((x) => (x + d + n) % n), [n]);

  // Keyboard control while the full-screen view is open; also stops the page behind from scrolling.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, go]);

  // Keep the selected thumbnail in view.
  useEffect(() => {
    const el = strip.current?.children[i] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [i]);

  const swipe = {
    onTouchStart: (e: React.TouchEvent) => {
      touchX.current = e.touches[0].clientX;
    },
    onTouchEnd: (e: React.TouchEvent) => {
      if (touchX.current === null) return;
      const dx = e.changedTouches[0].clientX - touchX.current;
      touchX.current = null;
      if (Math.abs(dx) > SWIPE_PX) go(dx < 0 ? 1 : -1);
    },
  };

  const arrow =
    "absolute top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-primary backdrop-blur transition-transform hover:scale-105";

  return (
    <div>
      <div className="relative overflow-hidden rounded-3xl border border-border bg-secondary shadow-elevated" {...swipe}>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={labels.enlarge}
          className="block w-full cursor-zoom-in"
        >
          <img
            src={images[i]}
            alt={`${alt} – ${labels.photo} ${i + 1}`}
            width={1280}
            height={960}
            className="h-full w-full object-cover aspect-[4/3]"
          />
        </button>
        {n > 1 && (
          <>
            <button type="button" onClick={() => go(-1)} aria-label={labels.prev} className={`${arrow} left-4`}>
              <ChevronLeft size={20} />
            </button>
            <button type="button" onClick={() => go(1)} aria-label={labels.next} className={`${arrow} right-4`}>
              <ChevronRight size={20} />
            </button>
          </>
        )}
        <span className="pointer-events-none absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-primary/80 px-3 py-1 text-xs font-medium text-primary-foreground">
          <Expand size={12} /> {i + 1} {labels.of} {n}
        </span>
      </div>

      {n > 1 && (
        <ul ref={strip} className="mt-4 flex snap-x gap-3 overflow-x-auto pb-2">
          {images.map((src, idx) => (
            <li key={src} className="w-24 shrink-0 snap-start sm:w-28">
              <button
                type="button"
                onClick={() => setI(idx)}
                aria-label={`${labels.photo} ${idx + 1}`}
                aria-current={idx === i}
                className={`block w-full overflow-hidden rounded-xl border-2 transition-all ${
                  idx === i ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img src={src} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          className="fixed inset-0 z-[100] flex flex-col bg-black/95 animate-fade-in"
          onClick={() => setOpen(false)}
        >
          <div className="flex items-center justify-between px-5 py-4 text-white">
            <span className="text-sm text-white/70">
              {i + 1} {labels.of} {n}
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={labels.close}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
            >
              <X size={20} />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4" {...swipe}>
            <img
              src={images[i]}
              alt={`${alt} – ${labels.photo} ${i + 1}`}
              onClick={(e) => e.stopPropagation()}
              className="max-h-full max-w-full rounded-lg object-contain"
            />
            {n > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    go(-1);
                  }}
                  aria-label={labels.prev}
                  className={`${arrow} left-4`}
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    go(1);
                  }}
                  aria-label={labels.next}
                  className={`${arrow} right-4`}
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>

          {n > 1 && (
            <ul
              className="flex justify-center gap-2 overflow-x-auto px-4 py-4"
              onClick={(e) => e.stopPropagation()}
            >
              {images.map((src, idx) => (
                <li key={src} className="w-16 shrink-0 sm:w-20">
                  <button
                    type="button"
                    onClick={() => setI(idx)}
                    aria-label={`${labels.photo} ${idx + 1}`}
                    className={`block w-full overflow-hidden rounded-md border-2 ${
                      idx === i ? "border-white" : "border-transparent opacity-50 hover:opacity-100"
                    }`}
                  >
                    <img src={src} alt="" className="aspect-[4/3] w-full object-cover" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
