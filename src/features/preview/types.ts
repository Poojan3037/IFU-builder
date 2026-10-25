import type { SectionKey } from "@/features/ifu-wizard/types";

export type PreviewViewMode = "document" | "print";
export type PreviewMode = "edit" | "view";

export interface PreviewBlock {
  /** Empty on the continuation of a block that was split across pages. */
  label: string;
  /** Sanitised HTML (allow-listed marks only, see `sanitiseRichText`). */
  html: string;
}

export interface PreviewSection {
  number: number;
  key: SectionKey;
  title: string;
  blocks: PreviewBlock[];
  /** True when this fragment continues a section that started on an earlier page. */
  continued?: boolean;
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
