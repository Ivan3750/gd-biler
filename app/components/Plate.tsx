"use client";
import { Check } from "lucide-react";
import { useCopiedLabel, useCopy } from "./useCopy";

/**
 * Danish-style registration plate: blue EU strip with a ring of stars, embossed black characters.
 * Clicking it copies the number (without spaces) and shows a short "copied" message.
 * Size follows the font size.
 */
const STARS = Array.from({ length: 12 }, (_, i) => {
  const a = (i / 12) * Math.PI * 2;
  return [12 + Math.sin(a) * 7.5, 12 - Math.cos(a) * 7.5] as const;
});

export function Plate({ value, className = "text-2xl" }: { value: string; className?: string }) {
  const { done, copy } = useCopy();
  const { label, hint } = useCopiedLabel();

  return (
    <span className="relative inline-flex">
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          copy(value.replace(/\s+/g, ""));
        }}
        aria-label={`${value} – ${hint}`}
        title={hint}
        className={`plate ${done ? "plate-done" : ""} ${className}`}
      >
        <span className="plate-eu" aria-hidden>
          <svg viewBox="0 0 24 24" className="plate-stars">
            {STARS.map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="1.15" fill="currentColor" />
            ))}
          </svg>
          <b>DK</b>
        </span>
        <span className="plate-no">{value}</span>
      </button>
      <span role="status" className="sr-only">
        {done ? label : ""}
      </span>
      {done && (
        <span className="animate-pop pointer-events-none absolute -top-9 left-1/2 z-20 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-emerald-600 px-3 py-1 text-xs font-medium text-white shadow-elevated">
          <Check size={13} strokeWidth={3} /> {label}
        </span>
      )}
    </span>
  );
}
