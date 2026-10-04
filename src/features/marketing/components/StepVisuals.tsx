import { Bold, Check, CheckCircle2, Circle, Italic, Lightbulb, List, Underline } from "lucide-react";

import { CATEGORY_META } from "@/features/ifu-wizard/constants";
import type { DeviceCategory } from "@/features/ifu-wizard/types";
import { cn } from "@/lib/utils";

const Field = ({ label, value, wide = true }: { label: string; value: string; wide?: boolean }) => (
  <div className={cn("space-y-1.5", !wide && "flex-1")}>
    <p className="text-[11px] font-medium text-muted-foreground">{label}</p>
    <div className="rounded-lg border bg-background px-3 py-2 text-xs">{value}</div>
  </div>
);

export const BasicInfoVisual = () => (
  <div className="space-y-3.5">
    <p className="text-sm font-semibold">Tell us about the device</p>
    <Field label="Device name" value="OrthoFix Cortical Bone Screw" />
    <div className="space-y-1.5">
      <p className="text-[11px] font-medium text-muted-foreground">Manufacturer type</p>
      <div className="grid grid-cols-2 gap-1 rounded-lg bg-muted p-1 text-xs font-medium">
        <span className="rounded-md bg-background px-3 py-1.5 text-center shadow-sm">Indian manufacturer</span>
        <span className="px-3 py-1.5 text-center text-muted-foreground">Importer</span>
      </div>
    </div>
    <div className="flex gap-3">
      <Field wide={false} label="Licence type" value="Manufacturing (MD-9)" />
      <Field wide={false} label="Licence number" value="MFG/MD/2025/000418" />
    </div>
  </div>
);

const CATEGORIES: DeviceCategory[] = ["IVD", "IMPLANT", "REUSABLE", "SINGLE_USE", "SAMD", "OTHER"];

export const CategoryVisual = () => (
  <div className="space-y-4">
    <p className="text-sm font-semibold">What kind of device is this?</p>
    <div className="grid grid-cols-3 gap-2">
      {CATEGORIES.map((category) => {
        const meta = CATEGORY_META[category];
        const Icon = meta.icon;
        const selected = category === "IMPLANT";
        return (
          <div
            key={category}
            className={cn(
              "flex flex-col items-center gap-1.5 rounded-xl border p-3 text-center text-[11px] font-medium",
              selected ? "border-primary bg-accent text-accent-foreground ring-2 ring-primary/20" : "bg-background",
            )}
          >
            <Icon className={cn("size-4", selected ? "text-primary" : "text-muted-foreground")} />
            {meta.short}
          </div>
        );
      })}
    </div>
    <div className="flex gap-1 rounded-lg bg-muted p-1 text-xs font-medium">
      {["A", "B", "C", "D"].map((c) => (
        <span key={c} className={cn("flex-1 rounded-md py-1.5 text-center", c === "C" ? "bg-background shadow-sm" : "text-muted-foreground")}>
          Class {c}
        </span>
      ))}
    </div>
    <div className="rounded-xl border border-success/30 bg-success-soft p-3 text-[11px] text-success-soft-foreground">
      <p className="mb-1 font-semibold">Based on your answers, we&apos;ll include:</p>
      <p>+ Sterilisation Information · + Implant Card · + MRI safety warning</p>
    </div>
  </div>
);

const NAV = [
  { label: "Device Description", state: "done" },
  { label: "Intended Use", state: "done" },
  { label: "Warnings & Precautions", state: "current" },
  { label: "Storage & Handling", state: "todo" },
] as const;

export const SectionsVisual = () => (
  <div className="grid grid-cols-[0.9fr_1.4fr] gap-3">
    <ul className="space-y-1">
      {NAV.map((item, index) => (
        <li
          key={item.label}
          className={cn(
            "flex items-center gap-2 rounded-lg px-2 py-1.5 text-[11px]",
            item.state === "current" && "bg-accent font-medium text-accent-foreground",
          )}
        >
          {item.state === "done" ? (
            <CheckCircle2 className="size-3.5 shrink-0 text-success" />
          ) : item.state === "current" ? (
            <span className="grid size-3.5 shrink-0 place-items-center rounded-full bg-primary text-[8px] text-primary-foreground">{index + 1}</span>
          ) : (
            <Circle className="size-3.5 shrink-0 text-muted-foreground" />
          )}
          <span className="truncate">{item.label}</span>
        </li>
      ))}
    </ul>
    <div className="space-y-2.5">
      <div className="flex gap-1 rounded-md border bg-muted/50 p-1 text-muted-foreground">
        {[Bold, Italic, Underline, List].map((Icon, i) => (
          <span key={i} className="grid size-6 place-items-center rounded">
            <Icon className="size-3" />
          </span>
        ))}
      </div>
      <div className="h-20 rounded-lg border bg-background p-2 text-[11px] leading-relaxed">
        For single use only. Do not reuse. Do not use if the package is opened or damaged.
        <span className="ml-0.5 inline-block h-3 w-px animate-pulse bg-foreground align-middle" />
      </div>
      <div className="flex gap-1.5 rounded-lg bg-info-soft p-2 text-[10px] text-info-soft-foreground">
        <Lightbulb className="size-3 shrink-0" /> Sterile devices need a “do not use if damaged” statement.
      </div>
    </div>
  </div>
);

const CHECKS = ["Licence number present", "Sterility statement", "Single-use statement", "Storage conditions"];

export const ReviewVisual = () => (
  <div className="space-y-3">
    <div className="flex items-center gap-2 rounded-xl bg-success-soft p-3 text-success-soft-foreground">
      <CheckCircle2 className="size-5" />
      <div>
        <p className="text-xs font-semibold">All checks passed</p>
        <p className="text-[10px] opacity-80">Ready to preview and export</p>
      </div>
    </div>
    <ul className="space-y-1.5">
      {CHECKS.map((check) => (
        <li key={check} className="flex items-center gap-2 rounded-lg border bg-background px-3 py-2 text-[11px]">
          <Check className="size-3.5 text-success" strokeWidth={3} /> {check}
        </li>
      ))}
    </ul>
    <div className="flex items-center justify-between rounded-lg bg-primary px-3 py-2 text-[11px] font-medium text-primary-foreground">
      <span>OrthoFix_IFU_v1.0.pdf</span>
      <span>Generated in 2.1 s</span>
    </div>
  </div>
);

export const STEP_VISUALS = [BasicInfoVisual, CategoryVisual, SectionsVisual, ReviewVisual] as const;
