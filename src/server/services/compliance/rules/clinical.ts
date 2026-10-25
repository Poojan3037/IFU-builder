import { containsAny, PHRASES } from "../phrases";
import type { ComplianceRule } from "../types";
import { fieldText, REFERENCE_LABELLING } from "./helpers";

/** IN-CI (contraindications), IN-CD (class C/D), IN-IMP (implant) and IN-IVD rules. */
export const clinicalRules: ComplianceRule[] = [
  {
    id: "IN-CI-001",
    severity: "BLOCKING",
    appliesWhen: () => true,
    // An explicit “None known” is accepted; only a blank field fails.
    check: (doc) => fieldText(doc, "indications_contraindications", "contraindications") !== "",
    title: "Contraindications are blank",
    message: "Never leave contraindications empty. If none are known, write “None known” explicitly.",
    sectionKey: "indications_contraindications",
    fieldKey: "contraindications",
    reference: REFERENCE_LABELLING,
    passNote: "contraindications stated",
  },
  {
    id: "IN-CD-001",
    severity: "ADVISORY",
    appliesWhen: ({ profile }) => profile.riskClass === "C" || profile.riskClass === "D",
    check: (doc) => fieldText(doc, "warnings_precautions", "residualRisks").length >= 20,
    title: "Residual risks aren't described",
    message: "For Class C and D devices, describe the risks that remain after all risk controls so clinicians can weigh benefit against risk.",
    sectionKey: "warnings_precautions",
    fieldKey: "residualRisks",
    passNote: "residual risks described",
  },
  {
    id: "IN-IMP-001",
    severity: "BLOCKING",
    appliesWhen: ({ profile }) => profile.category === "IMPLANT",
    check: (doc) =>
      fieldText(doc, "implant_card", "patientInfo") !== "" &&
      fieldText(doc, "implant_card", "implantCard") !== "" &&
      containsAny(fieldText(doc, "implant_card", "mriSafety"), PHRASES.mriSafety),
    title: "Implant card or MRI safety information is incomplete",
    message: "Complete the patient information and implant card details, and state the MRI safety status (MR Safe, MR Conditional or MR Unsafe).",
    sectionKey: "implant_card",
    fieldKey: "mriSafety",
    reference: "MDR 2017, Rule 44 [verify]",
    passNote: "MRI safety stated",
  },
  {
    id: "IN-IVD-001",
    severity: "BLOCKING",
    appliesWhen: ({ profile }) => profile.category === "IVD",
    check: (doc) => fieldText(doc, "ivd_performance", "specimen") !== "" && fieldText(doc, "ivd_performance", "interpretation") !== "",
    title: "Specimen type or result interpretation is missing",
    message: "An IVD IFU must state the specimen type and how to interpret the results.",
    sectionKey: "ivd_performance",
    fieldKey: "specimen",
    reference: "MDR 2017, Rule 44 [verify]",
    passNote: "specimen and interpretation provided",
  },
];
