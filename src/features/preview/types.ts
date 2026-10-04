import type { SectionKey } from "@/features/ifu-wizard/types";

export type PreviewViewMode = "document" | "print";
export type PreviewMode = "edit" | "view";

export interface PreviewBlock {
  label: string;
  text: string;
}

export interface PreviewSection {
  number: number;
  key: SectionKey;
  title: string;
  blocks: PreviewBlock[];
}

export interface PreviewPage {
  index: number;
  /** Page 1 carries the title block. */
  hasTitle: boolean;
  sections: PreviewSection[];
}

export interface PreviewMeta {
  deviceName: string;
  modelNumber: string;
  manufacturerName: string;
  version: string;
  issueDate: string; // DD-MM-YYYY
}
