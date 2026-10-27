import Link from "next/link";
import { Car, MessageSquare, Phone } from "lucide-react";
import { href, type Dict, type Lang } from "@/app/lib/i18n";
import { telHref } from "@/app/lib/settings-shared";

/** Fixed bottom bar on phones: the three things people want most. Hidden on desktop. */
export function MobileBar({ lang, phone, text }: { lang: Lang; phone: string; text: Dict["mobileBar"] }) {
  const item = "flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-xs font-semibold";
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background pb-[env(safe-area-inset-bottom)] lg:hidden">
      <div className="flex divide-x divide-border">
        <a href={telHref(phone)} className={`${item} bg-primary text-primary-foreground`}>
          <Phone size={18} aria-hidden />
          {text.call}
        </a>
        <Link href={href(lang, "/kontakt")} className={item}>
          <MessageSquare size={18} aria-hidden />
          {text.write}
        </Link>
        <Link href={href(lang, "/biler")} className={item}>
          <Car size={18} aria-hidden />
          {text.cars}
        </Link>
      </div>
    </div>
  );
}
