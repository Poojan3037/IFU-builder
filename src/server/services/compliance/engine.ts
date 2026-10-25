import { SECTION_ORDER } from "@/features/sections/catalogue";
import type { SectionKey } from "@/features/ifu-wizard/types";

import { COMPLIANCE_RULES } from "./rules";
import type { ComplianceFinding, ComplianceResult, ComplianceRule, IfuDocumentSnapshot, LooksGoodEntry } from "./types";

const sectionRank = (key: SectionKey) => SECTION_ORDER.indexOf(key);

/**
 * The rule engine: pure and synchronous, no I/O (REQUIREMENTS §8.1).
 * Blocking issues come first, then advisories, each in canonical section order.
 */
export const runCompliance = (snapshot: IfuDocumentSnapshot, rules: ComplianceRule[] = COMPLIANCE_RULES): ComplianceResult => {
  const findings: ComplianceFinding[] = [];
  const passNotes = new Map<SectionKey, Set<string>>();

  for (const rule of rules) {
    if (!rule.appliesWhen(snapshot)) continue;
    if (rule.check(snapshot)) {
      if (rule.passNote) passNotes.set(rule.sectionKey, (passNotes.get(rule.sectionKey) ?? new Set()).add(rule.passNote));
      continue;
    }
    findings.push({
      ruleId: rule.id,
      severity: rule.severity,
      sectionKey: rule.sectionKey,
      fieldKey: rule.fieldKey,
      title: rule.title,
      message: rule.message,
      reference: rule.reference,
    });
  }

  findings.sort(
    (a, b) =>
      Number(b.severity === "BLOCKING") - Number(a.severity === "BLOCKING") || sectionRank(a.sectionKey) - sectionRank(b.sectionKey),
  );

  const flagged = new Set(findings.map((finding) => finding.sectionKey));
  const looksGood: LooksGoodEntry[] = snapshot.applicable
    .filter((key) => !flagged.has(key))
    .map((key) => {
      const notes = passNotes.get(key);
      return { sectionKey: key, note: notes && notes.size > 0 ? [...notes].join(", ") : undefined };
    });

  return { findings, looksGood };
};
