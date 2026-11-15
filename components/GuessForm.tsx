"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { validateGuess, type Difficulty } from "@/lib/game";

interface GuessFormProps {
  difficulty: Difficulty;
  guessedValues: readonly number[];
  onGuess: (value: number) => void;
}

export function GuessForm({ difficulty, guessedValues, onGuess }: GuessFormProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [raw, setRaw] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [shakeKey, setShakeKey] = useState(0);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = validateGuess(raw, difficulty, guessedValues);
    if (!result.ok) {
      setError(result.message);
      setShakeKey((key) => key + 1);
      inputRef.current?.focus();
      return;
    }
    setError(null);
    setRaw("");
    onGuess(result.value);
    inputRef.current?.focus();
  }

  const errorId = "guess-error";

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full">
      <label htmlFor="guess" className="mb-2 block text-lg font-bold">
        Your guess
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <div
          key={shakeKey}
          className={`flex-1 ${shakeKey > 0 ? "shake" : ""}`}
        >
          <input
            ref={inputRef}
            id="guess"
            name="guess"
            type="number"
            inputMode="numeric"
            min={difficulty.min}
            max={difficulty.max}
            step={1}
            autoComplete="off"
            value={raw}
            placeholder={`${difficulty.min}–${difficulty.max}`}
            onChange={(event) => {
              setRaw(event.target.value);
              if (error) setError(null);
            }}
            aria-invalid={error ? true : undefined}
            aria-describedby={errorId}
            className={`numeral h-16 w-full rounded-xl bg-paper px-5 text-4xl text-night placeholder:text-night/40 ${
              error ? "ring-4 ring-coral" : ""
            }`}
          />
        </div>
        <button type="submit" className="btn btn-primary h-16 px-10 text-xl">
          Guess
        </button>
      </div>
      <p
        id={errorId}
        role="alert"
        className="mt-3 min-h-6 font-semibold text-butter"
      >
        {error}
      </p>
    </form>
  );
}
