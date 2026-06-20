import type { Metadata } from "next";
import ProfilHeader from "@/components/saya/profil-header";
import ProfilStat from "@/components/saya/profil-stat";
import { PROFIL_DUMMY } from "@/components/saya/profil-data";

export const metadata: Metadata = {
  title: "Profil Saya — KopdesKu",
  description: "Ruang anggota: simpanan, manfaat, dan kontribusi di koperasi desa.",
};

export default function SayaPage() {
  const p = PROFIL_DUMMY;

  return (
    <main className="flex-1">
      <ProfilHeader p={p} />
      <ProfilStat p={p} />

      <div className="mx-auto max-w-3xl px-5 pb-10">
        <div className="rounded-2xl border border-dashed border-garis bg-merah-soft/40 p-4 text-center">
          <p className="text-xs font-semibold text-merah-deep">
            Data profil ini contoh untuk peragaan. Setelah login anggota aktif,
            data tampil dari akun masing-masing.
          </p>
        </div>
      </div>
    </main>
  );
}
