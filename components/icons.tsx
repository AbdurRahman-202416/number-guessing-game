import type { CSSProperties, SVGProps } from "react";

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & { style?: CSSProperties };

/** Shared outline colour for every filled game icon. */
const INK = "var(--ink)";

function Svg({ children, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 32 32"
      width="1em"
      height="1em"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export function HeartIcon({ lost = false, ...props }: IconProps & { lost?: boolean }) {
  return (
    <Svg {...props}>
      <path
        className="heart-svg"
        d="M16 27.5C8 21.5 4 17.2 4 12.2 4 8.6 6.7 6 10 6c2.5 0 4.7 1.4 6 3.6C17.3 7.4 19.5 6 22 6c3.3 0 6 2.6 6 6.2 0 5-4 9.3-12 15.3Z"
        fill={lost ? "rgb(255 255 255 / 0.1)" : "var(--hot)"}
        stroke={lost ? "rgb(255 255 255 / 0.35)" : INK}
        strokeWidth={2.6}
        strokeDasharray={lost ? "3 3.5" : undefined}
      />
      {!lost && <path d="M9 11.2c.4-1.6 1.6-2.4 3-2.5" stroke="#fff" strokeWidth={2.2} opacity={0.8} />}
    </Svg>
  );
}

export function BrokenHeartIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path
        d="M14.500 27C7.500 21.500 4 17.200 4 12.200 4 8.600 6.700 6 10 6c2.500 0 4.700 1.400 6 3.600L13.500 14l3.500 3.500-2.500 4.500Z"
        fill="var(--hot)"
        stroke={INK}
        strokeWidth={2.400}
        transform="translate(-1.500 0) rotate(-5 10 16)"
      />
      <path
        d="M17.500 27 16 22l2.500-4.500L15 14l2.500-4.400C18.800 7.400 21 6 23.500 6 26.800 6 29.500 8.600 29.500 12.200c0 5-3.500 9.300-12 14.800Z"
        fill="var(--hot)"
        stroke={INK}
        strokeWidth={2.400}
        transform="translate(1.500 1) rotate(6 22 16)"
      />
    </Svg>
  );
}

export function StarIcon({ on = true, ...props }: IconProps & { on?: boolean }) {
  return (
    <Svg {...props}>
      <path
        d="m16 3.800 3.700 7.600 8.300 1.200-6 5.900 1.400 8.300L16 22.800l-7.400 4 1.400-8.300-6-5.900 8.300-1.200L16 3.800Z"
        fill={on ? "var(--accent)" : "rgb(21 11 46 / 0.14)"}
        stroke={on ? INK : "rgb(21 11 46 / 0.4)"}
        strokeWidth={2.4}
      />
    </Svg>
  );
}

export function LeafIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M16 28V15" stroke={INK} strokeWidth={2.8} />
      <path d="M16 17C9 17 5 13 5 7c7 0 11 3 11 10Z" fill="#fff8ec" stroke={INK} strokeWidth={2.4} />
      <path d="M16 20c0-5 3-8 11-8 0 6-4 9-11 8Z" fill="#fff8ec" stroke={INK} strokeWidth={2.4} />
    </Svg>
  );
}

export function BoltIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path
        d="M18.500 3 6 18.200h8L12.500 29 26 12.500h-8.200L18.500 3Z"
        fill="#fff8ec"
        stroke={INK}
        strokeWidth={2.4}
      />
    </Svg>
  );
}

export function FlameIcon({ lit = true, ...props }: IconProps & { lit?: boolean }) {
  return (
    <Svg {...props}>
      <path
        d="M16 3.500c1 5 6.500 7.800 6.500 14.200A6.500 6.500 0 0 1 16 24.200a6.500 6.500 0 0 1-6.500-6.500c0-2.600 1.200-4.200 2.400-5.600.3 1.800 1.200 2.800 2.200 3.200C13.300 11 14 7 16 3.500Z"
        fill={lit ? "var(--accent)" : "rgb(21 11 46 / 0.12)"}
        stroke={lit ? INK : "rgb(21 11 46 / 0.45)"}
        strokeWidth={2.4}
      />
      <path
        d="M16 25.500a3.600 3.600 0 0 1-3.600-3.600c0-2 1.600-3 2.400-4.500.8 1.200 4.800 2.200 4.800 4.500a3.600 3.600 0 0 1-3.600 3.600Z"
        fill={lit ? "var(--hot)" : "rgb(21 11 46 / 0.2)"}
      />
    </Svg>
  );
}

export function SnowflakeIcon(props: IconProps) {
  return (
    <Svg {...props} stroke={INK} strokeWidth={2.8}>
      <path d="M16 4v24M5.600 10l20.800 12M5.600 22l20.800-12" />
      <path d="m12.500 5.500 3.500 3 3.500-3M12.500 26.500l3.500-3 3.500 3" strokeWidth={2.2} />
    </Svg>
  );
}

export function SunIcon(props: IconProps) {
  return (
    <Svg {...props} stroke={INK} strokeWidth={2.6}>
      <circle cx={16} cy={16} r={5.500} fill="#fff8ec" />
      <path d="M16 4v3.500M16 24.500V28M4 16h3.500M24.500 16H28M7.500 7.500 10 10M22 22l2.500 2.500M24.500 7.500 22 10M10 22l-2.500 2.500" />
    </Svg>
  );
}

export function ArrowDownIcon(props: IconProps) {
  return (
    <Svg {...props} stroke="currentColor" strokeWidth={4.200}>
      <path d="M16 5v19M7 16l9 10 9-10" />
    </Svg>
  );
}

export function ArrowUpIcon(props: IconProps) {
  return (
    <Svg {...props} stroke="currentColor" strokeWidth={4.200}>
      <path d="M16 27V8M7 16 16 6l9 10" />
    </Svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <Svg {...props} stroke="currentColor" strokeWidth={4.400}>
      <path d="m6 17 7 7L26 8" />
    </Svg>
  );
}

export function BackspaceIcon(props: IconProps) {
  return (
    <Svg {...props} stroke="currentColor" strokeWidth={2.800}>
      <path d="M11 6h15a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H11L3.500 16 11 6Z" />
      <path d="m15.500 12 8 8M23.500 12l-8 8" />
    </Svg>
  );
}

export function PlayIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M9 5.500v21l18-10.500L9 5.500Z" fill="currentColor" stroke={INK} strokeWidth={2.600} />
    </Svg>
  );
}

export function BackIcon(props: IconProps) {
  return (
    <Svg {...props} stroke="currentColor" strokeWidth={4}>
      <path d="M26 16H7M15 7l-9 9 9 9" />
    </Svg>
  );
}

export function PaletteIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path
        d="M16 4C9 4 3.500 9 3.500 15.500S8.500 27 14 27c2.200 0 3-1.200 3-2.600 0-2 1.400-2.900 3.200-2.900H24c2.400 0 4.500-1.800 4.500-4.600C28.500 9 23 4 16 4Z"
        fill="var(--accent)"
        stroke={INK}
        strokeWidth={2.400}
      />
      <circle cx={10.500} cy={14} r={2.200} fill="var(--hot)" stroke={INK} strokeWidth={1.600} />
      <circle cx={16} cy={9.500} r={2.200} fill="var(--info)" stroke={INK} strokeWidth={1.600} />
      <circle cx={21.500} cy={13.500} r={2.200} fill="var(--good)" stroke={INK} strokeWidth={1.600} />
    </Svg>
  );
}

export function TrophyCupIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M9 7H4.500c0 6 2.500 9 6 9.500M23 7h4.500c0 6-2.500 9-6 9.500" stroke={INK} strokeWidth={2.400} />
      <path
        d="M9 4h14v9a7 7 0 0 1-14 0V4Z"
        fill="var(--accent)"
        stroke={INK}
        strokeWidth={2.400}
      />
      <path d="M14 20h4v4h-4zM10 28h12v-3a1.500 1.500 0 0 0-1.500-1.500h-9A1.500 1.500 0 0 0 10 25v3Z" fill="var(--accent)" stroke={INK} strokeWidth={2.200} />
      <path d="M12.500 7.500v5" stroke="#fff" strokeWidth={2.400} opacity={0.7} />
    </Svg>
  );
}

export function CoinIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx={16} cy={16} r={11.500} fill="var(--accent)" stroke={INK} strokeWidth={2.600} />
      <path d="m16 9 2 4.500 4.800.6-3.500 3.300.9 4.800L16 19.700l-4.200 2.500.9-4.800-3.500-3.300 4.800-.6L16 9Z" fill="#fff8ec" stroke={INK} strokeWidth={1.600} />
    </Svg>
  );
}

export function SparkleIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M16 3c1 7 3 9 10 10-7 1-9 3-10 10-1-7-3-9-10-10 7-1 9-3 10-10Z" fill="#fff8ec" stroke={INK} strokeWidth={2} />
    </Svg>
  );
}
