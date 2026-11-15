"use client";

import { useGame } from "@/hooks/useGame";
import { DifficultyPicker } from "@/components/DifficultyPicker";
import { RangeBar } from "@/components/RangeBar";
import { FeedbackPanel } from "@/components/FeedbackPanel";
import { GuessForm } from "@/components/GuessForm";
import { TriesMeter } from "@/components/TriesMeter";
import { GuessHistory } from "@/components/GuessHistory";
import { ResultModal } from "@/components/ResultModal";

export function Game() {
  const game = useGame();
  const { state, best } = game;
  const { phase, difficulty, guesses, target } = state;

  if (phase === "select" || !difficulty || target === null) {
    return <DifficultyPicker best={best} onSelect={game.startGame} />;
  }

  const lastGuess = guesses.length > 0 ? guesses[guesses.length - 1] : null;
  const finished = phase === "won" || phase === "lost";
  const bestForLevel = best[difficulty.id] ?? 0;

  return (
    <>
      <header className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 pb-6 sm:pb-8">
        <p className="display text-2xl">
          {difficulty.label}
          <span className="ml-3 text-base font-semibold text-mist">
            {difficulty.min}&ndash;{difficulty.max}
          </span>
        </p>
        <div className="flex items-center gap-4">
          <p className="text-mist">
            Best score{" "}
            <span className="numeral text-xl text-paper">{bestForLevel > 0 ? bestForLevel : "none"}</span>
          </p>
          <button
            type="button"
            onClick={game.changeDifficulty}
            className="btn btn-ghost min-h-11 px-4 text-sm"
          >
            Change difficulty
          </button>
        </div>
      </header>

      <div className="grid flex-1 content-start gap-10 lg:grid-cols-[minmax(0,1fr)_21rem] lg:gap-12">
        <section aria-label="Play" className="flex flex-col gap-8">
          <RangeBar
            difficulty={difficulty}
            guesses={guesses}
            low={game.low}
            high={game.high}
          />
          <FeedbackPanel
            difficulty={difficulty}
            lastGuess={lastGuess}
            triesLeft={game.triesLeft}
          />
          {!finished && (
            <GuessForm
              difficulty={difficulty}
              guessedValues={guesses.map((guess) => guess.value)}
              onGuess={game.submitGuess}
            />
          )}
          <TriesMeter maxTries={difficulty.maxTries} used={guesses.length} />
        </section>

        <aside className="lg:sticky lg:top-8 lg:self-start">
          <GuessHistory guesses={guesses} />
        </aside>
      </div>

      {finished && (
        <ResultModal
          won={phase === "won"}
          difficulty={difficulty}
          target={target}
          triesUsed={guesses.length}
          score={game.score}
          best={bestForLevel}
          isNewBest={game.isNewBest}
          onPlayAgain={game.playAgain}
          onChangeDifficulty={game.changeDifficulty}
        />
      )}
    </>
  );
}
