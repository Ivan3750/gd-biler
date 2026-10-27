"use client";
import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";

/** On phones the filters sit behind a button; from tablet width up they are always shown. */
export function FilterPanel({ label, active, children }: { label: string; active: number; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-8 rounded-md border border-border bg-secondary">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between px-4 py-3.5 text-[15px] font-semibold md:hidden"
      >
        <span className="inline-flex items-center gap-2">
          <SlidersHorizontal size={16} aria-hidden /> {label}
          {active > 0 && <span className="rounded-full bg-brand px-2 py-0.5 text-xs text-brand-foreground">{active}</span>}
        </span>
        <span aria-hidden>{open ? "−" : "+"}</span>
      </button>
      <div className={`${open ? "block" : "hidden"} p-4 sm:p-5 md:block`}>{children}</div>
    </div>
  );
}
