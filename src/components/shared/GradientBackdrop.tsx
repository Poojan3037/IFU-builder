import { cn } from "@/lib/utils";

interface GradientBackdropProps {
  className?: string;
  /** Adds the subtle grid texture. */
  grid?: boolean;
}

/** Soft, slowly drifting gradient mesh. Purely decorative; CSS-only so it can stay a Server Component. */
export const GradientBackdrop = ({ className, grid = true }: GradientBackdropProps) => (
  <div aria-hidden className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}>
    <div className="absolute -left-[10%] -top-[20%] size-[55vmax] animate-drift rounded-full bg-[radial-gradient(circle,var(--glow-1),transparent_65%)] blur-3xl" />
    <div className="absolute -right-[15%] top-[5%] size-[45vmax] animate-drift rounded-full bg-[radial-gradient(circle,var(--glow-2),transparent_65%)] blur-3xl [animation-delay:-6s]" />
    <div className="absolute bottom-[-25%] left-[25%] size-[40vmax] animate-drift rounded-full bg-[radial-gradient(circle,var(--glow-3),transparent_65%)] blur-3xl [animation-delay:-12s]" />
    {grid && <div className="bg-grid mask-radial absolute inset-0" />}
  </div>
);
