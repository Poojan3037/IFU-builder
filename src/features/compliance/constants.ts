import type { DeviceCategory } from "@/features/ifu-wizard/types";

/** Category wording used in the compliance sub-title (FR-CMP-02). */
export const CATEGORY_CONTEXT: Record<DeviceCategory, string> = {
  IVD: "in-vitro diagnostic",
  IMPLANT: "implant",
  REUSABLE: "reusable instrument",
  SINGLE_USE: "single-use",
  SAMD: "software (SaMD)",
  OTHER: "medical",
};

export const SCAN_DURATION_MS = 1400;
