"use client";

import type { CSSProperties } from "react";
import { DIFFICULTIES, type Difficulty, type DifficultyId } from "@/lib/game";
import type { BestScores } from "@/lib/storage";
import { CoinIcon, PlayIcon, StarIcon } from "@/components/icons";
import { levelColor, levelIcon } from "@/components/levels";

const LOGO_LETTERS = ["N", "U", "M", "B", "E", "R"] as const;
const LOGO_COLORS = [
  "var(--primary)",
  "var(--accent)",
  "var(--info)",
  "var(--good)",
  "var(--secondary)",
  "var(--hot)",
];
const LOGO_TILTS = [-5, 4, -3, 5, -4, 3];

function Logo() {
  return (
    <div className="relative flex flex-col items-center pb-2 pt-4 text-center">
      <h1 aria-label="Guess the Number" className="flex flex-col items-center">
        <span
          aria-hidden="true"
          className="slide-up relative -rotate-3 rounded-xl border-[3px] border-ink bg-accent px-5 py-1 font-display text-2xl uppercase tracking-[0.18em] text-ink shadow-[3px_4px_0_var(--ink)]"
        >
          Guess the
        </span>
        <span aria-hidden="true" className="mt-2 flex">
          {LOGO_LETTERS.map((letter, index) => (
            <span
              key={letter}
              className="logo-letter outlined font-display text-[clamp(3.2rem,15.5vw,5.4rem)] font-bold leading-none"
              style={
                {
                  color: LOGO_COLORS[index],
                  "--delay": `${index * 0.12}s`,
                  "--tilt": `${LOGO_TILTS[index]}deg`,
                } as CSSProperties
              }
            >
              {letter}
            </span>
          ))}
        </span>
      </h1>

      <span
        aria-hidden="true"
        className="coin-float sticker-sm absolute -left-1 top-5 flex size-11 items-center justify-center bg-info font-display text-2xl text-ink"
        style={{ "--rot": "-12deg", "--dur": "4.6s" } as CSSProperties}
      >
        7
      </span>
      <span
        aria-hidden="true"
        className="coin-float sticker-sm absolute -right-1 top-2 flex size-12 items-center justify-center rounded-full bg-primary font-display text-3xl text-ink"
        style={{ "--rot": "10deg", "--dur": "5.4s", "--delay": "-2s" } as CSSProperties}
      >
        ?
      </span>
      <p className="slide-up mt-3 max-w-[18rem] text-lg font-bold text-paper/90" style={{ "--delay": "0.15s" } as CSSProperties}>
        Crack the secret code before your hearts run out!
      </p>
    </div>
  );
}

interface StartScreenProps {
  best: BestScores;
  selected: DifficultyId;
  onSelect: (id: DifficultyId) => void;
  onPlay: (difficulty: Difficulty) => void;
}

export function StartScreen({ best, selected, onSelect, onPlay }: StartScreenProps) {
  const current = DIFFICULTIES.find((level) => level.id === selected) ?? DIFFICULTIES[1];

  return (
    <div className="flex flex-1 flex-col">
      <Logo />

      <fieldset className="mt-4 flex flex-col gap-4 border-0 p-0">
        <legend className="slide-up mb-3 w-full text-center font-display text-xl uppercase tracking-widest text-paper">
          Choose your level
        </legend>
        {DIFFICULTIES.map((level, index) => {
          const bestScore = best[level.id] ?? 0;
          const color = levelColor(level.id);
          return (
            <label
              key={level.id}
              className="slide-up relative block"
              style={{ "--delay": `${0.2 + index * 0.09}s` } as CSSProperties}
            >
              <input
                type="radio"
                name="level"
                value={level.id}
                checked={level.id === selected}
                onChange={() => onSelect(level.id)}
                className="level-input sr-only"
              />
              <span
                className="level-card sticker flex items-center gap-3 p-3 text-ink"
                style={{ background: color }}
              >
                <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl border-[3px] border-ink bg-paper/35 text-[2.1rem] sm:size-16">
                  {levelIcon(level.id)}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-[1.7rem] leading-none">{level.label}</span>
                  <span className="mt-1 block text-sm font-extrabold leading-tight">
                    {level.min}&ndash;{level.max} &middot; {level.maxTries} hearts
                  </span>
                  <span className="block text-xs font-bold uppercase tracking-wider opacity-80">
                    {level.tagline}
                  </span>
                </span>
                <span className="flex shrink-0 flex-col items-end gap-1.5">
                  <span className="flex text-[1.35rem]" role="img" aria-label={`Difficulty ${level.rating} of 3 stars`}>
                    {[1, 2, 3].map((n) => (
                      <StarIcon key={n} on={n <= level.rating} />
                    ))}
                  </span>
                  <span className="flex items-center gap-1 rounded-full border-2 border-ink bg-ink px-2 py-0.5 text-xs font-extrabold text-paper">
                    <CoinIcon className="text-sm" />
                    {bestScore > 0 ? `Best ${bestScore}` : "No best yet"}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="level-tick absolute -right-2 -top-3 flex size-8 items-center justify-center rounded-full border-[3px] border-ink bg-paper text-lg text-ink"
                >
                  <StarIcon />
                </span>
              </span>
            </label>
          );
        })}
      </fieldset>

      <div className="slide-up mt-7" style={{ "--delay": "0.5s" } as CSSProperties}>
        <button
          type="button"
          onClick={() => onPlay(current)}
          className="btn-chunk play-btn flex h-[4.5rem] w-full items-center justify-center gap-3 rounded-3xl bg-primary text-[2.4rem] uppercase tracking-wider"
        >
          <PlayIcon className="text-[2rem]" />
          Play!
        </button>
        <p className="mt-4 text-center text-sm font-bold text-paper/80">
          Playing <span className="font-extrabold text-accent">{current.label}</span>: find the number from{" "}
          {current.min} to {current.max}
        </p>
      </div>
    </div>
  );
}
