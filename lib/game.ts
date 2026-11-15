export type DifficultyId = "easy" | "medium" | "hard";

export interface Difficulty {
  id: DifficultyId;
  label: string;
  min: number;
  max: number;
  maxTries: number;
  /** Points per remaining try (plus one for the winning guess). */
  multiplier: number;
}

export const DIFFICULTIES: readonly Difficulty[] = [
  { id: "easy", label: "Easy", min: 1, max: 50, maxTries: 10, multiplier: 10 },
  { id: "medium", label: "Medium", min: 1, max: 100, maxTries: 7, multiplier: 20 },
  { id: "hard", label: "Hard", min: 1, max: 500, maxTries: 9, multiplier: 30 },
];

export type Verdict = "low" | "high" | "correct";
export type Heat = "cold" | "warm" | "hot" | "found";

export interface Guess {
  value: number;
  verdict: Verdict;
  heat: Heat;
}

export type Phase = "select" | "playing" | "won" | "lost";

export interface GameState {
  phase: Phase;
  difficulty: Difficulty | null;
  target: number | null;
  guesses: Guess[];
  /** Best score for this difficulty when the round began. */
  bestBefore: number;
}

export type GameAction =
  | { type: "start"; difficulty: Difficulty; target: number; bestBefore: number }
  | { type: "guess"; value: number }
  | { type: "reset" };

export const initialGameState: GameState = {
  phase: "select",
  difficulty: null,
  target: null,
  guesses: [],
  bestBefore: 0,
};

export function randomTarget(difficulty: Difficulty): number {
  const span = difficulty.max - difficulty.min + 1;
  return Math.floor(Math.random() * span) + difficulty.min;
}

export function getHeat(value: number, target: number, difficulty: Difficulty): Heat {
  const distance = Math.abs(value - target);
  if (distance === 0) return "found";
  const span = difficulty.max - difficulty.min + 1;
  if (distance <= Math.max(2, Math.ceil(span * 0.05))) return "hot";
  if (distance <= Math.ceil(span * 0.15)) return "warm";
  return "cold";
}

export function getBounds(
  guesses: readonly Guess[],
  difficulty: Difficulty,
): { low: number; high: number } {
  let low = difficulty.min;
  let high = difficulty.max;
  for (const guess of guesses) {
    if (guess.verdict === "low") low = Math.max(low, guess.value + 1);
    if (guess.verdict === "high") high = Math.min(high, guess.value - 1);
  }
  return { low, high };
}

export function calcScore(difficulty: Difficulty, triesLeft: number): number {
  return (triesLeft + 1) * difficulty.multiplier;
}

export type Validation =
  | { ok: true; value: number }
  | { ok: false; message: string };

export function validateGuess(
  raw: string,
  difficulty: Difficulty,
  guessedValues: readonly number[],
): Validation {
  const trimmed = raw.trim();
  if (trimmed === "") {
    return { ok: false, message: "Type a number first, then press Guess." };
  }
  const value = Number(trimmed);
  if (!Number.isFinite(value)) {
    return { ok: false, message: "That isn't a number. Try digits only." };
  }
  if (!Number.isInteger(value)) {
    return { ok: false, message: "Whole numbers only, no decimals." };
  }
  if (value < difficulty.min || value > difficulty.max) {
    return {
      ok: false,
      message: `Stay in range: pick a number from ${difficulty.min} to ${difficulty.max}.`,
    };
  }
  if (guessedValues.includes(value)) {
    return {
      ok: false,
      message: `You already tried ${value}. Pick a number you haven't guessed.`,
    };
  }
  return { ok: true, value };
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "start":
      return {
        phase: "playing",
        difficulty: action.difficulty,
        target: action.target,
        guesses: [],
        bestBefore: action.bestBefore,
      };
    case "guess": {
      const { difficulty, target, guesses, phase } = state;
      if (phase !== "playing" || !difficulty || target === null) return state;
      if (guesses.some((g) => g.value === action.value)) return state;

      const verdict: Verdict =
        action.value === target ? "correct" : action.value < target ? "low" : "high";
      const guess: Guess = {
        value: action.value,
        verdict,
        heat: getHeat(action.value, target, difficulty),
      };
      const nextGuesses = [...guesses, guess];
      const nextPhase: Phase =
        verdict === "correct"
          ? "won"
          : nextGuesses.length >= difficulty.maxTries
            ? "lost"
            : "playing";
      return { ...state, guesses: nextGuesses, phase: nextPhase };
    }
    case "reset":
      return initialGameState;
  }
}
