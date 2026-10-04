import type { RiskClass } from "../types";

export type HelperTrack = "NON_IVD" | "IVD";

export interface HelperQuestion {
  id: string;
  question: string;
  help?: string;
  yes: string;
  no: string;
}

export interface HelperResult {
  id: string;
  riskClass: RiskClass;
  rule: string;
  summary: string;
}

/**
 * Simplified decision trees based on the CDSCO First Schedule (MDR 2017).
 * Product assumption — every outcome is tagged [verify] until signed off by RA (REQUIREMENTS FR-S2-05).
 */
export const HELPER_QUESTIONS: Record<string, HelperQuestion> = {
  n1: { id: "n1", question: "Is the device implanted, or does it stay in the body for more than 30 days?", yes: "n2", no: "n3" },
  n2: {
    id: "n2",
    question: "Is it in direct contact with the heart, central circulatory system or central nervous system?",
    help: "e.g. heart valves, coronary stents, neurostimulator leads.",
    yes: "r-n-d",
    no: "r-n-c",
  },
  n3: { id: "n3", question: "Is it an active device that supplies energy or administers medicines?", help: "Powered by electricity or another energy source.", yes: "n4", no: "n5" },
  n4: { id: "n4", question: "Could it deliver that energy or substance in a potentially hazardous way?", help: "e.g. infusion pumps, surgical lasers, ventilators.", yes: "r-n-c2", no: "r-n-b" },
  n5: { id: "n5", question: "Is it invasive — does it enter the body through an orifice or through the skin?", yes: "n6", no: "r-n-a" },
  n6: { id: "n6", question: "Is it surgically invasive or used continuously for up to 30 days?", help: "e.g. sutures, cannulas, surgical gloves.", yes: "r-n-b2", no: "r-n-a2" },
  i1: {
    id: "i1",
    question: "Does it screen blood, blood components, cells or organs for transmissible agents before transfusion or transplant?",
    help: "e.g. HIV, HBV, HCV, HTLV screening assays.",
    yes: "r-i-d",
    no: "i2",
  },
  i2: {
    id: "i2",
    question: "Could an incorrect result put the patient's life at risk — e.g. high-risk infections, blood grouping, cancer or genetic markers?",
    yes: "r-i-c",
    no: "i3",
  },
  i3: { id: "i3", question: "Is it intended for self-testing or near-patient testing?", yes: "r-i-b", no: "i4" },
  i4: { id: "i4", question: "Is it a general laboratory reagent, instrument or specimen container with no critical characteristic?", yes: "r-i-a", no: "r-i-b2" },
};

export const HELPER_RESULTS: Record<string, HelperResult> = {
  "r-n-d": { id: "r-n-d", riskClass: "D", rule: "First Schedule, Part I — Rule 8 (implantable, central circulation/CNS)", summary: "Long-term implant in contact with the heart, central circulation or CNS." },
  "r-n-c": { id: "r-n-c", riskClass: "C", rule: "First Schedule, Part I — Rule 8 (implantable / long-term surgically invasive)", summary: "Implantable or long-term surgically invasive device." },
  "r-n-c2": { id: "r-n-c2", riskClass: "C", rule: "First Schedule, Part I — Rules 9 & 11 (active therapeutic / administering)", summary: "Active device that may deliver energy or substances hazardously." },
  "r-n-b": { id: "r-n-b", riskClass: "B", rule: "First Schedule, Part I — Rules 9 & 11 (active, non-hazardous)", summary: "Active device delivering energy or substances in a non-hazardous way." },
  "r-n-b2": { id: "r-n-b2", riskClass: "B", rule: "First Schedule, Part I — Rules 6 & 7 (surgically invasive, transient/short-term)", summary: "Surgically invasive device for transient or short-term use." },
  "r-n-a": { id: "r-n-a", riskClass: "A", rule: "First Schedule, Part I — Rule 1 (non-invasive)", summary: "Non-invasive device with no special characteristics." },
  "r-n-a2": { id: "r-n-a2", riskClass: "A", rule: "First Schedule, Part I — Rule 5 (invasive via body orifice, transient)", summary: "Invasive through a body orifice for transient use." },
  "r-i-d": { id: "r-i-d", riskClass: "D", rule: "First Schedule, Part II — Rule 1 (transmissible agents in blood/transplant)", summary: "Screening for transmissible agents in blood or tissue for transfusion or transplant." },
  "r-i-c": { id: "r-i-c", riskClass: "C", rule: "First Schedule, Part II — Rule 3 (high individual risk)", summary: "An incorrect result could be life-threatening for the patient." },
  "r-i-b": { id: "r-i-b", riskClass: "B", rule: "First Schedule, Part II — Rule 4 (self-testing / near-patient)", summary: "Self-testing or near-patient IVD without critical characteristics." },
  "r-i-b2": { id: "r-i-b2", riskClass: "B", rule: "First Schedule, Part II — Rule 6 (other IVDs)", summary: "IVD not covered by a higher-risk rule." },
  "r-i-a": { id: "r-i-a", riskClass: "A", rule: "First Schedule, Part II — Rule 5 (general laboratory products)", summary: "General laboratory reagent, instrument or specimen container." },
};

export const TRACK_START: Record<HelperTrack, string> = { NON_IVD: "n1", IVD: "i1" };
