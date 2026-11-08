"use client";
import { useCallback, useEffect, useRef, useState } from "react";

/** Copies text to the clipboard and reports `done` for a moment, so the caller can show "copied". */
export function useCopy(ms = 1600) {
  const [done, setDone] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = useCallback(
    async (value: string) => {
      try {
        await navigator.clipboard.writeText(value);
      } catch {
        // Older browsers or no permission: fall back to selecting a hidden field.
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
      timer.current = setTimeout(() => setDone(false), ms);
    },
    [ms],
  );

  return { done, copy };
}

/** "Copied" in the page language. Starts Danish and switches after mount, so server and browser markup agree. */
export function useCopiedLabel() {
  const [en, setEn] = useState(false);
  useEffect(() => setEn(document.documentElement.lang === "en"), []);
  return { en, label: en ? "Copied" : "Kopieret", hint: en ? "Click to copy" : "Klik for at kopiere" };
}
