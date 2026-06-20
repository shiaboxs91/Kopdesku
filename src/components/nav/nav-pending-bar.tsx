"use client";

import { useLinkStatus } from "next/link";

/**
 * Indikator transisi navigasi — muncul saat <Link> pending.
 * Debounce 120ms via animation-delay (lihat .link-hint di globals.css)
 * agar tidak berkedip pada navigasi instan.
 * WAJIB dipakai sebagai child dari <Link>.
 */
export default function NavPendingBar() {
  const { pending } = useLinkStatus();
  if (!pending) return null;
  return (
    <span
      aria-hidden
      className="link-hint absolute -top-px left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-merah"
    />
  );
}
