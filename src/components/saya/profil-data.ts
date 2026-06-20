/** Data profil anggota DUMMY untuk demo /saya (bukan dari DB). */
export type ProfilAnggota = {
  nama: string;
  panggilan: string;
  peran: string;
  desa: string;
  sejak: string;
  deskripsi: string;
  simpanan: { pokok: number; wajib: number; sukarela: number };
  kontribusi: { poin: number; ajakan: number; peringkat: number };
};

export const PROFIL_DUMMY: ProfilAnggota = {
  nama: "Dewi Lestari",
  panggilan: "Dewi",
  peran: "Anggota Aktif · Penggerak Muda",
  desa: "Kopdes Merah Putih Pengiringan",
  sejak: "Maret 2025",
  deskripsi:
    "Petani muda generasi penerus di Desa Pengiringan. Mengelola lahan padi keluarga sekaligus memasarkan hasil bumi lewat koperasi. Percaya koperasi desa bisa jadi masa depan anak muda kampung.",
  simpanan: { pokok: 100_000, wajib: 240_000, sukarela: 350_000 },
  kontribusi: { poin: 1_250, ajakan: 8, peringkat: 3 },
};
