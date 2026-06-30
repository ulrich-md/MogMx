import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Lightweight, premium water-bottle "hero object" (pure SVG, no 3D runtime).
 * Gentle float + pointer parallax + entrance; all motion off under
 * prefers-reduced-motion. Stands in for an interactive 3D scene at a fraction
 * of the weight.
 */
export function WaterBottle() {
  const reduce = useReducedMotion();

  // Pointer parallax (subtle translate + tilt), smoothed.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const x = useSpring(useTransform(px, [-0.5, 0.5], [-16, 16]), { stiffness: 50, damping: 18 });
  const rot = useSpring(useTransform(px, [-0.5, 0.5], [-5, 5]), { stiffness: 50, damping: 18 });
  const glowX = useSpring(useTransform(px, [-0.5, 0.5], [22, -22]), { stiffness: 40, damping: 20 });

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      px.set(e.clientX / window.innerWidth - 0.5);
      py.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [px, py, reduce]);

  return (
    <div className="relative flex h-[340px] items-center justify-center md:h-[560px]">
      {/* Emerald glow behind the bottle */}
      <motion.div
        aria-hidden="true"
        style={reduce ? undefined : { x: glowX }}
        className="absolute h-[78%] w-[78%] rounded-full bg-[radial-gradient(circle,_rgba(82,230,176,0.32)_0%,_rgba(82,230,176,0.10)_42%,_transparent_70%)] blur-2xl"
      />

      {/* Entrance */}
      <motion.div
        className="relative h-full"
        initial={reduce ? false : { opacity: 0, y: 36, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.3, ease: EASE }}
      >
        {/* Float loop */}
        <motion.div
          className="h-full"
          animate={reduce ? undefined : { y: [0, -12, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Pointer parallax */}
          <motion.div className="h-full" style={reduce ? undefined : { x, rotateZ: rot }}>
            <Bottle />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function Bottle() {
  return (
    <svg
      viewBox="0 0 260 600"
      className="h-full w-auto drop-shadow-[0_40px_60px_rgba(4,12,28,0.55)]"
      role="img"
      aria-label="Botella de agua de marca MOG"
    >
      <defs>
        <linearGradient id="bottle-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#DCF1F8" />
          <stop offset="0.28" stopColor="#8FCDE6" />
          <stop offset="0.62" stopColor="#3F93C4" />
          <stop offset="1" stopColor="#1E6FA6" />
        </linearGradient>
        <linearGradient id="bottle-gloss" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.55" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="bottle-neck" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5AA6CF" />
          <stop offset="1" stopColor="#2C76A6" />
        </linearGradient>
        <radialGradient id="bottle-floor" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#04101F" stopOpacity="0.5" />
          <stop offset="1" stopColor="#04101F" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* floor shadow */}
      <ellipse cx="130" cy="574" rx="92" ry="18" fill="url(#bottle-floor)" />

      {/* cap */}
      <rect x="100" y="6" width="60" height="20" rx="5" fill="#0A1A30" />
      <rect x="100" y="24" width="60" height="20" rx="4" fill="#102544" />
      {/* neck */}
      <path d="M111,44 L149,44 L160,90 L100,90 Z" fill="url(#bottle-neck)" />
      {/* body */}
      <rect x="66" y="86" width="128" height="456" rx="46" fill="url(#bottle-water)" />
      {/* gloss highlight */}
      <rect x="82" y="112" width="26" height="404" rx="13" fill="url(#bottle-gloss)" opacity="0.85" />
      {/* right shade */}
      <rect x="162" y="112" width="20" height="404" rx="10" fill="#0E3D63" opacity="0.3" />
      {/* water surface line */}
      <path d="M70,150 q60,-16 120,0" stroke="#FFFFFF" strokeOpacity="0.4" strokeWidth="2.5" fill="none" />
      {/* label */}
      <rect x="72" y="300" width="116" height="132" rx="10" fill="#FFFFFF" fillOpacity="0.16" />
      <rect x="72" y="300" width="116" height="132" rx="10" fill="none" stroke="#FFFFFF" strokeOpacity="0.22" />
      <path d="M100,352 q15,-16 30,0 q15,16 30,0" stroke="#52E6B0" strokeWidth="3.4" fill="none" strokeLinecap="round" />
      <text
        x="130"
        y="400"
        fill="#EAF6FF"
        fontFamily="'JetBrains Mono', monospace"
        fontSize="19"
        letterSpacing="4"
        textAnchor="middle"
      >
        MOG
      </text>
    </svg>
  );
}
