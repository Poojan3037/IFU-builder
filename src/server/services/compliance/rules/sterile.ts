import { containsAny, PHRASES } from "../phrases";
import type { ComplianceRule } from "../types";
import { REFERENCE_LABELLING, isReusable, isSingleUse, isSterile, sectionText, fieldText } from "./helpers";

/** IN-STR (sterile), IN-SU (single-use) and IN-RU (reusable) rules. */
export const sterileUseRules: ComplianceRule[] = [
  {
    id: "IN-STR-001",
    severity: "BLOCKING",
    appliesWhen: isSterile,
    check: (doc) => doc.structured.sterilisationMethod !== null,
    title: "Sterilisation method isn't specified",
    message: "Your device is supplied sterile, so the IFU must state how it was sterilised. Choose the method in Sterilisation Information.",
    sectionKey: "sterilisation",
    fieldKey: "sterilisationMethod",
    reference: REFERENCE_LABELLING,
    passNote: "sterilisation method stated",
  },
  {
    id: "IN-STR-002",
    severity: "BLOCKING",
    appliesWhen: isSterile,
    check: (doc) => containsAny(sectionText(doc, "warnings_precautions"), PHRASES.packageDamaged),
    title: "Sterile-package warning is missing",
    message: "Add a warning such as “Do not use if the package is damaged or opened” to Warnings & Precautions.",
    sectionKey: "warnings_precautions",
    fieldKey: "warnings",
    reference: REFERENCE_LABELLING,
    passNote: "includes required sterile-device warning",
  },
  {
    id: "IN-SU-001",
    severity: "BLOCKING",
    appliesWhen: isSingleUse,
    check: (doc) => containsAny(sectionText(doc, "warnings_precautions"), PHRASES.singleUse),
    title: "Single-use statement is missing",
    message: "Add “For single use only. Do not reuse.” and the risks of reuse to Warnings & Precautions.",
    sectionKey: "warnings_precautions",
    fieldKey: "warnings",
    reference: REFERENCE_LABELLING,
    passNote: "includes single-use statement",
  },
  {
    id: "IN-RU-001",
    severity: "BLOCKING",
    appliesWhen: isReusable,
    check: (doc) => {
      const method = fieldText(doc, "reprocessing", "method");
      const cycles = fieldText(doc, "reprocessing", "cycles");
      // A stated number (e.g. "100 cycles") is what makes the claim checkable.
      return method !== "" && /\d/.test(cycles) && containsAny(cycles, PHRASES.reprocessCycles);
    },
    title: "Reprocessing method or number of cycles is missing",
    message: "State the validated reprocessing method and the number of reuse cycles (for example “validated for up to 100 cycles”).",
    sectionKey: "reprocessing",
    fieldKey: "cycles",
    reference: "MDR 2017, Rule 44 [verify]",
    passNote: "method and reuse cycles stated",
  },
];
