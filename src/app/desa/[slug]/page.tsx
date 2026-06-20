import { notFound } from "next/navigation";
import { getEtalaseDesa, getAllDesaSlugs } from "@/lib/queries/etalase";
import HeroDesa from "@/components/etalase/hero-desa";
import StatPartisipasi from "@/components/etalase/stat-partisipasi";
import SectionHead from "@/components/etalase/section-head";
import ProdukGrid from "@/components/etalase/produk-grid";
import TransparansiDana from "@/components/etalase/transparansi-dana";
import CtaGabung from "@/components/etalase/cta-gabung";

export const revalidate = 60; // ISR — segarkan tiap 60 detik

export async function generateStaticParams() {
  const slugs = await getAllDesaSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getEtalaseDesa(slug);
  if (!data) return { title: "Desa tidak ditemukan — KopdesKu" };
  return {
    title: `${data.desa.nama} — KopdesKu`,
    description:
      data.desa.cerita?.slice(0, 155) ??
      `Etalase digital ${data.desa.desa_nama}.`,
  };
}

export default async function DesaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getEtalaseDesa(slug);
  if (!data) notFound();

  const { desa, ringkasan, produk, transparansi } = data;

  return (
    <main className="flex-1">
      <HeroDesa desa={desa} />

      <div className="mx-auto max-w-5xl space-y-14 px-5 py-12">
        {ringkasan && (
          <StatPartisipasi
            totalAnggota={ringkasan.total_anggota}
            persenPartisipasi={ringkasan.persen_partisipasi}
            totalSimpanan={ringkasan.total_simpanan}
            totalProduk={ringkasan.total_produk}
          />
        )}

        <section>
          <SectionHead
            judul="Hasil Bumi Desa"
            ket="Produk unggulan warga, dijual langsung tanpa tengkulak."
          />
          <ProdukGrid produk={produk} />
        </section>

        <section>
          <SectionHead
            judul="Keuangan Terbuka"
            ket="Setiap rupiah yang masuk dan keluar dari kas koperasi, terlihat oleh semua."
          />
          <TransparansiDana data={transparansi} />
        </section>

        <CtaGabung namaDesa={desa.desa_nama} />
      </div>

      <footer className="border-t border-garis bg-putih py-8 text-center">
        <div className="pita-mp mx-auto mb-4 h-1 w-16 rounded-full" aria-hidden />
        <p className="font-display text-lg font-extrabold text-merah">KopdesKu</p>
        <p className="mt-1 text-xs text-ink-soft">
          Etalase Digital &amp; Ruang Anggota Koperasi Desa
        </p>
      </footer>
    </main>
  );
}
