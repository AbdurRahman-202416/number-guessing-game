import type { CSSProperties } from "react";

type ShapeKind = "star" | "circle" | "ring" | "triangle" | "squiggle" | "plus" | "zigzag";

interface ShapeSpec {
  kind: ShapeKind;
  color: string;
  size: number;
  top: string;
  left: string;
  dur: number;
  delay: number;
  dx: number;
  dy: number;
  r0: number;
  r1: number;
}

const SHAPES: readonly ShapeSpec[] = [
  { kind: "star", color: "var(--accent)", size: 54, top: "6%", left: "7%", dur: 9, delay: 0, dx: 14, dy: -26, r0: -10, r1: 24 },
  { kind: "ring", color: "var(--info)", size: 64, top: "9%", left: "76%", dur: 11, delay: -3, dx: -18, dy: 22, r0: 0, r1: 40 },
  { kind: "triangle", color: "var(--primary)", size: 50, top: "30%", left: "93%", dur: 8, delay: -2, dx: -10, dy: -24, r0: 12, r1: 62 },
  { kind: "squiggle", color: "var(--good)", size: 74, top: "44%", left: "2%", dur: 12, delay: -5, dx: 20, dy: 18, r0: -12, r1: 10 },
  { kind: "circle", color: "var(--secondary)", size: 46, top: "58%", left: "90%", dur: 10, delay: -1, dx: -22, dy: -20, r0: 0, r1: 0 },
  { kind: "plus", color: "var(--accent)", size: 38, top: "70%", left: "5%", dur: 7, delay: -4, dx: 12, dy: -22, r0: 0, r1: 90 },
  { kind: "star", color: "var(--info)", size: 40, top: "84%", left: "86%", dur: 9, delay: -6, dx: -16, dy: -26, r0: 14, r1: -20 },
  { kind: "triangle", color: "var(--good)", size: 44, top: "90%", left: "12%", dur: 11, delay: -2, dx: 18, dy: -18, r0: -20, r1: 30 },
  { kind: "zigzag", color: "var(--hot)", size: 72, top: "22%", left: "-1%", dur: 13, delay: -7, dx: 16, dy: 24, r0: 8, r1: -10 },
  { kind: "ring", color: "var(--primary)", size: 52, top: "76%", left: "48%", dur: 12, delay: -9, dx: 24, dy: -16, r0: 0, r1: 60 },
  { kind: "plus", color: "var(--hot)", size: 34, top: "3%", left: "56%", dur: 8, delay: -3, dx: -14, dy: 20, r0: 20, r1: 110 },
  { kind: "circle", color: "var(--info)", size: 30, top: "50%", left: "96%", dur: 9, delay: -8, dx: -10, dy: 26, r0: 0, r1: 0 },
];

function ShapeArt({ kind, color }: { kind: ShapeKind; color: string }) {
  const common = { stroke: "var(--ink)", strokeWidth: 3.5, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
  switch (kind) {
    case "star":
      return <path d="m24 4 5.800 12 13.200 1.800-9.600 9.200 2.400 13L24 33.600 12.200 40l2.400-13L5 17.800 18.200 16 24 4Z" fill={color} {...common} />;
    case "circle":
      return <circle cx={24} cy={24} r={18} fill={color} {...common} />;
    case "ring":
      return <circle cx={24} cy={24} r={16} fill="none" stroke={color} strokeWidth={9} />;
    case "triangle":
      return <path d="M24 6 43 40H5L24 6Z" fill={color} {...common} />;
    case "squiggle":
      return <path d="M3 28c5-12 9-12 14 0s9 12 14 0 9-12 14 0" fill="none" stroke={color} strokeWidth={7} strokeLinecap="round" />;
    case "plus":
      return <path d="M19 5h10v14h14v10H29v14H19V29H5V19h14V5Z" fill={color} {...common} />;
    case "zigzag":
      return <path d="M3 34 14 14l10 20 10-20 11 20" fill="none" stroke={color} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />;
  }
}

/** Fixed, decorative stage behind the game: sliding dot grid, colour blobs and floating Memphis shapes. */
export function Background() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="bg-dots" />
      <div
        className="bg-blob"
        style={{ width: 380, height: 380, top: "-8%", left: "-12%", background: "var(--primary)" }}
      />
      <div
        className="bg-blob"
        style={{ width: 340, height: 340, bottom: "-6%", right: "-10%", background: "var(--info)", animationDelay: "-9s" }}
      />
      {SHAPES.map((shape, index) => (
        <div
          key={index}
          className="shape-drift opacity-55 md:opacity-85"
          style={
            {
              top: shape.top,
              left: shape.left,
              width: shape.size,
              height: shape.size,
              "--dur": `${shape.dur}s`,
              "--delay": `${shape.delay}s`,
              "--dx": `${shape.dx}px`,
              "--dy": `${shape.dy}px`,
              "--r0": `${shape.r0}deg`,
              "--r1": `${shape.r1}deg`,
            } as CSSProperties
          }
        >
          <svg viewBox="0 0 48 48" width="100%" height="100%" focusable="false">
            <ShapeArt kind={shape.kind} color={shape.color} />
          </svg>
        </div>
      ))}
    </div>
  );
}
