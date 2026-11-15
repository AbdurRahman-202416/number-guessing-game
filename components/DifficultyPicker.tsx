import { DIFFICULTIES, type Difficulty } from "@/lib/game";
import type { BestScores } from "@/lib/storage";
import { ChevronRightIcon } from "@/components/icons";

interface DifficultyPickerProps {
  best: BestScores;
  onSelect: (difficulty: Difficulty) => void;
}

export function DifficultyPicker({ best, onSelect }: DifficultyPickerProps) {
  return (
    <section className="flex flex-1 flex-col justify-center gap-10 py-10 sm:gap-14">
      <div className="max-w-2xl">
        <h1 className="display text-[clamp(2.75rem,10vw,5.5rem)]">
          I&apos;m thinking of a number.
        </h1>
        <p className="mt-5 max-w-[48ch] text-lg leading-relaxed text-mist">
          Every wrong guess narrows the range. Find it before your tries run out,
          and the fewer you use, the higher you score.
        </p>
      </div>

      <div>
        <h2 className="mb-2 text-lg font-bold">Choose a difficulty</h2>
        <ul className="border-t border-mist/30">
          {DIFFICULTIES.map((difficulty) => {
            const score = best[difficulty.id];
            return (
              <li key={difficulty.id} className="border-b border-mist/30">
                <button
                  type="button"
                  onClick={() => onSelect(difficulty)}
                  aria-label={`${difficulty.label}: numbers ${difficulty.min} to ${difficulty.max}, ${difficulty.maxTries} tries. ${
                    score ? `Best score ${score}.` : "No best score yet."
                  }`}
                  className="group flex w-full cursor-pointer items-center gap-4 px-1 py-5 text-left transition-colors hover:bg-white/[0.07] sm:gap-8 sm:px-4"
                >
                  <span className="flex-1">
                    <span className="display block text-3xl sm:text-4xl">
                      {difficulty.label}
                    </span>
                    <span className="mt-1 block text-mist">
                      {difficulty.maxTries} tries
                      <span aria-hidden="true"> &middot; </span>
                      {score ? `Best ${score}` : "No best yet"}
                    </span>
                  </span>
                  <span className="numeral text-[clamp(2.25rem,9vw,4rem)] text-butter">
                    {difficulty.min}&ndash;{difficulty.max}
                  </span>
                  <ChevronRightIcon className="size-6 shrink-0 text-mist transition-transform duration-300 group-hover:translate-x-1 group-hover:text-paper" />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
