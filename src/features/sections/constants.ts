export const MAX_FIELD_CHARS = 10_000;

export const STERILISATION_METHODS = [
  { value: "EO", label: "Ethylene oxide (EO)" },
  { value: "GAMMA", label: "Gamma irradiation" },
  { value: "STEAM", label: "Steam (moist heat)" },
  { value: "E_BEAM", label: "Electron beam (E-beam)" },
  { value: "OTHER", label: "Other" },
] as const;

export type SterilisationMethod = (typeof STERILISATION_METHODS)[number]["value"];
