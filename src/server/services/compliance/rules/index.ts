import type { ComplianceRule } from "../types";
import { clinicalRules } from "./clinical";
import { generalRules } from "./general";
import { labellingRules } from "./labelling";
import { postMarketRules } from "./postMarket";
import { sterileUseRules } from "./sterile";

/** New rules are added here as data; the engine does not change (REQUIREMENTS §8.1). */
export const COMPLIANCE_RULES: ComplianceRule[] = [
  ...generalRules,
  ...labellingRules,
  ...sterileUseRules,
  ...clinicalRules,
  ...postMarketRules,
];

export const getRuleReference = (ruleId: string): string | undefined =>
  COMPLIANCE_RULES.find((rule) => rule.id === ruleId && rule.reference)?.reference;
