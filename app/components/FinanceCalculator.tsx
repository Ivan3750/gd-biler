"use client";
import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";

type Labels = {
  price: string;
  down: string;
  months: string;
  rate: string;
  monthsUnit: string;
  perMonth: string;
  financed: string;
  totalInterest: string;
  totalPay: string;
  disclaimer: string;
  cta: string;
  carLabel: string;
};

export function FinanceCalculator({
  labels: l,
  lang,
  initialPrice,
  carName,
  ctaHref,
}: {
  labels: Labels;
  lang: "da" | "en";
  initialPrice: number;
  carName?: string;
  ctaHref: string;
}) {
  const [price, setPrice] = useState(initialPrice);
  const [downPct, setDownPct] = useState(20);
  const [months, setMonths] = useState(60);
  const [rate, setRate] = useState(6);

  const money = (n: number) =>
    lang === "en" ? `${Math.round(n).toLocaleString("en-GB")} DKK` : `${Math.round(n).toLocaleString("da-DK")} kr.`;

  const r = useMemo(() => {
    const down = (price * downPct) / 100;
    const loan = price - down;
    const i = rate / 100 / 12;
    const monthly = loan <= 0 ? 0 : i === 0 ? loan / months : (loan * i) / (1 - Math.pow(1 + i, -months));
    const total = monthly * months;
    return { down, loan, monthly, total, interest: total - loan };
  }, [price, downPct, months, rate]);

  // Share of the repayment that is the loan itself, for the bar.
  const principalShare = r.total > 0 ? (r.loan / r.total) * 100 : 100;

  return (
    <div className="grid overflow-hidden rounded-[2rem] border border-border bg-card shadow-elevated lg:grid-cols-5">
      <div className="space-y-7 p-7 sm:p-9 lg:col-span-3">
        {carName && (
          <p className="rounded-2xl bg-secondary px-4 py-3 text-sm">
            <span className="text-muted-foreground">{l.carLabel}</span> <span className="font-semibold">{carName}</span>
          </p>
        )}
        <Slider label={l.price} value={money(price)} min={3000} max={150000} step={500} v={price} set={setPrice} />
        <Slider label={l.down} value={`${downPct}% · ${money(r.down)}`} min={0} max={60} step={5} v={downPct} set={setDownPct} />
        <Slider label={l.months} value={`${months} ${l.monthsUnit}`} min={12} max={96} step={6} v={months} set={setMonths} />
        <Slider label={l.rate} value={`${rate.toFixed(1)}%`} min={0} max={15} step={0.5} v={rate} set={setRate} />
      </div>

      <div className="relative flex flex-col justify-between gap-8 bg-navy texture-light p-7 text-navy-foreground sm:p-9 lg:col-span-2">
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand/25 blur-3xl" />
        <div className="relative">
          <span className="text-[11px] uppercase tracking-[0.2em] text-white/60">{l.perMonth}</span>
          <p className="mt-2 text-5xl font-semibold tracking-tight transition-all sm:text-6xl" aria-live="polite">
            {money(r.monthly)}
          </p>

          <div className="mt-7 h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-white transition-all duration-500" style={{ width: `${principalShare}%` }} />
          </div>
          <dl className="mt-5 space-y-3 text-sm">
            <Row k={l.financed} v={money(r.loan)} />
            <Row k={l.totalInterest} v={money(r.interest)} />
            <Row k={l.totalPay} v={money(r.total)} />
          </dl>
        </div>
        <div className="relative">
          <a
            href={ctaHref}
            className="btn-sheen inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-primary transition-all hover:scale-[1.02]"
          >
            {l.cta} <ArrowUpRight size={16} />
          </a>
          <p className="mt-4 text-xs leading-relaxed text-white/55">{l.disclaimer}</p>
        </div>
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-white/10 pb-3 last:border-0">
      <dt className="text-white/65">{k}</dt>
      <dd className="font-semibold">{v}</dd>
    </div>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  v,
  set,
}: {
  label: string;
  value: string;
  min: number;
  max: number;
  step: number;
  v: number;
  set: (n: number) => void;
}) {
  const pct = ((v - min) / (max - min)) * 100;
  return (
    <label className="block">
      <span className="flex items-baseline justify-between gap-4">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        <span className="text-lg font-semibold tracking-tight">{value}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={v}
        onChange={(e) => set(Number(e.target.value))}
        className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full accent-[oklch(0.25_0.055_252)]"
        style={{ background: `linear-gradient(to right, oklch(0.25 0.055 252) ${pct}%, oklch(0.92 0.005 250) ${pct}%)` }}
      />
    </label>
  );
}
