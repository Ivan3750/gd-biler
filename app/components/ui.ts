// Shared class names, taken from STYLE.md.
const button = "inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-[15px] font-semibold transition-colors";

export const btnPrimary = `${button} bg-primary text-primary-foreground hover:bg-primary/85`;
export const btnSecondary = `${button} border border-border bg-background hover:bg-secondary`;
export const btnOnNavy = `${button} bg-white text-primary hover:bg-white/85`;
export const btnOutlineOnNavy = `${button} border border-white/30 text-white hover:bg-white/10`;

export const input =
  "mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2.5 text-base text-foreground outline-none focus:border-foreground";

export const container = "mx-auto max-w-6xl px-6 lg:px-10";
