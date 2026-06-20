import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Client Supabase statik tanpa cookies — aman dipanggil di build time
 * (mis. generateStaticParams) di mana tidak ada HTTP request.
 * Hanya untuk baca data publik (RLS anon: desa, produk, transparansi).
 */
export function createStaticClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } }
  );
}
