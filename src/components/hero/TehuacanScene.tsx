import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionStyle,
  type MotionValue,
} from "framer-motion";

/**
 * Bespoke flat editorial illustration of the Tehuacán valley (sierra, sunset
 * spring, columnar cacti), in MOG's palette. Rendered as separate parallax
 * layers that drift on scroll + subtle pointer. Brand-owned vector, no
 * external asset. Static under prefers-reduced-motion.
 */

const VB = "0 0 1440 900";
const slice = "xMidYMid slice";
const layerSvg = "absolute inset-0 h-full w-full";

function Cactus() {
  return (
    <g fill="#0C2741">
      <path d="M-15,0 L-15,-78 Q-15,-95 0,-95 Q15,-95 15,-78 L15,0 Z" />
      <path d="M15,-44 L33,-44 Q44,-44 44,-58 L44,-74 Q44,-86 55,-86 Q66,-86 66,-74 L66,-30 L48,-30 Q15,-30 15,-44 Z" />
      <path d="M-15,-54 L-30,-54 Q-40,-54 -40,-66 L-40,-80 Q-40,-90 -49,-90 Q-58,-90 -58,-80 L-58,-40 L-42,-40 Q-15,-40 -15,-54 Z" />
    </g>
  );
}

export function TehuacanScene() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const D = 760;

  const yFar = useTransform(scrollY, [0, D], [0, 55]);
  const yMid = useTransform(scrollY, [0, D], [0, 28]);
  const yWater = useTransform(scrollY, [0, D], [0, -14]);
  const yFg = useTransform(scrollY, [0, D], [0, -72]);
  const ySun = useTransform(scrollY, [0, D], [0, 88]);

  const mx = useMotionValue(0);
  const sunX = useSpring(useTransform(mx, [-0.5, 0.5], [16, -16]), {
    stiffness: 60,
    damping: 20,
  });
  const farX = useSpring(useTransform(mx, [-0.5, 0.5], [9, -9]), {
    stiffness: 60,
    damping: 20,
  });
  const fgX = useSpring(useTransform(mx, [-0.5, 0.5], [-22, 22]), {
    stiffness: 60,
    damping: 20,
  });

  const onMove = (e: React.MouseEvent) => {
    if (reduce) return;
    mx.set(e.clientX / window.innerWidth - 0.5);
  };

  // helper to build style, disabled when reduce
  const s = (
    y: MotionValue<number>,
    x?: MotionValue<number>,
  ): MotionStyle =>
    reduce ? { scale: 1.12 } : x ? { y, x, scale: 1.12 } : { y, scale: 1.12 };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className="absolute inset-0 -z-20 overflow-hidden"
      aria-hidden="true"
    >
      {/* Sky (static) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #0A2038 0%, #1E7FB8 40%, #5AAAD2 64%, #D7ECF4 80%)",
        }}
      />

      {/* Sun + birds */}
      <motion.svg viewBox={VB} preserveAspectRatio={slice} className={layerSvg} style={s(ySun, sunX)}>
        <defs>
          <radialGradient id="sunGlow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#F3C57E" stopOpacity="0.95" />
            <stop offset="0.4" stopColor="#C9892F" stopOpacity="0.4" />
            <stop offset="1" stopColor="#C9892F" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="1015" cy="450" r="300" fill="url(#sunGlow)" />
        <circle cx="1015" cy="450" r="58" fill="#F4CE89" />
        <g stroke="#0A2038" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.45">
          <path d="M700,235 q14,-12 28,0 q14,-12 28,0" />
          <path d="M766,272 q10,-9 20,0 q10,-9 20,0" />
          <path d="M650,288 q11,-9 22,0 q11,-9 22,0" />
        </g>
      </motion.svg>

      {/* Far sierra */}
      <motion.svg viewBox={VB} preserveAspectRatio={slice} className={layerSvg} style={s(yFar, farX)}>
        <defs>
          <linearGradient id="far" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#A9CBDF" /><stop offset="1" stopColor="#8AB4CF" />
          </linearGradient>
          <linearGradient id="haze" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#EAF5FB" stopOpacity="0" />
            <stop offset="0.5" stopColor="#EAF5FB" stopOpacity="0.55" />
            <stop offset="1" stopColor="#EAF5FB" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0,512 L120,468 L210,498 L330,432 L440,500 L560,452 L690,508 L835,446 L980,498 L1130,436 L1270,492 L1380,458 L1440,486 L1440,900 L0,900 Z" fill="url(#far)" />
        <rect x="0" y="486" width="1440" height="110" fill="url(#haze)" />
      </motion.svg>

      {/* Mid sierra */}
      <motion.svg viewBox={VB} preserveAspectRatio={slice} className={layerSvg} style={s(yMid)}>
        <defs>
          <linearGradient id="mid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#5A93B8" /><stop offset="1" stopColor="#3F7396" />
          </linearGradient>
          <linearGradient id="haze2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#EAF5FB" stopOpacity="0" />
            <stop offset="0.5" stopColor="#EAF5FB" stopOpacity="0.55" />
            <stop offset="1" stopColor="#EAF5FB" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0,602 L170,536 L330,592 L520,494 L700,584 L900,512 L1080,588 L1280,534 L1440,584 L1440,900 L0,900 Z" fill="url(#mid)" />
        <rect x="0" y="582" width="1440" height="90" fill="url(#haze2)" opacity="0.7" />
      </motion.svg>

      {/* Water + reflection */}
      <motion.svg viewBox={VB} preserveAspectRatio={slice} className={layerSvg} style={s(yWater)}>
        <defs>
          <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#CFE8F2" />
            <stop offset="0.3" stopColor="#5FAFD5" />
            <stop offset="1" stopColor="#1C5C86" />
          </linearGradient>
          <linearGradient id="sunRefl" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#F3C57E" stopOpacity="0.7" />
            <stop offset="1" stopColor="#F3C57E" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect x="0" y="628" width="1440" height="272" fill="url(#water)" />
        <path d="M983,630 L1047,630 L1024,812 L1006,812 Z" fill="url(#sunRefl)" opacity="0.6" />
        {/* bottling plant reflection */}
        <g transform="matrix(1,0,0,-1,0,1256)" opacity="0.2" fill="#0A2038">
          <rect x="686" y="584" width="34" height="44" />
          <rect x="722" y="574" width="88" height="54" />
          <rect x="808" y="545" width="52" height="83" />
          <rect x="846" y="510" width="9" height="40" />
        </g>
        {/* bottling plant (maquila / embotelladora) */}
        <g>
          <rect x="686" y="584" width="34" height="44" fill="#0C2741" />
          <ellipse cx="703" cy="584" rx="17" ry="6" fill="#1A3C5C" />
          <rect x="722" y="574" width="88" height="54" fill="#0C2741" />
          <rect x="808" y="545" width="52" height="83" fill="#0E2C46" />
          <rect x="846" y="510" width="9" height="40" fill="#0C2741" />
          <rect x="722" y="574" width="88" height="5" fill="#1A3C5C" />
          <g fill="#F4CE89">
            <rect x="731" y="590" width="9" height="9" />
            <rect x="747" y="590" width="9" height="9" />
            <rect x="763" y="590" width="9" height="9" />
            <rect x="779" y="590" width="9" height="9" />
            <rect x="731" y="607" width="9" height="9" />
            <rect x="747" y="607" width="9" height="9" />
            <rect x="763" y="607" width="9" height="9" />
            <rect x="779" y="607" width="9" height="9" />
            <rect x="818" y="560" width="8" height="10" />
            <rect x="832" y="560" width="8" height="10" />
            <rect x="846" y="560" width="8" height="10" />
            <rect x="818" y="580" width="8" height="10" />
            <rect x="832" y="580" width="8" height="10" />
            <rect x="846" y="580" width="8" height="10" />
            <rect x="818" y="600" width="8" height="10" />
            <rect x="832" y="600" width="8" height="10" />
            <rect x="846" y="600" width="8" height="10" />
          </g>
        </g>
        <g stroke="#F4CE89" strokeLinecap="round" opacity="0.5">
          <path d="M992,672 h46" strokeWidth="3" />
          <path d="M1001,742 h28" strokeWidth="3" />
        </g>
        <g stroke="#EAF5FB" strokeLinecap="round" fill="none" opacity="0.38">
          <path d="M150,696 q55,-7 110,0 t110,0" strokeWidth="3" />
          <path d="M470,732 q70,-8 140,0 t140,0" strokeWidth="3" opacity="0.8" />
        </g>
      </motion.svg>

      {/* Foreground bank + cacti */}
      <motion.svg viewBox={VB} preserveAspectRatio={slice} className={layerSvg} style={s(yFg, fgX)}>
        <defs>
          <linearGradient id="fg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#123150" /><stop offset="1" stopColor="#0A2038" />
          </linearGradient>
        </defs>
        <path d="M0,800 C220,762 470,792 720,778 C1000,762 1240,800 1440,784 L1440,900 L0,900 Z" fill="url(#fg)" />
        <g transform="translate(150,812) scale(1.15)"><Cactus /></g>
        <g transform="translate(255,820) scale(0.8)"><Cactus /></g>
        <g transform="translate(1230,806) scale(1.25)"><Cactus /></g>
        <g transform="translate(1330,816) scale(0.85)"><Cactus /></g>
      </motion.svg>
    </div>
  );
}
