import { z } from "zod";

const PIN_REGEX = /^[1-9][0-9]{5}$/;
const VERSION_REGEX = /^v\d+\.\d+$/;
/** Indian mobile or landline (STD code + number), 10 digits without the +91 / leading 0. */
const PHONE_DIGITS_REGEX = /^[1-9]\d{9}$/;

export const normalisePhone = (value: string) => value.replace(/[\s-]/g, "").replace(/^(\+?91)/, "").replace(/^0/, "");

const MANUFACTURER_TYPES = ["INDIAN_MANUFACTURER", "IMPORTER"] as const;
const LICENCE_TYPES = ["MANUFACTURING", "LOAN", "IMPORT", "REGISTRATION"] as const;
const DEVICE_CATEGORIES = ["IVD", "IMPLANT", "REUSABLE", "SINGLE_USE", "SAMD", "OTHER"] as const;
const RISK_CLASSES = ["A", "B", "C", "D"] as const;

/** Shape shared by the full and draft schemas (format rules only). */
const basicInfoShape = {
  deviceName: z.string().trim().max(120, "Keep the device name under 120 characters"),
  brandName: z.string().trim().max(120, "Keep the brand name under 120 characters"),
  modelNumber: z.string().trim().max(60, "Keep the model number under 60 characters"),
  manufacturerType: z.enum(MANUFACTURER_TYPES),
  manufacturerName: z.string().trim().max(160),
  manufacturerAddress: z.string().trim().max(400),
  manufacturerState: z.string(),
  manufacturerPin: z.string().trim(),
  manufacturerCountry: z.string().trim().max(80),
  licenceType: z.enum(LICENCE_TYPES),
  licenceNumber: z.string().trim().max(60, "Keep the licence number under 60 characters"),
  importerName: z.string().trim().max(160),
  importerAddress: z.string().trim().max(400),
  importerState: z.string(),
  importerPin: z.string().trim(),
  customerCarePhone: z.string().trim(),
  customerCareEmail: z.string().trim(),
  version: z.string().trim(),
  issueDate: z.date({ error: "Pick the date of issue" }),
  description: z.string().trim().max(500, "Keep the description under 500 characters"),
};

type Ctx = z.RefinementCtx;
type BasicInfoValues = z.infer<z.ZodObject<typeof basicInfoShape>>;

const issue = (ctx: Ctx, path: keyof BasicInfoValues, message: string) => ctx.addIssue({ code: "custom", path: [path], message });

/** Format checks that apply even to drafts (FR-S1-02). */
const checkFormats = (v: BasicInfoValues, ctx: Ctx) => {
  if (v.manufacturerPin && v.manufacturerType === "INDIAN_MANUFACTURER" && !PIN_REGEX.test(v.manufacturerPin))
    issue(ctx, "manufacturerPin", "PIN code must be 6 digits and can't start with 0");
  if (v.importerPin && !PIN_REGEX.test(v.importerPin)) issue(ctx, "importerPin", "PIN code must be 6 digits and can't start with 0");
  if (v.customerCarePhone && !PHONE_DIGITS_REGEX.test(normalisePhone(v.customerCarePhone)))
    issue(ctx, "customerCarePhone", "Enter a 10-digit Indian mobile or landline number");
  if (v.customerCareEmail && !z.email().safeParse(v.customerCareEmail).success)
    issue(ctx, "customerCareEmail", "Enter a valid email address");
  if (v.version && !VERSION_REGEX.test(v.version)) issue(ctx, "version", "Use the format v1.0");
};

/** Full validation used by Continue (FR-S1-03). */
export const basicInfoSchema = z.object(basicInfoShape).superRefine((v, ctx) => {
  checkFormats(v, ctx);
  if (v.deviceName.length < 2) issue(ctx, "deviceName", "Enter the device name (at least 2 characters)");
  if (v.manufacturerName.length < 2) issue(ctx, "manufacturerName", "Enter the manufacturer's legal entity name");
  if (v.manufacturerAddress.length < 5) issue(ctx, "manufacturerAddress", "Enter the manufacturer's address");
  if (!v.version) issue(ctx, "version", "Enter the document version, e.g. v1.0");

  if (v.manufacturerType === "INDIAN_MANUFACTURER") {
    if (!v.manufacturerState) issue(ctx, "manufacturerState", "Choose a state or union territory");
    if (!v.manufacturerPin) issue(ctx, "manufacturerPin", "Enter the 6-digit PIN code");
  } else {
    if (!v.manufacturerCountry) issue(ctx, "manufacturerCountry", "Enter the manufacturer's country");
    if (v.licenceType !== "IMPORT") issue(ctx, "licenceType", "Importers need an import licence (MD-15)");
    if (v.importerName.length < 2) issue(ctx, "importerName", "Enter the Indian importer's name");
    if (v.importerAddress.length < 5) issue(ctx, "importerAddress", "Enter the importer's Indian address");
    if (!v.importerState) issue(ctx, "importerState", "Choose the importer's state");
    if (!v.importerPin) issue(ctx, "importerPin", "Enter the importer's 6-digit PIN code");
  }

  if (!v.customerCarePhone && !v.customerCareEmail)
    issue(ctx, "customerCarePhone", "Add a customer care phone number or email");
});

/** Draft validation: skips required fields, keeps basic formats (FR-S1-02). */
export const basicInfoDraftSchema = z.object(basicInfoShape).superRefine(checkFormats);

export type BasicInfoInput = z.infer<typeof basicInfoSchema>;

/** Explicit `boolean` return stops TS inferring a type predicate, so the form value stays nullable. */
const isAnswered = (value: unknown): boolean => value !== null;

const yesNo = (message: string) => z.boolean().nullable().refine(isAnswered, { message });

export const categoryRiskSchema = z
  .object({
    category: z
      .enum(DEVICE_CATEGORIES)
      .nullable()
      .refine(isAnswered, { message: "Choose the device category" }),
    isSterile: yesNo("Tell us whether the device is supplied sterile"),
    isReusable: yesNo("Tell us whether the device is reused"),
    isActive: z.boolean().nullable(),
    hasMeasuringFn: z.boolean().nullable(),
    isLayUser: z.boolean().nullable(),
    riskClass: z
      .enum(RISK_CLASSES)
      .nullable()
      .refine(isAnswered, { message: "Choose the risk class" }),
  });

export type CategoryRiskInput = z.infer<typeof categoryRiskSchema>;
