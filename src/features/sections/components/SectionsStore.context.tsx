"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

import type { SectionKey } from "@/features/ifu-wizard/types";

import { MOCK_SECTION_CONTENT, MOCK_STRUCTURED } from "../mock-data";
import type { StructuredValues } from "../schema";

type FieldMap = Partial<Record<SectionKey, Record<string, string>>>;
type CompleteMap = Partial<Record<SectionKey, boolean>>;

interface SectionsStore {
  fields: FieldMap;
  complete: CompleteMap;
  structured: StructuredValues;
  setField: (section: SectionKey, field: string, value: string) => void;
  setComplete: (section: SectionKey, value: boolean) => void;
  setStructured: (patch: Partial<StructuredValues>) => void;
}

const SectionsStoreContext = createContext<SectionsStore | null>(null);

const initialFields = (): FieldMap =>
  Object.fromEntries(Object.entries(MOCK_SECTION_CONTENT).map(([key, value]) => [key, { ...value.fields }]));

const initialComplete = (): CompleteMap => ({
  ...Object.fromEntries(Object.entries(MOCK_SECTION_CONTENT).map(([key, value]) => [key, value.isComplete])),
  // Auto-generated from Step 1, so it is complete as soon as Step 1 is valid.
  manufacturer_licence: true,
});

const initialStructured: StructuredValues = {
  tempMin: null,
  tempMax: null,
  humidity: null,
  lightSensitive: MOCK_STRUCTURED.storage.lightSensitive,
  sterilisationMethod: MOCK_STRUCTURED.sterilisationMethod,
  shelfLifeMonths: null,
};

interface SectionsStoreProviderProps {
  children: ReactNode;
}

/** Client-only mock store so edits survive navigation between sections in the static build. */
export const SectionsStoreProvider = ({ children }: SectionsStoreProviderProps) => {
  const [fields, setFields] = useState<FieldMap>(initialFields);
  const [complete, setCompleteMap] = useState<CompleteMap>(initialComplete);
  const [structured, setStructuredState] = useState<StructuredValues>(initialStructured);

  const value: SectionsStore = {
    fields,
    complete,
    structured,
    setField: (section, field, next) =>
      setFields((prev) => ({ ...prev, [section]: { ...prev[section], [field]: next } })),
    setComplete: (section, next) => setCompleteMap((prev) => ({ ...prev, [section]: next })),
    setStructured: (patch) => setStructuredState((prev) => ({ ...prev, ...patch })),
  };

  return <SectionsStoreContext.Provider value={value}>{children}</SectionsStoreContext.Provider>;
};

export const useSectionsStore = (): SectionsStore => {
  const store = useContext(SectionsStoreContext);
  if (!store) throw new Error("useSectionsStore must be used inside SectionsStoreProvider");
  return store;
};
