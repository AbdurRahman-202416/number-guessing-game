import type { DifficultyId } from "@/lib/game";

const STORAGE_KEY = "number-guessing-game:best:v1";

export type BestScores = Partial<Record<DifficultyId, number>>;

const listeners = new Set<() => void>();

/** Fallback used only when localStorage is blocked (private mode, etc.). */
let memoryValue = "";

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

export function getSnapshot(): string {
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? memoryValue;
  } catch {
    return memoryValue;
  }
}

/** The server never knows the best scores, so it always renders "none yet". */
export function getServerSnapshot(): string {
  return "";
}

export function parseBestScores(raw: string): BestScores {
  if (!raw) return {};
  try {
    const data: unknown = JSON.parse(raw);
    if (typeof data !== "object" || data === null) return {};
    const result: BestScores = {};
    for (const id of ["easy", "medium", "hard"] as const) {
      const value = (data as Record<string, unknown>)[id];
      if (typeof value === "number" && Number.isFinite(value) && value > 0) {
        result[id] = value;
      }
    }
    return result;
  } catch {
    return {};
  }
}

export function saveBestScore(id: DifficultyId, score: number): void {
  const current = parseBestScores(getSnapshot());
  if ((current[id] ?? 0) >= score) return;
  const next = JSON.stringify({ ...current, [id]: score });
  memoryValue = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // Storage unavailable: the in-memory copy keeps this session working.
  }
  listeners.forEach((listener) => listener());
}
