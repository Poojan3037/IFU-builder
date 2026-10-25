import "server-only";

import { cache } from "react";

import { getOwnedDocumentOrThrow } from "@/server/services/documents/get-owned-document";

import { prisma } from "@/lib/prisma";

import { basicInfoSchema, categoryRiskSchema, type BasicInfoInput } from "./schema";
import { getMaxReachableIndex } from "./navigation";
import type { DeviceProfile, DocumentStatus, SectionKey, WizardStep } from "./types";

const WIZARD_SELECT = {
  id: true,
  status: true,
  lastStep: true,
  version: true,
  issueDate: true,
  deviceName: true,
  brandName: true,
  modelNumber: true,
  description: true,
  manufacturerType: true,
  manufacturerName: true,
  manufacturerAddress: true,
  manufacturerState: true,
  manufacturerPin: true,
  manufacturerCountry: true,
  licenceType: true,
  licenceNumber: true,
  importerName: true,
  importerAddress: true,
  importerState: true,
  importerPin: true,
  customerCarePhone: true,
  customerCareEmail: true,
  category: true,
  isSterile: true,
  isReusable: true,
  isActive: true,
  hasMeasuringFn: true,
  isLayUser: true,
  riskClass: true,
} as const;

/** Form-ready serialisable Step 1 values (`issueDate` is ISO so it crosses the RSC boundary safely). */
export type BasicInfoDefaults = Omit<BasicInfoInput, "issueDate"> & { issueDate: string };

export interface WizardDocument {
  id: string;
  deviceName: string;
  status: DocumentStatus;
  lastStep: WizardStep;
  basicInfoValid: boolean;
  categoryRiskValid: boolean;
  maxReachableIndex: number;
  basicInfo: BasicInfoDefaults;
  profile: DeviceProfile;
}

/** Cached per request so the layout and the step page share one query. */
export const getWizardDocument = cache(async (documentId: string, userId: string): Promise<WizardDocument> => {
  const row = await getOwnedDocumentOrThrow(documentId, userId, WIZARD_SELECT);

  const basicInfo: BasicInfoDefaults = {
    deviceName: row.deviceName,
    brandName: row.brandName,
    modelNumber: row.modelNumber,
    manufacturerType: row.manufacturerType,
    manufacturerName: row.manufacturerName,
    manufacturerAddress: row.manufacturerAddress,
    manufacturerState: row.manufacturerState,
    manufacturerPin: row.manufacturerPin,
    // The country field is only shown for importers; Indian manufacturers keep the "India" column default.
    manufacturerCountry: row.manufacturerType === "IMPORTER" ? row.manufacturerCountry : "",
    licenceType: row.licenceType,
    licenceNumber: row.licenceNumber,
    importerName: row.importerName,
    importerAddress: row.importerAddress,
    importerState: row.importerState,
    importerPin: row.importerPin,
    customerCarePhone: row.customerCarePhone,
    customerCareEmail: row.customerCareEmail,
    version: row.version,
    issueDate: row.issueDate.toISOString(),
    description: row.description,
  };

  const basicInfoValid = basicInfoSchema.safeParse({ ...basicInfo, issueDate: row.issueDate }).success;
  const profile: DeviceProfile = {
    category: row.category,
    isSterile: row.isSterile,
    isReusable: row.isReusable,
    isActive: row.isActive,
    hasMeasuringFn: row.hasMeasuringFn,
    isLayUser: row.isLayUser,
    riskClass: row.riskClass,
  };
  const categoryRiskValid = categoryRiskSchema.safeParse(profile).success;

  return {
    id: row.id,
    deviceName: row.deviceName,
    status: row.status,
    lastStep: row.lastStep,
    basicInfoValid,
    categoryRiskValid,
    maxReachableIndex: getMaxReachableIndex({ lastStep: row.lastStep, basicInfoValid, categoryRiskValid }),
    basicInfo,
    profile,
  };
});

/** Sections the user has written something in; WF-02 keeps these even when they stop being applicable. */
export const getSectionKeysWithContent = async (documentId: string, userId: string): Promise<SectionKey[]> => {
  await getOwnedDocumentOrThrow(documentId, userId, { id: true });
  const rows = await prisma.ifuSection.findMany({ where: { documentId }, select: { key: true, fields: true, isComplete: true } });
  return rows.filter((row) => row.isComplete || hasWrittenContent(row.fields)).map((row) => row.key);
};

export const hasWrittenContent = (fields: unknown) =>
  typeof fields === "object" && fields !== null && Object.values(fields).some((value) => typeof value === "string" && value.trim() !== "");
