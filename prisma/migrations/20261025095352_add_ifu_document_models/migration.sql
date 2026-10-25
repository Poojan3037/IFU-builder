-- CreateEnum
CREATE TYPE "DocumentStatus" AS ENUM ('DRAFT', 'READY', 'COMPLETED');

-- CreateEnum
CREATE TYPE "WizardStep" AS ENUM ('BASIC_INFO', 'CATEGORY_RISK', 'SECTIONS', 'REVIEW');

-- CreateEnum
CREATE TYPE "ManufacturerType" AS ENUM ('INDIAN_MANUFACTURER', 'IMPORTER');

-- CreateEnum
CREATE TYPE "LicenceType" AS ENUM ('MANUFACTURING', 'LOAN', 'IMPORT', 'REGISTRATION');

-- CreateEnum
CREATE TYPE "DeviceCategory" AS ENUM ('IVD', 'IMPLANT', 'REUSABLE', 'SINGLE_USE', 'SAMD', 'OTHER');

-- CreateEnum
CREATE TYPE "RiskClass" AS ENUM ('A', 'B', 'C', 'D');

-- CreateEnum
CREATE TYPE "SectionKey" AS ENUM ('device_description', 'intended_use', 'indications_contraindications', 'warnings_precautions', 'instructions_for_use', 'sterilisation', 'reprocessing', 'maintenance', 'implant_card', 'ivd_performance', 'software_info', 'storage', 'disposal', 'manufacturer_licence', 'vigilance', 'symbols');

-- CreateEnum
CREATE TYPE "Severity" AS ENUM ('BLOCKING', 'ADVISORY');

-- CreateEnum
CREATE TYPE "AuditAction" AS ENUM ('CREATED', 'UPDATED', 'CHECK_RUN', 'ISSUE_DISMISSED', 'EXPORTED', 'DELETED');

-- CreateTable
CREATE TABLE "ifu_document" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "status" "DocumentStatus" NOT NULL DEFAULT 'DRAFT',
    "lastStep" "WizardStep" NOT NULL DEFAULT 'BASIC_INFO',
    "version" TEXT NOT NULL DEFAULT 'v1.0',
    "issueDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deviceName" TEXT NOT NULL DEFAULT '',
    "brandName" TEXT NOT NULL DEFAULT '',
    "modelNumber" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "manufacturerType" "ManufacturerType" NOT NULL DEFAULT 'INDIAN_MANUFACTURER',
    "manufacturerName" TEXT NOT NULL DEFAULT '',
    "manufacturerAddress" TEXT NOT NULL DEFAULT '',
    "manufacturerState" TEXT NOT NULL DEFAULT '',
    "manufacturerPin" TEXT NOT NULL DEFAULT '',
    "manufacturerCountry" TEXT NOT NULL DEFAULT 'India',
    "licenceType" "LicenceType" NOT NULL DEFAULT 'MANUFACTURING',
    "licenceNumber" TEXT NOT NULL DEFAULT '',
    "importerName" TEXT NOT NULL DEFAULT '',
    "importerAddress" TEXT NOT NULL DEFAULT '',
    "importerState" TEXT NOT NULL DEFAULT '',
    "importerPin" TEXT NOT NULL DEFAULT '',
    "customerCarePhone" TEXT NOT NULL DEFAULT '',
    "customerCareEmail" TEXT NOT NULL DEFAULT '',
    "category" "DeviceCategory",
    "isSterile" BOOLEAN,
    "isReusable" BOOLEAN,
    "isActive" BOOLEAN,
    "hasMeasuringFn" BOOLEAN,
    "isLayUser" BOOLEAN,
    "riskClass" "RiskClass",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "ifu_document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ifu_section" (
    "id" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,
    "key" "SectionKey" NOT NULL,
    "fields" JSONB NOT NULL DEFAULT '{}',
    "isComplete" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ifu_section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "compliance_run" (
    "id" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isStale" BOOLEAN NOT NULL DEFAULT false,
    "blockingCount" INTEGER NOT NULL DEFAULT 0,
    "advisoryCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "compliance_run_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "compliance_issue" (
    "id" TEXT NOT NULL,
    "runId" TEXT NOT NULL,
    "ruleId" TEXT NOT NULL,
    "severity" "Severity" NOT NULL,
    "sectionKey" "SectionKey" NOT NULL,
    "fieldKey" TEXT,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "dismissedAt" TIMESTAMP(3),
    "dismissReason" TEXT,

    CONSTRAINT "compliance_issue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "export_record" (
    "id" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "storageKey" TEXT NOT NULL,
    "options" JSONB NOT NULL,
    "durationMs" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" TEXT NOT NULL,

    CONSTRAINT "export_record_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "document_version" (
    "id" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "snapshot" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "document_version_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_event" (
    "id" TEXT NOT NULL,
    "documentId" TEXT,
    "userId" TEXT NOT NULL,
    "action" "AuditAction" NOT NULL,
    "meta" JSONB NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_event_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ifu_document_ownerId_deletedAt_updatedAt_idx" ON "ifu_document"("ownerId", "deletedAt", "updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "ifu_section_documentId_key_key" ON "ifu_section"("documentId", "key");

-- CreateIndex
CREATE INDEX "compliance_run_documentId_createdAt_idx" ON "compliance_run"("documentId", "createdAt");

-- CreateIndex
CREATE INDEX "compliance_issue_runId_idx" ON "compliance_issue"("runId");

-- CreateIndex
CREATE INDEX "export_record_documentId_createdAt_idx" ON "export_record"("documentId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "document_version_documentId_version_key" ON "document_version"("documentId", "version");

-- CreateIndex
CREATE INDEX "audit_event_documentId_createdAt_idx" ON "audit_event"("documentId", "createdAt");

-- CreateIndex
CREATE INDEX "audit_event_userId_idx" ON "audit_event"("userId");

-- AddForeignKey
ALTER TABLE "ifu_document" ADD CONSTRAINT "ifu_document_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ifu_section" ADD CONSTRAINT "ifu_section_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "ifu_document"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "compliance_run" ADD CONSTRAINT "compliance_run_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "ifu_document"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "compliance_issue" ADD CONSTRAINT "compliance_issue_runId_fkey" FOREIGN KEY ("runId") REFERENCES "compliance_run"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "export_record" ADD CONSTRAINT "export_record_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "ifu_document"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "document_version" ADD CONSTRAINT "document_version_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "ifu_document"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_event" ADD CONSTRAINT "audit_event_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "ifu_document"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_event" ADD CONSTRAINT "audit_event_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
