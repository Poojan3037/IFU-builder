"use client";

import type { IfuDocumentSummary } from "@/features/ifu-wizard/types";

import { PAGE_SIZE } from "../constants";
import { filterDocuments } from "../utils";
import { useDocumentFilters, useDocumentList } from "./Documents.hooks";
import { DocumentsPresentation } from "./Documents.presentation";

interface DocumentsContainerProps {
  initialDocuments: IfuDocumentSummary[];
}

export const DocumentsContainer = ({ initialDocuments }: DocumentsContainerProps) => {
  const { documents, duplicate, remove } = useDocumentList(initialDocuments);
  const filterState = useDocumentFilters();
  const filtered = filterDocuments(documents, filterState.filters);
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const page = Math.min(filterState.filters.page, pageCount);
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <DocumentsPresentation
      documents={visible}
      totalCount={filtered.length}
      page={page}
      pageCount={pageCount}
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
      onDuplicate={duplicate}
      onDelete={remove}
    />
  );
};
