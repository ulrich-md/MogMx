import { useEffect, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Floating container wrapper: entrance pop, endless gentle float (offset per
 * product so they never sync), pointer parallax scaled by depth, and a
 * playful hover tilt. Everything collapses to static under reduced motion.
 */
export function Floater({
  children,
  delay = 0,
  depth = 1,
  floatY = 14,
  duration = 6,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  /** 0..1: how strongly the pointer moves this layer (far = small). */
  depth?: number;
  floatY?: number;
  duration?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const x = useSpring(useTransform(px, [-0.5, 0.5], [-22 * depth, 22 * depth]), {
    stiffness: 45,
    damping: 18,
  });
  const y = useSpring(useTransform(py, [-0.5, 0.5], [-14 * depth, 14 * depth]), {
    stiffness: 45,
    damping: 18,
  });

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
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 46, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay, ease: EASE }}
    >
      <motion.div style={reduce ? undefined : { x, y }} className="h-full">
        <motion.div
          className="h-full"
          animate={reduce ? undefined : { y: [0, -floatY, 0] }}
          transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
          whileHover={reduce ? undefined : { scale: 1.05, rotate: 2 }}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Product illustrations (pure SVG, MOG ghost-label on each)          */
/* ------------------------------------------------------------------ */

export function BottleSvg({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 132 540" className={className} role="img" aria-label="Botella de agua MOG">
      <defs>
        <linearGradient id="p-aqua" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#DCF6F8" />
          <stop offset="0.3" stopColor="#8FDDE6" />
          <stop offset="0.65" stopColor="#3FB3C4" />
          <stop offset="1" stopColor="#12707F" />
        </linearGradient>
        <linearGradient id="p-gloss" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.6" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g transform="translate(66,10)">
        <rect x="-26" y="0" width="52" height="18" rx="4" fill="#0A2B33" />
        <rect x="-26" y="16" width="52" height="16" rx="4" fill="#12444F" />
        <path d="M-16,32 L16,32 L26,74 L-26,74 Z" fill="#7FCBD6" />
        <rect x="-56" y="70" width="112" height="400" rx="40" fill="url(#p-aqua)" />
        <rect x="-42" y="92" width="22" height="356" rx="11" fill="url(#p-gloss)" opacity="0.8" />
        <rect x="30" y="92" width="16" height="356" rx="8" fill="#0C4A56" opacity="0.35" />
        <rect x="-50" y="250" width="100" height="106" rx="9" fill="#FFFFFF" fillOpacity="0.2" />
        <rect x="-50" y="250" width="100" height="106" rx="9" fill="none" stroke="#FFFFFF" strokeOpacity="0.28" />
        <path d="M-26,292 q13,-14 26,0 q13,14 26,0" stroke="#EAFCFE" strokeWidth="3" fill="none" strokeLinecap="round" />
        <text x="0" y="336" fill="#F2FBFD" fontFamily="'JetBrains Mono', monospace" fontSize="16" letterSpacing="3.5" textAnchor="middle">
          MOG
        </text>
      </g>
    </svg>
  );
}

export function CanSvg({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 176 320" className={className} role="img" aria-label="Lata de bebida MOG">
      <defs>
        <linearGradient id="p-cola" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FF9B85" />
          <stop offset="0.5" stopColor="#FB6F57" />
          <stop offset="1" stopColor="#C74830" />
        </linearGradient>
        <linearGradient id="p-metal" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#E9F2F4" />
          <stop offset="0.5" stopColor="#B9CDD2" />
          <stop offset="1" stopColor="#DCE9EC" />
        </linearGradient>
        <linearGradient id="p-gloss2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.6" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g transform="translate(88,8)">
        <ellipse cx="0" cy="12" rx="78" ry="14" fill="url(#p-metal)" />
        <ellipse cx="0" cy="12" rx="62" ry="10" fill="#9FB6BC" />
        <ellipse cx="14" cy="11" rx="20" ry="7" fill="#CBDCE0" />
        <path d="M-78,14 L-74,262 Q-74,290 -46,296 L46,296 Q74,290 74,262 L78,14 Z" fill="url(#p-cola)" />
        <rect x="-58" y="34" width="20" height="238" rx="10" fill="url(#p-gloss2)" opacity="0.75" />
        <rect x="40" y="34" width="14" height="238" rx="7" fill="#7A2818" opacity="0.3" />
        <path d="M-40,150 q20,-18 40,0 q20,18 40,0" stroke="#FFE3DB" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.9" />
        <text x="0" y="204" fill="#FFF4F1" fontFamily="'JetBrains Mono', monospace" fontSize="17" letterSpacing="4" textAnchor="middle">
          MOG
        </text>
      </g>
    </svg>
  );
}

export function JugSvg({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 340" className={className} role="img" aria-label="Garrafón de agua MOG">
      <defs>
        <linearGradient id="p-jug" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#BDE9EF" />
          <stop offset="0.5" stopColor="#5FB9C8" />
          <stop offset="1" stopColor="#1F7E8E" />
        </linearGradient>
        <linearGradient id="p-gloss3" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.6" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g transform="translate(100,8)">
        <rect x="-30" y="0" width="60" height="24" rx="6" fill="#0A2B33" />
        <path d="M-24,24 L24,24 L44,64 L-44,64 Z" fill="#8ED2DC" />
        <rect x="-92" y="60" width="184" height="260" rx="42" fill="url(#p-jug)" />
        <rect x="-72" y="84" width="24" height="212" rx="12" fill="url(#p-gloss3)" opacity="0.7" />
        <rect x="52" y="84" width="18" height="212" rx="9" fill="#0C4A56" opacity="0.3" />
        <path d="M-92,150 q46,-16 92,0 q46,16 92,0" stroke="#EAFCFE" strokeOpacity="0.5" strokeWidth="4" fill="none" />
        <rect x="-46" y="180" width="92" height="70" rx="8" fill="#FFFFFF" fillOpacity="0.2" />
        <text x="0" y="224" fill="#F2FBFD" fontFamily="'JetBrains Mono', monospace" fontSize="15" letterSpacing="3" textAnchor="middle">
          MOG
        </text>
      </g>
    </svg>
  );
}
