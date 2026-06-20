"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NAV_KIRI, NAV_KANAN, FAB_GABUNG, isTabAktif } from "./nav-config";

const MENU = [...NAV_KIRI, ...NAV_KANAN];

export default function DesktopHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 hidden border-b border-garis bg-putih/85 backdrop-blur-lg lg:block">
      <div className="pita-mp h-1 w-full" aria-hidden />
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link href={NAV_KIRI[0].href} className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-merah text-sm font-extrabold text-white">
            K
          </span>
          <span className="font-display text-lg font-extrabold tracking-tight text-foreground">
            KopdesKu
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          {MENU.map((it) => {
            const aktif = isTabAktif(it.match, pathname);
            return (
              <Link
                key={it.label}
                href={it.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                  aktif
                    ? "bg-merah-soft text-merah-deep"
                    : "text-ink-soft hover:bg-background hover:text-foreground"
                )}
              >
                {it.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href={FAB_GABUNG.href}
          className="rounded-full bg-merah px-5 py-2.5 text-sm font-bold text-white shadow-sm shadow-merah/30 transition-transform hover:bg-merah-deep active:scale-95"
        >
          {FAB_GABUNG.label}
        </Link>
      </div>
    </header>
  );
}
