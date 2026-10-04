"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";

import type { IfuDocumentSummary } from "@/features/ifu-wizard/types";
import { MOCK_NOW } from "@/features/ifu-wizard/mock-data";

import { SEARCH_DEBOUNCE_MS } from "../constants";
import type { DocumentFilters } from "../types";
import { parseFilters } from "../utils";

type FilterPatch = Partial<Record<keyof DocumentFilters, string | number | null>>;

/** URL-backed filters (FR-DASH-03/04) with a debounced search box. */
export const useDocumentFilters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const filters = parseFilters(new URLSearchParams(searchParams.toString()));
  const [search, setSearch] = useState(filters.q);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const updateParams = (patch: FilterPatch) => {
    const params = new URLSearchParams(window.location.search);
    Object.entries(patch).forEach(([key, value]) => {
      if (value === null || value === "" || value === "ALL" || value === 1) params.delete(key);
      else params.set(key, String(value));
    });
    if (!("page" in patch)) params.delete("page");
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const onSearchChange = (value: string) => {
    setSearch(value);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => updateParams({ q: value }), SEARCH_DEBOUNCE_MS);
  };

  const clearFilters = () => {
    clearTimeout(timer.current);
    setSearch("");
    router.replace(pathname, { scroll: false });
  };

  const hasActiveFilters = Boolean(filters.q) || filters.status !== "ALL" || filters.risk !== "ALL";

  return {
    filters,
    search,
    hasActiveFilters,
    onSearchChange,
    onStatusChange: (status: string) => updateParams({ status }),
    onRiskChange: (risk: string) => updateParams({ risk }),
    onPageChange: (page: number) => updateParams({ page }),
    clearFilters,
  };
};

/** Local, in-memory document list so Duplicate/Delete feel real in the static build. */
export const useDocumentList = (initial: IfuDocumentSummary[]) => {
  const [documents, setDocuments] = useState(initial);

  const duplicate = (doc: IfuDocumentSummary) => {
    const copy: IfuDocumentSummary = {
      ...doc,
      id: `${doc.id}-copy-${documents.length}`,
      deviceName: `${doc.deviceName} (copy)`,
      status: "DRAFT",
      version: "v1.0",
      lastStep: "BASIC_INFO",
      updatedAt: MOCK_NOW.toISOString(),
    };
    setDocuments((current) => [copy, ...current]);
    toast.success("Document duplicated", { description: copy.deviceName });
  };

  const remove = (doc: IfuDocumentSummary) => {
    setDocuments((current) => current.filter((item) => item.id !== doc.id));
    toast.success("Document deleted", {
      description: "You can ask support to restore it within 30 days.",
      action: { label: "Undo", onClick: () => setDocuments((current) => [doc, ...current]) },
    });
  };

  return { documents, duplicate, remove };
};
