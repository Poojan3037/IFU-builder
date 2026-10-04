import { AnimatedNumber, Stagger, StaggerItem } from "@/components/shared/motion";

import { STATS } from "../constants";

export const Stats = () => (
  <section aria-label="Smart IFU Builder in numbers" className="relative overflow-hidden py-20">
    <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/[0.07] via-transparent to-info/[0.07]" />
    <Stagger as="ul" className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-10 px-4 sm:px-6 lg:grid-cols-4">
      {STATS.map((stat) => (
        <StaggerItem as="li" key={stat.label} className="flex flex-col items-center gap-2 text-center">
          <AnimatedNumber
            value={stat.value}
            prefix={stat.prefix}
            suffix={stat.suffix}
            className="text-gradient text-4xl font-semibold tracking-tight tabular-nums sm:text-6xl"
          />
          <p className="max-w-[16rem] text-sm text-muted-foreground">{stat.label}</p>
        </StaggerItem>
      ))}
    </Stagger>
  </section>
);
