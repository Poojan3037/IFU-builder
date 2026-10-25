"use client";

import type { DocumentPage } from "../types";
import { PAGE_SIZE } from "../constants";
import { useDeleteDocument, useDocumentFilters } from "./Documents.hooks";
import { DocumentsPresentation } from "./Documents.presentation";

interface DocumentsContainerProps {
  data: DocumentPage;
  now: string;
}

export const DocumentsContainer = ({ data, now }: DocumentsContainerProps) => {
  const filterState = useDocumentFilters();
  const { remove, isDeleting } = useDeleteDocument();

  return (
    <DocumentsPresentation
      documents={data.documents}
      now={now}
      isPending={filterState.isPending || isDeleting}
      totalCount={data.totalCount}
      page={data.page}
      pageCount={data.pageCount}
      pageSize={PAGE_SIZE}
      search={filterState.search}
      status={filterState.filters.status}
      risk={filterState.filters.risk}
      hasActiveFilters={filterState.hasActiveFilters}
      onSearchChange={filterState.onSearchChange}
      onStatusChange={filterState.onStatusChange}
      onRiskChange={filterState.onRiskChange}
      onPageChange={filterState.onPageChange}
      onClearFilters={filterState.clearFilters}
      onDelete={remove}
    />
  );
};
