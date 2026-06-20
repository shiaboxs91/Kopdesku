import type { Metadata } from "next";
import Link from "next/link";
import { Smartphone, UserPlus, Sparkles, ArrowLeft } from "lucide-react";
import { DESA_UTAMA } from "@/components/nav/nav-config";

export const metadata: Metadata = {
  title: "Gabung Koperasi — KopdesKu",
  description: "Daftar jadi anggota koperasi desa langsung dari HP, cepat dan mudah.",
};

const LANGKAH = [
  { Icon: Smartphone, judul: "Isi dari HP", ket: "Cukup nama dan nomor, tanpa ribet berkas." },
  { Icon: UserPlus, judul: "Langsung terdaftar", ket: "Nomor anggota terbit saat itu juga." },
  { Icon: Sparkles, judul: "Mulai berkontribusi", ket: "Menabung, jualan hasil bumi, ajak warga lain." },
];

export default function GabungPage() {
  return (
    <main className="flex-1">
      <div className="pita-mp h-1.5 w-full" aria-hidden />
      <div className="mx-auto max-w-2xl px-5 py-12">
        <div className="animate-rise">
          <span className="inline-flex items-center gap-2 rounded-full border border-merah/20 bg-merah-soft px-3 py-1 text-xs font-bold uppercase tracking-wide text-merah-deep">
            <span className="h-1.5 w-1.5 rounded-full bg-merah" />
            Ruang Anggota
          </span>
          <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl">
            Jadi bagian dari koperasi desamu
          </h1>
          <p className="mt-3 text-base leading-relaxed text-foreground/80">
            Daftar jadi anggota langsung dari genggaman. Satu desa, satu gerakan,
            tumbuh bareng dari kampung sendiri.
          </p>
        </div>

        <div className="mt-8 space-y-3">
          {LANGKAH.map((l, i) => (
            <div
              key={l.judul}
              className="animate-rise flex items-start gap-4 rounded-2xl border border-garis bg-putih p-4"
              style={{ animationDelay: `${80 + i * 70}ms` }}
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-merah-soft text-merah">
                <l.Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display font-extrabold text-foreground">
                  {l.judul}
                </p>
                <p className="mt-0.5 text-sm text-ink-soft">{l.ket}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border-2 border-dashed border-merah/30 bg-merah-soft/40 p-5 text-center">
          <p className="font-display font-extrabold text-merah-deep">
            Formulir pendaftaran segera dibuka
          </p>
          <p className="mt-1 text-sm text-ink-soft">
            Lagi disiapkan untuk peragaan pendaftaran anggota secara langsung.
          </p>
        </div>

        <Link
          href={`/desa/${DESA_UTAMA}`}
          className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-merah-deep"
        >
          <ArrowLeft className="h-4 w-4" /> Kembali ke etalase desa
        </Link>
      </div>
    </main>
  );
}
