"use client";
import { useState } from "react";
import { Check, Link2 } from "lucide-react";

export function CopyLink({ label, done }: { label: string; done: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(window.location.href);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch {
          // Clipboard can be blocked; the address bar still works.
        }
      }}
      className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
    >
      {copied ? <Check size={16} aria-hidden /> : <Link2 size={16} aria-hidden />}
      <span aria-live="polite">{copied ? done : label}</span>
    </button>
  );
}
