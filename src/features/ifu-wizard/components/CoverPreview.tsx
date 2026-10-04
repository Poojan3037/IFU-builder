"use client";

import { motion } from "motion/react";
import { Eye } from "lucide-react";
import { useWatch, type UseFormReturn } from "react-hook-form";

import { formatDate } from "@/lib/dates";

import { LICENCE_TYPE_META } from "../constants";
import type { BasicInfoInput } from "../schema";

interface CoverPreviewProps {
  form: UseFormReturn<BasicInfoInput>;
}

const Placeholder = ({ text }: { text: string }) => <span className="italic text-paper-foreground/35">{text}</span>;

/** Live miniature of the IFU cover that updates as the user types. */
export const CoverPreview = ({ form }: CoverPreviewProps) => {
  const v = useWatch({ control: form.control });
  const licence = v.licenceType ? LICENCE_TYPE_META[v.licenceType] : null;

  return (
    <motion.aside
      aria-label="Live cover preview"
      initial={{ opacity: 0, y: 24, rotate: 1.5 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      className="sticky top-24 space-y-3"
    >
      <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
        <Eye aria-hidden className="size-3.5" /> Live cover preview
      </p>
      <div className="relative aspect-[210/297] overflow-hidden rounded-xl bg-paper p-6 font-serif text-paper-foreground shadow-2xl shadow-primary/10 ring-1 ring-black/5">
        <div aria-hidden className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-primary via-info to-chart-3" />
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between font-sans text-[9px] uppercase tracking-wider text-paper-foreground/50">
            <span className="grid size-6 place-items-center rounded border border-dashed border-paper-foreground/25 text-[7px]">LOGO</span>
            <span>Document {v.version || "v1.0"}</span>
          </div>
          <div className="mt-10 space-y-2">
            <p className="font-sans text-[9px] font-semibold uppercase tracking-[0.2em] text-primary">Instructions for Use</p>
            <h3 className="text-lg font-semibold leading-tight text-balance">{v.deviceName || <Placeholder text="Device name" />}</h3>
            <p className="text-xs text-paper-foreground/70">
              {v.brandName && <>{v.brandName} · </>}
              {v.modelNumber ? <>Model {v.modelNumber}</> : <Placeholder text="Model number" />}
            </p>
          </div>
          <p className="mt-5 line-clamp-4 text-[10px] leading-relaxed text-paper-foreground/70">
            {v.description || <Placeholder text="Your brief description appears here." />}
          </p>
          <div className="mt-auto space-y-1.5 border-t border-paper-foreground/10 pt-3 font-sans text-[9px] leading-snug text-paper-foreground/70">
            <p className="font-semibold text-paper-foreground">{v.manufacturerName || <Placeholder text="Manufacturer" />}</p>
            <p className="line-clamp-2">
              {v.manufacturerAddress}
              {v.manufacturerType === "IMPORTER" ? (v.manufacturerCountry ? `, ${v.manufacturerCountry}` : "") : v.manufacturerState ? `, ${v.manufacturerState} ${v.manufacturerPin ?? ""}` : ""}
            </p>
            {v.manufacturerType === "IMPORTER" && v.importerName && <p>Imported by: {v.importerName}</p>}
            <p className="font-mono">
              {licence?.form}: {v.licenceNumber || <Placeholder text="licence no." />}
            </p>
            <p className="font-mono">Issued {v.issueDate ? formatDate(v.issueDate) : "DD-MM-YYYY"}</p>
          </div>
        </div>
      </div>
    </motion.aside>
  );
};
