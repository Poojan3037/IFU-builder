import { Magnetic, Reveal } from "@/components/shared/motion";

import { CreateIfuButton } from "./CreateIfuButton";

export const DashboardHeader = () => (
  <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
    <div className="space-y-1">
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">My IFU Documents</h1>
      <p className="text-sm text-muted-foreground">Draft, check and export Instructions for Use for your devices.</p>
    </div>
    <Magnetic strength={0.2}>
      <CreateIfuButton className="h-10 gap-2 px-4 shadow-lg shadow-primary/25" />
    </Magnetic>
  </Reveal>
);
