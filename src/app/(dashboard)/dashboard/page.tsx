import type { Metadata } from "next";
import { Suspense } from "react";

import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import { DocumentsSkeleton } from "@/features/dashboard/components/DashboardSkeleton";
import { DocumentsContainer } from "@/features/dashboard/components/Documents.container";
import { EmptyState } from "@/features/dashboard/components/EmptyState";
import { StatsCards } from "@/features/dashboard/components/StatsCards";
import { getDashboardStats, listDocuments } from "@/features/dashboard/queries";
import { parseFilters } from "@/features/dashboard/utils";
import { requireSession } from "@/server/services/session";

export const metadata: Metadata = { title: "My IFU Documents" };

const DashboardPage = async ({ searchParams }: PageProps<"/dashboard">) => {
  const { user } = await requireSession("/dashboard");
  const filters = parseFilters(await searchParams);
  const [stats, data] = await Promise.all([getDashboardStats(user.id), listDocuments(user.id, filters)]);

  return (
    <main className="mx-auto w-full max-w-7xl space-y-8 px-4 py-8 sm:px-6">
      <DashboardHeader />
      {stats.total === 0 ? (
        <EmptyState />
      ) : (
        <>
          <StatsCards stats={stats} />
          <Suspense fallback={<DocumentsSkeleton />}>
            <DocumentsContainer data={data} now={new Date().toISOString()} />
          </Suspense>
        </>
      )}
    </main>
  );
};

export default DashboardPage;
