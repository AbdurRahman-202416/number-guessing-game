import type { CSSProperties } from "react";
import type { Difficulty, Guess } from "@/lib/game";
import { HeatMeter } from "@/components/HeatMeter";
import { ArrowDownIcon, ArrowUpIcon, SparkleIcon } from "@/components/icons";

interface MysteryCardProps {
  difficulty: Difficulty;
  lastGuess: Guess | null;
  triesUsed: number;
  low: number;
  high: number;
}

const SPARKLES = [
  { top: "20%", left: "16%", size: "1.4rem", delay: "0s" },
  { top: "56%", left: "10%", size: "1rem", delay: "-0.7s" },
  { top: "24%", left: "80%", size: "1.1rem", delay: "-1.3s" },
  { top: "60%", left: "86%", size: "1.5rem", delay: "-0.4s" },
] as const;

export function MysteryCard({ difficulty, lastGuess, triesUsed, low, high }: MysteryCardProps) {
  const wrong = lastGuess !== null && lastGuess.verdict !== "correct";
  const tooHigh = lastGuess?.verdict === "high";

  const strip = !lastGuess
    ? { bg: "var(--secondary)", title: "Make your first guess!", sub: `Pick from ${difficulty.min} to ${difficulty.max}` }
    : tooHigh
      ? { bg: "var(--hot)", title: "Too high!", sub: `Go lower: it is ${low} to ${high}.` }
      : lastGuess.verdict === "low"
        ? { bg: "var(--info)", title: "Too low!", sub: `Go higher: it is ${low} to ${high}.` }
        : { bg: "var(--good)", title: "Got it!", sub: `${lastGuess.value} is the one!` };

  return (
    <div
      // Alternating keyframe names restart the shake on every wrong guess without remounting the card.
      className={`sticker relative overflow-hidden bg-paper text-ink ${
        wrong ? (triesUsed % 2 === 0 ? "anim-shake-a" : "anim-shake-b") : ""
      }`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: "radial-gradient(circle, var(--ink) 2px, transparent 2.5px)",
          backgroundSize: "18px 18px",
        }}
      />
      <div className="relative flex items-center justify-between px-3 pt-3">
        <span className="rounded-full border-2 border-ink bg-ink px-3 py-0.5 font-display text-xs uppercase tracking-widest text-paper">
          Mystery number
        </span>
        <span className="rounded-full border-2 border-ink bg-accent px-3 py-0.5 font-display text-xs uppercase tracking-widest">
          Try {Math.min(triesUsed + 1, difficulty.maxTries)} / {difficulty.maxTries}
        </span>
      </div>

      <div className="relative flex h-[5.8rem] items-center justify-center">
        {SPARKLES.map((sparkle, index) => (
          <span
            key={index}
            aria-hidden="true"
            className="twinkle absolute"
            style={
              { top: sparkle.top, left: sparkle.left, fontSize: sparkle.size, "--delay": sparkle.delay } as CSSProperties
            }
          >
            <SparkleIcon />
          </span>
        ))}
        <span
          aria-hidden="true"
          className="q-wiggle outlined font-display text-[6rem] font-bold leading-none text-primary"
        >
          ?
        </span>
      </div>

      <HeatMeter heat={lastGuess ? lastGuess.heat : null} />

      <div
        key={triesUsed}
        className={`${lastGuess ? "verdict-in" : ""} relative flex items-center gap-3 border-t-[3px] border-ink px-3 py-2`}
        style={{ background: strip.bg }}
      >
        {lastGuess && lastGuess.verdict !== "correct" && (
          <span className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-full border-[3px] border-ink bg-ink text-2xl text-paper">
            <span className={tooHigh ? "arrow-down flex" : "arrow-up flex"}>
              {tooHigh ? <ArrowDownIcon /> : <ArrowUpIcon />}
            </span>
          </span>
        )}
        <span className="min-w-0 flex-1 leading-tight">
          <span className="block font-display text-2xl uppercase tracking-wide sm:text-3xl">{strip.title}</span>
          <span className="block text-sm font-extrabold">{strip.sub}</span>
        </span>
        {lastGuess && (
          <span className="numeral shrink-0 rounded-xl border-[3px] border-ink bg-paper px-3 py-0.5 text-3xl">
            {lastGuess.value}
          </span>
        )}
      </div>
    </div>
  );
}
