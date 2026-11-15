"use client";

import { useMemo, useSyncExternalStore } from "react";
import {
  getServerSnapshot,
  getSnapshot,
  parseBestScores,
  saveBestScore,
  subscribe,
  type BestScores,
} from "@/lib/storage";

export function useBestScores(): { best: BestScores; recordScore: typeof saveBestScore } {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const best = useMemo(() => parseBestScores(raw), [raw]);
  return { best, recordScore: saveBestScore };
}
