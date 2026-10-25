/**
 * Keyword lists behind the "statement present" checks (REQUIREMENTS §8.2). Deliberately simple and explainable:
 * a rule passes when the section text contains any of its phrases (case-insensitive).
 * Wording is a product assumption and needs regulatory review. [verify]
 */
export const PHRASES = {
  packageDamaged: [
    "package is damaged",
    "package is opened",
    "package damaged",
    "packaging is damaged",
    "packaging is open",
    "damaged package",
    "damaged or opened",
    "opened or damaged",
    "pouch is damaged",
    "pack is damaged",
    "sterile barrier is compromised",
    "sterile barrier is damaged",
    "sterile barrier is breached",
  ],
  singleUse: ["single use", "single-use", "do not reuse", "not be reused", "one time use", "one-time use", "disposable"],
  roomTemperature: ["room temperature", "ambient temperature"],
  noExpiry: ["not applicable", "does not expire", "no expiry", "non-expiring", "no expiration"],
  mriSafety: ["mr safe", "mr conditional", "mr unsafe", "mri", "magnetic resonance"],
  mvpi: ["mvpi", "materiovigilance"],
  companyContact: ["manufacturer", "company", "importer", "@", "contact"],
  wasteRules: ["bio-medical waste", "biomedical waste", "bio medical waste", "e-waste", "waste management rules", "waste rules"],
  reprocessCycles: ["cycle", "reuse", "reprocess", "times", "uses"],
  noneKnown: ["none known", "none"],
} as const;

const normalise = (text: string) => text.toLowerCase().replace(/[’‘]/g, "'").replace(/\s+/g, " ");

export const containsAny = (text: string, phrases: readonly string[]): boolean => {
  const haystack = normalise(text);
  return phrases.some((phrase) => haystack.includes(phrase));
};
