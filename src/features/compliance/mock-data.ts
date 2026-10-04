import type { ComplianceIssue, LooksGoodItem } from "./types";

/** Issues the rule engine would raise for DEMO_DOCUMENT (REQUIREMENTS §8.2). */
export const MOCK_ISSUES: ComplianceIssue[] = [
  {
    id: "iss-1",
    ruleId: "IN-STR-001",
    severity: "BLOCKING",
    title: "Sterilisation section isn't complete",
    message:
      "Your device is supplied sterile, so the IFU must state the sterilisation method. Confirm the method and mark the Sterilisation Information section complete.",
    sectionKey: "sterilisation",
    fieldKey: "statement",
    reference: "MDR 2017, Rule 44",
  },
  {
    id: "iss-2",
    ruleId: "IN-LBL-005",
    severity: "BLOCKING",
    title: "Storage temperature is missing",
    message:
      "Add a storage temperature range (for example 15–30 °C) or a 'Store at room temperature' statement in Storage & Handling Conditions.",
    sectionKey: "storage",
    fieldKey: "handling",
    reference: "MDR 2017, Rule 44",
  },
  {
    id: "iss-3",
    ruleId: "IN-LBL-006",
    severity: "BLOCKING",
    title: "Shelf life isn't provided",
    message: "Enter the shelf life in months, or write 'Not applicable' with a reason if the device doesn't expire.",
    sectionKey: "storage",
    reference: "MDR 2017, Rule 44",
  },
  {
    id: "iss-4",
    ruleId: "IN-CD-001",
    severity: "ADVISORY",
    title: "Residual risks aren't described",
    message:
      "For Class C and D devices, describe the risks that remain after all risk controls so clinicians can weigh benefit against risk.",
    sectionKey: "warnings_precautions",
    fieldKey: "residualRisks",
  },
  {
    id: "iss-5",
    ruleId: "IN-VIG-001",
    severity: "ADVISORY",
    title: "No adverse-event reporting route",
    message:
      "Tell users how to report incidents to your company and to the Materiovigilance Programme of India (MvPI).",
    sectionKey: "vigilance",
    fieldKey: "reporting",
  },
];

export const MOCK_LOOKS_GOOD: LooksGoodItem[] = [
  { sectionKey: "device_description", note: "materials and components listed" },
  { sectionKey: "intended_use" },
  { sectionKey: "indications_contraindications", note: "contraindications stated" },
  { sectionKey: "warnings_precautions", note: "includes required sterile-device warning" },
  { sectionKey: "instructions_for_use" },
  { sectionKey: "manufacturer_licence", note: "licence number and customer care present" },
];

/** Every applicable section looks good when the document passes. */
export const MOCK_LOOKS_GOOD_PASSED: LooksGoodItem[] = [
  ...MOCK_LOOKS_GOOD,
  { sectionKey: "sterilisation", note: "method: gamma irradiation" },
  { sectionKey: "implant_card", note: "MRI safety stated" },
  { sectionKey: "storage", note: "15–30 °C, 60-month shelf life" },
  { sectionKey: "disposal" },
  { sectionKey: "vigilance", note: "company and MvPI routes given" },
];
