/** Danish-style registration plate. Size follows the parent font size via the `size` class. */
export function Plate({ value, className = "text-2xl" }: { value: string; className?: string }) {
  return (
    <span className={`plate ${className}`} aria-label={value}>
      <span className="plate-eu" aria-hidden>
        <i />
        DK
      </span>
      <span className="plate-no">{value}</span>
    </span>
  );
}
