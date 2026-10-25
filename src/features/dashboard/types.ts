import type { DeviceCategory, DocumentStatus, RiskClass, WizardStep } from "@/features/ifu-wizard/types";

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

/** Row shown on the dashboard. Category and risk are null until Step 2 is answered. */
export interface DashboardDocument {
  id: string;
  deviceName: string;
  modelNumber: string;
  category: DeviceCategory | null;
  riskClass: RiskClass | null;
  status: DocumentStatus;
  lastStep: WizardStep;
  updatedAt: string; // ISO
}

export interface DocumentPage {
  documents: DashboardDocument[];
  totalCount: number;
  page: number;
  pageCount: number;
}
