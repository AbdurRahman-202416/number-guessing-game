import type { CSSProperties } from "react";

const COLORS = [
  "var(--color-butter)",
  "var(--color-coral)",
  "var(--color-ice)",
  "var(--color-paper)",
];

// Deterministic spread (no Math.random) so server and client markup always match.
const PIECES = Array.from({ length: 44 }, (_, i) => ({
  left: (i * 37 + 11) % 100,
  delay: ((i * 7) % 12) * 0.08,
  duration: 2.6 + ((i * 13) % 10) * 0.18,
  drift: ((i * 29) % 160) - 80,
  spin: 360 + ((i * 53) % 540),
  width: 7 + ((i * 5) % 6),
  height: 12 + ((i * 3) % 8),
  color: COLORS[i % COLORS.length],
}));

export function Confetti() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {PIECES.map((piece, index) => (
        <span
          key={index}
          className="confetti-piece"
          style={
            {
              left: `${piece.left}%`,
              width: piece.width,
              height: piece.height,
              background: piece.color,
              "--delay": `${piece.delay}s`,
              "--dur": `${piece.duration}s`,
              "--drift": `${piece.drift}px`,
              "--spin": `${piece.spin}deg`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
