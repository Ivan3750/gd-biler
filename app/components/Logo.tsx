import Image from "next/image";
import logo from "@/app/assets/logo.jpg";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <Image src={logo} alt="" width={44} height={44} className="h-11 w-11 rounded-md object-cover" priority />
      <span className="flex flex-col leading-none">
        <span className="text-base font-bold">GD Biler</span>
        <span className="mt-1 text-xs opacity-60">Horsens</span>
      </span>
    </span>
  );
}
