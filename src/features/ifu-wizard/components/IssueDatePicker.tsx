"use client";

import { CalendarDays } from "lucide-react";
import { useState } from "react";
import { Controller, type UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { formatDate } from "@/lib/dates";
import { cn } from "@/lib/utils";

import type { BasicInfoInput } from "../schema";
import { RequiredMark } from "./FormTextField";

interface IssueDatePickerProps {
  form: UseFormReturn<BasicInfoInput>;
}

export const IssueDatePicker = ({ form }: IssueDatePickerProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Controller
      control={form.control}
      name="issueDate"
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="field-issueDate">
            Date of issue <RequiredMark />
          </FieldLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                id="field-issueDate"
                ref={field.ref}
                type="button"
                variant="outline"
                aria-invalid={fieldState.invalid || undefined}
                className={cn("h-10 w-full justify-between bg-background/60 font-normal", !field.value && "text-muted-foreground")}
              >
                <span className="font-mono tabular-nums">{field.value ? formatDate(field.value) : "DD-MM-YYYY"}</span>
                <CalendarDays className="text-muted-foreground" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-auto p-0">
              <Calendar
                mode="single"
                selected={field.value}
                defaultMonth={field.value}
                onSelect={(date) => {
                  if (date) field.onChange(date);
                  setOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
          {!fieldState.error && <FieldDescription>Shown on every page of the IFU (IST).</FieldDescription>}
          <FieldError errors={[fieldState.error]} />
        </Field>
      )}
    />
  );
};
