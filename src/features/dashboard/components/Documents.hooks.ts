"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import { toast } from "sonner";

import { deleteDocumentAction } from "../actions";
import { SEARCH_DEBOUNCE_MS } from "../constants";
import type { DashboardDocument, DocumentFilters } from "../types";
import { parseFilters } from "../utils";

type FilterPatch = Partial<Record<keyof DocumentFilters, string | number | null>>;

/** URL-backed filters (FR-DASH-03/04); the server page re-renders on every change. */
export const useDocumentFilters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const filters = parseFilters(new URLSearchParams(searchParams.toString()));
  const [search, setSearch] = useState(filters.q);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const navigate = (href: string) => startTransition(() => router.replace(href, { scroll: false }));

  const updateParams = (patch: FilterPatch) => {
    const params = new URLSearchParams(window.location.search);
    Object.entries(patch).forEach(([key, value]) => {
      if (value === null || value === "" || value === "ALL" || value === 1) params.delete(key);
      else params.set(key, String(value));
    });
    if (!("page" in patch)) params.delete("page");
    const query = params.toString();
    navigate(query ? `${pathname}?${query}` : pathname);
  };

  const onSearchChange = (value: string) => {
    setSearch(value);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => updateParams({ q: value.trim() }), SEARCH_DEBOUNCE_MS);
  };

  const clearFilters = () => {
    clearTimeout(timer.current);
    setSearch("");
    navigate(pathname);
  };

  const hasActiveFilters = Boolean(filters.q) || filters.status !== "ALL" || filters.risk !== "ALL";

  return {
    filters,
    search,
    isPending,
    hasActiveFilters,
    onSearchChange,
    onStatusChange: (status: string) => updateParams({ status }),
    onRiskChange: (risk: string) => updateParams({ risk }),
    onPageChange: (page: number) => updateParams({ page }),
    clearFilters,
  };
};

export const useDeleteDocument = () => {
  const router = useRouter();
  const [isDeleting, startTransition] = useTransition();

  const remove = (doc: DashboardDocument) =>
    startTransition(async () => {
      const result = await deleteDocumentAction({ id: doc.id });
      if (!result.success) {
        toast.error(result.error.message);
        return;
      }
      toast.success("Document deleted", { description: "Support can restore it within 30 days." });
      router.refresh();
    });

  return { remove, isDeleting };
};
