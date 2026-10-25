import { containsAny, PHRASES } from "../phrases";
import type { ComplianceRule } from "../types";
import { REFERENCE_LABELLING, sectionText } from "./helpers";

const present = (value: string) => value.trim() !== "";

/** Loose shape check only: letters, digits and separators, with at least one digit. State formats vary. [verify] */
const LICENCE_FORMAT = /^(?=.*\d)[A-Za-z0-9][A-Za-z0-9/\-. ]{4,39}$/;

/** IN-LBL — labelling content required on Indian devices (MDR 2017, Chapter VI). */
export const labellingRules: ComplianceRule[] = [
  {
    id: "IN-LBL-001",
    severity: "BLOCKING",
    appliesWhen: () => true,
    check: ({ info }) => present(info.deviceName) && present(info.manufacturerName) && present(info.manufacturerAddress),
    title: "Device or manufacturer details are missing",
    message: "Add the device name and the manufacturer's name and address in Step 1. They must appear on every IFU.",
    sectionKey: "manufacturer_licence",
    reference: REFERENCE_LABELLING,
    passNote: "device and manufacturer details present",
  },
  {
    id: "IN-LBL-002",
    severity: "BLOCKING",
    appliesWhen: ({ info }) => info.licenceType !== "REGISTRATION",
    check: ({ info }) => present(info.licenceNumber),
    title: "Licence number is missing",
    message: "Enter your licence number in Step 1. Use “Registration” as the licence type only for devices that need registration, not a licence.",
    sectionKey: "manufacturer_licence",
    reference: REFERENCE_LABELLING,
    passNote: "licence number present",
  },
  {
    id: "IN-LBL-003",
    severity: "ADVISORY",
    appliesWhen: ({ info }) => present(info.licenceNumber),
    check: ({ info }) => LICENCE_FORMAT.test(info.licenceNumber.trim()),
    title: "Licence number format looks unusual",
    message: "The licence number should be 5–40 characters of letters, digits and “/ - .” with at least one digit. Check it against your licence certificate.",
    sectionKey: "manufacturer_licence",
    reference: "Licence formats vary by authority [verify]",
  },
  {
    id: "IN-LBL-004",
    severity: "BLOCKING",
    appliesWhen: ({ info }) => info.manufacturerType === "IMPORTER",
    check: ({ info }) =>
      present(info.importerName) && present(info.importerAddress) && present(info.importerPin) && info.licenceType === "IMPORT" && present(info.licenceNumber),
    title: "Importer details are incomplete",
    message: "Importers must give their name, Indian address and import licence (Form MD-15) number. Complete them in Step 1.",
    sectionKey: "manufacturer_licence",
    reference: "MDR 2017, Rule 44 [verify]",
  },
  {
    id: "IN-LBL-005",
    severity: "BLOCKING",
    appliesWhen: () => true,
    check: (doc) =>
      (doc.structured.tempMin !== null && doc.structured.tempMax !== null) ||
      containsAny(sectionText(doc, "storage"), PHRASES.roomTemperature),
    title: "Storage temperature is missing",
    message: "Add a storage temperature range (for example 15–30 °C) or a “Store at room temperature” statement in Storage & Handling Conditions.",
    sectionKey: "storage",
    fieldKey: "tempMin",
    reference: REFERENCE_LABELLING,
    passNote: "storage temperature stated",
  },
  {
    id: "IN-LBL-006",
    severity: "BLOCKING",
    appliesWhen: () => true,
    check: (doc) => doc.structured.shelfLifeMonths !== null || containsAny(sectionText(doc, "storage"), PHRASES.noExpiry),
    title: "Shelf life isn't provided",
    message: "Enter the shelf life in months, or write “Not applicable” with a reason in the handling notes if the device doesn't expire.",
    sectionKey: "storage",
    fieldKey: "shelfLifeMonths",
    reference: REFERENCE_LABELLING,
    passNote: "shelf life provided",
  },
  {
    id: "IN-LBL-007",
    severity: "BLOCKING",
    appliesWhen: () => true,
    check: ({ info }) => present(info.customerCarePhone) || present(info.customerCareEmail),
    title: "Customer care contact is missing",
    message: "Add a customer care phone number or email in Step 1 so users know how to reach you.",
    sectionKey: "manufacturer_licence",
    reference: REFERENCE_LABELLING,
    passNote: "customer care present",
  },
];
