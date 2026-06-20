/** Blok skeleton dasar — shimmer halus untuk loading state. */
export function SkeletonBlok({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-xl bg-garis/70 ${className}`} />;
}

/** Skeleton hero etalase + grid kartu. */
export function SkeletonEtalase() {
  return (
    <div className="flex-1">
      <div className="pita-mp h-1.5 w-full" aria-hidden />
      <div className="mx-auto max-w-5xl px-5 py-10">
        <SkeletonBlok className="h-5 w-40" />
        <SkeletonBlok className="mt-4 h-9 w-3/4" />
        <SkeletonBlok className="mt-3 h-4 w-full" />
        <SkeletonBlok className="mt-2 h-4 w-5/6" />

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonBlok key={i} className="h-24" />
          ))}
        </div>

        <SkeletonBlok className="mt-12 h-6 w-48" />
        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonBlok key={i} className="h-40" />
          ))}
        </div>
      </div>
    </div>
  );
}
