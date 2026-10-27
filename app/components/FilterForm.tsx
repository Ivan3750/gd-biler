"use client";
import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";

/** Updates the list as soon as a filter changes, without reloading the page or jumping back to the top. */
export function FilterForm({ action, children }: { action: string; children: React.ReactNode }) {
  const router = useRouter();
  const params = useSearchParams();
  const [pending, start] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const submit = (form: HTMLFormElement) => {
    const qs = new URLSearchParams();
    new FormData(form).forEach((v, k) => {
      if (typeof v === "string" && v.trim()) qs.set(k, v.trim());
    });
    const q = qs.toString();
    start(() => router.replace(q ? `${action}?${q}` : action, { scroll: false }));
  };

  // Rebuild the form when the filters change from outside (back button, "reset" link) – but not while typing a search.
  const key = [...params.entries()]
    .filter(([k]) => k !== "q")
    .map(([k, v]) => `${k}=${v}`)
    .join("&");

  useEffect(() => {
    const field = formRef.current?.elements.namedItem("q") as HTMLInputElement | null;
    if (field && document.activeElement !== field) field.value = params.get("q") ?? "";
  }, [params]);

  return (
    <form
      key={key}
      ref={formRef}
      method="get"
      action={action}
      onChange={(e) => {
        const form = e.currentTarget;
        if ((e.target as unknown as HTMLInputElement).name === "q") {
          clearTimeout(timer.current);
          timer.current = setTimeout(() => submit(form), 400);
        } else submit(form);
      }}
      onSubmit={(e) => {
        e.preventDefault();
        clearTimeout(timer.current);
        submit(e.currentTarget);
      }}
      className={`space-y-4 transition-opacity ${pending ? "opacity-60" : ""}`}
    >
      {children}
    </form>
  );
}

/** On phones the filters fold away so the cars come first; on large screens they are always open. */
export function FilterPanel({
  title,
  activeCount,
  children,
}: {
  title: string;
  activeCount: number;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-border bg-background p-5 shadow-soft">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between text-base font-semibold lg:hidden"
      >
        <span className="flex items-center gap-2">
          <SlidersHorizontal size={18} /> {title}
        </span>
        {activeCount > 0 && (
          <span className="rounded-full bg-primary px-2.5 py-0.5 text-xs text-primary-foreground">{activeCount}</span>
        )}
      </button>
      <div className={`${open ? "block" : "hidden"} mt-4 lg:mt-0 lg:block`}>{children}</div>
    </div>
  );
}
