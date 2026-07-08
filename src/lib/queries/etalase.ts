import { createStaticClient } from "@/lib/supabase/static";
import type {
  Desa,
  Produk,
  Transparansi,
  DesaRingkasan,
} from "@/lib/types";

export type EtalaseData = {
  desa: Desa;
  ringkasan: DesaRingkasan | null;
  produk: Produk[];
  transparansi: Transparansi[];
};

const DESA_DEMO_ID = "11111111-1111-1111-1111-111111111111";
const DEMO_CREATED_AT = "2024-01-01T00:00:00.000Z";

const ETALASE_DEMO: EtalaseData = {
  desa: {
    id: DESA_DEMO_ID,
    slug: "pengiringan",
    nama: "Kopdes Merah Putih Pengiringan",
    desa_nama: "Desa Pengiringan",
    kecamatan: "Bantarbolang",
    kabupaten: "Pemalang",
    provinsi: "Jawa Tengah",
    jumlah_penduduk: 12944,
    cerita:
      "Pengiringan adalah desa agraris di kaki perbukitan Bantarbolang. Sebagian besar warga bertani padi dan jagung, serta beternak sapi. Koperasi Desa Merah Putih hadir untuk menyatukan hasil bumi warga, memotong rantai tengkulak, dan memastikan keuntungan kembali ke tangan petani — bukan ke pemodal besar.",
    foto_url: null,
    komoditas: ["Padi", "Jagung", "Sapi", "Gula Aren"],
    created_at: DEMO_CREATED_AT,
  },
  ringkasan: {
    desa_id: DESA_DEMO_ID,
    slug: "pengiringan",
    nama: "Kopdes Merah Putih Pengiringan",
    desa_nama: "Desa Pengiringan",
    jumlah_penduduk: 12944,
    total_anggota: 12,
    total_simpanan: 2650000,
    total_produk: 4,
    persen_partisipasi: 0.09,
  },
  produk: [
    {
      id: "demo-produk-1",
      desa_id: DESA_DEMO_ID,
      nama: "Beras Pandan Wangi",
      harga: 13000,
      satuan: "kg",
      foto_url: null,
      terjual: 320,
      created_at: DEMO_CREATED_AT,
    },
    {
      id: "demo-produk-2",
      desa_id: DESA_DEMO_ID,
      nama: "Jagung Pipil Kering",
      harga: 6500,
      satuan: "kg",
      foto_url: null,
      terjual: 540,
      created_at: DEMO_CREATED_AT,
    },
    {
      id: "demo-produk-3",
      desa_id: DESA_DEMO_ID,
      nama: "Gula Aren Cetak",
      harga: 22000,
      satuan: "kg",
      foto_url: null,
      terjual: 180,
      created_at: DEMO_CREATED_AT,
    },
    {
      id: "demo-produk-4",
      desa_id: DESA_DEMO_ID,
      nama: "Telur Ayam Kampung",
      harga: 3000,
      satuan: "butir",
      foto_url: null,
      terjual: 1200,
      created_at: DEMO_CREATED_AT,
    },
  ],
  transparansi: [
    {
      id: "demo-transparansi-1",
      desa_id: DESA_DEMO_ID,
      judul: "Penyertaan Modal Awal",
      keterangan: "Bantuan modal program Kopdes Merah Putih",
      nominal: 50000000,
      arah: "masuk",
      tgl: "2024-01-01T00:00:00.000Z",
    },
    {
      id: "demo-transparansi-2",
      desa_id: DESA_DEMO_ID,
      judul: "Pembelian Hasil Panen Padi",
      keterangan: "Beli gabah dari 8 petani anggota",
      nominal: 18500000,
      arah: "keluar",
      tgl: "2024-01-25T00:00:00.000Z",
    },
    {
      id: "demo-transparansi-3",
      desa_id: DESA_DEMO_ID,
      judul: "Penjualan Beras ke Pasar",
      keterangan: "Hasil penjualan beras kemasan",
      nominal: 9200000,
      arah: "masuk",
      tgl: "2024-02-02T00:00:00.000Z",
    },
    {
      id: "demo-transparansi-4",
      desa_id: DESA_DEMO_ID,
      judul: "Operasional Gerai",
      keterangan: "Listrik, kemasan, transport",
      nominal: 1750000,
      arah: "keluar",
      tgl: "2024-02-08T00:00:00.000Z",
    },
  ],
};

function getFallbackEtalase(slug: string): EtalaseData | null {
  return slug === ETALASE_DEMO.desa.slug ? ETALASE_DEMO : null;
}

/**
 * Ambil semua data publik satu desa berdasarkan slug.
 * Hanya tabel yang diizinkan anon RLS: desa, produk, transparansi, view ringkasan.
 * Return null kalau desa tidak ditemukan.
 */
export async function getEtalaseDesa(
  slug: string
): Promise<EtalaseData | null> {
  const fallback = getFallbackEtalase(slug);

  try {
    const supabase = createStaticClient();

    const { data: desa, error: desaError } = await supabase
      .from("desa")
      .select("*")
      .eq("slug", slug)
      .maybeSingle<Desa>();

    if (desaError) throw desaError;
    if (!desa) return fallback;

    const [ringkasanRes, produkRes, transparansiRes] = await Promise.all([
      supabase
        .from("desa_ringkasan")
        .select("*")
        .eq("slug", slug)
        .maybeSingle<DesaRingkasan>(),
      supabase
        .from("produk")
        .select("*")
        .eq("desa_id", desa.id)
        .order("terjual", { ascending: false }),
      supabase
        .from("transparansi")
        .select("*")
        .eq("desa_id", desa.id)
        .order("tgl", { ascending: false }),
    ]);

    return {
      desa,
      ringkasan: ringkasanRes.data ?? fallback?.ringkasan ?? null,
      produk: (produkRes.data as Produk[] | null) ?? fallback?.produk ?? [],
      transparansi:
        (transparansiRes.data as Transparansi[] | null) ??
        fallback?.transparansi ??
        [],
    };
  } catch (error) {
    console.error("Gagal mengambil etalase desa", { slug, error });
    return fallback;
  }
}

/** Daftar slug semua desa — untuk generateStaticParams ISR.
 *  Pakai static client (tanpa cookies) karena dipanggil di build time. */
export async function getAllDesaSlugs(): Promise<string[]> {
  try {
    const supabase = createStaticClient();
    const { data, error } = await supabase.from("desa").select("slug");
    if (error) throw error;

    const slugs = (data ?? []).map((d: { slug: string }) => d.slug);
    return slugs.includes(ETALASE_DEMO.desa.slug)
      ? slugs
      : [ETALASE_DEMO.desa.slug, ...slugs];
  } catch (error) {
    console.error("Gagal mengambil daftar desa", error);
    return [ETALASE_DEMO.desa.slug];
  }
}
