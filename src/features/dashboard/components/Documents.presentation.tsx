import type { DashboardDocument, RiskFilter, StatusFilter } from "../types";
import { DocumentsCardList } from "./DocumentsCardList";
import { DocumentsPagination } from "./DocumentsPagination";
import { DocumentsTable } from "./DocumentsTable";
import { DocumentsToolbar } from "./DocumentsToolbar";
import { NoResults } from "./NoResults";

interface DocumentsPresentationProps {
  documents: DashboardDocument[];
  now: string;
  isPending: boolean;
  totalCount: number;
  page: number;
  pageCount: number;
  pageSize: number;
  search: string;
  status: StatusFilter;
  risk: RiskFilter;
  hasActiveFilters: boolean;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onRiskChange: (value: string) => void;
  onPageChange: (page: number) => void;
  onClearFilters: () => void;
  onDelete: (doc: DashboardDocument) => void;
}

export const DocumentsPresentation = ({
  documents,
  now,
  isPending,
  totalCount,
  page,
  pageCount,
  pageSize,
  search,
  status,
  risk,
  hasActiveFilters,
  onSearchChange,
  onStatusChange,
  onRiskChange,
  onPageChange,
  onClearFilters,
  onDelete,
}: DocumentsPresentationProps) => (
  <section aria-labelledby="documents-heading" aria-busy={isPending} className="overflow-hidden rounded-2xl border bg-card shadow-sm transition-opacity aria-busy:opacity-60">
    <h2 id="documents-heading" className="sr-only">
      Documents
    </h2>
    <DocumentsToolbar
      search={search}
      status={status}
      risk={risk}
      hasActiveFilters={hasActiveFilters}
      onSearchChange={onSearchChange}
      onStatusChange={onStatusChange}
      onRiskChange={onRiskChange}
      onClearFilters={onClearFilters}
    />
    <p aria-live="polite" className="sr-only">
      {totalCount} {totalCount === 1 ? "document" : "documents"} found
    </p>
    {documents.length === 0 ? (
      <NoResults onClearFilters={onClearFilters} />
    ) : (
      <>
        <DocumentsTable documents={documents} now={now} onDelete={onDelete} />
        <DocumentsCardList documents={documents} now={now} onDelete={onDelete} />
        <DocumentsPagination
          page={page}
          pageCount={pageCount}
          pageSize={pageSize}
          totalCount={totalCount}
          onPageChange={onPageChange}
        />
      </>
    )}
  </section>
);
