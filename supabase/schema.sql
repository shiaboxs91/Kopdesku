-- =============================================================
-- KopdesKu — Skema Database (Hackathon KDKMP Merah Putih)
-- Pilar 4: Literasi & Keterlibatan Generasi + irisan transparansi
-- Stack: Supabase (Postgres). Mobile-first member-facing app.
-- =============================================================

-- ---------- 1. DESA / KOPERASI (etalase publik) ----------
create table if not exists desa (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  nama        text not null,                 -- nama koperasi
  desa_nama   text not null,                 -- nama desa/kelurahan
  kecamatan   text,
  kabupaten   text,
  provinsi    text,
  jumlah_penduduk integer default 0,
  cerita      text,                          -- narasi profil desa (etalase)
  foto_url    text,                          -- foto/hero desa
  komoditas   text[],                        -- komoditas unggulan
  created_at  timestamptz default now()
);

-- ---------- 2. ANGGOTA (onboarding + dashboard) ----------
create table if not exists anggota (
  id          uuid primary key default gen_random_uuid(),
  desa_id     uuid not null references desa(id) on delete cascade,
  nama        text not null,
  no_hp       text not null,
  alamat      text,
  -- kode referral: untuk layer sosial "ajak tetangga" (Pilar 4)
  kode_ajak   text unique,
  diajak_oleh uuid references anggota(id) on delete set null,
  tgl_gabung  timestamptz default now(),
  unique (desa_id, no_hp)
);

-- ---------- 3. SIMPANAN (manfaat nyata anggota) ----------
create table if not exists simpanan (
  id          uuid primary key default gen_random_uuid(),
  anggota_id  uuid not null references anggota(id) on delete cascade,
  jenis       text not null check (jenis in ('pokok','wajib','sukarela')),
  nominal     bigint not null check (nominal >= 0),
  tgl         timestamptz default now()
);

-- ---------- 4. PRODUK (etalase + Coop Trade gap) ----------
create table if not exists produk (
  id          uuid primary key default gen_random_uuid(),
  desa_id     uuid not null references desa(id) on delete cascade,
  nama        text not null,
  harga       bigint not null default 0 check (harga >= 0),
  satuan      text default 'pcs',
  foto_url    text,
  terjual     integer default 0,
  created_at  timestamptz default now()
);

-- ---------- 5. TRANSPARANSI (kepercayaan → partisipasi) ----------
create table if not exists transparansi (
  id          uuid primary key default gen_random_uuid(),
  desa_id     uuid not null references desa(id) on delete cascade,
  judul       text not null,
  keterangan  text,
  nominal     bigint not null default 0,
  arah        text not null check (arah in ('masuk','keluar')),
  tgl         timestamptz default now()
);

-- ---------- 6. KONTRIBUSI (layer sosial Gen-Z, P1) ----------
create table if not exists kontribusi (
  id          uuid primary key default gen_random_uuid(),
  anggota_id  uuid not null references anggota(id) on delete cascade,
  poin        integer not null default 0,
  alasan      text,                          -- "ajak tetangga", "simpanan rutin"
  tgl         timestamptz default now()
);

-- ---------- INDEXES ----------
create index if not exists idx_anggota_desa on anggota(desa_id);
create index if not exists idx_simpanan_anggota on simpanan(anggota_id);
create index if not exists idx_produk_desa on produk(desa_id);
create index if not exists idx_transparansi_desa on transparansi(desa_id);
create index if not exists idx_kontribusi_anggota on kontribusi(anggota_id);

-- =============================================================
-- VIEW RINGKASAN per desa (untuk etalase + dashboard, hindari N+1)
-- =============================================================
create or replace view desa_ringkasan as
select
  d.id as desa_id,
  d.slug,
  d.nama,
  d.desa_nama,
  d.jumlah_penduduk,
  coalesce(a.total_anggota, 0)        as total_anggota,
  coalesce(s.total_simpanan, 0)       as total_simpanan,
  coalesce(p.total_produk, 0)         as total_produk,
  case
    when d.jumlah_penduduk > 0
    then round((coalesce(a.total_anggota,0)::numeric / d.jumlah_penduduk) * 100, 2)
    else 0
  end as persen_partisipasi
from desa d
left join (select desa_id, count(*) total_anggota from anggota group by desa_id) a on a.desa_id = d.id
left join (select an.desa_id, sum(sm.nominal) total_simpanan
           from simpanan sm join anggota an on an.id = sm.anggota_id
           group by an.desa_id) s on s.desa_id = d.id
left join (select desa_id, count(*) total_produk from produk group by desa_id) p on p.desa_id = d.id;
