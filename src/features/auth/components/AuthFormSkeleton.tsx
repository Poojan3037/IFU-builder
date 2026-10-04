import { Skeleton } from "@/components/ui/skeleton";

export const AuthFormSkeleton = () => (
  <div className="space-y-4" aria-hidden>
    <Skeleton className="h-10 w-full" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-10 w-full" />
    <Skeleton className="h-10 w-full" />
    <Skeleton className="h-10 w-full" />
  </div>
);
