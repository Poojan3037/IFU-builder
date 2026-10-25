import { Skeleton } from "@/components/ui/skeleton";

const PreviewLoading = () => (
  <div role="status" aria-label="Loading preview" className="mx-auto w-full max-w-3xl flex-1 space-y-6 px-4 py-10 sm:px-6">
    <div className="space-y-3 text-center">
      <Skeleton className="mx-auto h-8 w-56" />
      <Skeleton className="mx-auto h-4 w-80 max-w-full" />
    </div>
    <Skeleton className="aspect-[210/297] w-full rounded-xl" />
    <span className="sr-only">Loading…</span>
  </div>
);

export default PreviewLoading;
