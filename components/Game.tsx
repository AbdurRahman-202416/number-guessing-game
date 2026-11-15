"use client";

import { useState } from "react";
import { useGame } from "@/hooks/useGame";
import type { DifficultyId } from "@/lib/game";
import { StartScreen } from "@/components/StartScreen";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { Hud } from "@/components/Hud";
import { MysteryCard } from "@/components/MysteryCard";
import { RangeBar } from "@/components/RangeBar";
import { GuessPad } from "@/components/GuessPad";
import { GuessHistory } from "@/components/GuessHistory";
import { WinScreen } from "@/components/WinScreen";
import { LoseScreen } from "@/components/LoseScreen";
import { BackIcon } from "@/components/icons";
import { levelColor, levelIcon } from "@/components/levels";

export function Game() {
  const game = useGame();
  const [selected, setSelected] = useState<DifficultyId>("medium");
  const { state, best } = game;
  const { phase, difficulty, guesses, target } = state;

  if (phase === "select" || !difficulty || target === null) {
    return (
      <>
        <header className="flex justify-end pb-1">
          <ThemeSwitcher />
        </header>
        <StartScreen
          best={best}
          selected={selected}
          onSelect={setSelected}
          onPlay={game.startGame}
        />
      </>
    );
  }

  const lastGuess = guesses.length > 0 ? guesses[guesses.length - 1] : null;
  const finished = phase === "won" || phase === "lost";
  const span = difficulty.max - difficulty.min + 1;
  const progress = Math.min(1, Math.max(0, 1 - (game.high - game.low + 1) / span));

  const status = lastGuess
    ? lastGuess.verdict === "correct"
      ? `${lastGuess.value} is correct!`
      : `${lastGuess.value} is too ${lastGuess.verdict}. ${game.triesLeft} ${game.triesLeft === 1 ? "heart" : "hearts"} left. The number is between ${game.low} and ${game.high}.`
    : `Pick a number from ${difficulty.min} to ${difficulty.max}. You have ${difficulty.maxTries} hearts.`;

  return (
    <>
      <header className="flex items-center justify-between gap-2 pb-2.5">
        <button
          type="button"
          onClick={game.changeDifficulty}
          className="btn-chunk flex h-11 items-center gap-2 rounded-2xl bg-paper px-3 text-base uppercase tracking-wide"
        >
          <BackIcon className="text-xl" />
          Menu
        </button>
        <span
          className="sticker-sm flex min-h-11 items-center gap-2 rounded-2xl px-3 text-ink"
          style={{ background: levelColor(difficulty.id) }}
        >
          <span className="text-2xl">{levelIcon(difficulty.id)}</span>
          <span className="leading-none">
            <span className="block font-display text-lg uppercase">{difficulty.label}</span>
            <span className="block text-[0.7rem] font-extrabold">
              {difficulty.min}&ndash;{difficulty.max}
            </span>
          </span>
        </span>
        <ThemeSwitcher />
      </header>

      <p role="status" aria-live="polite" className="sr-only">
        {status}
      </p>

      {lastGuess && (
        <div
          key={guesses.length}
          aria-hidden="true"
          className="flash"
          style={{
            background:
              lastGuess.verdict === "correct"
                ? "var(--good)"
                : lastGuess.verdict === "high"
                  ? "var(--hot)"
                  : "var(--info)",
          }}
        />
      )}

      <div className="flex flex-col gap-3">
        <Hud
          difficulty={difficulty}
          guesses={guesses}
          progress={progress}
          streak={game.streak}
          sessionScore={game.sessionScore}
        />

        <MysteryCard
          difficulty={difficulty}
          lastGuess={lastGuess}
          triesUsed={guesses.length}
          low={game.low}
          high={game.high}
        />

        {!finished && (
          <GuessPad
            difficulty={difficulty}
            guessedValues={guesses.map((guess) => guess.value)}
            onGuess={game.submitGuess}
          />
        )}

        <RangeBar difficulty={difficulty} guesses={guesses} low={game.low} high={game.high} />

        <section aria-label="Guess history">
          <h2 className="mb-2 font-display text-sm uppercase tracking-wider text-paper/90">
            Your guesses ({guesses.length})
          </h2>
          <GuessHistory guesses={guesses} />
        </section>
      </div>

      {phase === "won" && (
        <WinScreen
          difficulty={difficulty}
          target={target}
          triesUsed={guesses.length}
          score={game.score}
          best={Math.max(best[difficulty.id] ?? 0, game.score)}
          isNewBest={game.isNewBest}
          streak={game.streak}
          sessionScore={game.sessionScore}
          onPlayAgain={game.playAgain}
          onMenu={game.changeDifficulty}
        />
      )}
      {phase === "lost" && (
        <LoseScreen
          difficulty={difficulty}
          target={target}
          guesses={guesses}
          onPlayAgain={game.playAgain}
          onMenu={game.changeDifficulty}
        />
      )}
    </>
  );
}
