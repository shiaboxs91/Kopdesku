import { BadgeCheck, MapPin, CalendarDays } from "lucide-react";
import AvatarPetani from "./avatar-petani";
import type { ProfilAnggota } from "./profil-data";

export default function ProfilHeader({ p }: { p: ProfilAnggota }) {
  return (
    <section className="grain relative overflow-hidden border-b border-garis bg-putih">
      <div className="pita-mp h-1.5 w-full" aria-hidden />

      <div className="mx-auto max-w-3xl px-5 py-10">
        <div className="animate-rise flex flex-col items-center text-center sm:flex-row sm:items-center sm:gap-6 sm:text-left">
          <div className="relative shrink-0">
            <div className="h-28 w-28 overflow-hidden rounded-full ring-4 ring-merah-soft">
              <AvatarPetani className="h-full w-full" />
            </div>
            <span className="absolute bottom-1 right-1 flex h-7 w-7 items-center justify-center rounded-full bg-merah text-white ring-2 ring-putih">
              <BadgeCheck className="h-4 w-4" />
            </span>
          </div>

          <div className="mt-4 sm:mt-0">
            <h1 className="font-display text-2xl font-extrabold tracking-tight text-foreground">
              {p.nama}
            </h1>
            <p className="mt-1 text-sm font-bold text-merah-deep">{p.peran}</p>
            <div className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs font-semibold text-ink-soft sm:justify-start">
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" /> {p.desa}
              </span>
              <span className="inline-flex items-center gap-1">
                <CalendarDays className="h-3.5 w-3.5" /> Anggota sejak {p.sejak}
              </span>
            </div>
          </div>
        </div>

        <p className="animate-rise mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-foreground/80">
          {p.deskripsi}
        </p>
      </div>
    </section>
  );
}
