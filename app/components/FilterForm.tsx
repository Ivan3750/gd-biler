"use client";
import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";

const TYPED = new Set(["text", "number", "search"]);

/**
 * Updates the list as soon as a filter changes, without reloading the page or jumping back to the top.
 * Checkboxes may repeat a name (several values); typed fields wait a moment so typing is not interrupted.
 */
export function FilterForm({ action, children }: { action: string; children: React.ReactNode }) {
  const router = useRouter();
  const params = useSearchParams();
  const [pending, start] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const submit = (form: HTMLFormElement) => {
    const qs = new URLSearchParams();
    new FormData(form).forEach((v, k) => {
      if (typeof v === "string" && v.trim()) qs.append(k, v.trim());
    });
    const q = qs.toString();
    start(() => router.replace(q ? `${action}?${q}` : action, { scroll: false }));
  };

  // Keep the fields in step when the filters change from outside (back button, reset link, removed chip).
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    for (const el of Array.from(form.elements)) {
      if (!(el instanceof HTMLInputElement || el instanceof HTMLSelectElement) || !el.name) continue;
      if (el instanceof HTMLInputElement && (el.type === "checkbox" || el.type === "radio")) {
        const chosen = params.getAll(el.name);
        el.checked = chosen.length ? chosen.includes(el.value) : el.value === "";
      } else if (document.activeElement !== el) {
        el.value = params.get(el.name) ?? "";
      }
    }
  }, [params]);

  return (
    <form
      ref={formRef}
      method="get"
      action={action}
      onChange={(e) => {
        const form = e.currentTarget;
        const target: unknown = e.target;
        clearTimeout(timer.current);
        if (target instanceof HTMLInputElement && TYPED.has(target.type)) {
          timer.current = setTimeout(() => submit(form), 450);
        } else submit(form);
      }}
      onSubmit={(e) => {
        e.preventDefault();
        clearTimeout(timer.current);
        submit(e.currentTarget);
      }}
      className={`transition-opacity ${pending ? "opacity-70" : ""}`}
    >
      {children}
    </form>
  );
}

/**
 * The filter column. On large screens it is always shown beside the list; on phones it opens as a full-screen
 * sheet with a bar at the bottom to reset or show the result.
 */
export function FilterDrawer({
  title,
  activeCount,
  showLabel,
  resetLabel,
  resetHref,
  children,
}: {
  title: string;
  activeCount: number;
  showLabel: string;
  resetLabel: string;
  resetHref: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex w-full items-center justify-between rounded-xl bg-primary px-5 py-3.5 text-base font-semibold text-primary-foreground lg:hidden"
      >
        <span className="flex items-center gap-2">
          <SlidersHorizontal size={18} /> {title}
        </span>
        {activeCount > 0 && <span className="rounded-full bg-white px-2.5 py-0.5 text-xs text-primary">{activeCount}</span>}
      </button>

      <div
        className={`${
          open ? "fixed inset-0 z-[60] flex flex-col bg-background" : "hidden"
        } lg:static lg:z-auto lg:block lg:rounded-2xl lg:border lg:border-border lg:bg-background lg:shadow-soft`}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4 lg:hidden">
          <span className="text-lg font-semibold">{title}</span>
          <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="rounded-full p-1.5 hover:bg-secondary">
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-2 lg:overflow-visible lg:py-3">{children}</div>
        <div className="flex items-center justify-between gap-3 border-t border-border bg-background px-5 py-3 shadow-[0_-4px_12px_rgba(0,0,0,0.06)] lg:hidden">
          <a href={resetHref} onClick={() => setOpen(false)} className="text-sm font-semibold underline underline-offset-4">
            {resetLabel}
          </a>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
          >
            {showLabel}
          </button>
        </div>
      </div>
    </>
  );
}
