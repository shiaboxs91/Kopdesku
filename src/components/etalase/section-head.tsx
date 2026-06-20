export default function SectionHead({
  judul,
  ket,
}: {
  judul: string;
  ket?: string;
}) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-2.5">
        <span className="h-6 w-1 rounded-full bg-merah" aria-hidden />
        <h2 className="font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
          {judul}
        </h2>
      </div>
      {ket && <p className="mt-1.5 text-sm text-ink-soft">{ket}</p>}
    </div>
  );
}
