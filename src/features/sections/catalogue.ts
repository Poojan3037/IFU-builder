import type { SectionKey } from "@/features/ifu-wizard/types";

import type { SectionDef } from "./types";

/** REQUIREMENTS §7 — canonical order. */
export const SECTION_CATALOGUE: Record<SectionKey, SectionDef> = {
  device_description: {
    key: "device_description",
    title: "Device Description",
    description: "What the device is, what it's made of and what comes in the box.",
    tip: "Describe principal components and materials, especially any that contact the patient. List accessories supplied separately.",
    includeReason: "Required for every device",
    fields: [
      { key: "description", label: "Description", placeholder: "A sterile, single-use titanium bone screw used to…", minLength: 40 },
      { key: "components", label: "Components & accessories", placeholder: "List every item in the pack and any accessories sold separately.", minLength: 10 },
      { key: "materials", label: "Materials", placeholder: "e.g. Titanium alloy Ti-6Al-4V (ISO 5832-3)", minLength: 5 },
    ],
  },
  intended_use: {
    key: "intended_use",
    title: "Intended Use / Intended Purpose",
    description: "The medical purpose, who should use the device and on whom.",
    tip: "Keep intended use consistent with your CDSCO licence application. Wording differences are a common query during inspection.",
    includeReason: "Required for every device",
    fields: [
      { key: "intendedUse", label: "Intended use", placeholder: "The device is intended for…", minLength: 40 },
      { key: "intendedUser", label: "Intended user", placeholder: "e.g. Orthopaedic surgeons trained in…", minLength: 10 },
      { key: "population", label: "Intended patient population", placeholder: "e.g. Adults over 18 years with…", minLength: 10 },
    ],
  },
  indications_contraindications: {
    key: "indications_contraindications",
    title: "Indications & Contraindications",
    description: "When the device should and should not be used.",
    tip: "Contraindications must never be left blank. If none are known, write 'None known' explicitly (rule IN-CI-001).",
    includeReason: "Required for every device",
    fields: [
      { key: "indications", label: "Indications for use", placeholder: "List the conditions this device is indicated for.", minLength: 40 },
      { key: "contraindications", label: "Contraindications", placeholder: "If none are known, write 'None known' explicitly.", minLength: 10 },
    ],
  },
  warnings_precautions: {
    key: "warnings_precautions",
    title: "Warnings & Precautions",
    description: "Hazards, safe-use precautions and residual risks.",
    tip: "Sterile and single-use devices need specific statements, e.g. \"Do not use if package is damaged\" and \"For single use only. Do not reuse.\" (MDR 2017, Rule 44).",
    includeReason: "Required for every device",
    fields: [
      { key: "warnings", label: "Warnings", placeholder: "Situations that could cause serious harm…", minLength: 40 },
      { key: "precautions", label: "Precautions", placeholder: "Special care needed for safe and effective use…", minLength: 20 },
      { key: "residualRisks", label: "Residual risks", placeholder: "Risks that remain after all risk controls…", minLength: 20 },
    ],
  },
  instructions_for_use: {
    key: "instructions_for_use",
    title: "Instructions for Use (Directions)",
    description: "Step-by-step directions from preparation to after use.",
    tip: "Use numbered steps with one action each. Put warnings immediately before the step they apply to.",
    includeReason: "Required for every device",
    fields: [
      { key: "preparation", label: "Preparation", placeholder: "Before use, inspect the package…", minLength: 20 },
      { key: "steps", label: "Step-by-step use", placeholder: "1. …\n2. …\n3. …", minLength: 40 },
      { key: "afterUse", label: "After use", placeholder: "After the procedure…", minLength: 10 },
    ],
  },
  sterilisation: {
    key: "sterilisation",
    title: "Sterilisation Information",
    description: "How the device was sterilised and how to keep it sterile.",
    tip: "State the method (e.g. 'Sterilised using ethylene oxide') and, for single-use devices, 'Do not resterilise'.",
    includeReason: "Because the device is supplied sterile",
    fields: [
      { key: "statement", label: "Sterility statement", placeholder: "Sterile unless package is opened or damaged…", minLength: 30 },
    ],
    structured: ["sterilisation"],
  },
  reprocessing: {
    key: "reprocessing",
    title: "Cleaning, Disinfection & Reprocessing",
    description: "Validated reprocessing method and number of reuse cycles.",
    tip: "Give the validated number of reprocessing cycles and an inspection step before each reuse (rule IN-RU-001).",
    includeReason: "Because the device is reused",
    fields: [
      { key: "agents", label: "Cleaning agents", placeholder: "e.g. Enzymatic detergent, pH 7–9…", minLength: 10 },
      { key: "method", label: "Method", placeholder: "1. Pre-clean at point of use…", minLength: 40 },
      { key: "cycles", label: "Number of reuse cycles & inspection", placeholder: "Validated for up to 100 cycles. Inspect for…", minLength: 20 },
    ],
  },
  maintenance: {
    key: "maintenance",
    title: "Maintenance & Servicing",
    description: "Service intervals, calibration and who may service the device.",
    tip: "For measuring devices, state the calibration interval and accuracy.",
    includeReason: "Because the device is active or reusable",
    fields: [
      { key: "intervals", label: "Service intervals", placeholder: "Preventive maintenance every 12 months…", minLength: 20 },
      { key: "calibration", label: "Calibration", placeholder: "Calibrate every… against…", minLength: 10 },
    ],
  },
  implant_card: {
    key: "implant_card",
    title: "Implant Card & Patient Information",
    description: "Information for the patient, implant card details and MRI safety.",
    tip: "State MRI safety status (MR Safe / MR Conditional / MR Unsafe) and expected device lifetime.",
    includeReason: "Because the device is an implant",
    fields: [
      { key: "patientInfo", label: "Patient information", placeholder: "Information the patient should know…", minLength: 40 },
      { key: "implantCard", label: "Implant card details", placeholder: "Device name, lot, implant date, hospital…", minLength: 20 },
      { key: "mriSafety", label: "MRI safety", placeholder: "MR Conditional. A patient with this device can be scanned safely…", minLength: 20 },
    ],
  },
  ivd_performance: {
    key: "ivd_performance",
    title: "Performance Characteristics & Specimen",
    description: "Specimen handling, analytical performance and interpreting results.",
    tip: "Specimen type and interpretation of results are mandatory for IVDs (rule IN-IVD-001).",
    includeReason: "Because the device is an IVD",
    fields: [
      { key: "specimen", label: "Specimen type & handling", placeholder: "e.g. Venous whole blood (EDTA)…", minLength: 20 },
      { key: "performance", label: "Analytical performance", placeholder: "Sensitivity, specificity, limit of detection…", minLength: 20 },
      { key: "interpretation", label: "Interpretation of results", placeholder: "Positive: two lines appear…", minLength: 20 },
    ],
  },
  software_info: {
    key: "software_info",
    title: "Software Information",
    description: "Version, system requirements, installation and cybersecurity.",
    tip: "Include the software version shown on screen so users can match it to this IFU.",
    includeReason: "Because the device is software",
    fields: [
      { key: "version", label: "Version & system requirements", placeholder: "Version 2.4.1. Requires Android 12+…", minLength: 20 },
      { key: "security", label: "Cybersecurity notes", placeholder: "Keep the device updated…", minLength: 20 },
    ],
  },
  storage: {
    key: "storage",
    title: "Storage & Handling Conditions",
    description: "Temperature, humidity, light and shelf life.",
    tip: "A temperature range or 'Store at room temperature' statement is required (rule IN-LBL-005), as is shelf-life information (IN-LBL-006).",
    includeReason: "Required for every device",
    fields: [
      { key: "handling", label: "Handling notes", placeholder: "Keep dry. Do not freeze…", minLength: 10 },
    ],
    structured: ["storage", "shelfLife"],
  },
  disposal: {
    key: "disposal",
    title: "Disposal Instructions",
    description: "How to dispose of the device and its packaging safely.",
    tip: "Reference the Bio-Medical Waste Management Rules, 2016, and the E-Waste Rules for active devices.",
    includeReason: "Required for every device",
    fields: [
      { key: "disposal", label: "Disposal", placeholder: "Dispose of as bio-medical waste in accordance with…", minLength: 30 },
    ],
  },
  manufacturer_licence: {
    key: "manufacturer_licence",
    title: "Manufacturer, Importer & Licence Details",
    description: "Generated from Step 1. Edit your details there.",
    tip: "Licence number and customer-care contact must appear on Indian labelling (rules IN-LBL-002, IN-LBL-007).",
    includeReason: "Required for every device",
    fields: [],
    autoGenerated: true,
  },
  vigilance: {
    key: "vigilance",
    title: "Adverse Event Reporting",
    description: "How users report incidents to you and to MvPI.",
    tip: "Give both your company contact and the Materiovigilance Programme of India (MvPI) reporting route.",
    includeReason: "Required for every device",
    fields: [
      { key: "reporting", label: "Reporting route", placeholder: "Report any serious incident to the manufacturer at… and to MvPI via…", minLength: 30 },
    ],
  },
  symbols: {
    key: "symbols",
    title: "Symbols Glossary",
    description: "Generated at export from the device attributes.",
    tip: "Symbols follow IS/ISO 15223-1.",
    includeReason: "Optional at export",
    fields: [],
    autoGenerated: true,
  },
};

export const SECTION_ORDER = Object.keys(SECTION_CATALOGUE) as SectionKey[];
