import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grain flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <p className="font-display text-6xl font-extrabold text-merah">404</p>
      <h1 className="mt-4 font-display text-2xl font-extrabold text-foreground">
        Desa tidak ditemukan
      </h1>
      <p className="mt-2 max-w-sm text-sm text-ink-soft">
        Halaman koperasi desa yang kamu cari belum tersedia atau alamatnya
        keliru.
      </p>
      <Link
        href="/desa/durian"
        className="mt-6 inline-flex items-center justify-center rounded-full bg-merah px-6 py-3 text-sm font-bold text-white transition-transform hover:scale-[1.03] active:scale-95"
      >
        Lihat desa percontohan
      </Link>
    </main>
  );
}
