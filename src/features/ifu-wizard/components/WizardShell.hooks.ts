"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";

import { WIZARD_STEPS } from "../constants";

const REVIEW_SLUGS = ["compliance", "preview", "export"];

export const getStepIndexFromPath = (pathname: string): number => {
  const segment = pathname.split("/")[3] ?? "";
  if (REVIEW_SLUGS.includes(segment)) return 3;
  const index = WIZARD_STEPS.findIndex((step) => step.slug === segment);
  return index === -1 ? 0 : index;
};

/** Current step index plus the direction of the last step change (1 forward, -1 back). */
export const useWizardStep = () => {
  const pathname = usePathname();
  const stepIndex = getStepIndexFromPath(pathname);
  const [tracked, setTracked] = useState({ previous: stepIndex, direction: 1 });

  // Derive direction from the previous render's step (React "store info from previous renders" pattern).
  if (tracked.previous !== stepIndex) {
    setTracked({ previous: stepIndex, direction: stepIndex > tracked.previous ? 1 : -1 });
  }

  return { stepIndex, direction: tracked.direction, pathname };
};
