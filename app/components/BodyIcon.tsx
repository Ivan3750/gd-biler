const PATHS: Record<string, string> = {
  Sedan: "M4 21V17Q4 15.5 6 15L19 12.5L27 6.5H46L54 12.5L65 14.5Q68 15.5 68 18V21Z",
  Stationcar: "M4 21V17Q4 15.5 6 15L19 12.5L26 6.5H58Q62 6.5 63 10L67 15Q68 16 68 18V21Z",
  SUV: "M4 21V15Q4 13 6 12.5L16 10.5L22 5H56Q59 5 61 8L66 12Q68 13 68 16V21Z",
  Hatchback: "M6 21V17Q6 15.5 8 15L20 12.5L27 6.5H45Q52 6.5 56 13L64 14.5Q67 15.5 67 18V21Z",
  Coupe: "M4 21V17.5Q4 16 6 15.5L22 12.5L32 7.5H46Q50 7.5 53 11L56 13L65 14.5Q68 15.5 68 18.5V21Z",
  Cabriolet: "M4 21V17.5Q4 16 6 15.5L26 13L32 8.5L36 12.8H56L65 14.5Q68 15.5 68 18.5V21Z",
  Minivan: "M4 21V13Q4 11 6 10.5L18 9L24 5H56Q60 5 62 8L67 13Q68 14 68 16V21Z",
};

/** Small side-view silhouette of a body type, drawn in the current text colour. */
export function BodyIcon({ type, className }: { type: string; className?: string }) {
  return (
    <svg viewBox="0 0 72 28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" className={className} aria-hidden>
      <path d={PATHS[type] ?? PATHS.Sedan} />
      <circle cx="20" cy="21.5" r="4.5" fill="var(--background, #fff)" />
      <circle cx="52" cy="21.5" r="4.5" fill="var(--background, #fff)" />
      <circle cx="20" cy="21.5" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="52" cy="21.5" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}
