import { Plus } from "lucide-react";
import Link from "next/link";

import { Magnetic, Reveal } from "@/components/shared/motion";
import { Button } from "@/components/ui/button";

export const DashboardHeader = () => (
  <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
    <div className="space-y-1">
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">My IFU Documents</h1>
      <p className="text-sm text-muted-foreground">Draft, check and export Instructions for Use for your devices.</p>
    </div>
    <Magnetic strength={0.2}>
      <Button asChild className="h-10 gap-2 px-4 shadow-lg shadow-primary/25">
        <Link href="/ifu/demo/basic-info">
          <Plus aria-hidden /> Create New IFU
        </Link>
      </Button>
    </Magnetic>
  </Reveal>
);
