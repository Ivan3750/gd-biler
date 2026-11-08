/** Danish-style registration plate: blue EU strip with a ring of stars, embossed black characters. Size follows the font size. */
const STARS = Array.from({ length: 12 }, (_, i) => {
  const a = (i / 12) * Math.PI * 2;
  return [12 + Math.sin(a) * 7, 12 - Math.cos(a) * 7] as const;
});

export function Plate({ value, className = "text-2xl" }: { value: string; className?: string }) {
  return (
    <span className={`plate ${className}`} aria-label={value}>
      <span className="plate-eu" aria-hidden>
        <svg viewBox="0 0 24 24" className="plate-stars">
          {STARS.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="1.1" fill="currentColor" />
          ))}
        </svg>
        <b>DK</b>
      </span>
      <span className="plate-no">{value}</span>
    </span>
  );
}
