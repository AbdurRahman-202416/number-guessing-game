"use client";

import { useCallback, useEffect, useReducer } from "react";
import {
  calcScore,
  gameReducer,
  getBounds,
  initialGameState,
  randomTarget,
  type Difficulty,
  type GameState,
} from "@/lib/game";
import { useBestScores } from "@/hooks/useBestScores";
import type { BestScores } from "@/lib/storage";

export interface UseGame {
  state: GameState;
  best: BestScores;
  low: number;
  high: number;
  triesLeft: number;
  score: number;
  isNewBest: boolean;
  streak: number;
  sessionScore: number;
  startGame: (difficulty: Difficulty) => void;
  submitGuess: (value: number) => void;
  playAgain: () => void;
  changeDifficulty: () => void;
}

export function useGame(): UseGame {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);
  const { best, recordScore } = useBestScores();
  const { difficulty, guesses, phase, bestBefore } = state;

  const startGame = useCallback(
    (next: Difficulty) => {
      // Random is only ever called from an event handler, never during render.
      dispatch({
        type: "start",
        difficulty: next,
        target: randomTarget(next),
        bestBefore: best[next.id] ?? 0,
      });
    },
    [best],
  );

  const submitGuess = useCallback((value: number) => {
    dispatch({ type: "guess", value });
  }, []);

  const playAgain = useCallback(() => {
    if (difficulty) startGame(difficulty);
  }, [difficulty, startGame]);

  const changeDifficulty = useCallback(() => {
    dispatch({ type: "reset" });
  }, []);

  const triesLeft = difficulty ? difficulty.maxTries - guesses.length : 0;
  const score = phase === "won" && difficulty ? calcScore(difficulty, triesLeft) : 0;
  const isNewBest = phase === "won" && score > bestBefore;
  const bounds = difficulty
    ? getBounds(guesses, difficulty)
    : { low: 0, high: 0 };

  useEffect(() => {
    if (phase === "won" && difficulty && score > 0) {
      recordScore(difficulty.id, score);
    }
  }, [phase, difficulty, score, recordScore]);

  return {
    state,
    best,
    low: bounds.low,
    high: bounds.high,
    triesLeft,
    score,
    isNewBest,
    streak: state.streak,
    sessionScore: state.sessionScore,
    startGame,
    submitGuess,
    playAgain,
    changeDifficulty,
  };
}
