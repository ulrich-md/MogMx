import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;
const L1 = "TU MARCA,";
const L2 = "EMBOTELLADA.";
const TYPE = {
  fontFamily: "'Bricolage Grotesque', sans-serif",
  fontWeight: 800,
  letterSpacing: "-6",
  textAnchor: "middle" as const,
};
// Per-line sizes calibrated so both lines run near full width (12 vs 9 glyphs).
const S1 = 157;
const S2 = 123;
const Y1 = 138;
const Y2 = 298;

/**
 * The headline rendered as a window into water: the glyphs mask a teal water
 * gradient that "fills up" on load, with a drifting surface line and rising
 * bubbles. A faint ghost keeps the letters legible before the fill; a hairline
 * outline keeps them crisp against the abyss. Decorative (aria-hidden); the
 * Hero carries the real <h1> for semantics.
 */
export function WaterHeadline({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  const bubbles = [
    { cx: 300, r: 6, delay: 0 },
    { cx: 495, r: 4, delay: 1.4 },
    { cx: 640, r: 8, delay: 0.6 },
    { cx: 810, r: 5, delay: 2.1 },
    { cx: 950, r: 6, delay: 1 },
  ];

  return (
    <svg
      viewBox="0 0 1200 340"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="wh-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7CEDEC" />
          <stop offset="0.5" stopColor="#28B0C0" />
          <stop offset="1" stopColor="#0C5867" />
        </linearGradient>
        <mask id="wh-mask">
          <rect width="1200" height="340" fill="black" />
          <g fill="white" {...TYPE}>
            <text x="600" y={Y1} fontSize={S1}>{L1}</text>
            <text x="600" y={Y2} fontSize={S2}>{L2}</text>
          </g>
        </mask>
      </defs>

      {/* ghost fill so the letters read before/while the water rises */}
      <g fill="#0E3942" fillOpacity="0.55" {...TYPE}>
        <text x="600" y={Y1} fontSize={S1}>{L1}</text>
        <text x="600" y={Y2} fontSize={S2}>{L2}</text>
      </g>

      <g mask="url(#wh-mask)">
        <motion.g
          initial={reduce ? false : { y: 380 }}
          animate={{ y: 0 }}
          transition={{ duration: 1.7, delay: 0.3, ease: EASE }}
        >
          <rect x="-40" y="-30" width="1280" height="400" fill="url(#wh-water)" />

          {/* drifting surface shimmer (two bands) */}
          <motion.path
            d="M-300,6 q150,-20 300,0 t300,0 t300,0 t300,0 t300,0 t300,0"
            stroke="#EAFCFE"
            strokeOpacity="0.5"
            strokeWidth="5"
            fill="none"
            animate={reduce ? undefined : { x: [0, -600] }}
            transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
          />
          <motion.path
            d="M-300,172 q150,-18 300,0 t300,0 t300,0 t300,0 t300,0 t300,0"
            stroke="#EAFCFE"
            strokeOpacity="0.32"
            strokeWidth="4"
            fill="none"
            animate={reduce ? undefined : { x: [-600, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
          />

          {/* rising bubbles */}
          {!reduce
            ? bubbles.map((b, i) => (
                <motion.circle
                  key={i}
                  cx={b.cx}
                  r={b.r}
                  fill="#DAF7FA"
                  fillOpacity="0.28"
                  initial={{ cy: 340, opacity: 0 }}
                  animate={{ cy: [340, 70], opacity: [0, 0.5, 0] }}
                  transition={{
                    duration: 6 + i,
                    delay: b.delay,
                    repeat: Infinity,
                    ease: "easeIn",
                  }}
                />
              ))
            : null}
        </motion.g>
      </g>

      {/* crisp outline against the dark abyss */}
      <g fill="none" stroke="#CFF3F7" strokeOpacity="0.42" strokeWidth="1.6" {...TYPE}>
        <text x="600" y={Y1} fontSize={S1}>{L1}</text>
        <text x="600" y={Y2} fontSize={S2}>{L2}</text>
      </g>
    </svg>
  );
}
