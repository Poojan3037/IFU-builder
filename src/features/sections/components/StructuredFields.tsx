"use client";

import { CalendarClock, Droplets, Sun, Thermometer, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

import { STERILISATION_METHODS } from "../constants";
import type { StructuredValues } from "../schema";
import type { SectionStructuredKind } from "../types";

export type StructuredErrors = Partial<Record<keyof StructuredValues, string>>;

interface StructuredFieldsProps {
  kinds: SectionStructuredKind[];
  values: StructuredValues;
  errors: StructuredErrors;
  onChange: (patch: Partial<StructuredValues>) => void;
}

const toNumber = (raw: string): number | null => (raw.trim() === "" ? null : Number(raw));

interface NumberFieldProps {
  id: keyof StructuredValues;
  label: string;
  unit: string;
  value: number | null;
  error?: string;
  icon: LucideIcon;
  onChange: (value: number | null) => void;
}

const NumberField = ({ id, label, unit, value, error, icon: Icon, onChange }: NumberFieldProps) => (
  <div className="flex flex-col gap-1.5">
    <Label htmlFor={`structured-${id}`}>{label}</Label>
    <div className="relative">
      <Icon aria-hidden className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        id={`structured-${id}`}
        type="number"
        inputMode="decimal"
        value={value ?? ""}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `structured-${id}-error` : undefined}
        onChange={(event) => onChange(toNumber(event.target.value))}
        className="h-10 pl-9 pr-14"
      />
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">{unit}</span>
    </div>
    {error && (
      <p id={`structured-${id}-error`} className="text-xs font-medium text-destructive">
        {error}
      </p>
    )}
  </div>
);

const Group = ({ title, children, className }: { title: string; children: ReactNode; className?: string }) => (
  <fieldset className={cn("rounded-xl border bg-muted/20 p-4", className)}>
    <legend className="px-1.5 text-sm font-medium">{title}</legend>
    {children}
  </fieldset>
);

/** Structured values that render into IFU text and feed compliance rules (FR-S3-05). */
export const StructuredFields = ({ kinds, values, errors, onChange }: StructuredFieldsProps) => (
  <div className="flex flex-col gap-4">
    {kinds.includes("storage") && (
      <Group title="Storage conditions">
        <div className="grid gap-4 sm:grid-cols-3">
          <NumberField id="tempMin" label="Min temperature" unit="°C" icon={Thermometer} value={values.tempMin} error={errors.tempMin} onChange={(v) => onChange({ tempMin: v })} />
          <NumberField id="tempMax" label="Max temperature" unit="°C" icon={Thermometer} value={values.tempMax} error={errors.tempMax} onChange={(v) => onChange({ tempMax: v })} />
          <NumberField id="humidity" label="Max humidity" unit="% RH" icon={Droplets} value={values.humidity} error={errors.humidity} onChange={(v) => onChange({ humidity: v })} />
        </div>
        <div className="mt-4 flex items-center justify-between gap-4 rounded-lg border bg-background px-3.5 py-3">
          <Label htmlFor="structured-light" className="flex items-center gap-2 font-normal">
            <Sun aria-hidden className="size-4 text-warning" /> Light-sensitive — keep away from sunlight
          </Label>
          <Switch id="structured-light" checked={values.lightSensitive} onCheckedChange={(checked) => onChange({ lightSensitive: checked })} />
        </div>
      </Group>
    )}
    {kinds.includes("shelfLife") && (
      <Group title="Shelf life">
        <div className="max-w-xs">
          <NumberField id="shelfLifeMonths" label="Shelf life" unit="months" icon={CalendarClock} value={values.shelfLifeMonths} error={errors.shelfLifeMonths} onChange={(v) => onChange({ shelfLifeMonths: v })} />
        </div>
      </Group>
    )}
    {kinds.includes("sterilisation") && (
      <Group title="Sterilisation method">
        <div className="flex max-w-sm flex-col gap-1.5">
          <Label htmlFor="structured-method">Method</Label>
          <Select value={values.sterilisationMethod ?? undefined} onValueChange={(value) => onChange({ sterilisationMethod: value })}>
            <SelectTrigger id="structured-method" aria-invalid={Boolean(errors.sterilisationMethod)} className="h-10 w-full">
              <SelectValue placeholder="Select a method" />
            </SelectTrigger>
            <SelectContent>
              {STERILISATION_METHODS.map((method) => (
                <SelectItem key={method.value} value={method.value}>
                  {method.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.sterilisationMethod && <p className="text-xs font-medium text-destructive">{errors.sterilisationMethod}</p>}
        </div>
      </Group>
    )}
  </div>
);
