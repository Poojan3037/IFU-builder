import type { RiskFilter, StatusFilter } from "./types";

export const PAGE_SIZE = 20;
export const SEARCH_DEBOUNCE_MS = 300;

export const STATUS_FILTER_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: "ALL", label: "All statuses" },
  { value: "DRAFT", label: "Draft" },
  { value: "READY", label: "Ready" },
  { value: "COMPLETED", label: "Completed" },
];

export const RISK_FILTER_OPTIONS: { value: RiskFilter; label: string }[] = [
  { value: "ALL", label: "All classes" },
  { value: "A", label: "Class A" },
  { value: "B", label: "Class B" },
  { value: "C", label: "Class C" },
  { value: "D", label: "Class D" },
];

export const EMPTY_STATE_STEPS = [
  { title: "Describe your device", description: "Name, manufacturer and licence details." },
  { title: "Classify it", description: "Category and risk class decide which sections apply." },
  { title: "Write, check, export", description: "Guided sections, automatic checks, A4 PDF." },
] as const;
