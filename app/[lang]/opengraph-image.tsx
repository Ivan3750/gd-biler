import { ImageResponse } from "next/og";
import { getSettings } from "@/app/lib/settings";
import { isLang } from "@/app/lib/i18n";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "GD Biler";
export const dynamic = "force-dynamic";

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const settings = await getSettings();
  const tagline = isLang(lang) && lang === "en" ? "Used cars in" : "Brugte biler i";
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", background: "#0e2a47", color: "white", padding: 80 }}>
        <div style={{ width: 80, height: 6, background: "#c98a4b", marginBottom: 36, display: "flex" }} />
        <div style={{ fontSize: 120, fontWeight: 700, display: "flex" }}>GD Biler</div>
        <div style={{ fontSize: 48, marginTop: 20, opacity: 0.85, display: "flex" }}>
          {tagline} {settings.city}
        </div>
        <div style={{ fontSize: 32, marginTop: 56, opacity: 0.6, display: "flex" }}>
          {settings.street} · {settings.phone}
        </div>
      </div>
    ),
    size,
  );
}
