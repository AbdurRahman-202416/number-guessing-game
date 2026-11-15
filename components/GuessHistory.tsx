import type { CSSProperties } from "react";
import type { Guess, Heat } from "@/lib/game";
import { ArrowDownIcon, ArrowUpIcon, CheckIcon } from "@/components/icons";

const HEAT_COLOR: Record<Heat, string> = {
  cold: "var(--info)",
  warm: "var(--accent)",
  hot: "var(--hot)",
  found: "var(--good)",
};

const HEAT_WORD: Record<Heat, string> = {
  cold: "cold",
  warm: "warm",
  hot: "hot",
  found: "correct",
};

/** Tilts alternate so the chips look slapped on like stickers. */
const TILTS = [-4, 3, -2, 4, -3, 2, -5, 3];

interface GuessHistoryProps {
  guesses: readonly Guess[];
  /** Stagger the pop-in (used when many chips appear at once, like on the result screen). */
  stagger?: boolean;
  compact?: boolean;
}

export function GuessHistory({ guesses, stagger = false, compact = false }: GuessHistoryProps) {
  if (guesses.length === 0) {
    return (
      <p className="rounded-2xl border-[2.5px] border-dashed border-paper/40 px-4 py-3 text-center text-sm font-bold text-paper/75">
        Your guesses will stick here like stickers.
      </p>
    );
  }
  return (
    <ol className="flex flex-wrap gap-2.5">
      {guesses.map((guess, index) => {
        const verdictWord =
          guess.verdict === "correct" ? "correct" : guess.verdict === "low" ? "too low" : "too high";
        return (
          <li
            key={guess.value}
            aria-label={`${guess.value}, ${verdictWord}, ${HEAT_WORD[guess.heat]}`}
            className={`anim-pop sticker-sm flex items-center gap-1.5 rounded-full text-ink ${
              compact ? "min-h-9 px-3" : "min-h-11 px-3.5"
            }`}
            style={
              {
                background: HEAT_COLOR[guess.heat],
                "--rot": `${TILTS[index % TILTS.length]}deg`,
                "--delay": stagger ? `${index * 0.07}s` : "0s",
              } as CSSProperties
            }
          >
            <span className={`numeral leading-none ${compact ? "text-xl" : "text-2xl"}`}>{guess.value}</span>
            <span aria-hidden="true" className={compact ? "text-lg" : "text-xl"}>
              {guess.verdict === "high" ? <ArrowDownIcon /> : guess.verdict === "low" ? <ArrowUpIcon /> : <CheckIcon />}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
