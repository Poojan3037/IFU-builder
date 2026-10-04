import type { IfuDocument } from "./types";

/** Fixed "now" so relative dates render identically on server and client. */
export const MOCK_NOW = new Date("2026-10-04T10:30:00+05:30");

/** The document every /ifu/[id]/* screen renders in the static build. */
export const DEMO_DOCUMENT: IfuDocument = {
  id: "demo",
  deviceName: "OrthoFix Cortical Bone Screw",
  brandName: "OrthoFix",
  modelNumber: "OF-CS-35",
  description:
    "A sterile, single-use, self-tapping cortical bone screw made of titanium alloy, used with OrthoFix plates for internal fixation of long-bone fractures.",
  manufacturerType: "INDIAN_MANUFACTURER",
  manufacturerName: "Sanjeevani MedTech Pvt. Ltd.",
  manufacturerAddress: "Plot 42, Genome Valley, Shamirpet",
  manufacturerState: "Telangana",
  manufacturerPin: "500078",
  manufacturerCountry: "India",
  licenceType: "MANUFACTURING",
  licenceNumber: "MFG/MD/2025/000418",
  importerName: "",
  importerAddress: "",
  customerCarePhone: "+91 40 4012 3456",
  customerCareEmail: "care@sanjeevanimedtech.in",
  issueDate: "2026-10-04T00:00:00+05:30",
  version: "v1.0",
  category: "IMPLANT",
  riskClass: "C",
  status: "DRAFT",
  lastStep: "SECTIONS",
  updatedAt: "2026-10-04T09:12:00+05:30",
  profile: {
    category: "IMPLANT",
    isSterile: true,
    isReusable: false,
    isActive: false,
    hasMeasuringFn: false,
    isLayUser: false,
    riskClass: "C",
  },
};

export const EMPTY_PROFILE = {
  category: null,
  isSterile: null,
  isReusable: null,
  isActive: null,
  hasMeasuringFn: null,
  isLayUser: null,
  riskClass: null,
} as const;
