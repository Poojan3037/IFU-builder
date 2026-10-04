"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** Fake save + navigate used by the static wizard steps (stands in for Server Actions). */
export const useWizardNavigation = () => {
  const router = useRouter();
  const [isSavingDraft, startDraft] = useTransition();
  const [isContinuing, startContinue] = useTransition();

  const saveDraftAndExit = () =>
    startDraft(async () => {
      await wait(500);
      toast.success("Draft saved", { description: "You can resume from the dashboard any time." });
      router.push("/dashboard");
    });

  const continueTo = (href: string) =>
    startContinue(async () => {
      await wait(650);
      router.push(href);
    });

  const go = (href: string) => router.push(href);

  return { isSavingDraft, isContinuing, saveDraftAndExit, continueTo, go };
};
