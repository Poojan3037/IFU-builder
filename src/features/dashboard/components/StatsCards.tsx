import { CheckCircle2, FileStack, PencilLine, type LucideIcon } from "lucide-react";

import { AnimatedNumber, Stagger, StaggerItem } from "@/components/shared/motion";
import { cn } from "@/lib/utils";

import type { DashboardStats } from "../types";

interface StatsCardsProps {
  stats: DashboardStats;
}

const CARDS: { key: keyof DashboardStats; label: string; hint: string; icon: LucideIcon; tone: string }[] = [
  { key: "total", label: "Total documents", hint: "Across all devices", icon: FileStack, tone: "bg-accent text-primary" },
  { key: "inProgress", label: "Drafts in progress", hint: "Draft or ready to export", icon: PencilLine, tone: "bg-warning-soft text-warning-soft-foreground" },
  { key: "completed", label: "Completed & exported", hint: "PDF generated", icon: CheckCircle2, tone: "bg-success-soft text-success-soft-foreground" },
];

export const StatsCards = ({ stats }: StatsCardsProps) => (
  <Stagger as="ul" trigger="mount" delay={0.1} className="grid gap-4 sm:grid-cols-3">
    {CARDS.map(({ key, label, hint, icon: Icon, tone }) => (
      <StaggerItem
        as="li"
        key={key}
        className="group relative overflow-hidden rounded-2xl border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
      >
        <div aria-hidden className="absolute -right-8 -top-8 size-28 rounded-full bg-primary/5 transition-transform duration-500 group-hover:scale-125" />
        <div className="relative flex items-start justify-between gap-3">
          <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <AnimatedNumber value={stats[key]} className="mt-2 block text-3xl font-semibold tabular-nums tracking-tight" />
            <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
          </div>
          <span className={cn("grid size-10 place-items-center rounded-xl", tone)}>
            <Icon aria-hidden className="size-5" />
          </span>
        </div>
      </StaggerItem>
    ))}
  </Stagger>
);
