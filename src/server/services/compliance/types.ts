import type { LicenceType, ManufacturerType, DeviceProfile, SectionKey } from "@/features/ifu-wizard/types";
import type { StructuredValues } from "@/features/sections/schema";

export type Severity = "BLOCKING" | "ADVISORY";

export interface SectionSnapshot {
  isComplete: boolean;
  /** Plain-text field values (markup stripped), keyed by catalogue field key. */
  fields: Record<string, string>;
}

/** Everything a rule may look at: a pure, serialisable view of the document (REQUIREMENTS §8.1). */
export interface IfuDocumentSnapshot {
  profile: DeviceProfile;
  info: {
    deviceName: string;
    manufacturerType: ManufacturerType;
    manufacturerName: string;
    manufacturerAddress: string;
    licenceType: LicenceType;
    licenceNumber: string;
    importerName: string;
    importerAddress: string;
    importerPin: string;
    customerCarePhone: string;
    customerCareEmail: string;
  };
  /** Sections that apply to this device, in canonical order. */
  applicable: SectionKey[];
  sections: Partial<Record<SectionKey, SectionSnapshot>>;
  structured: StructuredValues;
}

export interface ComplianceRule {
  /** e.g. "IN-LBL-003". Rules that fan out per section/field share one id. */
  id: string;
  severity: Severity;
  appliesWhen: (doc: IfuDocumentSnapshot) => boolean;
  /** true = pass */
  check: (doc: IfuDocumentSnapshot) => boolean;
  title: string;
  message: string;
  sectionKey: SectionKey;
  fieldKey?: string;
  /** e.g. "MDR 2017, Rule 44 [verify]" */
  reference?: string;
  /** Shown in the "Looks good" list when the rule applies and passes. */
  passNote?: string;
}

/** An issue as raised by the engine; persistence adds the database id. */
export interface ComplianceFinding {
  ruleId: string;
  severity: Severity;
  sectionKey: SectionKey;
  fieldKey?: string;
  title: string;
  message: string;
  reference?: string;
}

export interface LooksGoodEntry {
  sectionKey: SectionKey;
  note?: string;
}

export interface ComplianceResult {
  findings: ComplianceFinding[];
  looksGood: LooksGoodEntry[];
}
