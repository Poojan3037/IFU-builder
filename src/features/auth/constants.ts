import { FileCheck2, ScanSearch, ShieldCheck, type LucideIcon } from "lucide-react";

export const AUTH_FEATURES: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: "Built-in regulatory guidance",
    description: "Inline tips mapped to MDR 2017 labelling rules, section by section.",
    icon: ShieldCheck,
  },
  {
    title: "Auto-checks for missing sections",
    description: "A rule-based check flags missing licence details, warnings and more.",
    icon: ScanSearch,
  },
  {
    title: "One-click PDF export",
    description: "A paginated A4 IFU with cover page and symbol glossary.",
    icon: FileCheck2,
  },
];

/** Static build only: simulated network latency for form submits. */
export const FAKE_LATENCY_MS = 1200;

export const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));
