import heroImg from "@/app/assets/hero.jpg";
import aboutImg from "@/app/assets/about.jpg";
import lexusImg from "@/app/assets/lexus.jpg";
import logoImg from "@/app/assets/logo.jpg";
import { getSettings } from "./settings";

/** Pictures the admin can swap. `fallback` is the file bundled with the site. */
export const IMAGE_SLOTS = [
  { key: "hero", label: "Forsidebillede og bannere", hint: "Stort liggende billede, mindst 1920 px bredt.", fallback: heroImg.src },
  { key: "about", label: "Showroom-billede (Om os)", hint: "Liggende billede, ca. 5:4.", fallback: aboutImg.src },
  { key: "tileCars", label: "Flise: Biler", hint: "Bruges på forsiden og Om os.", fallback: lexusImg.src },
  { key: "tileWorkshop", label: "Flise: Værksted", hint: "Bruges på forsiden og Om os.", fallback: aboutImg.src },
  { key: "tileAbout", label: "Flise: Om os", hint: "Bruges på forsiden og Om os.", fallback: heroImg.src },
  { key: "logo", label: "Logo", hint: "Firkantet billede, ca. 200 × 200 px.", fallback: logoImg.src },
] as const;

export type ImageKey = (typeof IMAGE_SLOTS)[number]["key"];

/** The picture to show for every slot: the uploaded one if set, otherwise the bundled one. */
export async function getImages(): Promise<Record<ImageKey, string>> {
  const { images } = await getSettings();
  return Object.fromEntries(IMAGE_SLOTS.map((s) => [s.key, images[s.key] || s.fallback])) as Record<ImageKey, string>;
}
