import type { SectionKey } from "@/features/ifu-wizard/types";

export type Severity = "BLOCKING" | "ADVISORY";

export interface ComplianceIssue {
  id: string;
  ruleId: string;
  severity: Severity;
  title: string;
  message: string;
  sectionKey: SectionKey;
  fieldKey?: string;
  reference?: string;
}

export interface LooksGoodItem {
  sectionKey: SectionKey;
  note?: string;
}
