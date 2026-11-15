"use client";

import type { CSSProperties } from "react";
import { calcStars, type Difficulty } from "@/lib/game";
import { useCountUp } from "@/hooks/useCountUp";
import { Confetti } from "@/components/Confetti";
import { ResultModal } from "@/components/ResultModal";
import { CoinIcon, FlameIcon, PlayIcon, StarIcon } from "@/components/icons";

interface WinScreenProps {
  difficulty: Difficulty;
  target: number;
  triesUsed: number;
  score: number;
  best: number;
  isNewBest: boolean;
  streak: number;
  sessionScore: number;
  onPlayAgain: () => void;
  onMenu: () => void;
}

function Trophy({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true" focusable="false">
      <ellipse cx={60} cy={112} rx={34} ry={6} fill="var(--ink)" opacity={0.25} />
      <path d="M32 26H12c0 22 8 34 26 38M88 26h20c0 22-8 34-26 38" fill="none" stroke="var(--ink)" strokeWidth={14} strokeLinecap="round" />
      <path d="M32 26H12c0 22 8 34 26 38M88 26h20c0 22-8 34-26 38" fill="none" stroke="var(--accent)" strokeWidth={7} strokeLinecap="round" />
      <path d="M30 10h60v38c0 20-13 32-30 32S30 68 30 48V10Z" fill="var(--accent)" stroke="var(--ink)" strokeWidth={5} strokeLinejoin="round" />
      <path d="M40 18v30c0 8 3 14 8 18" fill="none" stroke="#fff" strokeWidth={6} strokeLinecap="round" opacity={0.65} />
      <path d="m60 22 5.500 11.500 12.500 1.800-9 8.800 2.100 12.400L60 50.600 48.900 56.500 51 44.100l-9-8.800 12.500-1.800L60 22Z" fill="var(--hot)" stroke="var(--ink)" strokeWidth={3.500} strokeLinejoin="round" />
      <path d="M52 78h16v14H52z" fill="var(--accent)" stroke="var(--ink)" strokeWidth={5} strokeLinejoin="round" />
      <path d="M36 92h48a4 4 0 0 1 4 4v10H32V96a4 4 0 0 1 4-4Z" fill="var(--primary)" stroke="var(--ink)" strokeWidth={5} strokeLinejoin="round" />
      <rect x={48} y={96} width={24} height={6} rx={3} fill="var(--paper)" stroke="var(--ink)" strokeWidth={2.500} />
    </svg>
  );
}

export function WinScreen({
  difficulty,
  target,
  triesUsed,
  score,
  best,
  isNewBest,
  streak,
  sessionScore,
  onPlayAgain,
  onMenu,
}: WinScreenProps) {
  const shownScore = useCountUp(score, 1100, 500);
  const stars = calcStars(difficulty, triesUsed);

  return (
    <ResultModal
      labelledBy="result-title"
      backdrop={<Confetti layer="back" />}
      overlay={<Confetti layer="front" />}
    >
      <div className="relative w-full pt-16">
        <div className="pointer-events-none absolute left-1/2 top-0 z-0 size-[34rem] max-w-[160vw] -translate-x-1/2 -translate-y-[28%]" aria-hidden="true">
          <div className="rays size-full" />
        </div>

        <Trophy className="trophy-in absolute left-1/2 top-0 z-20 size-36 -translate-x-1/2" />

        <div className="sticker panel-in relative z-10 bg-paper px-5 pb-5 pt-[6.2rem] text-center">
          {isNewBest && (
            <span className="ribbon-pulse absolute -right-3 top-7 z-30 flex items-center gap-1.5 rounded-lg border-[3px] border-ink bg-primary px-3 py-1.5 font-display text-lg uppercase tracking-wide text-ink shadow-[3px_4px_0_var(--ink)]">
              <StarIcon className="text-xl" />
              New best!
            </span>
          )}

          <h2 id="result-title" className="outlined font-display text-[3.4rem] font-bold uppercase leading-none text-primary">
            You win!
          </h2>
          <p className="mt-2 font-bold text-ink/80">
            Cracked <span className="font-extrabold">{difficulty.label}</span> in {triesUsed} of {difficulty.maxTries} tries
          </p>

          <div className="mt-4 flex items-center justify-center gap-3">
            <span className="text-sm font-extrabold uppercase tracking-wider text-ink/70">The number was</span>
            <span className="anim-pop numeral flex size-[4.4rem] items-center justify-center rounded-full border-[3px] border-ink bg-secondary text-4xl shadow-[3px_4px_0_var(--ink)]" style={{ "--delay": "0.3s" } as CSSProperties}>
              {target}
            </span>
          </div>

          <div className="mt-3 flex justify-center gap-1 text-[2.8rem]" role="img" aria-label={`${stars} of 3 stars earned`}>
            {[1, 2, 3].map((n) => (
              <span
                key={n}
                className={n <= stars ? "star-pop flex" : "flex"}
                style={{ "--delay": `${0.5 + n * 0.22}s` } as CSSProperties}
              >
                <StarIcon on={n <= stars} />
              </span>
            ))}
          </div>

          <p className="mt-2 text-sm font-extrabold uppercase tracking-widest text-ink/70">Points earned</p>
          <p className="numeral outlined text-[4.2rem] leading-none text-accent">+{shownScore}</p>

          <dl className="mt-4 grid grid-cols-3 gap-2 text-ink">
            <div className="sticker-sm bg-info py-2">
              <dt className="text-[0.65rem] font-extrabold uppercase tracking-widest">Best</dt>
              <dd className="numeral flex items-center justify-center gap-1 text-2xl leading-tight">
                <CoinIcon className="text-xl" />
                {best}
              </dd>
            </div>
            <div className="sticker-sm bg-accent py-2">
              <dt className="text-[0.65rem] font-extrabold uppercase tracking-widest">Streak</dt>
              <dd className="numeral flex items-center justify-center gap-1 text-2xl leading-tight">
                <FlameIcon className="text-xl" />x{streak}
              </dd>
            </div>
            <div className="sticker-sm bg-good py-2">
              <dt className="text-[0.65rem] font-extrabold uppercase tracking-widest">Total</dt>
              <dd className="numeral text-2xl leading-tight">{sessionScore}</dd>
            </div>
          </dl>

          <div className="mt-5 flex flex-col gap-3">
            <button
              type="button"
              autoFocus
              onClick={onPlayAgain}
              className="btn-chunk flex h-16 items-center justify-center gap-2 rounded-2xl bg-primary text-3xl uppercase tracking-wider"
            >
              <PlayIcon className="text-2xl" />
              Play again
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
