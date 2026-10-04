import { SECTION_ORDER } from "@/features/sections/catalogue";

import type { DeviceProfile, SectionKey } from "../types";

/** Pure: which IFU sections apply to a device (REQUIREMENTS §7). `symbols` is an export option, so excluded. */
export const getApplicableSections = (profile: DeviceProfile): SectionKey[] =>
  SECTION_ORDER.filter((key) => {
    switch (key) {
      case "sterilisation":
        return profile.isSterile === true;
      case "reprocessing":
        return profile.isReusable === true;
      case "maintenance":
        return profile.isActive === true || profile.isReusable === true;
      case "implant_card":
        return profile.category === "IMPLANT";
      case "ivd_performance":
        return profile.category === "IVD";
      case "software_info":
        return profile.category === "SAMD";
      case "symbols":
        return false;
      default:
        return true;
    }
  });

export interface ExtraWarning {
  id: string;
  text: string;
}

/** Pure: extra warning prompts added inside Warnings & Precautions. */
export const getExtraWarnings = (profile: DeviceProfile): ExtraWarning[] => {
  const warnings: ExtraWarning[] = [];
  if (profile.isSterile) warnings.push({ id: "sterile", text: "“Sterile unless package is opened or damaged” and the sterilisation method" });
  if (profile.isReusable === false && profile.category !== "SAMD")
    warnings.push({ id: "single-use", text: "“For single use only. Do not reuse.” plus the risks of reuse" });
  if (profile.riskClass === "C" || profile.riskClass === "D")
    warnings.push({ id: "high-risk", text: "Residual-risk statement and use under a qualified healthcare professional" });
  if (profile.category === "IMPLANT") warnings.push({ id: "implant", text: "MRI safety statement and expected lifetime" });
  if (profile.isLayUser) warnings.push({ id: "lay-user", text: "Plain-language reading level and “Keep out of reach of children”" });
  if (profile.hasMeasuringFn) warnings.push({ id: "measuring", text: "Accuracy and calibration statement" });
  return warnings;
};

/** Sections that only appear because of the user's answers (not "always"). */
export const CONDITIONAL_SECTIONS: SectionKey[] = [
  "sterilisation",
  "reprocessing",
  "maintenance",
  "implant_card",
  "ivd_performance",
  "software_info",
];
