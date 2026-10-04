import { Skeleton } from "@/components/ui/skeleton";

const WizardLoading = () => (
  <div role="status" aria-label="Loading step" className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
    <div className="space-y-3">
      <Skeleton className="h-3 w-40" />
      <Skeleton className="h-8 w-80 max-w-full" />
      <Skeleton className="h-4 w-96 max-w-full" />
    </div>
    <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_17rem]">
      <div className="space-y-6">
        {[0, 1, 2].map((card) => (
          <div key={card} className="space-y-5 rounded-2xl border bg-card/60 p-6">
            <div className="flex items-center gap-3">
              <Skeleton className="size-9 rounded-xl" />
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-56" />
              </div>
            </div>
            <Skeleton className="h-10 w-full" />
            <div className="grid gap-5 sm:grid-cols-2">
              <Skeleton className="h-10" />
              <Skeleton className="h-10" />
            </div>
          </div>
        ))}
      </div>
      <Skeleton className="hidden aspect-[210/297] rounded-xl lg:block" />
    </div>
    <span className="sr-only">Loading…</span>
  </div>
);

export default WizardLoading;
