import { WIZARD_STEPS } from "./constants";
import type { WizardStep } from "./types";

const STEP_ORDER: WizardStep[] = WIZARD_STEPS.map((step) => step.key);

export const getStepIndex = (step: WizardStep) => STEP_ORDER.indexOf(step);

/** Path segment (after /ifu/[id]/) a step opens on; sections has no index route. */
export const getStepPath = (documentId: string, step: WizardStep) => {
  const slug = WIZARD_STEPS[getStepIndex(step)].slug;
  return slug === "sections" ? `/ifu/${documentId}/sections/device_description` : `/ifu/${documentId}/${slug}`;
};

interface ReachabilityInput {
  lastStep: WizardStep;
  basicInfoValid: boolean;
  categoryRiskValid: boolean;
}

/**
 * WF-01: a step is reachable only when every earlier step is valid; earlier steps stay revisitable.
 * WF-04 uses `lastStep` as the resume point, but never beyond what validity allows.
 */
export const getMaxReachableIndex = ({ lastStep, basicInfoValid, categoryRiskValid }: ReachabilityInput) => {
  const byValidity = !basicInfoValid ? 0 : !categoryRiskValid ? 1 : 2;
  return Math.min(byValidity, Math.max(getStepIndex(lastStep), 0));
};

/** Where "Edit" on a draft should land (WF-04). */
export const getResumeStep = (input: ReachabilityInput): WizardStep => STEP_ORDER[getMaxReachableIndex(input)];
