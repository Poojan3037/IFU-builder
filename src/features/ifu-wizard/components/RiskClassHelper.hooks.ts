"use client";

import { useState } from "react";

import { HELPER_QUESTIONS, HELPER_RESULTS, TRACK_START, type HelperTrack } from "./RiskClassHelper.constants";

/** Step-through state for the risk class decision tree. */
export const useRiskClassHelper = (initialTrack: HelperTrack) => {
  const [track, setTrack] = useState<HelperTrack>(initialTrack);
  const [history, setHistory] = useState<string[]>([TRACK_START[initialTrack]]);
  const [direction, setDirection] = useState(1);

  const currentId = history[history.length - 1];
  const question = HELPER_QUESTIONS[currentId] ?? null;
  const result = HELPER_RESULTS[currentId] ?? null;

  const answer = (yes: boolean) => {
    if (!question) return;
    setDirection(1);
    setHistory((prev) => [...prev, yes ? question.yes : question.no]);
  };

  const back = () => {
    setDirection(-1);
    setHistory((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  };

  const changeTrack = (next: HelperTrack) => {
    setTrack(next);
    setDirection(1);
    setHistory([TRACK_START[next]]);
  };

  const restart = () => changeTrack(track);

  return { track, changeTrack, question, result, answer, back, restart, step: history.length, direction, canGoBack: history.length > 1 };
};
