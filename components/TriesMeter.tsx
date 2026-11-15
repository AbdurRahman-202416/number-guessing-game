interface TriesMeterProps {
  maxTries: number;
  used: number;
}

export function TriesMeter({ maxTries, used }: TriesMeterProps) {
  const left = maxTries - used;
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
      <p className="text-lg font-bold">
        <span className="numeral text-3xl tabular-nums">{left}</span>{" "}
        {left === 1 ? "try left" : "tries left"}
      </p>
      <div className="flex gap-1.5" aria-hidden="true">
        {Array.from({ length: maxTries }, (_, index) => (
          <span
            key={index}
            className={`h-3 w-5 rounded-sm transition-colors duration-500 sm:w-6 ${
              index < used ? "bg-white/15" : "bg-paper"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
