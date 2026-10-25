import { FileQuestion } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

/** Missing, soft-deleted and foreign documents all land here, so a document's existence is never revealed (FR-SEC-01). */
const DashboardNotFound = () => (
  <div className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center gap-4 px-4 py-20 text-center">
    <span className="grid size-14 place-items-center rounded-2xl bg-accent text-primary">
      <FileQuestion aria-hidden className="size-7" />
    </span>
    <h1 className="text-xl font-semibold tracking-tight">We couldn&apos;t find that document</h1>
    <p className="text-sm text-muted-foreground">It may have been deleted, or you may not have access to it.</p>
    <Button asChild>
      <Link href="/dashboard">Back to Dashboard</Link>
    </Button>
  </div>
);

export default DashboardNotFound;
