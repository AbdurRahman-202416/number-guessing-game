import type { CSSProperties } from "react";
import type { Difficulty, Guess } from "@/lib/game";
import { CoinIcon, FlameIcon, HeartIcon } from "@/components/icons";

const SHARDS = [
  { sx: -16, sy: -14, sr: -90 },
  { sx: 15, sy: -16, sr: 120 },
  { sx: -18, sy: 8, sr: 70 },
  { sx: 17, sy: 10, sr: -130 },
  { sx: 0, sy: -20, sr: 45 },
  { sx: 2, sy: 18, sr: -60 },
] as const;

interface HudProps {
  difficulty: Difficulty;
  guesses: readonly Guess[];
  progress: number;
  streak: number;
  sessionScore: number;
}

function Hearts({ difficulty, guesses }: Pick<HudProps, "difficulty" | "guesses">) {
  const lost = guesses.filter((guess) => guess.verdict !== "correct").length;
  const left = difficulty.maxTries - lost;
  const lastWasWrong = guesses.length > 0 && guesses[guesses.length - 1].verdict !== "correct";

  return (
    <div
      role="img"
      aria-label={`${left} of ${difficulty.maxTries} hearts left`}
      className="flex flex-wrap gap-x-1 gap-y-1.5"
    >
      {Array.from({ length: difficulty.maxTries }, (_, index) => {
        const isLost = index < lost;
        const justLost = lastWasWrong && index === lost - 1;
        const danger = !isLost && left === 1;
        return (
          <span
            key={index}
            className={`relative inline-flex ${difficulty.maxTries > 8 ? "text-[1.5rem]" : "text-[1.7rem]"}`}
          >
            <HeartIcon
              lost={isLost}
              className={
                justLost ? "heart-break" : isLost ? "" : danger ? "heart-danger" : "heart-alive"
              }
              style={{ "--delay": `${(index % 5) * 0.25}s` } as CSSProperties}
            />
            {justLost && (
              <span key={guesses.length} aria-hidden="true">
                <span className="minus-one outlined font-display font-bold text-hot">-1</span>
                {SHARDS.map((shard, i) => (
                  <span
                    key={i}
                    className="shard"
                    style={
                      {
                        "--sx": `${shard.sx}px`,
                        "--sy": `${shard.sy}px`,
                        "--sr": `${shard.sr}deg`,
                      } as CSSProperties
                    }
                  />
                ))}
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}

export function Hud({ difficulty, guesses, progress, streak, sessionScore }: HudProps) {
  const percent = Math.round(progress * 100);
  return (
    <section
      aria-label="Game status"
      className="sticker flex flex-col gap-2.5 bg-panel p-3"
    >
      <Hearts difficulty={difficulty} guesses={guesses} />

      <div className="flex items-center gap-2.5">
        <div className="sticker-sm flex min-h-11 flex-1 items-center gap-2 bg-accent px-2.5 py-1 text-ink">
          <CoinIcon className="shrink-0 text-2xl" />
          <span className="leading-none">
            <span className="block text-[0.65rem] font-extrabold uppercase tracking-widest">Score</span>
            <span key={sessionScore} className="numeral anim-pop inline-block text-2xl">
              {sessionScore}
            </span>
          </span>
        </div>
        <div
          className={`sticker-sm flex min-h-11 flex-1 items-center gap-2 px-2.5 py-1 text-ink ${
            streak > 0 ? "bg-primary" : "bg-paper/80"
          }`}
        >
          <FlameIcon lit={streak > 0} className={`shrink-0 text-2xl ${streak > 0 ? "heat-flicker" : ""}`} />
          <span className="leading-none">
            <span className="block text-[0.65rem] font-extrabold uppercase tracking-widest">Streak</span>
            <span key={streak} className="numeral anim-pop inline-block text-2xl">
              x{streak}
            </span>
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="font-display text-sm uppercase tracking-wider text-paper/90">Closing in</span>
        <div
          role="progressbar"
          aria-label="How much of the range you have ruled out"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percent}
          className="relative h-5 flex-1 overflow-hidden rounded-full border-[2.5px] border-ink bg-ink/60"
        >
          <div
            className="bar-fill absolute inset-0 rounded-full bg-good"
            style={{ "--p": Math.max(progress, 0.04) } as CSSProperties}
          />
        </div>
        <span className="numeral w-10 text-right text-lg text-paper">{percent}%</span>
      </div>
    </section>
  );
}
