import { PiggyBank, Award, Users, Trophy } from "lucide-react";
import { formatRupiah } from "@/lib/utils";
import type { ProfilAnggota } from "./profil-data";

export default function ProfilStat({ p }: { p: ProfilAnggota }) {
  const totalSimpanan =
    p.simpanan.pokok + p.simpanan.wajib + p.simpanan.sukarela;

  const simpanan = [
    { label: "Simpanan Pokok", nilai: p.simpanan.pokok },
    { label: "Simpanan Wajib", nilai: p.simpanan.wajib },
    { label: "Simpanan Sukarela", nilai: p.simpanan.sukarela },
  ];

  const kontribusi = [
    { label: "Poin Kontribusi", nilai: `${p.kontribusi.poin}`, Icon: Award },
    { label: "Warga Diajak", nilai: `${p.kontribusi.ajakan} orang`, Icon: Users },
    { label: "Peringkat Desa", nilai: `#${p.kontribusi.peringkat}`, Icon: Trophy },
  ];

  return (
    <div className="mx-auto max-w-3xl space-y-8 px-5 py-10">
      {/* Simpanan */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <PiggyBank className="h-5 w-5 text-merah" />
          <h2 className="font-display text-lg font-extrabold text-foreground">
            Simpanan Saya
          </h2>
        </div>

        <div className="rounded-2xl border-2 border-merah bg-putih p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
            Total Simpanan
          </p>
          <p className="mt-1 font-display text-3xl font-extrabold text-merah">
            {formatRupiah(totalSimpanan)}
          </p>

          <div className="mt-4 grid grid-cols-3 gap-3">
            {simpanan.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-garis bg-background p-3 text-center"
              >
                <p className="text-[11px] font-semibold text-ink-soft">
                  {s.label}
                </p>
                <p className="mt-1 text-sm font-bold text-foreground">
                  {formatRupiah(s.nilai)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kontribusi sosial (Pilar 4) */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <Award className="h-5 w-5 text-merah" />
          <h2 className="font-display text-lg font-extrabold text-foreground">
            Kontribusi Saya
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {kontribusi.map((k) => (
            <div
              key={k.label}
              className="rounded-2xl border border-garis bg-putih p-4 text-center"
            >
              <k.Icon className="mx-auto h-6 w-6 text-emas" />
              <p className="mt-2 font-display text-xl font-extrabold text-foreground">
                {k.nilai}
              </p>
              <p className="mt-0.5 text-[11px] font-semibold text-ink-soft">
                {k.label}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
