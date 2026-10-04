import {
  Cpu,
  FlaskConical,
  Package,
  Puzzle,
  Repeat,
  Syringe,
  type LucideIcon,
} from "lucide-react";

import type { DeviceCategory, DocumentStatus, LicenceType, ManufacturerType, RiskClass } from "./types";

export const CATEGORY_META: Record<DeviceCategory, { label: string; short: string; description: string; icon: LucideIcon }> = {
  IVD: {
    label: "In-Vitro Diagnostic (IVD)",
    short: "IVD",
    description: "Tests performed on samples such as blood, urine or tissue.",
    icon: FlaskConical,
  },
  IMPLANT: {
    label: "Implant",
    short: "Implant",
    description: "Placed inside the body, partly or fully, for 30 days or more.",
    icon: Puzzle,
  },
  REUSABLE: {
    label: "Reusable instrument",
    short: "Reusable",
    description: "Cleaned, disinfected or sterilised between uses.",
    icon: Repeat,
  },
  SINGLE_USE: {
    label: "Single-use",
    short: "Single-use",
    description: "Used once on a single patient, then discarded.",
    icon: Syringe,
  },
  SAMD: {
    label: "Software (SaMD)",
    short: "SaMD",
    description: "Software that is itself a medical device.",
    icon: Cpu,
  },
  OTHER: {
    label: "Other",
    short: "Other",
    description: "Doesn't fit the categories above.",
    icon: Package,
  },
};

export const STATUS_META: Record<DocumentStatus, { label: string }> = {
  DRAFT: { label: "Draft" },
  READY: { label: "Ready to export" },
  COMPLETED: { label: "Completed" },
};

export const RISK_CLASS_META: Record<RiskClass, { label: string; description: string }> = {
  A: { label: "Class A", description: "Low risk" },
  B: { label: "Class B", description: "Low–moderate risk" },
  C: { label: "Class C", description: "Moderate–high risk" },
  D: { label: "Class D", description: "High risk" },
};

export const MANUFACTURER_TYPE_META: Record<ManufacturerType, { label: string }> = {
  INDIAN_MANUFACTURER: { label: "Indian manufacturer" },
  IMPORTER: { label: "Importer" },
};

export const LICENCE_TYPE_META: Record<LicenceType, { label: string; form: string; numberLabel: string }> = {
  MANUFACTURING: { label: "Manufacturing licence", form: "MD-5 / MD-9", numberLabel: "Manufacturing licence number" },
  LOAN: { label: "Loan licence", form: "MD-6 / MD-10", numberLabel: "Loan licence number" },
  IMPORT: { label: "Import licence", form: "MD-15", numberLabel: "Import licence number (MD-15)" },
  REGISTRATION: { label: "Registration (Class A exempt)", form: "Registration", numberLabel: "Registration number" },
};

export const LICENCE_TYPES_BY_MANUFACTURER: Record<ManufacturerType, LicenceType[]> = {
  INDIAN_MANUFACTURER: ["MANUFACTURING", "LOAN", "REGISTRATION"],
  IMPORTER: ["IMPORT"],
};

export const WIZARD_STEPS = [
  { key: "BASIC_INFO", label: "Basic Info", slug: "basic-info" },
  { key: "CATEGORY_RISK", label: "Category & Risk", slug: "category-risk" },
  { key: "SECTIONS", label: "Document Sections", slug: "sections" },
  { key: "REVIEW", label: "Review & Export", slug: "compliance" },
] as const;

export const INDIAN_STATES = [
  "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh",
  "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana",
  "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep",
  "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry",
  "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
  "West Bengal",
] as const;

export const DISCLAIMER =
  "Smart IFU Builder helps you draft IFUs aligned with MDR 2017. It does not replace review by a qualified regulatory professional.";
