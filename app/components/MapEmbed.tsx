"use client";
import { useState } from "react";
import { MapPin } from "lucide-react";
import { btnPrimary, btnSecondary } from "./ui";

type Props = {
  address: string;
  text: { title: string; consent: string; show: string; open: string };
};

/** Google Maps is only loaded after a click, so no data goes to Google before the visitor agrees. */
export function MapEmbed({ address, text }: Props) {
  const [shown, setShown] = useState(false);
  const q = encodeURIComponent(address);

  if (shown) {
    return (
      <iframe
        title={text.title}
        src={`https://www.google.com/maps?q=${q}&output=embed`}
        className="h-full min-h-[360px] w-full rounded-md border border-border"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }

  return (
    <div className="flex h-full min-h-[360px] flex-col items-center justify-center gap-4 rounded-md border border-border bg-secondary p-8 text-center">
      <MapPin size={28} className="text-brand" aria-hidden />
      <p className="font-semibold">{address}</p>
      <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">{text.consent}</p>
      <div className="flex flex-wrap justify-center gap-3">
        <button type="button" onClick={() => setShown(true)} className={btnPrimary}>
          {text.show}
        </button>
        <a href={`https://www.google.com/maps/search/?api=1&query=${q}`} target="_blank" rel="noopener noreferrer" className={btnSecondary}>
          {text.open}
        </a>
      </div>
    </div>
  );
}
