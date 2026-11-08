"use client";
import { useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

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
  const [done, setDone] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const copy = async () => {
    const value = copyText ?? text;
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // Older browsers: fall back to selecting a hidden field.
      const el = document.createElement("textarea");
      el.value = value;
      el.style.position = "fixed";
      el.style.opacity = "0";
      document.body.appendChild(el);
      el.select();
      try {
        document.execCommand("copy");
      } finally {
        el.remove();
      }
    }
    setDone(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setDone(false), 1600);
  };

  return (
    <button
      type="button"
      onClick={copy}
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
