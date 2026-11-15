import type { Guess } from "@/lib/game";
import { ArrowDownIcon, ArrowUpIcon, CheckIcon } from "@/components/icons";
import { HeatMeter } from "@/components/HeatMeter";

interface GuessHistoryProps {
  guesses: readonly Guess[];
}

export function GuessHistory({ guesses }: GuessHistoryProps) {
  // Newest first, but keep each guess's real attempt number.
  const rows = guesses.map((guess, index) => ({ guess, attempt: index + 1 })).reverse();

  return (
    <section aria-labelledby="history-title" className="rounded-2xl bg-deep p-5 sm:p-6">
      <h2 id="history-title" className="display text-2xl">
        Your guesses
      </h2>
      {rows.length === 0 ? (
        <p className="mt-3 max-w-[32ch] text-mist">
          Nothing yet. Each guess you make lands here with a nudge to go higher or lower.
        </p>
      ) : (
        <ol className="mt-3 divide-y divide-mist/20" aria-label="Guesses, newest first">
          {rows.map(({ guess, attempt }) => (
            <li
              key={guess.value}
              className="row-in grid grid-cols-[1.75rem_1fr_auto] items-center gap-3 py-3"
            >
              <span className="text-sm text-mist" aria-label={`Guess ${attempt}`}>
                {attempt}
              </span>
              <span className="flex items-center gap-3">
                <span className="numeral min-w-[3ch] text-3xl">{guess.value}</span>
                <span className="inline-flex items-center gap-1 text-sm font-bold">
                  {guess.verdict === "high" && (
                    <>
                      <ArrowDownIcon className="size-4 text-coral" />
                      Too high
                    </>
                  )}
                  {guess.verdict === "low" && (
                    <>
                      <ArrowUpIcon className="size-4 text-ice" />
                      Too low
                    </>
                  )}
                  {guess.verdict === "correct" && (
                    <>
                      <CheckIcon className="size-4 text-butter" />
                      Correct
                    </>
                  )}
                </span>
              </span>
              {guess.heat !== "found" && <HeatMeter heat={guess.heat} />}
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
