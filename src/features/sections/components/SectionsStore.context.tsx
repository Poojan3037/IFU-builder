"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

import type { SectionKey } from "@/features/ifu-wizard/types";

import type { StructuredValues } from "../schema";

type FieldMap = Partial<Record<SectionKey, Record<string, string>>>;
type CompleteMap = Partial<Record<SectionKey, boolean>>;

export interface SectionsStoreInitial {
  fields: FieldMap;
  completeKeys: SectionKey[];
  structured: StructuredValues;
}

interface SectionsStore {
  fields: FieldMap;
  complete: CompleteMap;
  structured: StructuredValues;
  setField: (section: SectionKey, field: string, value: string) => void;
  setComplete: (section: SectionKey, value: boolean) => void;
  setStructured: (patch: Partial<StructuredValues>) => void;
}

const SectionsStoreContext = createContext<SectionsStore | null>(null);

interface SectionsStoreProviderProps {
  initial: SectionsStoreInitial;
  children: ReactNode;
}

/**
 * Client copy of the document's section content, seeded from the server. It keeps edits alive while
 * moving between sections (the layout persists); autosave and Mark Complete write them back to the database.
 */
export const SectionsStoreProvider = ({ initial, children }: SectionsStoreProviderProps) => {
  const [fields, setFields] = useState<FieldMap>(initial.fields);
  const [complete, setCompleteMap] = useState<CompleteMap>(() =>
    Object.fromEntries(initial.completeKeys.map((key) => [key, true])),
  );
  const [structured, setStructuredState] = useState<StructuredValues>(initial.structured);

  const value: SectionsStore = {
    fields,
    complete,
    structured,
    setField: (section, field, next) => setFields((prev) => ({ ...prev, [section]: { ...prev[section], [field]: next } })),
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
