import { Home, Sprout, HandHeart, UserRound, type LucideIcon } from "lucide-react";

/** Desa utama untuk MVP demo (root redirect ke sini). */
export const DESA_UTAMA = "pengiringan";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  /** kunci untuk deteksi tab aktif berdasarkan pathname */
  match: "home" | "produk" | "dana" | "saya";
};

/** Item kiri FAB (2) + kanan FAB (2). FAB "Gabung" di tengah. */
export const NAV_KIRI: NavItem[] = [
  { href: `/desa/${DESA_UTAMA}`, label: "Beranda", icon: Home, match: "home" },
  { href: `/desa/${DESA_UTAMA}#produk`, label: "Produk", icon: Sprout, match: "produk" },
];

export const NAV_KANAN: NavItem[] = [
  { href: `/desa/${DESA_UTAMA}#transparansi`, label: "Dana", icon: HandHeart, match: "dana" },
  { href: "/saya", label: "Saya", icon: UserRound, match: "saya" },
];

export const FAB_GABUNG = { href: "/gabung", label: "Gabung" };

export function isTabAktif(match: NavItem["match"], pathname: string): boolean {
  if (match === "home" || match === "produk" || match === "dana") {
    return pathname.startsWith("/desa");
  }
  if (match === "saya") return pathname.startsWith("/saya");
  return false;
}
