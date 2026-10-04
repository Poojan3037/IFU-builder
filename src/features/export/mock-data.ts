import type { DeviceSymbol, ExportRecord } from "./types";

export const EXPORT_HISTORY: ExportRecord[] = [
  {
    id: "exp-03",
    version: "v1.0",
    fileName: "OrthoFix_Cortical_Bone_Screw_IFU_v1.0.pdf",
    createdAt: "2026-10-03T17:20:00+05:30",
    durationMs: 1900,
    options: { coverPage: true, symbolGlossary: true, watermark: true },
  },
  {
    id: "exp-02",
    version: "v1.0",
    fileName: "OrthoFix_Cortical_Bone_Screw_IFU_v1.0_review.pdf",
    createdAt: "2026-10-02T11:45:00+05:30",
    durationMs: 2300,
    options: { coverPage: false, symbolGlossary: true, watermark: true },
  },
  {
    id: "exp-01",
    version: "v1.0",
    fileName: "OrthoFix_IFU_first_draft.pdf",
    createdAt: "2026-09-29T15:05:00+05:30",
    durationMs: 2600,
    options: { coverPage: false, symbolGlossary: false, watermark: true },
  },
];

/** IS/ISO 15223-1 symbols auto-selected from the demo device's attributes (sterile, single-use, implant). */
export const DEVICE_SYMBOLS: DeviceSymbol[] = [
  { id: "sterile-r", label: "Sterilised using irradiation", glyph: "STERILE R" },
  { id: "no-reuse", label: "Do not reuse", glyph: "②" },
  { id: "no-resterilise", label: "Do not resterilise", glyph: "⊘" },
  { id: "use-by", label: "Use-by date", glyph: "⌛" },
  { id: "lot", label: "Batch code", glyph: "LOT" },
  { id: "manufacturer", label: "Manufacturer", glyph: "▲" },
  { id: "temperature", label: "Temperature limit", glyph: "°C" },
  { id: "consult-ifu", label: "Consult instructions for use", glyph: "i" },
];

export const GENERATION_STEPS = ["Rendering pages…", "Embedding fonts…", "Finalising…"] as const;
