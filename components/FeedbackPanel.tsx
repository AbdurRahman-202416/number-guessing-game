import type { Difficulty, Guess } from "@/lib/game";
import { ArrowDownIcon, ArrowUpIcon } from "@/components/icons";
import { HeatMeter, heatMessage } from "@/components/HeatMeter";

interface FeedbackPanelProps {
  difficulty: Difficulty;
  lastGuess: Guess | null;
  triesLeft: number;
}

export function FeedbackPanel({ difficulty, lastGuess, triesLeft }: FeedbackPanelProps) {
  const heat = lastGuess && lastGuess.heat !== "found" ? lastGuess.heat : null;
  const tooHigh = lastGuess?.verdict === "high";

  const spoken = lastGuess
    ? `${lastGuess.value} is too ${lastGuess.verdict === "high" ? "high" : "low"}. ${
        heat ? heatMessage(heat) : ""
      } ${triesLeft} ${triesLeft === 1 ? "try" : "tries"} left.`
    : `Guess a number from ${difficulty.min} to ${difficulty.max}. You have ${triesLeft} tries.`;

  return (
    <div className="min-h-[5.5rem]" role="status" aria-live="polite" aria-atomic="true">
      <p className="sr-only">{spoken}</p>
      <div aria-hidden="true">
        {lastGuess ? (
          <div className="row-in flex flex-wrap items-center gap-x-4 gap-y-2" key={lastGuess.value}>
            <span className="numeral text-5xl">{lastGuess.value}</span>
            <span
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-lg font-extrabold text-night ${
                tooHigh ? "bg-coral" : "bg-ice"
              }`}
            >
              {tooHigh ? (
                <>
                  <ArrowDownIcon className="size-5" /> Too high
                </>
              ) : (
                <>
                  <ArrowUpIcon className="size-5" /> Too low
                </>
              )}
            </span>
            {heat && (
              <span className="text-lg">
                <HeatMeter heat={heat} />
              </span>
            )}
          </div>
        ) : (
          <p className="max-w-[40ch] text-lg text-mist">
            Make your first guess. Hot, warm or cold will tell you how close you are.
          </p>
        )}
      </div>
    </div>
  );
}
