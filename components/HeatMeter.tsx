import type { CSSProperties } from "react";
import type { Heat } from "@/lib/game";
import { FlameIcon, SnowflakeIcon, SunIcon } from "@/components/icons";

const POSITION: Record<Heat, number> = { cold: 0.06, warm: 0.5, hot: 0.9, found: 1 };

const LABEL: Record<Heat, string> = {
  cold: "Freezing cold",
  warm: "Getting warm",
  hot: "Burning hot",
  found: "Bullseye!",
};

interface HeatMeterProps {
  heat: Heat | null;
}

/** Cold-to-hot thermometer. Lives inside the mystery card, so it stays mounted and the marker can slide. */
export function HeatMeter({ heat }: HeatMeterProps) {
  return (
    <div role="img" aria-label={heat ? LABEL[heat] : "Heat meter, no guess yet"} className="relative px-3 pb-3">
      <div className="mb-0.5 flex items-center justify-between gap-2">
        <span className="font-display text-xs uppercase tracking-widest text-ink/70">Heat meter</span>
        <span
          key={heat ?? "none"}
          className="anim-pop rounded-full border-2 border-ink bg-ink px-3 py-0.5 font-display text-xs uppercase tracking-wide text-paper"
        >
          {heat ? LABEL[heat] : "Guess to feel it"}
        </span>
      </div>

      <div className="@container relative h-9">
        <div className="heat-track absolute inset-x-0 top-1/2 h-4 -translate-y-1/2 rounded-full border-[2.5px] border-ink" />
        <div
          className="heat-marker absolute left-0 top-0 flex size-9 items-center justify-center rounded-full border-[3px] border-ink bg-paper text-[1.4rem]"
          style={{ "--p": heat ? POSITION[heat] : 0.5, opacity: heat ? 1 : 0.6 } as CSSProperties}
          aria-hidden="true"
        >
          {heat === "cold" && <SnowflakeIcon />}
          {heat === "warm" && <SunIcon />}
          {(heat === "hot" || heat === "found") && <FlameIcon className="heat-flicker" />}
          {heat === null && <span className="font-display text-lg text-ink/60">?</span>}
        </div>
      </div>
    </div>
  );
}
