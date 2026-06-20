import { formatRupiah } from "@/lib/utils";
import type { Produk } from "@/lib/types";

// Ikon emoji per jenis komoditas (aman lintas-OS, bukan bendera regional)
function iconFor(nama: string): string {
  const n = nama.toLowerCase();
  if (n.includes("beras") || n.includes("padi")) return "🌾";
  if (n.includes("jagung")) return "🌽";
  if (n.includes("gula") || n.includes("aren")) return "🍯";
  if (n.includes("telur")) return "🥚";
  if (n.includes("sapi") || n.includes("daging")) return "🐄";
  if (n.includes("kopi")) return "☕";
  return "🧺";
}

export default function ProdukGrid({ produk }: { produk: Produk[] }) {
  if (produk.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-garis bg-putih p-6 text-center text-sm text-ink-soft">
        Belum ada produk yang ditampilkan.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {produk.map((p) => (
        <article
          key={p.id}
          className="group flex flex-col overflow-hidden rounded-2xl border border-garis bg-putih shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="flex aspect-square items-center justify-center bg-merah-soft text-5xl">
            <span className="transition-transform duration-300 group-hover:scale-110">
              {iconFor(p.nama)}
            </span>
          </div>
          <div className="flex flex-1 flex-col p-4">
            <h3 className="font-semibold leading-snug text-foreground">
              {p.nama}
            </h3>
            <p className="mt-1 font-display text-lg font-extrabold text-merah">
              {formatRupiah(p.harga)}
              <span className="text-sm font-normal text-ink-soft">
                {" "}
                / {p.satuan}
              </span>
            </p>
            <p className="mt-auto pt-3 text-xs text-ink-soft">
              Terjual {p.terjual.toLocaleString("id-ID")} {p.satuan}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
