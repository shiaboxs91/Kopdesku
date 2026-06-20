import { createClient } from "@/lib/supabase/server";
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

/**
 * Ambil semua data publik satu desa berdasarkan slug.
 * Hanya tabel yang diizinkan anon RLS: desa, produk, transparansi, view ringkasan.
 * Return null kalau desa tidak ditemukan.
 */
export async function getEtalaseDesa(
  slug: string
): Promise<EtalaseData | null> {
  const supabase = await createClient();

  const { data: desa } = await supabase
    .from("desa")
    .select("*")
    .eq("slug", slug)
    .maybeSingle<Desa>();

  if (!desa) return null;

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
    ringkasan: ringkasanRes.data ?? null,
    produk: (produkRes.data as Produk[]) ?? [],
    transparansi: (transparansiRes.data as Transparansi[]) ?? [],
  };
}

/** Daftar slug semua desa — untuk generateStaticParams ISR.
 *  Pakai static client (tanpa cookies) karena dipanggil di build time. */
export async function getAllDesaSlugs(): Promise<string[]> {
  const supabase = createStaticClient();
  const { data } = await supabase.from("desa").select("slug");
  return (data ?? []).map((d: { slug: string }) => d.slug);
}
