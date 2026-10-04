"use client";

import { BookOpen, FileImage, Lock, Stamp } from "lucide-react";
import { Controller, type UseFormReturn } from "react-hook-form";

import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import type { ExportOptionsInput } from "../schema";
import { ensurePdfExtension } from "../utils";
import { OptionSwitch } from "./OptionSwitch";

interface ExportOptionsFormProps {
  form: UseFormReturn<ExportOptionsInput>;
  emailVerified: boolean;
  disabled: boolean;
}

export const ExportOptionsForm = ({ form, emailVerified, disabled }: ExportOptionsFormProps) => {
  const fileNameError = form.formState.errors.fileName;

  return (
    <fieldset disabled={disabled} className="flex flex-col gap-5 disabled:opacity-60">
      <legend className="sr-only">Export options</legend>
      <div className="grid gap-5 sm:grid-cols-[1fr_200px]">
        <Field data-invalid={!!fileNameError}>
          <FieldLabel htmlFor="export-file-name">File name</FieldLabel>
          <Input
            id="export-file-name"
            autoComplete="off"
            maxLength={100}
            aria-invalid={!!fileNameError}
            aria-describedby="export-file-name-help"
            className="font-mono text-[13px]"
            {...form.register("fileName", {
              onBlur: (event) => form.setValue("fileName", ensurePdfExtension(event.target.value), { shouldValidate: true }),
            })}
          />
          {fileNameError ? (
            <FieldError>{fileNameError.message}</FieldError>
          ) : (
            <FieldDescription id="export-file-name-help">.pdf is added automatically. Max 100 characters.</FieldDescription>
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="export-language">Language</FieldLabel>
          <Controller
            control={form.control}
            name="language"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="export-language" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English (default)</SelectItem>
                  <SelectItem value="hi" disabled>
                    Hindi · Coming in Phase 2
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </Field>
      </div>

      <div className="flex flex-col gap-2.5">
        <Controller
          control={form.control}
          name="coverPage"
          render={({ field }) => (
            <OptionSwitch
              id="export-cover"
              title="Include cover page"
              description="Title page with device, manufacturer, licence number, version and date."
              icon={<FileImage className="size-4" />}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          )}
        />
        <Controller
          control={form.control}
          name="symbolGlossary"
          render={({ field }) => (
            <OptionSwitch
              id="export-glossary"
              title="Include symbol glossary"
              description="Explains the IS/ISO 15223-1 symbols used, auto-selected from your device's attributes."
              icon={<BookOpen className="size-4" />}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          )}
        />
        <Controller
          control={form.control}
          name="watermark"
          render={({ field }) => (
            <OptionSwitch
              id="export-watermark"
              title={'Add "DRAFT" watermark'}
              description={
                emailVerified ? (
                  "Useful for internal review copies. Exporting without it marks the document Completed."
                ) : (
                  <span className="inline-flex items-center gap-1 text-warning-soft-foreground">
                    <Lock aria-hidden className="size-3" /> Always on until you verify your email address.
                  </span>
                )
              }
              icon={<Stamp className="size-4" />}
              checked={emailVerified ? field.value : true}
              onCheckedChange={field.onChange}
              disabled={!emailVerified}
            />
          )}
        />
      </div>
    </fieldset>
  );
};
