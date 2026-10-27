"use client";
import { useState } from "react";
import type { Dict, Lang } from "@/app/lib/i18n";
import { formatPrice } from "@/app/lib/format";
import { LeadForm } from "./LeadForm";
import { input } from "./ui";

type Props = {
  lang: Lang;
  currency: string;
  defaultRate: number;
  defaultPrice: number;
  calc: Dict["finance"]["calc"];
  form: Dict["form"];
  formTitle: string;
  formText: string;
  messagePlaceholder: string;
  privacyHref: string;
};

export function payment(loan: number, yearlyRate: number, months: number) {
  const r = yearlyRate / 100 / 12;
  if (loan <= 0) return 0;
  return r === 0 ? loan / months : (loan * r) / (1 - Math.pow(1 + r, -months));
}

export function FinanceCalculator({
  lang,
  currency,
  defaultRate,
  defaultPrice,
  calc,
  form,
  formTitle,
  formText,
  messagePlaceholder,
  privacyHref,
}: Props) {
  const [price, setPrice] = useState(defaultPrice);
  const [downPct, setDownPct] = useState(20);
  const [months, setMonths] = useState(60);
  const [rate, setRate] = useState(defaultRate);

  const safePrice = Math.max(0, Math.min(price || 0, 10_000_000));
  const down = Math.round((safePrice * downPct) / 100);
  const loan = safePrice - down;
  const monthly = payment(loan, rate, months);
  const total = monthly * months;
  const money = (n: number) => formatPrice(Math.round(n), currency, lang);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="rounded-md border border-border bg-background p-6 sm:p-8">
        <h2 className="text-xl font-bold">{calc.title}</h2>

        <div className="mt-6 space-y-6">
          <label className="block text-sm font-medium">
            {calc.price} ({currency})
            <input
              type="number"
              min={0}
              max={10_000_000}
              step={500}
              value={price || ""}
              onChange={(e) => setPrice(Number(e.target.value))}
              className={input}
            />
          </label>

          <label className="block text-sm font-medium">
            <span className="flex justify-between">
              <span>{calc.down}</span>
              <span>
                {downPct}% · {money(down)}
              </span>
            </span>
            <input
              type="range"
              min={0}
              max={50}
              step={5}
              value={downPct}
              onChange={(e) => setDownPct(Number(e.target.value))}
              className="mt-3 w-full accent-[var(--navy)]"
            />
          </label>

          <label className="block text-sm font-medium">
            <span className="flex justify-between">
              <span>{calc.months}</span>
              <span>
                {months} {calc.monthsUnit}
              </span>
            </span>
            <input
              type="range"
              min={12}
              max={84}
              step={6}
              value={months}
              onChange={(e) => setMonths(Number(e.target.value))}
              className="mt-3 w-full accent-[var(--navy)]"
            />
          </label>

          <label className="block text-sm font-medium">
            {calc.rate} (%)
            <input
              type="number"
              min={0}
              max={30}
              step={0.1}
              value={rate}
              onChange={(e) => setRate(Math.max(0, Number(e.target.value)))}
              className={input}
            />
          </label>
        </div>

        <div className="mt-8 border-t border-border pt-6" aria-live="polite">
          <p className="text-sm text-muted-foreground">{calc.monthly}</p>
          <p className="mt-1 border-l-2 border-brand pl-3 text-4xl font-bold">{money(monthly)}</p>
          <dl className="mt-6 grid grid-cols-3 gap-4 text-sm">
            <div>
              <dt className="text-muted-foreground">{calc.financed}</dt>
              <dd className="mt-1 font-semibold">{money(loan)}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">{calc.interest}</dt>
              <dd className="mt-1 font-semibold">{money(Math.max(0, total - loan))}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">{calc.total}</dt>
              <dd className="mt-1 font-semibold">{money(total + down)}</dd>
            </div>
          </dl>
          <p className="mt-6 text-xs leading-relaxed text-muted-foreground">{calc.disclaimer}</p>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold">{formTitle}</h2>
        <p className="mb-5 mt-2 leading-relaxed text-muted-foreground">{formText}</p>
        <LeadForm
          lang={lang}
          type="finance"
          text={form}
          privacyHref={privacyHref}
          messagePlaceholder={messagePlaceholder}
          hidden={{
            price: `${safePrice} ${currency}`,
            down: `${down} ${currency} (${downPct}%)`,
            months: String(months),
            monthly: `${Math.round(monthly)} ${currency} (${rate}%)`,
          }}
        />
      </div>
    </div>
  );
}
