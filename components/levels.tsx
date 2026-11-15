import type { ReactNode } from "react";
import type { DifficultyId } from "@/lib/game";
import { BoltIcon, FlameIcon, LeafIcon } from "@/components/icons";

const LEVEL_STYLE: Record<DifficultyId, { color: string; icon: ReactNode }> = {
  easy: { color: "var(--good)", icon: <LeafIcon /> },
  medium: { color: "var(--accent)", icon: <BoltIcon /> },
  hard: { color: "var(--hot)", icon: <FlameIcon /> },
};

/** Each level owns one theme colour so it reads the same on every screen. */
export function levelColor(id: DifficultyId): string {
  return LEVEL_STYLE[id].color;
}

export function levelIcon(id: DifficultyId): ReactNode {
  return LEVEL_STYLE[id].icon;
}
