"use client";
import { Check, Copy } from "lucide-react";
import { useCopy } from "./useCopy";

/** A price the visitor can click to copy, e.g. to paste into a message. Shows a short "copied" confirmation. */
export function Price({
  text,
  copyText,
  copiedLabel,
  className = "",
}: {
  text: string;
  /** What lands on the clipboard; defaults to the shown text. */
  copyText?: string;
  copiedLabel: string;
  className?: string;
}) {
  const { done, copy } = useCopy();

  return (
    <button
      type="button"
      onClick={() => copy(copyText ?? text)}
      title={copiedLabel}
      className={`price-copy group/price relative inline-flex items-center gap-2 text-left ${className}`}
    >
      <span>{text}</span>
      <span
        aria-hidden
        className={`inline-flex h-6 w-6 items-center justify-center rounded-full transition-all duration-300 ${
          done ? "scale-110 bg-emerald-500 text-white" : "bg-secondary text-muted-foreground opacity-0 group-hover/price:opacity-100 group-focus-visible/price:opacity-100"
        }`}
      >
        {done ? <Check size={13} strokeWidth={3} /> : <Copy size={12} />}
      </span>
      <span role="status" className="sr-only">
        {done ? copiedLabel : ""}
      </span>
      {done && (
        <span className="animate-pop pointer-events-none absolute -top-8 left-0 whitespace-nowrap rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground shadow-soft">
          {copiedLabel}
        </span>
      )}
    </button>
  );
}
