export type DocumentStatus = "DRAFT" | "READY" | "COMPLETED";
export type WizardStep = "BASIC_INFO" | "CATEGORY_RISK" | "SECTIONS" | "REVIEW";
export type ManufacturerType = "INDIAN_MANUFACTURER" | "IMPORTER";
export type LicenceType = "MANUFACTURING" | "LOAN" | "IMPORT" | "REGISTRATION";
export type DeviceCategory = "IVD" | "IMPLANT" | "REUSABLE" | "SINGLE_USE" | "SAMD" | "OTHER";
export type RiskClass = "A" | "B" | "C" | "D";

export type SectionKey =
  | "device_description"
  | "intended_use"
  | "indications_contraindications"
  | "warnings_precautions"
  | "instructions_for_use"
  | "sterilisation"
  | "reprocessing"
  | "maintenance"
  | "implant_card"
  | "ivd_performance"
  | "software_info"
  | "storage"
  | "disposal"
  | "manufacturer_licence"
  | "vigilance"
  | "symbols";

/** Step 2 answers that drive section applicability (REQUIREMENTS §7). */
export interface DeviceProfile {
  category: DeviceCategory | null;
  isSterile: boolean | null;
  isReusable: boolean | null;
  isActive: boolean | null;
  hasMeasuringFn: boolean | null;
  isLayUser: boolean | null;
  riskClass: RiskClass | null;
}

export interface IfuDocumentSummary {
  id: string;
  deviceName: string;
  modelNumber: string;
  manufacturerName: string;
  category: DeviceCategory;
  riskClass: RiskClass;
  status: DocumentStatus;
  version: string;
  lastStep: WizardStep;
  updatedAt: string; // ISO
}

export interface IfuDocument extends IfuDocumentSummary {
  brandName: string;
  description: string;
  manufacturerType: ManufacturerType;
  manufacturerAddress: string;
  manufacturerState: string;
  manufacturerPin: string;
  manufacturerCountry: string;
  licenceType: LicenceType;
  licenceNumber: string;
  importerName: string;
  importerAddress: string;
  customerCarePhone: string;
  customerCareEmail: string;
  issueDate: string; // ISO
  profile: DeviceProfile;
}
