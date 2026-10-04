import {
  BookOpenCheck,
  Building2,
  FileDown,
  FileSearch,
  History,
  ListChecks,
  Ship,
  Sparkles,
  UserRoundCheck,
  type LucideIcon,
} from "lucide-react";

export const NAV_LINKS = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#features", label: "Features" },
  { href: "#compliance", label: "Compliance" },
  { href: "#faq", label: "FAQ" },
] as const;

export const TRUST_CHIPS = [
  "Aligned with MDR 2017",
  "CDSCO classes A–D",
  "IS/ISO 15223-1 symbols",
  "DPDP-ready · India-hosted",
  "A4 PDF export",
] as const;

export interface HowItWorksStep {
  id: string;
  step: string;
  title: string;
  description: string;
  points: string[];
}

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    id: "basic-info",
    step: "01",
    title: "Tell us about the device",
    description: "Device name, manufacturer or importer, and your CDSCO licence details. They go straight onto the cover of your IFU.",
    points: ["Indian manufacturer or importer", "MD-5 / MD-9 / MD-15 licence types", "Autosaves as you type"],
  },
  {
    id: "category-risk",
    step: "02",
    title: "Classify it in a few taps",
    description: "Pick a category, answer quick yes/no questions and choose Class A–D. We work out which sections and warnings apply.",
    points: ["IVD, implant, reusable, single-use, SaMD", "Risk Class Helper for the CDSCO rules", "Live list of included sections"],
  },
  {
    id: "sections",
    step: "03",
    title: "Write each section with guidance",
    description: "Only the sections that apply to your device, each with plain-language prompts and an inline compliance tip.",
    points: ["Structured storage & sterilisation fields", "Required sections clearly flagged", "Progress at a glance"],
  },
  {
    id: "review",
    step: "04",
    title: "Check, preview, export",
    description: "Automatic checks catch missing statements before you export. Preview A4 pages, then download a finished PDF.",
    points: ["Blocking vs advisory issues", "Print-faithful A4 preview", "Cover page, symbol glossary, watermark"],
  },
];

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
}

export const FEATURES: Feature[] = [
  {
    title: "Built-in regulatory guidance",
    description: "Every section comes with plain-language prompts and tips that reference MDR 2017, so you always know what to write.",
    icon: BookOpenCheck,
    className: "md:col-span-2",
  },
  {
    title: "Live applicability",
    description: "Answer a few questions and see exactly which sections and warnings your device needs.",
    icon: Sparkles,
  },
  {
    title: "Automatic compliance checks",
    description: "A deterministic rule engine flags missing licence numbers, sterility statements and more, each linked to the fix.",
    icon: ListChecks,
  },
  {
    title: "Print-faithful A4 preview",
    description: "Scroll through your paginated document, with headers, footers and page numbers, before you download.",
    icon: FileSearch,
    className: "md:col-span-2",
  },
  {
    title: "One-click PDF",
    description: "Embedded fonts, selectable text and version on every page. Generated in seconds.",
    icon: FileDown,
  },
  {
    title: "Versioning & audit trail",
    description: "Editing a completed IFU creates a new version. Every check and export is recorded.",
    icon: History,
    className: "md:col-span-2",
  },
];

export interface ShowcaseIssue {
  id: string;
  severity: "BLOCKING" | "ADVISORY";
  title: string;
  fix: string;
  rule: string;
}

export const SHOWCASE_ISSUES: ShowcaseIssue[] = [
  { id: "lic", severity: "BLOCKING", rule: "IN-LBL-002", title: "Licence number is missing", fix: "Licence number added: MFG/MD/2025/000418" },
  { id: "str", severity: "BLOCKING", rule: "IN-STR-002", title: "No 'do not use if package damaged' warning", fix: "Sterile-device warning included" },
  { id: "su", severity: "BLOCKING", rule: "IN-SU-001", title: "Single-use statement not found", fix: "'For single use only. Do not reuse.' present" },
  { id: "vig", severity: "ADVISORY", rule: "IN-VIG-001", title: "No MvPI adverse-event reporting route", fix: "Company contact and MvPI route added" },
];

export const STATS = [
  { value: 30, prefix: "< ", suffix: " min", label: "From sign-up to your first IFU PDF" },
  { value: 16, prefix: "", suffix: "", label: "Section types, shown only when they apply" },
  { value: 20, prefix: "", suffix: "", label: "Compliance rules checked automatically" },
  { value: 3, prefix: "< ", suffix: " s", label: "To generate a finished A4 PDF" },
] as const;

export interface Persona {
  title: string;
  description: string;
  icon: LucideIcon;
  quote: string;
}

export const PERSONAS: Persona[] = [
  {
    title: "Regulatory Affairs executives",
    description: "Own IFUs and labelling at a MedTech start-up or MSME.",
    icon: UserRoundCheck,
    quote: "I stopped copying sections between Word files. The checks catch what I'd have missed at 11 pm.",
  },
  {
    title: "Founders & QA managers",
    description: "No dedicated RA team, and need hand-holding through the rules.",
    icon: Building2,
    quote: "It tells me which sections my device needs and why. That alone saved us days.",
  },
  {
    title: "Importers & distributors",
    description: "Add Indian importer and MD-15 licence details to a foreign IFU.",
    icon: Ship,
    quote: "Importer details and licence numbers are never forgotten now. Export is blocked until they're there.",
  },
];

export const FAQS = [
  {
    q: "Does Smart IFU Builder certify my IFU as compliant?",
    a: "No. It helps you draft IFUs aligned with the Medical Devices Rules, 2017, and checks for missing or weak content. A qualified regulatory professional should still review your document.",
  },
  {
    q: "Which devices and risk classes are supported?",
    a: "IVDs, implants, reusable instruments, single-use devices, software (SaMD) and others, across CDSCO risk classes A, B, C and D.",
  },
  {
    q: "I'm an importer. Can I use it?",
    a: "Yes. Choose 'Importer' in Step 1 and we'll ask for your Indian importer details and MD-15 import licence, then check the document against them.",
  },
  {
    q: "What's the difference between blocking and advisory issues?",
    a: "Blocking issues (red), such as a missing licence number, stop export until fixed. Advisory issues (amber) are suggestions you can dismiss with a reason.",
  },
  {
    q: "Where is my data stored?",
    a: "In an India region, in line with the Digital Personal Data Protection Act, 2023. You can delete your account and data at any time.",
  },
  {
    q: "Can I write my IFU in Hindi?",
    a: "English is supported today. Hindi and selected regional languages are planned for a later release.",
  },
] as const;
