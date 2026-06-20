import type { Desa } from "@/lib/types";

export default function HeroDesa({ desa }: { desa: Desa }) {
  const lokasi = [desa.kecamatan, desa.kabupaten, desa.provinsi]
    .filter(Boolean)
    .join(", ");

  return (
    <header className="grain relative overflow-hidden border-b border-garis bg-putih">
      {/* Pita merah-putih di tepi atas */}
      <div className="pita-mp h-1.5 w-full" aria-hidden />

      <div className="mx-auto max-w-5xl px-5 py-12 sm:py-16">
        <div className="animate-rise">
          <span className="inline-flex items-center gap-2 rounded-full border border-merah/20 bg-merah-soft px-3 py-1 text-xs font-bold uppercase tracking-wide text-merah-deep">
            <span className="h-1.5 w-1.5 rounded-full bg-merah" />
            Koperasi Desa Merah Putih
          </span>
        </div>

        <h1
          className="animate-rise mt-4 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-6xl"
          style={{ animationDelay: "80ms" }}
        >
          {desa.nama}
        </h1>

        <p
          className="animate-rise mt-3 text-sm font-semibold text-merah-deep"
          style={{ animationDelay: "140ms" }}
        >
          {desa.desa_nama}
          {lokasi && ` · ${lokasi}`}
        </p>

        {desa.cerita && (
          <p
            className="animate-rise mt-5 max-w-2xl text-base leading-relaxed text-foreground/80"
            style={{ animationDelay: "200ms" }}
          >
            {desa.cerita}
          </p>
        )}

        {desa.komoditas && desa.komoditas.length > 0 && (
          <div
            className="animate-rise mt-6 flex flex-wrap gap-2"
            style={{ animationDelay: "260ms" }}
          >
            {desa.komoditas.map((k) => (
              <span
                key={k}
                className="rounded-full border border-garis bg-background px-3 py-1 text-sm font-semibold text-foreground"
              >
                {k}
              </span>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
