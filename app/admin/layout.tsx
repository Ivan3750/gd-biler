import type { Metadata } from "next";
import { geistMono, geistSans } from "@/app/fonts";
import "../globals.css";

export const metadata: Metadata = {
  title: { default: "Admin | GD Biler", template: "%s | Admin" },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="da" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full bg-secondary text-foreground">{children}</body>
    </html>
  );
}
