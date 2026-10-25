import "server-only";

import { getApplicableSections } from "@/features/ifu-wizard/rules/applicability";
import type { DeviceProfile, SectionKey } from "@/features/ifu-wizard/types";
import { readSections } from "@/features/sections/stored";
import { htmlToPlainText } from "@/features/sections/text";
import { prisma } from "@/lib/prisma";

import { getOwnedDocumentOrThrow } from "../documents/get-owned-document";
import type { IfuDocumentSnapshot, SectionSnapshot } from "./types";

const SNAPSHOT_SELECT = {
  id: true,
  status: true,
  description: true,
  deviceName: true,
  manufacturerType: true,
  manufacturerName: true,
  manufacturerAddress: true,
  licenceType: true,
  licenceNumber: true,
  importerName: true,
  importerAddress: true,
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

/** Loads the owned document and shapes it for the pure rule engine (plain-text fields, applicable sections only). */
export const loadComplianceSnapshot = async (documentId: string, userId: string) => {
  const doc = await getOwnedDocumentOrThrow(documentId, userId, SNAPSHOT_SELECT);
  const rows = await prisma.ifuSection.findMany({ where: { documentId }, select: { key: true, fields: true, isComplete: true } });
  const { content, structured } = readSections(rows, doc.description);

  const profile: DeviceProfile = {
    category: doc.category,
    isSterile: doc.isSterile,
    isReusable: doc.isReusable,
    isActive: doc.isActive,
    hasMeasuringFn: doc.hasMeasuringFn,
    isLayUser: doc.isLayUser,
    riskClass: doc.riskClass,
  };
  const applicable = getApplicableSections(profile);

  const sections: Partial<Record<SectionKey, SectionSnapshot>> = {};
  for (const key of applicable) {
    const section = content[key];
    if (!section) continue;
    sections[key] = {
      isComplete: section.isComplete,
      fields: Object.fromEntries(Object.entries(section.fields).map(([field, html]) => [field, htmlToPlainText(html)])),
    };
  }

  const snapshot: IfuDocumentSnapshot = {
    profile,
    info: {
      deviceName: doc.deviceName,
      manufacturerType: doc.manufacturerType,
      manufacturerName: doc.manufacturerName,
      manufacturerAddress: doc.manufacturerAddress,
      licenceType: doc.licenceType,
      licenceNumber: doc.licenceNumber,
      importerName: doc.importerName,
      importerAddress: doc.importerAddress,
      importerPin: doc.importerPin,
      customerCarePhone: doc.customerCarePhone,
      customerCareEmail: doc.customerCareEmail,
    },
    applicable,
    sections,
    structured,
  };

  return { documentId: doc.id, status: doc.status, snapshot };
};
