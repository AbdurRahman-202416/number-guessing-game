import type { Heat } from "@/lib/game";

const LEVELS: Record<Exclude<Heat, "found">, { filled: number; label: string; bar: string }> = {
  cold: { filled: 1, label: "Cold", bar: "bg-ice" },
  warm: { filled: 2, label: "Warm", bar: "bg-butter" },
  hot: { filled: 3, label: "Hot", bar: "bg-coral" },
};

interface HeatMeterProps {
  heat: Exclude<Heat, "found">;
  /** Show the word next to the three-step meter. */
  showLabel?: boolean;
}

export function HeatMeter({ heat, showLabel = true }: HeatMeterProps) {
  const level = LEVELS[heat];
  return (
    <span className="inline-flex items-center gap-2">
      <span className="flex items-end gap-[3px]" aria-hidden="true">
        {[1, 2, 3].map((step) => (
          <span
            key={step}
            style={{ height: 6 + step * 4 }}
            className={`w-1.5 rounded-sm ${step <= level.filled ? level.bar : "bg-white/20"}`}
          />
        ))}
      </span>
      {showLabel ? (
        <span className="text-sm font-bold">{level.label}</span>
      ) : (
        <span className="sr-only">{level.label}</span>
      )}
    </span>
  );
}

export function heatMessage(heat: Exclude<Heat, "found">): string {
  switch (heat) {
    case "hot":
      return "Hot. You're very close.";
    case "warm":
      return "Warm. You're in the neighbourhood.";
    case "cold":
      return "Cold. You're far away.";
  }
}
