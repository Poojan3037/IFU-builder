export interface ExportToggles {
  coverPage: boolean;
  symbolGlossary: boolean;
  watermark: boolean;
}

export interface ExportRecord {
  id: string;
  version: string;
  fileName: string;
  createdAt: string; // ISO
  durationMs: number;
  options: ExportToggles;
}

export type GenerationState =
  | { status: "idle" }
  | { status: "generating"; stepIndex: number; progress: number }
  | { status: "ready"; fileName: string; durationMs: number };

export interface DeviceSymbol {
  id: string;
  label: string;
  /** Short glyph text drawn inside the symbol frame in the mini thumbnail. */
  glyph: string;
}
