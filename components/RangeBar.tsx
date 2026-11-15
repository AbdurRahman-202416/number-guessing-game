import type { CSSProperties } from "react";
import type { Difficulty, Guess } from "@/lib/game";

interface RangeBarProps {
  difficulty: Difficulty;
  guesses: readonly Guess[];
  low: number;
  high: number;
}

function Buddy() {
  return (
    <svg viewBox="0 0 48 48" width="100%" height="100%" aria-hidden="true" focusable="false">
      <ellipse cx={17} cy={43} rx={5} ry={3} fill="var(--ink)" />
      <ellipse cx={31} cy={43} rx={5} ry={3} fill="var(--ink)" />
      <path d="M24 5v6" stroke="var(--ink)" strokeWidth={3} strokeLinecap="round" />
      <circle cx={24} cy={5} r={3.500} fill="var(--hot)" stroke="var(--ink)" strokeWidth={2.500} />
      <circle cx={24} cy={26} r={16.500} fill="var(--accent)" stroke="var(--ink)" strokeWidth={3.500} />
      <circle cx={18} cy={23} r={4.500} fill="#fff" stroke="var(--ink)" strokeWidth={2} />
      <circle cx={30} cy={23} r={4.500} fill="#fff" stroke="var(--ink)" strokeWidth={2} />
      <circle cx={19} cy={24} r={2} fill="var(--ink)" />
      <circle cx={31} cy={24} r={2} fill="var(--ink)" />
      <path d="M17.500 31c2 3.500 11 3.500 13 0" fill="none" stroke="var(--ink)" strokeWidth={2.800} strokeLinecap="round" />
      <circle cx={13} cy={30} r={2.500} fill="var(--hot)" opacity={0.6} />
      <circle cx={35} cy={30} r={2.500} fill="var(--hot)" opacity={0.6} />
    </svg>
  );
}

export function RangeBar({ difficulty, guesses, low, high }: RangeBarProps) {
  const span = difficulty.max - difficulty.min + 1;
  const start = (low - difficulty.min) / span;
  const end = (high - difficulty.min + 1) / span;
  const center = (start + end) / 2;
  const count = high - low + 1;

  return (
    <figure
      className="sticker-sm m-0 bg-panel px-3 pb-3 pt-2"
      aria-label={`The secret number is between ${low} and ${high}`}
    >
      <figcaption className="flex items-center justify-between gap-2">
        <span className="rounded-xl border-[2.5px] border-ink bg-info px-3 py-0.5 text-ink">
          <span className="block text-[0.6rem] font-extrabold uppercase leading-none tracking-widest">From</span>
          <span className="numeral block text-2xl leading-tight">{low}</span>
        </span>
        <span className="text-center font-display text-sm uppercase leading-tight tracking-wider text-paper/90">
          {count === 1 ? "Only one left!" : `${count} numbers left`}
        </span>
        <span className="rounded-xl border-[2.5px] border-ink bg-primary px-3 py-0.5 text-right text-ink">
          <span className="block text-[0.6rem] font-extrabold uppercase leading-none tracking-widest">To</span>
          <span className="numeral block text-2xl leading-tight">{high}</span>
        </span>
      </figcaption>

      <div className="@container relative mt-1 h-[4.2rem]">
        <div className="absolute inset-x-0 bottom-1.5 h-6 overflow-hidden rounded-full border-[3px] border-ink bg-ink/70">
          <div
            className="range-live absolute inset-0"
            style={{
              clipPath: `inset(0 ${(1 - end) * 100}% 0 ${start * 100}%)`,
            }}
          />
          {guesses.map((guess) => (
            <span
              key={guess.value}
              className="absolute top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-paper/70"
              style={{ left: `${((guess.value - difficulty.min + 0.5) / span) * 100}%` }}
            />
          ))}
        </div>
        <div
          className="range-buddy absolute bottom-3 left-0 size-11"
          style={{ "--p": center } as CSSProperties}
        >
          <div className="buddy-hop size-full">
            <Buddy />
          </div>
        </div>
      </div>
    </figure>
  );
}
