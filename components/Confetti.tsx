import type { CSSProperties } from "react";

const COLORS = [
  "var(--primary)",
  "var(--accent)",
  "var(--info)",
  "var(--good)",
  "var(--secondary)",
  "var(--hot)",
  "var(--paper)",
];

// Deterministic spread (no Math.random) so server and client markup always match.
const BURST = Array.from({ length: 64 }, (_, i) => {
  const angle = (i * 137.508 * Math.PI) / 180;
  const distance = 90 + ((i * 53) % 230);
  return {
    tx: Math.round(Math.cos(angle) * distance),
    ty: Math.round(Math.sin(angle) * distance * 0.8 - 70),
    spin: 360 + ((i * 71) % 720) * (i % 2 === 0 ? 1 : -1),
    w: 8 + ((i * 5) % 7),
    h: 10 + ((i * 3) % 9),
    round: i % 3 === 0,
    delay: (i % 8) * 0.035,
    dur: 2.4 + ((i * 11) % 9) * 0.14,
    color: COLORS[i % COLORS.length],
  };
});

const FALL = Array.from({ length: 26 }, (_, i) => ({
  left: (i * 41 + 7) % 100,
  delay: ((i * 7) % 14) * 0.35,
  dur: 4.2 + ((i * 13) % 10) * 0.3,
  drift: ((i * 29) % 140) - 70,
  spin: 360 + ((i * 53) % 540),
  w: 8 + ((i * 5) % 5),
  h: 11 + ((i * 3) % 7),
  color: COLORS[(i + 2) % COLORS.length],
}));

/**
 * CSS-only confetti. The "front" layer is the burst from the trophy (drawn over the panel),
 * the "back" layer is a gentle ongoing shower behind it.
 */
export function Confetti({ layer }: { layer: "front" | "back" }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {layer === "back" && FALL.map((piece, index) => (
        <span
          key={`f${index}`}
          className="confetti-fall"
          style={
            {
              left: `${piece.left}%`,
              "--w": `${piece.w}px`,
              "--h": `${piece.h}px`,
              "--c": piece.color,
              "--delay": `${piece.delay + 1.2}s`,
              "--dur": `${piece.dur}s`,
              "--drift": `${piece.drift}px`,
              "--spin": `${piece.spin}deg`,
            } as CSSProperties
          }
        />
      ))}
      {layer === "front" && BURST.map((piece, index) => (
        <span
          key={`b${index}`}
          className="confetti-burst"
          style={
            {
              "--w": `${piece.w}px`,
              "--h": `${piece.h}px`,
              "--c": piece.color,
              "--br": piece.round ? "999px" : "2px",
              "--tx": `${piece.tx}px`,
              "--ty": `${piece.ty}px`,
              "--spin": `${piece.spin}deg`,
              "--delay": `${piece.delay}s`,
              "--dur": `${piece.dur}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
