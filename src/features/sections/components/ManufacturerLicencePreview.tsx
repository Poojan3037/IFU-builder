import { Building2, Pencil } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { LICENCE_TYPE_META } from "@/features/ifu-wizard/constants";
import type { IfuDocument } from "@/features/ifu-wizard/types";

interface ManufacturerLicencePreviewProps {
  document: IfuDocument;
}

/** Read-only preview of the auto-generated licence section (REQUIREMENTS §7, row 14). */
export const ManufacturerLicencePreview = ({ document }: ManufacturerLicencePreviewProps) => {
  const rows = [
    { label: "Manufacturer", value: document.manufacturerName },
    {
      label: "Address",
      value: `${document.manufacturerAddress}, ${document.manufacturerState} ${document.manufacturerPin}, ${document.manufacturerCountry}`,
    },
    { label: LICENCE_TYPE_META[document.licenceType].numberLabel, value: document.licenceNumber || "Not provided" },
    ...(document.manufacturerType === "IMPORTER"
      ? [{ label: "Importer", value: `${document.importerName}, ${document.importerAddress}` }]
      : []),
    { label: "Customer care", value: [document.customerCarePhone, document.customerCareEmail].filter(Boolean).join(" · ") },
  ];

  return (
    <div className="rounded-xl border bg-muted/30">
      <div className="flex items-center justify-between gap-3 border-b px-4 py-3">
        <span className="inline-flex items-center gap-2 text-sm font-medium">
          <Building2 aria-hidden className="size-4 text-primary" /> Generated from Step 1
        </span>
        <Button asChild variant="outline" size="sm">
          <Link href={`/ifu/${document.id}/basic-info`}>
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
