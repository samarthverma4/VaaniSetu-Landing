import type { ReactNode } from "react";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

/** Wrapper that fades + lifts its children in when scrolled into view. */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string | undefined;
  delay?: number | undefined;
}) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-all duration-700 ease-out motion-reduce:transition-none",
        shown ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Signature Sohrai comb-teeth divider, line-drawn as it enters the viewport. */
export function CombBorder({ className, flip = false }: { className?: string; flip?: boolean }) {
  const { ref, shown } = useReveal<HTMLDivElement>(0.4);
  const teeth = Array.from({ length: 48 });
  return (
    <div ref={ref} className={cn("w-full overflow-hidden", className)} aria-hidden="true">
      <svg
        viewBox="0 0 480 24"
        preserveAspectRatio="none"
        className={cn("h-6 w-full text-ink", flip && "rotate-180")}
      >
        <line
          x1="0"
          y1="4"
          x2="480"
          y2="4"
          stroke="currentColor"
          strokeWidth="1.2"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={shown ? 0 : 1}
          className="transition-[stroke-dashoffset] duration-[1400ms] ease-out"
        />
        <line
          x1="0"
          y1="20"
          x2="480"
          y2="20"
          stroke="currentColor"
          strokeWidth="1.2"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={shown ? 0 : 1}
          className="transition-[stroke-dashoffset] duration-[1400ms] ease-out"
        />
        {teeth.map((_, i) => (
          <line
            key={i}
            x1={5 + i * 10}
            y1="4"
            x2={5 + i * 10}
            y2="20"
            stroke="currentColor"
            strokeWidth="1.2"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={shown ? 0 : 1}
            style={{ transitionDelay: `${i * 18}ms` }}
            className="transition-[stroke-dashoffset] duration-500 ease-out"
          />
        ))}
      </svg>
    </div>
  );
}

/** Delicate Khovar-style frame used around the demo panel. */
export function KhovarFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative rounded-sm border border-ink/40 p-2">
      <div className="pointer-events-none absolute inset-1 rounded-sm border border-dashed border-ink/25" />
      <div className="relative">{children}</div>
    </div>
  );
}

/** Concentric circle / sun motif behind a stat callout. */
export function StatCircle({
  value,
  label,
  delay = 0,
}: {
  value: string;
  label: string;
  delay?: number | undefined;
}) {
  return (
    <Reveal delay={delay} className="relative flex flex-col items-center text-center">
      <div className="relative flex h-40 w-40 items-center justify-center">
        <svg viewBox="0 0 160 160" className="absolute inset-0 h-full w-full text-ink/25">
          <circle cx="80" cy="80" r="76" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="80" cy="80" r="64" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle
            cx="80"
            cy="80"
            r="52"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="3 5"
          />
          {Array.from({ length: 24 }).map((_, i) => {
            const a = (i / 24) * Math.PI * 2;
            return (
              <line
                key={i}
                x1={(80 + Math.cos(a) * 76).toFixed(2)}
                y1={(80 + Math.sin(a) * 76).toFixed(2)}
                x2={(80 + Math.cos(a) * 86).toFixed(2)}
                y2={(80 + Math.sin(a) * 86).toFixed(2)}
                stroke="currentColor"
                strokeWidth="1"
              />
            );
          })}
        </svg>
        <span className="font-display text-4xl font-extrabold tracking-tight text-clay-red">
          {value}
        </span>
      </div>
      <p className="mt-3 max-w-[15rem] text-sm leading-relaxed text-ink/75">{label}</p>
    </Reveal>
  );
}

/** Small caps section label with a Devanagari accent. */
export function SectionLabel({ en, hi }: { en: string; hi?: string }) {
  return (
    <p className="mb-4 flex flex-wrap items-baseline gap-3 text-xs font-semibold tracking-[0.28em] text-clay-terracotta uppercase">
      <span>{en}</span>
      {hi ? <span className="font-devanagari text-base tracking-normal normal-case">{hi}</span> : null}
    </p>
  );
}

/** Generic scroll-drawn line-art icon container. */
export function LineArt({
  paths,
  className,
  viewBox = "0 0 120 120",
}: {
  paths: string[];
  className?: string | undefined;
  viewBox?: string;
}) {
  const { ref, shown } = useReveal<HTMLDivElement>(0.3);
  return (
    <div ref={ref} className={cn("text-ink", className)} aria-hidden="true">
      <svg viewBox={viewBox} className="h-full w-full" fill="none">
        {paths.map((d, i) => (
          <path
            key={i}
            d={d}
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={shown ? 0 : 1}
            style={{ transitionDelay: `${i * 160}ms` }}
            className="transition-[stroke-dashoffset] duration-[1600ms] ease-out"
          />
        ))}
      </svg>
    </div>
  );
}

export const ART = {
  classroom: [
    "M12 98h96M18 98V42h84v56",
    "M12 42h96L92 26H28z",
    "M28 54h34v24H28zM33 61h24M33 68h16",
    "M76 58a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM66 78c1-11 5-16 10-16s9 5 10 16M76 62v21",
    "M34 88a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM28 98c0-7 2-10 6-10s6 3 6 10",
    "M51 88a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM45 98c0-7 2-10 6-10s6 3 6 10",
  ],
  peacock: [
    "M46 96c-12-14-8-38 10-46 14-6 30 2 34 16",
    "M56 50c0-8 6-14 14-14s14 6 14 14-6 14-14 14",
    "M70 36V24",
    "M64 96c14 4 30-4 38-18 8-14 6-30-4-40",
    "M78 82c8-4 14-14 14-24",
  ],
  play: [
    "M60 22a38 38 0 1 1 0 76 38 38 0 1 1 0-76z",
    "M50 44l26 16-26 16z",
  ],
  bridge: [
    "M8 84h104",
    "M20 84c0-24 18-42 40-42s40 18 40 42",
    "M36 84V60M60 84V50M84 84V60",
    "M30 30c6-8 18-8 24 0",
    "M66 30c6-8 18-8 24 0",
  ],
  speech: [
    "M12 30h44v30H30l-10 12V60H12z",
    "M64 48h44v30H92l4 12-16-12H64z",
    "M60 54h8",
  ],
  book: [
    "M16 34c14-6 28-6 44 2v56c-16-8-30-8-44-2z",
    "M104 34c-14-6-28-6-44 2v56c16-8 30-8 44-2z",
    "M60 36v56",
  ],
  // two heads speaking, sound arcs travelling between them
  voice: [
    "M26 74a12 12 0 1 1 24 0",
    "M38 50a10 10 0 1 0 0-20 10 10 0 0 0 0 20z",
    "M70 74a12 12 0 1 1 24 0",
    "M82 50a10 10 0 1 0 0-20 10 10 0 0 0 0 20z",
    "M56 44c4 4 4 10 0 14",
    "M64 40c7 7 7 19 0 26",
  ],
  sheet: [
    "M28 16h48l16 16v72H28z",
    "M76 16v16h16",
    "M42 52h34M42 66h34M42 80h22",
  ],
  // clean landscape tablet with circled camera + rectangular home button centered in each bezel
  tablet: [
    "M12 32h96v56H12z",
    "M22 40h72v40H22z",
    "M17 60a3 3 0 1 1 0 6 3 3 0 1 1 0-6z",
    "M97 57h8v6h-8z",
  ],

} as const;


/** Jharkhand-ish silhouette with little book icons that pop in on scroll. */
export function JharkhandMap() {
  const { ref, shown } = useReveal<HTMLDivElement>(0.25);
  const books: [number, number][] = [
    [55, 68],
    [111, 60],
    [132, 69],
    [53, 87],
    [80, 84],
    [73, 111],
    [95, 110],
  ];
  return (
    <div ref={ref} className="w-full max-w-md">
      <svg viewBox="0 0 200 200" className="h-auto w-full text-ink" fill="none">
        <path
          d="M5345 2300 c9 -10 20 -19 24 -18 3 1 13 -2 21 -5 8 -3 29 -7 45 -9 17 -2 29 -8 28 -14 -1 -7 20 -35 47 -62 46 -47 50 -54 50 -100 0 -44 4 -54 40 -91 22 -22 40 -45 40 -50 0 -4 9 -19 20 -33 14 -19 17 -32 11 -54 -8 -30 6 -105 27 -141 17 -31 15 -63 -9 -112 l-21 -43 28 -29 c19 -20 25 -35 22 -53 -3 -14 0 -30 6 -35 15 -13 12 -96 -4 -127 -7 -13 -25 -26 -40 -29 -37 -8 -68 -41 -52 -57 12 -12 6 -65 -10 -85 -6 -7 -6 -18 -1 -28 7 -11 1 -33 -19 -72 -15 -31 -28 -63 -28 -72 -1 -9 -25 -36 -54 -60 -57 -46 -61 -58 -32 -90 10 -11 16 -30 14 -43 -3 -20 -9 -23 -46 -23 -35 0 -46 -5 -67 -30 -13 -16 -24 -35 -25 -42 0 -14 -36 -27 -50 -18 -19 11 -40 -15 -34 -41 5 -19 -3 -32 -37 -64 -48 -44 -50 -45 -67 -28 -6 6 -36 12 -66 12 -36 1 -60 7 -73 18 -36 33 -51 -10 -18 -52 6 -8 12 -36 13 -62 1 -39 -2 -49 -24 -62 -13 -10 -24 -22 -23 -29 3 -28 -2 -37 -24 -37 -13 0 -28 5 -34 11 -7 7 -18 1 -35 -20 -14 -16 -34 -30 -44 -32 -28 -4 -105 20 -136 43 -35 24 -68 31 -86 16 -10 -9 -18 -9 -32 0 -20 12 -31 4 -44 -32 -5 -15 -9 -16 -21 -6 -12 10 -20 9 -39 -4 -20 -13 -24 -22 -20 -48 4 -20 -1 -45 -10 -63 -9 -16 -16 -38 -16 -47 0 -22 -55 -34 -85 -18 -19 10 -34 9 -82 -5 -59 -17 -65 -20 -118 -56 -21 -14 -40 -18 -62 -15 -26 4 -37 0 -52 -20 -10 -13 -24 -24 -29 -24 -14 0 -57 -57 -71 -91 -6 -18 -6 -30 1 -37 8 -8 0 -23 -28 -55 -37 -42 -41 -44 -92 -42 -41 1 -56 6 -68 23 -8 12 -21 22 -28 22 -6 0 -24 6 -39 13 -21 9 -26 17 -22 34 7 32 -39 83 -75 83 -41 0 -58 -31 -34 -60 22 -26 3 -37 -81 -50 -97 -14 -118 -29 -103 -71 8 -24 7 -34 -6 -48 -12 -13 -13 -20 -5 -28 9 -9 4 -22 -18 -50 -49 -62 -48 -71 10 -136 52 -58 53 -58 113 -61 57 -2 63 -5 101 -44 34 -36 67 -51 88 -39 2 1 17 -19 33 -44 43 -67 109 -109 126 -80 10 15 53 18 71 5 10 -8 28 -11 41 -8 12 3 31 1 42 -5 13 -7 23 -7 27 -2 7 12 105 2 123 -12 8 -6 17 -5 27 3 13 10 15 9 15 -12 0 -27 -17 -48 -39 -48 -21 0 -60 -40 -54 -55 2 -8 -3 -29 -12 -48 -31 -66 -28 -88 22 -134 27 -25 55 -43 69 -43 22 0 102 -37 130 -61 8 -6 14 -22 14 -35 0 -12 5 -26 10 -29 6 -4 8 -10 5 -15 -10 -15 21 -29 73 -31 60 -3 82 -21 100 -83 9 -33 8 -44 -5 -67 -14 -23 -14 -30 -4 -43 8 -9 21 -16 31 -16 26 0 45 -28 42 -64 -3 -25 4 -40 27 -65 20 -21 31 -44 31 -62 0 -26 -3 -29 -34 -29 -26 0 -39 -7 -54 -27 -19 -26 -26 -28 -86 -27 -71 1 -110 15 -139 52 -10 12 -27 22 -37 22 -10 0 -21 4 -25 9 -3 5 -18 12 -34 16 -16 3 -37 15 -47 26 -22 24 -42 24 -69 -1 l-21 -20 -50 25 c-27 13 -76 54 -109 90 -40 43 -68 65 -83 65 -13 0 -35 9 -50 20 -15 11 -45 21 -69 22 -33 1 -46 7 -62 28 -30 41 -54 43 -96 6 -38 -32 -49 -62 -32 -83 5 -7 17 -13 26 -13 20 0 40 -59 30 -87 -4 -12 0 -28 11 -43 18 -24 18 -25 -16 -62 -19 -21 -34 -42 -34 -47 0 -5 12 -23 26 -40 26 -31 26 -32 10 -72 -9 -22 -14 -44 -11 -48 7 -12 -50 -113 -80 -141 -14 -13 -25 -32 -25 -42 0 -16 -8 -18 -62 -17 -100 2 -121 9 -134 47 -15 46 -28 55 -79 55 -24 0 -42 3 -40 7 9 14 -13 21 -76 25 -37 2 -67 9 -78 19 -10 9 -23 16 -30 16 -7 0 -26 9 -42 21 -16 11 -44 23 -63 26 -28 4 -37 1 -48 -16 -8 -13 -23 -21 -39 -21 -23 0 -65 -30 -43 -30 5 0 1 -5 -9 -11 -9 -6 -28 -32 -42 -59 -14 -27 -29 -51 -34 -54 -5 -3 -21 10 -36 30 -15 19 -30 33 -33 30 -3 -3 -13 1 -23 10 -10 9 -25 14 -33 11 -7 -3 -24 5 -36 18 -30 32 -65 37 -96 13 -23 -19 -54 -19 -54 -1 0 4 14 16 31 26 25 14 30 22 25 42 -3 13 -1 27 4 30 15 10 40 73 42 109 1 17 10 41 20 52 13 15 16 24 9 29 -6 3 -9 10 -6 15 3 5 1 11 -5 15 -5 3 -10 23 -10 44 0 39 -20 91 -43 109 -9 8 -25 5 -56 -9 -24 -10 -46 -17 -51 -14 -4 2 -15 -4 -25 -15 -19 -21 -60 -27 -70 -10 -4 6 -16 8 -27 4 -11 -3 -31 -1 -43 6 -20 11 -28 9 -55 -10 -30 -22 -48 -23 -160 -9 -46 6 -133 -12 -160 -33 -71 -57 -86 -63 -169 -73 -81 -10 -86 -10 -112 12 -15 13 -39 23 -54 23 -15 0 -38 9 -52 20 -14 11 -29 17 -34 14 -5 -3 -9 -2 -8 3 1 4 -2 23 -6 41 -6 24 -21 41 -59 66 -28 18 -63 36 -79 40 -22 5 -27 12 -27 36 0 24 12 42 51 80 43 42 58 50 89 50 20 0 48 8 61 18 13 9 33 22 44 28 14 8 20 22 21 47 1 25 11 47 33 72 17 20 31 33 31 29 0 -3 7 -1 15 6 8 6 14 15 13 18 -1 4 1 14 4 22 4 8 8 22 11 32 3 9 18 22 34 30 15 7 28 21 28 29 0 9 6 23 13 31 9 12 8 19 -11 35 -34 31 -44 34 -69 22 -19 -8 -39 -7 -82 5 -52 13 -61 13 -82 0 -28 -19 -44 -11 -44 20 0 12 -5 27 -11 33 -6 6 -11 26 -12 45 -3 40 -22 68 -46 68 -16 0 -49 29 -65 57 -4 7 0 25 7 40 8 15 17 67 20 115 5 73 3 89 -12 102 -10 9 -26 13 -39 9 -33 -8 -65 24 -56 57 4 14 6 38 5 53 -1 16 9 45 21 65 25 41 28 51 32 104 3 38 -14 65 -33 54 -5 -4 -13 -1 -16 4 -13 21 -45 -20 -38 -48 6 -24 4 -25 -28 -18 -19 4 -60 9 -92 13 -49 5 -62 11 -87 40 -17 19 -28 39 -24 44 3 6 -6 24 -21 39 -22 23 -26 32 -16 43 20 25 -30 147 -61 147 -6 0 -21 9 -34 19 -14 11 -42 22 -64 26 -23 4 -40 12 -40 20 0 7 -8 28 -17 47 -9 18 -22 45 -30 60 -7 14 -13 38 -13 51 0 27 -32 57 -60 57 -9 0 -31 16 -50 35 -27 28 -42 35 -72 35 -39 0 -46 8 -26 28 14 14 48 118 48 149 0 12 5 25 10 28 13 8 13 41 -2 64 -9 15 -6 26 23 66 33 46 34 47 14 63 -48 41 -52 120 -7 150 27 17 106 21 304 13 77 -4 110 -1 122 8 8 7 41 15 73 18 32 3 68 11 81 19 12 8 22 11 22 8 0 -17 45 36 67 79 21 42 28 48 51 45 21 -2 33 -15 59 -68 41 -81 55 -95 79 -83 11 5 34 17 51 26 18 9 35 12 37 8 6 -10 64 -2 72 10 11 18 33 8 53 -25 23 -36 27 -76 11 -92 -7 -7 -5 -18 8 -35 11 -13 17 -29 15 -35 -6 -17 21 -34 55 -37 16 -1 28 -5 26 -8 -4 -7 31 -38 65 -57 20 -12 26 -11 47 9 13 12 21 25 19 29 -8 14 61 55 94 56 26 1 43 10 68 38 18 20 37 36 42 36 5 0 34 20 64 44 32 27 62 43 73 41 10 -2 22 -4 26 -4 4 -1 8 -13 10 -28 2 -19 12 -32 30 -41 21 -10 28 -20 28 -41 0 -28 29 -62 63 -74 11 -4 29 4 51 23 18 17 44 30 57 30 12 0 31 7 41 17 16 14 18 14 18 1 0 -9 6 -20 13 -26 20 -17 72 18 72 48 0 20 7 26 41 32 24 5 56 22 77 42 22 20 51 36 74 39 21 4 46 16 56 28 16 20 18 20 41 5 18 -11 41 -15 83 -12 52 4 61 8 89 40 32 37 61 45 83 24 10 -11 16 -8 32 11 22 26 24 53 8 84 -10 18 -7 25 26 53 22 18 35 36 31 43 -10 15 11 75 32 94 16 15 21 15 47 1 22 -11 35 -12 51 -5 29 13 86 5 96 -12 4 -8 24 -27 44 -42 l36 -27 26 19 c48 35 77 36 121 6 46 -32 75 -92 67 -138 -4 -21 0 -36 16 -52 25 -27 45 -29 70 -6 17 15 19 15 38 -2 12 -11 37 -18 62 -19 33 -1 42 -4 38 -16 -2 -8 -5 -33 -5 -55 -1 -22 -5 -48 -9 -58 -9 -20 19 -59 39 -55 6 2 30 -12 53 -31 39 -31 44 -32 65 -18 27 17 43 49 52 99 4 28 22 54 74 107 68 70 69 70 87 50 32 -35 51 -41 88 -25 19 8 39 24 46 35 15 30 51 26 85 -9 19 -20 37 -29 52 -27 29 4 70 42 78 74 5 22 10 24 33 18 50 -12 91 -13 100 -1 17 22 42 103 45 143 1 23 6 45 9 49 4 3 2 15 -5 25 -10 16 -5 25 34 66 l45 48 -7 84 c-9 115 8 147 102 189 59 27 69 41 83 110 11 53 14 57 38 54 15 -2 36 2 47 7 13 7 22 8 26 1 20 -33 102 32 90 71 -9 28 3 43 22 27 13 -10 19 -8 35 12 17 21 52 46 69 49 3 1 14 -8 24 -19z"
          transform="translate(10 85) scale(0.03 -0.03)"
          vectorEffect="non-scaling-stroke"
          fill="currentColor"
          fillOpacity="0.08"
          stroke="currentColor"
          strokeWidth="1.6"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={shown ? 0 : 1}
          className="transition-[stroke-dashoffset] duration-[2200ms] ease-out"
        />
        {books.map(([cx, cy], i) => (
          <g
            key={i}
            className="text-clay-red transition-all duration-500 ease-out"
            style={{
              transitionDelay: `${600 + i * 120}ms`,
              opacity: shown ? 1 : 0,
              transform: shown ? "scale(1)" : "scale(0.2)",
              transformOrigin: `${cx}px ${cy}px`,
            }}
          >
            {/* open book icon */}
            <path
              d={`M${cx - 6} ${cy - 4} q4 -3 6 0 v10 q-3 -2 -6 0 z M${cx + 6} ${cy - 4} q-4 -3 -6 0 v10 q3 -2 6 0 z M${cx} ${cy - 4} v10`}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
