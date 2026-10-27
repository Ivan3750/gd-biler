import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GD Biler",
    short_name: "GD Biler",
    description: "Brugte biler i Horsens",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0e2a47",
    icons: [{ src: "/logo.jpg", sizes: "519x507", type: "image/jpeg" }],
  };
}
