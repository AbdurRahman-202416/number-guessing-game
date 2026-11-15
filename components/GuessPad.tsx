"use client";

import { useEffect, useRef, useState, type FormEvent, type MouseEvent } from "react";
import { validateGuess, type Difficulty } from "@/lib/game";
import { BackspaceIcon, CheckIcon } from "@/components/icons";

interface GuessPadProps {
  difficulty: Difficulty;
  guessedValues: readonly number[];
  onGuess: (value: number) => void;
}

const DIGITS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"] as const;
const KEY_COLORS = [
  "var(--info)",
  "var(--accent)",
  "var(--good)",
  "var(--secondary)",
  "var(--primary)",
];

export function GuessPad({ difficulty, guessedValues, onGuess }: GuessPadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [raw, setRaw] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [errorKey, setErrorKey] = useState(0);
  const [sent, setSent] = useState(0);
  const maxLength = String(difficulty.max).length;

  useEffect(() => {
    // Only pop the keyboard up on devices with a real pointer; touch players have the pad.
    if (window.matchMedia("(pointer: fine)").matches) inputRef.current?.focus();
  }, []);

  function update(next: string) {
    setRaw(next.replace(/\D/g, "").slice(0, maxLength));
    if (error) setError(null);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = validateGuess(raw, difficulty, guessedValues);
    if (!result.ok) {
      setError(result.message);
      setErrorKey((key) => key + 1);
      return;
    }
    setError(null);
    setRaw("");
    setSent((count) => count + 1);
    onGuess(result.value);
  }

  // Keep focus on the input while using the pad so the keyboard caret never jumps.
  const keepFocus = (event: MouseEvent) => event.preventDefault();

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-2.5">
      <div>
        <label htmlFor="guess" className="mb-1 block font-display text-sm uppercase tracking-wider text-paper/90">
          Your guess ({difficulty.min} to {difficulty.max})
        </label>
        <div className="flex gap-2.5">
          <div className={`flex-1 ${error ? (errorKey % 2 === 0 ? "anim-shake-a" : "anim-shake-b") : ""}`}>
            <input
              ref={inputRef}
              id="guess"
              name="guess"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete="off"
              enterKeyHint="go"
              value={raw}
              placeholder="?"
              onChange={(event) => update(event.target.value)}
              aria-invalid={error ? true : undefined}
              aria-describedby="guess-error"
              className={`numeral h-14 w-full rounded-2xl border-[3px] bg-paper px-3 text-center text-4xl text-ink shadow-[0_5px_0_var(--ink)] placeholder:text-ink/30 ${
                error ? "border-hot outline-4 outline-hot" : "border-ink"
              }`}
            />
          </div>
          <button
            type="button"
            aria-label="Delete last digit"
            onMouseDown={keepFocus}
            onClick={() => update(raw.slice(0, -1))}
            className="btn-chunk flex size-14 shrink-0 items-center justify-center rounded-2xl bg-paper text-3xl"
          >
            <BackspaceIcon />
          </button>
        </div>
        <p
          id="guess-error"
          role="alert"
          className={error ? "anim-pop sticker-sm mt-3 bg-hot px-3 py-2 text-sm font-extrabold text-ink" : "sr-only"}
        >
          {error}
        </p>
      </div>

      <div className="grid grid-cols-5 gap-2.5" role="group" aria-label="Number pad">
        {DIGITS.map((digit, index) => (
          <button
            key={digit}
            type="button"
            onMouseDown={keepFocus}
            onClick={() => update(raw + digit)}
            className="btn-chunk numeral h-11 rounded-xl text-2xl"
            style={{ background: KEY_COLORS[index % KEY_COLORS.length] }}
          >
            {digit}
          </button>
        ))}
      </div>

      <div key={sent} className={sent > 0 ? "btn-bounce" : ""}>
        <button
          type="submit"
          className="btn-chunk flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-primary text-3xl uppercase tracking-wider"
        >
          <CheckIcon className="text-3xl" />
          Guess!
        </button>
      </div>
    </form>
  );
}
