import type { IfuDocumentSummary } from "@/features/ifu-wizard/types";

import type { DashboardStats, DocumentFilters, RiskFilter, StatusFilter } from "./types";

const STATUS_VALUES: StatusFilter[] = ["ALL", "DRAFT", "READY", "COMPLETED"];
const RISK_VALUES: RiskFilter[] = ["ALL", "A", "B", "C", "D"];

export const parseFilters = (params: URLSearchParams): DocumentFilters => {
  const status = params.get("status")?.toUpperCase() as StatusFilter | undefined;
  const risk = params.get("risk")?.toUpperCase() as RiskFilter | undefined;
  const page = Number(params.get("page"));
  return {
    q: params.get("q") ?? "",
    status: status && STATUS_VALUES.includes(status) ? status : "ALL",
    risk: risk && RISK_VALUES.includes(risk) ? risk : "ALL",
    page: Number.isInteger(page) && page > 0 ? page : 1,
  };
};

/** FR-DASH-03/04: case-insensitive search on device, model and manufacturer, combined with filters. */
export const filterDocuments = (documents: IfuDocumentSummary[], filters: DocumentFilters): IfuDocumentSummary[] => {
  const query = filters.q.trim().toLowerCase();
  return documents
    .filter((doc) => filters.status === "ALL" || doc.status === filters.status)
    .filter((doc) => filters.risk === "ALL" || doc.riskClass === filters.risk)
    .filter(
      (doc) =>
        !query ||
        [doc.deviceName, doc.modelNumber, doc.manufacturerName].some((value) => value.toLowerCase().includes(query)),
    )
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
};

export const computeStats = (documents: IfuDocumentSummary[]): DashboardStats => ({
  total: documents.length,
  inProgress: documents.filter((doc) => doc.status === "DRAFT" || doc.status === "READY").length,
  completed: documents.filter((doc) => doc.status === "COMPLETED").length,
});
