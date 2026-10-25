import { Building2, Pencil } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { LICENCE_TYPE_META } from "@/features/ifu-wizard/constants";
import type { LicencePreviewInfo } from "../types";

interface ManufacturerLicencePreviewProps {
  documentId: string;
  info: LicencePreviewInfo;
}

/** Read-only preview of the auto-generated licence section (REQUIREMENTS §7, row 14). */
export const ManufacturerLicencePreview = ({ documentId, info }: ManufacturerLicencePreviewProps) => {
  const rows = [
    { label: "Manufacturer", value: info.manufacturerName },
    {
      label: "Address",
      value: [info.manufacturerAddress, [info.manufacturerState, info.manufacturerPin].filter(Boolean).join(" "), info.manufacturerCountry]
        .filter(Boolean)
        .join(", "),
    },
    { label: LICENCE_TYPE_META[info.licenceType].numberLabel, value: info.licenceNumber || "Not provided" },
    ...(info.manufacturerType === "IMPORTER"
      ? [{ label: "Importer", value: `${info.importerName}, ${info.importerAddress}` }]
      : []),
    { label: "Customer care", value: [info.customerCarePhone, info.customerCareEmail].filter(Boolean).join(" · ") },
  ];

  return (
    <div className="rounded-xl border bg-muted/30">
      <div className="flex items-center justify-between gap-3 border-b px-4 py-3">
        <span className="inline-flex items-center gap-2 text-sm font-medium">
          <Building2 aria-hidden className="size-4 text-primary" /> Generated from Step 1
        </span>
        <Button asChild variant="outline" size="sm">
          <Link href={`/ifu/${documentId}/basic-info`}>
            <Pencil /> Edit in Step 1
          </Link>
        </Button>
      </div>
      <dl className="divide-y">
        {rows.map((row) => (
          <div key={row.label} className="grid gap-1 px-4 py-3 text-sm sm:grid-cols-[200px_1fr]">
            <dt className="text-muted-foreground">{row.label}</dt>
            <dd className="font-medium">{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};
