"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_KIRI, NAV_KANAN, FAB_GABUNG, isTabAktif } from "./nav-config";

function TabLink({
  href,
  label,
  Icon,
  aktif,
}: {
  href: string;
  label: string;
  Icon: (typeof NAV_KIRI)[number]["icon"];
  aktif: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "relative flex flex-1 flex-col items-center justify-center gap-0.5 transition-colors",
        aktif ? "text-merah" : "text-ink-soft active:text-foreground"
      )}
    >
      {aktif && (
        <span className="absolute top-0 h-0.5 w-7 rounded-full bg-merah" />
      )}
      <Icon className={cn("h-[22px] w-[22px]", aktif && "stroke-[2.6]")} />
      <span className={cn("text-[10px] font-semibold", aktif && "font-bold")}>
        {label}
      </span>
    </Link>
  );
}

export default function BottomNav() {
  const pathname = usePathname();
  const fabAktif = pathname.startsWith("/gabung");

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-garis bg-putih/90 backdrop-blur-lg lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="relative mx-auto flex h-16 max-w-md items-stretch">
        {NAV_KIRI.map((it) => (
          <TabLink
            key={it.label}
            href={it.href}
            label={it.label}
            Icon={it.icon}
            aktif={isTabAktif(it.match, pathname)}
          />
        ))}

        {/* slot tengah untuk FAB — label di bagian bawah slot */}
        <div className="flex w-16 shrink-0 flex-col items-center justify-end pb-2">
          <span className="text-[10px] font-bold text-merah">
            {FAB_GABUNG.label}
          </span>
        </div>

        {NAV_KANAN.map((it) => (
          <TabLink
            key={it.label}
            href={it.href}
            label={it.label}
            Icon={it.icon}
            aktif={isTabAktif(it.match, pathname)}
          />
        ))}

        {/* FAB Gabung — menonjol di tengah */}
        <Link
          href={FAB_GABUNG.href}
          aria-label={FAB_GABUNG.label}
          className={cn(
            "absolute -top-5 left-1/2 flex h-14 w-14 -translate-x-1/2 flex-col items-center justify-center rounded-full bg-merah text-white shadow-lg shadow-merah/40 ring-4 ring-putih transition-transform active:scale-90",
            fabAktif && "bg-merah-deep"
          )}
        >
          <Plus className="h-6 w-6 stroke-[3]" />
        </Link>
      </div>
    </nav>
  );
}
