import type { Metadata } from "next";
import { Suspense } from "react";

import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import { DocumentsSkeleton } from "@/features/dashboard/components/DashboardSkeleton";
import { DocumentsContainer } from "@/features/dashboard/components/Documents.container";
import { EmptyState } from "@/features/dashboard/components/EmptyState";
import { StatsCards } from "@/features/dashboard/components/StatsCards";
import { MOCK_DOCUMENTS } from "@/features/dashboard/mock-data";
import { computeStats } from "@/features/dashboard/utils";

export const metadata: Metadata = { title: "My IFU Documents" };

const DashboardPage = async ({ searchParams }: PageProps<"/dashboard">) => {
  // Static build: `?state=empty` previews the first-time user experience.
  const { state } = await searchParams;
  const documents = state === "empty" ? [] : MOCK_DOCUMENTS;

  return (
    <main className="mx-auto w-full max-w-7xl space-y-8 px-4 py-8 sm:px-6">
      <DashboardHeader />
      {documents.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <StatsCards stats={computeStats(documents)} />
          <Suspense fallback={<DocumentsSkeleton />}>
            <DocumentsContainer initialDocuments={documents} />
          </Suspense>
        </>
      )}
    </main>
  );
};

export default DashboardPage;
