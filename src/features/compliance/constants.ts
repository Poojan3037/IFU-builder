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

/** The check takes well under a second; the scanning state is shown at least this long so it reads as a result, not a flash. */
export const MIN_SCAN_DISPLAY_MS = 700;
