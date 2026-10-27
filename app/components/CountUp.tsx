"use client";
import { useEffect, useRef } from "react";

/** Shows e.g. "100+" and counts up to it the first time it is seen. The final text is in the HTML for search engines. */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    const m = /^(\d+)(.*)$/.exec(value);
    if (!el || !m || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const target = Number(m[1]);
    const suffix = m[2];
    let frame = 0;
    el.textContent = `0${suffix}`;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / 1100);
        el.textContent = `${Math.round(target * (1 - Math.pow(1 - t, 3)))}${suffix}`;
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      el.textContent = value;
    };
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
