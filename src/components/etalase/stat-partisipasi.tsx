import { formatRupiahSingkat } from "@/lib/utils";

type Stat = {
  label: string;
  value: string;
  sub: string;
};

export default function StatPartisipasi({
  totalAnggota,
  persenPartisipasi,
  totalSimpanan,
  totalProduk,
}: {
  totalAnggota: number;
  persenPartisipasi: number;
  totalSimpanan: number;
  totalProduk: number;
}) {
  const stats: Stat[] = [
    { label: "Anggota Bergabung", value: String(totalAnggota), sub: "warga desa" },
    { label: "Partisipasi", value: `${persenPartisipasi}%`, sub: "dari penduduk" },
    {
      label: "Simpanan Terkumpul",
      value: formatRupiahSingkat(totalSimpanan),
      sub: "dana warga",
    },
    { label: "Produk Unggulan", value: String(totalProduk), sub: "hasil bumi" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map((s, i) => (
        <div
          key={s.label}
          className="animate-rise relative overflow-hidden rounded-2xl border border-garis bg-putih p-4 shadow-sm"
          style={{ animationDelay: `${i * 90}ms` }}
        >
          <span className="absolute left-0 top-0 h-full w-1 bg-merah" aria-hidden />
          <p className="font-display text-3xl font-extrabold leading-none text-merah sm:text-4xl">
            {s.value}
          </p>
          <p className="mt-2 text-sm font-bold text-foreground">{s.label}</p>
          <p className="text-xs text-ink-soft">{s.sub}</p>
        </div>
      ))}
    </div>
  );
}
