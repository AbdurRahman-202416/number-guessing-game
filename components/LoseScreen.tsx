"use client";

import type { CSSProperties } from "react";
import type { Difficulty, Guess } from "@/lib/game";
import { GuessHistory } from "@/components/GuessHistory";
import { ResultModal } from "@/components/ResultModal";
import { BrokenHeartIcon, PlayIcon } from "@/components/icons";

interface LoseScreenProps {
  difficulty: Difficulty;
  target: number;
  guesses: readonly Guess[];
  onPlayAgain: () => void;
  onMenu: () => void;
}

export function LoseScreen({ difficulty, target, guesses, onPlayAgain, onMenu }: LoseScreenProps) {
  const closest = guesses.reduce<number | null>(
    (min, guess) => (min === null ? Math.abs(guess.value - target) : Math.min(min, Math.abs(guess.value - target))),
    null,
  );

  return (
    <ResultModal labelledBy="result-title">
      <div className="relative w-full pt-14">
        <BrokenHeartIcon className="trophy-in absolute left-1/2 top-0 z-20 size-28 -translate-x-1/2 text-[7rem]" />

        <div className="sticker panel-in relative z-10 bg-paper px-5 pb-5 pt-[4.8rem] text-center">
          <h2 id="result-title" className="outlined font-display text-[3.2rem] font-bold uppercase leading-none text-hot">
            Game over
          </h2>
          <p className="mt-2 font-bold text-ink/80">
            Out of hearts on {difficulty.label}. So close, give it another shot!
          </p>

          <div className="mt-4 flex items-center justify-center gap-5">
            <p className="max-w-[7rem] text-right text-sm font-extrabold uppercase tracking-wider text-ink/70">
              The secret number was
            </p>
            <div className="flip-scene h-32 w-24">
              <div className="flip-card size-full">
                <div className="flip-face sticker-sm flex items-center justify-center bg-ink">
                  <span className="outlined font-display text-[4.6rem] font-bold leading-none text-paper">?</span>
                </div>
                <div className="flip-face flip-back sticker-sm flex items-center justify-center bg-accent">
                  <span className="numeral text-[3.4rem] leading-none">{target}</span>
                </div>
              </div>
            </div>
          </div>

          {closest !== null && (
            <p
              className="anim-pop mt-4 rounded-xl border-[2.5px] border-ink bg-info px-3 py-2 text-sm font-extrabold"
              style={{ "--delay": "1.4s" } as CSSProperties}
            >
              {closest === 0 ? "You found it!" : `Your closest guess was only ${closest} away.`}
            </p>
          )}

          <div className="mt-4 text-left">
            <p className="mb-2 text-center text-xs font-extrabold uppercase tracking-widest text-ink/70">Your guesses</p>
            <div className="[&_ol]:justify-center">
              <GuessHistory guesses={guesses} stagger compact />
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-3">
            <button
              type="button"
              autoFocus
              onClick={onPlayAgain}
              className="btn-chunk flex h-16 items-center justify-center gap-2 rounded-2xl bg-primary text-3xl uppercase tracking-wider"
            >
              <PlayIcon className="text-2xl" />
              Try again
            </button>
            <button
              type="button"
              onClick={onMenu}
              className="btn-chunk h-12 rounded-2xl bg-paper text-xl uppercase tracking-wider"
            >
              Change level
            </button>
          </div>
        </div>
      </div>
    </ResultModal>
  );
}
