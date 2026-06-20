import Link from "next/link";

export default function CtaGabung({ namaDesa }: { namaDesa: string }) {
  return (
    <section className="grain relative overflow-hidden rounded-3xl bg-merah px-6 py-10 text-center sm:px-10 sm:py-14">
      {/* Pita putih tipis di bawah — motif bendera */}
      <div className="absolute inset-x-0 bottom-0 h-2 bg-white/90" aria-hidden />
      <div className="relative">
        <h2 className="font-display text-2xl font-extrabold leading-tight text-white sm:text-3xl">
          Ikut tumbuh bersama {namaDesa}
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/85">
          Daftar cepat dari HP. Simpanan jadi milik bersama, keuntungan kembali
          ke warga. Transparan, terbuka, dan benar-benar milik desa.
        </p>
        <Link
          href="/gabung"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-bold text-merah shadow-lg transition-transform hover:scale-[1.03] active:scale-95"
        >
          Gabung Sekarang
        </Link>
      </div>
    </section>
  );
}
