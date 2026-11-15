import type { Difficulty, Guess } from "@/lib/game";

interface RangeBarProps {
  difficulty: Difficulty;
  guesses: readonly Guess[];
  low: number;
  high: number;
}

export function RangeBar({ difficulty, guesses, low, high }: RangeBarProps) {
  const { min, max } = difficulty;
  const span = max - min + 1;
  const remaining = high - low + 1;

  const leftPct = ((low - min) / span) * 100;
  const widthPct = (remaining / span) * 100;
  const centerPct = leftPct + widthPct / 2;
  const lastValue = guesses.length > 0 ? guesses[guesses.length - 1].value : null;

  const description = `The hidden number is between ${low} and ${high}. ${remaining} ${
    remaining === 1 ? "number" : "numbers"
  } left out of ${min} to ${max}.`;

  return (
    <figure className="m-0" role="img" aria-label={description}>
      <div className="flex items-end justify-between gap-4" aria-hidden="true">
        <div>
          <div className="numeral text-[clamp(3.25rem,15vw,6rem)]">{low}</div>
          <div className="mt-1 text-sm text-mist">lowest it can be</div>
        </div>
        <div className="pb-1 text-right">
          <div className="numeral text-[clamp(3.25rem,15vw,6rem)]">{high}</div>
          <div className="mt-1 text-sm text-mist">highest it can be</div>
        </div>
      </div>

      <div
        className="ruler-track relative mt-5 h-16 overflow-hidden rounded-md"
        aria-hidden="true"
      >
        <div
          className="ruler-live absolute inset-y-0"
          style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
        />
        {guesses.map((guess) => {
          const position = ((guess.value - min + 0.5) / span) * 100;
          const isLast = guess.value === lastValue;
          return (
            <span
              key={guess.value}
              className={`ruler-mark absolute inset-y-0 w-[3px] -translate-x-1/2 ${
                isLast ? "bg-paper" : "bg-paper/45"
              }`}
              style={{ left: `${position}%` }}
            />
          );
        })}
        <span
          className="ruler-mystery absolute top-1/2 grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-paper font-display text-xl font-extrabold text-night shadow-[0_3px_8px_rgb(0_0_0/0.35)]"
          style={{ left: `${centerPct}%` }}
        >
          ?
        </span>
      </div>

      <div
        className="mt-2 flex justify-between text-sm text-mist"
        aria-hidden="true"
      >
        <span>{min}</span>
        <span>
          {remaining} {remaining === 1 ? "number" : "numbers"} left
        </span>
        <span>{max}</span>
      </div>
    </figure>
  );
}
