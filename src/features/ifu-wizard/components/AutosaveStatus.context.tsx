"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type AutosaveState = "idle" | "saving" | "saved" | "error";

export interface AutosaveStatus {
  state: AutosaveState;
  /** ISO time of the last successful save, if any. */
  savedAt: string | null;
}

interface AutosaveStatusContextValue {
  status: AutosaveStatus;
  setStatus: (status: AutosaveStatus) => void;
}

const AutosaveStatusContext = createContext<AutosaveStatusContextValue | null>(null);

/** Lets a step's form report save progress to the indicator in the wizard shell. */
export const AutosaveStatusProvider = ({ children }: { children: ReactNode }) => {
  const [status, setStatus] = useState<AutosaveStatus>({ state: "idle", savedAt: null });
  const value = useMemo(() => ({ status, setStatus }), [status]);
  return <AutosaveStatusContext.Provider value={value}>{children}</AutosaveStatusContext.Provider>;
};

export const useAutosaveStatus = () => {
  const context = useContext(AutosaveStatusContext);
  if (!context) throw new Error("useAutosaveStatus must be used inside AutosaveStatusProvider");
  return context;
};
