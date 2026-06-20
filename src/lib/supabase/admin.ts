import "server-only";
import { createClient } from "@supabase/supabase-js";

// Client service-role — HANYA untuk Server Component / Server Action.
// Bypass RLS, jadi dipakai untuk baca data sensitif (dashboard anggota,
// simpanan) dan menulis pendaftaran. Service key TIDAK PERNAH ke browser.
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
}
