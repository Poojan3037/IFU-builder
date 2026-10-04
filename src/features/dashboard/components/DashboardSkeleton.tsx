import { Skeleton } from "@/components/ui/skeleton";

export const DocumentsSkeleton = () => (
  <div className="overflow-hidden rounded-2xl border bg-card" aria-hidden>
    <div className="flex gap-3 border-b p-4">
      <Skeleton className="h-9 w-full max-w-sm" />
      <Skeleton className="ml-auto h-9 w-36" />
      <Skeleton className="h-9 w-32" />
    </div>
    {Array.from({ length: 6 }, (_, index) => (
      <div key={index} className="flex items-center gap-3 border-b px-4 py-3 last:border-0">
        <Skeleton className="size-9 rounded-xl" />
        <div className="flex-1 space-y-1.5">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-3 w-20" />
        </div>
        <Skeleton className="hidden h-5 w-16 md:block" />
        <Skeleton className="hidden h-5 w-24 md:block" />
        <Skeleton className="h-8 w-20" />
      </div>
    ))}
  </div>
);

export const DashboardSkeleton = () => (
  <div className="mx-auto w-full max-w-7xl space-y-8 px-4 py-8 sm:px-6" role="status" aria-label="Loading documents">
    <div className="flex items-end justify-between">
      <div className="space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-80" />
      </div>
      <Skeleton className="h-10 w-40" />
    </div>
    <div className="grid gap-4 sm:grid-cols-3">
      {[0, 1, 2].map((index) => (
        <Skeleton key={index} className="h-32 rounded-2xl" />
      ))}
    </div>
    <DocumentsSkeleton />
  </div>
);
