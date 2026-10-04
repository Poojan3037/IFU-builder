import { AlertTriangle, CheckCircle2, CircleAlert, FileText, Plus, Search } from "lucide-react";

import { CategoryIcon } from "@/components/shared/CategoryIcon";
import { RiskBadge } from "@/components/shared/RiskBadge";
import { StatusBadge } from "@/components/shared/StatusBadge";
import type { DeviceCategory, DocumentStatus, RiskClass } from "@/features/ifu-wizard/types";

const ROWS: { name: string; model: string; category: DeviceCategory; risk: RiskClass; status: DocumentStatus }[] = [
  { name: "OrthoFix Cortical Bone Screw", model: "OF-CS-35", category: "IMPLANT", risk: "C", status: "DRAFT" },
  { name: "GlucoSure Test Strips", model: "GS-50", category: "IVD", risk: "B", status: "READY" },
  { name: "SafeFlow IV Cannula", model: "SF-20G", category: "SINGLE_USE", risk: "B", status: "COMPLETED" },
  { name: "SteriCut Surgical Scissors", model: "SC-14", category: "REUSABLE", risk: "A", status: "COMPLETED" },
];

const WindowDots = () => (
  <div aria-hidden className="flex gap-1.5">
    <span className="size-2.5 rounded-full bg-danger/60" />
    <span className="size-2.5 rounded-full bg-warning/70" />
    <span className="size-2.5 rounded-full bg-success/60" />
  </div>
);

export const HeroDashboardMock = () => (
  <div className="overflow-hidden rounded-2xl border bg-card text-left shadow-2xl shadow-primary/10">
    <div className="flex items-center justify-between border-b bg-muted/40 px-4 py-2.5">
      <WindowDots />
      <span className="text-[11px] text-muted-foreground">app.smartifu.in/dashboard</span>
      <span className="w-10" />
    </div>
    <div className="space-y-4 p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold">My IFU Documents</p>
          <p className="text-[11px] text-muted-foreground">12 documents · 5 in progress</p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-lg bg-primary px-2.5 py-1.5 text-[11px] font-medium text-primary-foreground">
          <Plus className="size-3" /> Create New IFU
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[
          ["12", "Total"],
          ["5", "In progress"],
          ["7", "Exported"],
        ].map(([value, label]) => (
          <div key={label} className="rounded-xl border bg-background/60 p-2.5">
            <p className="text-lg font-semibold">{value}</p>
            <p className="text-[10px] text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 rounded-lg border bg-background/60 px-2.5 py-1.5 text-[11px] text-muted-foreground">
        <Search className="size-3" /> Search devices…
      </div>
      <ul className="divide-y rounded-xl border">
        {ROWS.map((row) => (
          <li key={row.model} className="flex items-center gap-3 px-3 py-2">
            <CategoryIcon category={row.category} className="size-7 rounded-lg" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium">{row.name}</p>
              <p className="font-mono text-[10px] text-muted-foreground">Model {row.model}</p>
            </div>
            <RiskBadge riskClass={row.risk} className="hidden text-[10px] sm:inline-flex" />
            <StatusBadge status={row.status} className="text-[10px]" />
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export const HeroComplianceMock = () => (
  <div className="glass w-64 rounded-2xl p-4 text-left shadow-2xl shadow-danger/10">
    <p className="text-xs font-semibold">Compliance check</p>
    <p className="mb-3 text-[10px] text-muted-foreground">Class C implant · MDR 2017</p>
    <div className="space-y-2">
      <div className="flex gap-2 rounded-lg bg-danger-soft p-2 text-danger-soft-foreground">
        <CircleAlert className="mt-0.5 size-3.5 shrink-0" />
        <div>
          <p className="text-[11px] font-medium">Residual risks not described</p>
          <p className="text-[10px] opacity-80">Blocking · Warnings &amp; Precautions</p>
        </div>
      </div>
      <div className="flex gap-2 rounded-lg bg-warning-soft p-2 text-warning-soft-foreground">
        <AlertTriangle className="mt-0.5 size-3.5 shrink-0" />
        <div>
          <p className="text-[11px] font-medium">Add MvPI reporting route</p>
          <p className="text-[10px] opacity-80">Advisory · Adverse Event Reporting</p>
        </div>
      </div>
      <div className="flex items-center gap-2 rounded-lg bg-success-soft p-2 text-[11px] font-medium text-success-soft-foreground">
        <CheckCircle2 className="size-3.5" /> 9 sections look good
      </div>
    </div>
  </div>
);

export const HeroPageMock = () => (
  <div className="aspect-[210/297] w-52 rounded-md bg-paper p-4 text-left font-serif text-paper-foreground shadow-2xl ring-1 ring-black/5">
    <div className="mb-3 flex items-center justify-between border-b border-black/10 pb-1.5 font-sans text-[7px] text-black/50">
      <span className="inline-flex items-center gap-1">
        <FileText className="size-2.5" /> Sanjeevani MedTech
      </span>
      <span>v1.0 · 04-10-2026</span>
    </div>
    <p className="text-[11px] font-semibold leading-tight">Instructions for Use</p>
    <p className="mb-2.5 text-[8px] text-black/60">OrthoFix Cortical Bone Screw — Model OF-CS-35</p>
    {["1. Device Description", "2. Intended Use", "3. Indications & Contraindications"].map((heading) => (
      <div key={heading} className="mb-2">
        <p className="mb-1 text-[8px] font-semibold">{heading}</p>
        <div className="space-y-0.5">
          <div className="h-1 w-full rounded bg-black/10" />
          <div className="h-1 w-11/12 rounded bg-black/10" />
          <div className="h-1 w-4/5 rounded bg-black/10" />
        </div>
      </div>
    ))}
    <p className="mt-3 text-center font-sans text-[7px] text-black/40">Page 1 of 3</p>
  </div>
);
