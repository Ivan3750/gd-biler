import logoDefault from "@/app/assets/logo.jpg";

export function Logo({
  className = "",
  variant = "dark",
  src = logoDefault.src,
}: {
  className?: string;
  variant?: "dark" | "light";
  src?: string;
}) {
  const color = variant === "light" ? "white" : "currentColor";
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
    
      <img src={src} width="50" alt="Logo" />
      <div className="flex flex-col leading-none">
        <span className="text-[15px] font-bold tracking-tight" style={{ color }}>GD Biler</span>
        <span className="text-[10px] uppercase tracking-[0.18em] opacity-60" style={{ color }}>Horsens</span>
      </div>
    </div>
  );
}
