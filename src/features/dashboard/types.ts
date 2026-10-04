import type { DocumentStatus, RiskClass } from "@/features/ifu-wizard/types";

export type StatusFilter = DocumentStatus | "ALL";
export type RiskFilter = RiskClass | "ALL";

export interface DocumentFilters {
  q: string;
  status: StatusFilter;
  risk: RiskFilter;
  page: number;
}

export interface DashboardStats {
  total: number;
  inProgress: number;
  completed: number;
}
