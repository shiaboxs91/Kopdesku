-- =============================================================
-- KopdesKu — Seed Data Demo (1 desa realistis)
-- CATATAN: Profil desa (nama, penduduk, komoditas) berbasis data
-- publik Kopdes Durian. Data anggota/simpanan/transaksi di
-- bawah adalah ILUSTRASI DEMO untuk memperagakan alur produk,
-- BUKAN data resmi koperasi.
-- Jalankan SETELAH schema.sql.
-- =============================================================

-- bersihkan dulu (idempotent untuk demo)
delete from kontribusi;
delete from transparansi;
delete from simpanan;
delete from produk;
delete from anggota;
delete from desa;

-- ---------- DESA ----------
insert into desa (id, slug, nama, desa_nama, kecamatan, kabupaten, provinsi, jumlah_penduduk, cerita, komoditas)
values (
  '11111111-1111-1111-1111-111111111111',
  'durian',
  'Kopdes Merah Putih Durian',
  'Desa Durian',
  'Sambas',
  'Sambas',
  'Kalimantan Barat',
  12944,
  'Desa Durian di Kecamatan Sambas, Kabupaten Sambas, Kalimantan Barat, bergerak bersama koperasi desa untuk menguatkan hasil bumi warga, memperluas akses pasar, dan memastikan manfaat ekonomi kembali ke keluarga petani serta pelaku usaha lokal.',
  array['Padi','Jagung','Sapi','Gula Aren']
);

-- ---------- ANGGOTA (12 orang demo, beberapa saling mengajak) ----------
insert into anggota (id, desa_id, nama, no_hp, kode_ajak, diajak_oleh, tgl_gabung) values
('a0000001-0000-0000-0000-000000000001','11111111-1111-1111-1111-111111111111','Sukirman','081390011001','AJAK-SKR', null, now() - interval '40 days'),
('a0000002-0000-0000-0000-000000000002','11111111-1111-1111-1111-111111111111','Warsiti','081390011002','AJAK-WST','a0000001-0000-0000-0000-000000000001', now() - interval '38 days'),
('a0000003-0000-0000-0000-000000000003','11111111-1111-1111-1111-111111111111','Bagus Pratama','081390011003','AJAK-BGS','a0000001-0000-0000-0000-000000000001', now() - interval '35 days'),
('a0000004-0000-0000-0000-000000000004','11111111-1111-1111-1111-111111111111','Siti Aminah','081390011004','AJAK-STA','a0000002-0000-0000-0000-000000000002', now() - interval '30 days'),
('a0000005-0000-0000-0000-000000000005','11111111-1111-1111-1111-111111111111','Joko Susilo','081390011005','AJAK-JKO', null, now() - interval '28 days'),
('a0000006-0000-0000-0000-000000000006','11111111-1111-1111-1111-111111111111','Rina Yuliana','081390011006','AJAK-RIN','a0000003-0000-0000-0000-000000000003', now() - interval '21 days'),
('a0000007-0000-0000-0000-000000000007','11111111-1111-1111-1111-111111111111','Eko Prasetyo','081390011007','AJAK-EKO','a0000003-0000-0000-0000-000000000003', now() - interval '18 days'),
('a0000008-0000-0000-0000-000000000008','11111111-1111-1111-1111-111111111111','Dewi Lestari','081390011008','AJAK-DEW','a0000006-0000-0000-0000-000000000006', now() - interval '12 days'),
('a0000009-0000-0000-0000-000000000009','11111111-1111-1111-1111-111111111111','Agus Salim','081390011009','AJAK-AGS','a0000005-0000-0000-0000-000000000005', now() - interval '8 days'),
('a0000010-0000-0000-0000-000000000010','11111111-1111-1111-1111-111111111111','Nur Hidayah','081390011010','AJAK-NUR','a0000008-0000-0000-0000-000000000008', now() - interval '5 days'),
('a0000011-0000-0000-0000-000000000011','11111111-1111-1111-1111-111111111111','Fajar Nugroho','081390011011','AJAK-FJR','a0000007-0000-0000-0000-000000000007', now() - interval '3 days'),
('a0000012-0000-0000-0000-000000000012','11111111-1111-1111-1111-111111111111','Lina Marlina','081390011012','AJAK-LIN','a0000008-0000-0000-0000-000000000008', now() - interval '1 days');

-- ---------- SIMPANAN ----------
-- pokok (sekali, Rp 100.000) untuk semua
insert into simpanan (anggota_id, jenis, nominal, tgl)
select id, 'pokok', 100000, tgl_gabung from anggota;
-- wajib (Rp 25.000) beberapa bulan
insert into simpanan (anggota_id, jenis, nominal, tgl)
select id, 'wajib', 25000, tgl_gabung + interval '7 days' from anggota;
insert into simpanan (anggota_id, jenis, nominal, tgl)
select id, 'wajib', 25000, now() - interval '2 days' from anggota where tgl_gabung < now() - interval '15 days';
-- sukarela (variatif)
insert into simpanan (anggota_id, jenis, nominal, tgl) values
('a0000001-0000-0000-0000-000000000001','sukarela', 500000, now() - interval '10 days'),
('a0000003-0000-0000-0000-000000000003','sukarela', 250000, now() - interval '6 days'),
('a0000005-0000-0000-0000-000000000005','sukarela', 300000, now() - interval '4 days'),
('a0000008-0000-0000-0000-000000000008','sukarela', 150000, now() - interval '2 days');

-- ---------- PRODUK ----------
insert into produk (desa_id, nama, harga, satuan, terjual) values
('11111111-1111-1111-1111-111111111111','Beras Pandan Wangi', 13000, 'kg', 320),
('11111111-1111-1111-1111-111111111111','Jagung Pipil Kering', 6500, 'kg', 540),
('11111111-1111-1111-1111-111111111111','Gula Aren Cetak', 22000, 'kg', 180),
('11111111-1111-1111-1111-111111111111','Telur Ayam Kampung', 3000, 'butir', 1200);

-- ---------- TRANSPARANSI (kas koperasi) ----------
insert into transparansi (desa_id, judul, keterangan, nominal, arah, tgl) values
('11111111-1111-1111-1111-111111111111','Penyertaan Modal Awal','Bantuan modal program Kopdes Merah Putih', 50000000, 'masuk', now() - interval '45 days'),
('11111111-1111-1111-1111-111111111111','Pembelian Hasil Panen Padi','Beli gabah dari 8 petani anggota', 18500000, 'keluar', now() - interval '20 days'),
('11111111-1111-1111-1111-111111111111','Penjualan Beras ke Pasar','Hasil penjualan beras kemasan', 9200000, 'masuk', now() - interval '12 days'),
('11111111-1111-1111-1111-111111111111','Operasional Gerai','Listrik, kemasan, transport', 1750000, 'keluar', now() - interval '6 days'),
('11111111-1111-1111-1111-111111111111','Simpanan Anggota Bulan Ini','Akumulasi simpanan pokok & wajib', 1450000, 'masuk', now() - interval '2 days');

-- ---------- KONTRIBUSI (layer sosial) ----------
insert into kontribusi (anggota_id, poin, alasan, tgl) values
('a0000001-0000-0000-0000-000000000001', 30, 'Mengajak 2 tetangga gabung', now() - interval '35 days'),
('a0000003-0000-0000-0000-000000000003', 30, 'Mengajak 2 tetangga gabung', now() - interval '18 days'),
('a0000008-0000-0000-0000-000000000008', 30, 'Mengajak 2 tetangga gabung', now() - interval '5 days'),
('a0000002-0000-0000-0000-000000000002', 15, 'Mengajak 1 tetangga gabung', now() - interval '30 days'),
('a0000005-0000-0000-0000-000000000005', 15, 'Mengajak 1 tetangga gabung', now() - interval '8 days'),
('a0000006-0000-0000-0000-000000000006', 15, 'Mengajak 1 tetangga gabung', now() - interval '12 days'),
('a0000007-0000-0000-0000-000000000007', 15, 'Mengajak 1 tetangga gabung', now() - interval '3 days');
