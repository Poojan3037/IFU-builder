import { GradientBackdrop } from "@/components/shared/GradientBackdrop";
import { Logo } from "@/components/shared/Logo";
import { Reveal, Stagger, StaggerItem, TextReveal } from "@/components/shared/motion";

import { AUTH_FEATURES } from "../constants";

export const AuthBrandPanel = () => (
  <aside className="relative isolate hidden flex-col justify-between overflow-hidden border-r bg-secondary/40 p-10 lg:flex xl:p-14">
    <GradientBackdrop />
    <Logo />
    <div className="max-w-lg">
      <TextReveal
        text="Create compliant device instructions in minutes, not days."
        highlight={["minutes,"]}
        className="text-4xl font-semibold leading-[1.1] tracking-tight xl:text-5xl"
      />
      <Reveal delay={0.5}>
        <p className="mt-5 text-base leading-relaxed text-muted-foreground">
          Smart IFU Builder guides Indian medical-device teams through every section their Instructions for Use need
          under the Medical Devices Rules, 2017.
        </p>
      </Reveal>
      <Stagger as="ul" trigger="mount" delay={0.7} stagger={0.12} className="mt-10 space-y-5">
        {AUTH_FEATURES.map(({ title, description, icon: Icon }) => (
          <StaggerItem as="li" key={title} variant="slideInFromLeft" className="flex gap-4">
            <span className="glass grid size-11 shrink-0 place-items-center rounded-xl text-primary shadow-sm">
              <Icon aria-hidden className="size-5" />
            </span>
            <div>
              <p className="font-medium">{title}</p>
              <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
    <p className="text-xs text-muted-foreground">Aligned with MDR 2017 · CDSCO · IS/ISO 15223-1 · Data hosted in India</p>
  </aside>
);
