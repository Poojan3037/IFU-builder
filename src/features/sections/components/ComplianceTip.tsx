import { Lightbulb } from "lucide-react";

interface ComplianceTipProps {
  tip: string;
}

export const ComplianceTip = ({ tip }: ComplianceTipProps) => (
  <aside className="flex gap-3 rounded-xl border border-info/25 bg-info-soft px-4 py-3.5 text-sm text-info-soft-foreground">
    <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-info/15">
      <Lightbulb aria-hidden className="size-4" />
    </span>
    <div>
      <p className="font-semibold">Compliance tip</p>
      <p className="mt-0.5 leading-relaxed opacity-90">{tip}</p>
    </div>
  </aside>
);
