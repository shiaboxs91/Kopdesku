import { formatRupiah, formatTanggal } from "@/lib/utils";
import type { Transparansi } from "@/lib/types";

export default function TransparansiDana({
  data,
}: {
  data: Transparansi[];
}) {
  const masuk = data
    .filter((t) => t.arah === "masuk")
    .reduce((a, t) => a + t.nominal, 0);
  const keluar = data
    .filter((t) => t.arah === "keluar")
    .reduce((a, t) => a + t.nominal, 0);
  const saldo = masuk - keluar;

  return (
    <div className="overflow-hidden rounded-2xl border border-garis bg-putih shadow-sm">
      {/* Ringkasan saldo */}
      <div className="grid grid-cols-3 divide-x divide-garis border-b border-garis bg-merah-soft/50">
        <Sel label="Dana Masuk" nominal={formatRupiah(masuk)} warna="text-emerald-700" />
        <Sel label="Dana Keluar" nominal={formatRupiah(keluar)} warna="text-merah" />
        <Sel label="Saldo Kas" nominal={formatRupiah(saldo)} warna="text-foreground" />
      </div>

      {/* Daftar arus dana */}
      <ul className="divide-y divide-garis">
        {data.map((t) => {
          const masukItem = t.arah === "masuk";
          return (
            <li key={t.id} className="flex items-center gap-3 p-4">
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-lg font-bold ${
                  masukItem
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-merah-soft text-merah"
                }`}
                aria-hidden
              >
                {masukItem ? "↓" : "↑"}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-foreground">
                  {t.judul}
                </p>
                {t.keterangan && (
                  <p className="truncate text-xs text-ink-soft">
                    {t.keterangan}
                  </p>
                )}
                <p className="text-xs text-ink-soft/70">{formatTanggal(t.tgl)}</p>
              </div>
              <p
                className={`shrink-0 text-right font-display font-bold ${
                  masukItem ? "text-emerald-700" : "text-merah"
                }`}
              >
                {masukItem ? "+" : "−"}
                {formatRupiah(t.nominal)}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Sel({
  label,
  nominal,
  warna,
}: {
  label: string;
  nominal: string;
  warna: string;
}) {
  return (
    <div className="p-4 text-center">
      <p className="text-xs font-semibold text-ink-soft">{label}</p>
      <p className={`mt-1 font-display text-sm font-bold sm:text-base ${warna}`}>
        {nominal}
      </p>
    </div>
  );
}
