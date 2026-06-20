import { SkeletonBlok } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="flex-1">
      <div className="pita-mp h-1.5 w-full" aria-hidden />
      <div className="mx-auto max-w-3xl px-5 py-10">
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <SkeletonBlok className="h-28 w-28 rounded-full" />
          <div className="flex-1 space-y-2 text-center sm:text-left">
            <SkeletonBlok className="mx-auto h-7 w-44 sm:mx-0" />
            <SkeletonBlok className="mx-auto h-4 w-32 sm:mx-0" />
            <SkeletonBlok className="mx-auto h-3 w-56 sm:mx-0" />
          </div>
        </div>
        <SkeletonBlok className="mt-6 h-4 w-full" />
        <SkeletonBlok className="mt-2 h-4 w-5/6" />

        <SkeletonBlok className="mt-10 h-32 w-full rounded-2xl" />
        <div className="mt-6 grid grid-cols-3 gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonBlok key={i} className="h-24 rounded-2xl" />
          ))}
        </div>
      </div>
    </main>
  );
}
