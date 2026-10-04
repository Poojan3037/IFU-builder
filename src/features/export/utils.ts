const MAX_FILE_NAME = 100;

/** `<Device_Name>_IFU_v<version>.pdf` — spaces become `_`, unsafe characters removed (FR-EXP-01). */
export const buildExportFileName = (deviceName: string, version: string): string => {
  const safe = (value: string) =>
    value
      .trim()
      .replace(/\s+/g, "_")
      .replace(/[^A-Za-z0-9._-]/g, "")
      .replace(/_+/g, "_");
  const base = `${safe(deviceName)}_IFU_${safe(version)}`.slice(0, MAX_FILE_NAME - 4);
  return `${base}.pdf`;
};

/** Appends `.pdf` when missing, so the extension is always enforced. */
export const ensurePdfExtension = (fileName: string): string => {
  const trimmed = fileName.trim();
  if (!trimmed || trimmed.toLowerCase().endsWith(".pdf")) return trimmed;
  return `${trimmed.replace(/\.+$/, "")}.pdf`;
};
