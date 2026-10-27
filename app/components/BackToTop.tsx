"use client";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop({ label }: { label: string }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <button
      type="button"
      aria-label={label}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="anim-fade fixed bottom-[calc(4.75rem+env(safe-area-inset-bottom))] right-4 z-30 inline-flex h-11 w-11 items-center justify-center rounded-md border border-border bg-background shadow-md hover:bg-secondary lg:bottom-6 lg:right-6"
    >
      <ArrowUp size={18} aria-hidden />
    </button>
  );
}
