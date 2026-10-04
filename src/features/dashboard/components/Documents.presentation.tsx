import type { IfuDocumentSummary } from "@/features/ifu-wizard/types";

import type { RiskFilter, StatusFilter } from "../types";
import { DocumentsCardList } from "./DocumentsCardList";
import { DocumentsPagination } from "./DocumentsPagination";
import { DocumentsTable } from "./DocumentsTable";
import { DocumentsToolbar } from "./DocumentsToolbar";
import { NoResults } from "./NoResults";

interface DocumentsPresentationProps {
  documents: IfuDocumentSummary[];
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
  onDuplicate: (doc: IfuDocumentSummary) => void;
  onDelete: (doc: IfuDocumentSummary) => void;
}

export const DocumentsPresentation = ({
  documents,
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
  onDuplicate,
  onDelete,
}: DocumentsPresentationProps) => (
  <section aria-labelledby="documents-heading" className="overflow-hidden rounded-2xl border bg-card shadow-sm">
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
        <DocumentsTable documents={documents} onDuplicate={onDuplicate} onDelete={onDelete} />
        <DocumentsCardList documents={documents} onDuplicate={onDuplicate} onDelete={onDelete} />
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
