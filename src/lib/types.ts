// Tipe domain KopdesKu — selaras dengan supabase/schema.sql

export type Desa = {
  id: string;
  slug: string;
  nama: string;
  desa_nama: string;
  kecamatan: string | null;
  kabupaten: string | null;
  provinsi: string | null;
  jumlah_penduduk: number;
  cerita: string | null;
  foto_url: string | null;
  komoditas: string[] | null;
  created_at: string;
};

export type Anggota = {
  id: string;
  desa_id: string;
  nama: string;
  no_hp: string;
  alamat: string | null;
  kode_ajak: string | null;
  diajak_oleh: string | null;
  tgl_gabung: string;
};

export type JenisSimpanan = "pokok" | "wajib" | "sukarela";

export type Simpanan = {
  id: string;
  anggota_id: string;
  jenis: JenisSimpanan;
  nominal: number;
  tgl: string;
};

export type Produk = {
  id: string;
  desa_id: string;
  nama: string;
  harga: number;
  satuan: string;
  foto_url: string | null;
  terjual: number;
  created_at: string;
};

export type Transparansi = {
  id: string;
  desa_id: string;
  judul: string;
  keterangan: string | null;
  nominal: number;
  arah: "masuk" | "keluar";
  tgl: string;
};

export type Kontribusi = {
  id: string;
  anggota_id: string;
  poin: number;
  alasan: string | null;
  tgl: string;
};

export type DesaRingkasan = {
  desa_id: string;
  slug: string;
  nama: string;
  desa_nama: string;
  jumlah_penduduk: number;
  total_anggota: number;
  total_simpanan: number;
  total_produk: number;
  persen_partisipasi: number;
};
