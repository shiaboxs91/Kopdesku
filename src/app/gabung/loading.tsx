import { SkeletonBlok } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="flex-1">
      <div className="pita-mp h-1.5 w-full" aria-hidden />
      <div className="mx-auto max-w-2xl px-5 py-12">
        <SkeletonBlok className="h-6 w-32 rounded-full" />
        <SkeletonBlok className="mt-4 h-9 w-3/4" />
        <SkeletonBlok className="mt-3 h-4 w-full" />
        <div className="mt-8 space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonBlok key={i} className="h-20 rounded-2xl" />
          ))}
        </div>
      </div>
    </main>
  );
}
