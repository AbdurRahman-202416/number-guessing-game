"use client";

import { useEffect, useRef } from "react";
import type { Difficulty } from "@/lib/game";
import { Confetti } from "@/components/Confetti";

interface ResultModalProps {
  won: boolean;
  difficulty: Difficulty;
  target: number;
  triesUsed: number;
  score: number;
  best: number;
  isNewBest: boolean;
  onPlayAgain: () => void;
  onChangeDifficulty: () => void;
}

export function ResultModal({
  won,
  difficulty,
  target,
  triesUsed,
  score,
  best,
  isNewBest,
  onPlayAgain,
  onChangeDifficulty,
}: ResultModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
    return () => {
      if (dialog?.open) dialog.close();
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="result-title"
      aria-describedby="result-detail"
      // Esc would leave the board in a finished state, so the buttons are the way out.
      onCancel={(event) => event.preventDefault()}
      className="fixed inset-0 m-0 h-full max-h-none w-full max-w-none overflow-hidden bg-transparent p-0 text-night"
    >
      {won && <Confetti />}
      <div className="grid h-full place-items-center overflow-y-auto p-4">
        <div
          className={`${won ? "on-paper" : ""} pop-in relative w-full max-w-md rounded-3xl p-7 text-center shadow-[0_24px_60px_rgb(5_8_50/0.55)] sm:p-9 ${
            won ? "bg-paper text-night" : "bg-night text-paper"
          }`}
                  >
          <h2 id="result-title" className="display text-4xl sm:text-5xl">
            {won ? "You found it." : "Out of tries."}
          </h2>

          <p className={`mt-5 ${won ? "text-night/75" : "text-mist"}`}>
            {won ? "The number was" : "The number was hiding at"}
          </p>
          <p
            className={`numeral number-drop my-1 text-[7rem] leading-none ${
              won ? "text-ultra" : "text-butter"
            }`}
          >
            {target}
          </p>

          <div id="result-detail" className={won ? "text-night/80" : "text-mist"}>
            {won ? (
              <>
                <p className="text-lg">
                  Solved in {triesUsed} of {difficulty.maxTries} tries.
                </p>
                <p className="numeral mt-4 text-5xl text-night">+{score}</p>
                <p className="mt-1 font-bold">
                  {isNewBest
                    ? `New best on ${difficulty.label}.`
                    : `Best on ${difficulty.label}: ${best}`}
                </p>
              </>
            ) : (
              <p className="text-lg">
                You used all {difficulty.maxTries} tries on {difficulty.label}. No score this round.
              </p>
            )}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              autoFocus
              onClick={onPlayAgain}
              className="btn btn-primary"
            >
              Play again
            </button>
            <button
              type="button"
              onClick={onChangeDifficulty}
              className="btn btn-ghost"
            >
              Change difficulty
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}
