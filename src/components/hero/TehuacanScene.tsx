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
 * Bespoke flat illustration of the Tehuacán valley (sierra, sunset spring,
 * bottling plant, columnar cacti) in MOG's palette. The lake dissolves to
 * white at the bottom so the hero blends naturally into the section below.
 * Layers have a staggered entrance + scroll/pointer parallax. No looping
 * ambient motion. All motion disabled under prefers-reduced-motion.
 */

const VB = "0 0 1440 900";
const SLICE = "xMidYMid slice";
const LAYER = "absolute inset-0 h-full w-full";
const EASE = [0.16, 1, 0.3, 1] as const;

function Cactus() {
  return (
    <g fill="#0A1830">
      <path d="M-15,0 L-15,-78 Q-15,-95 0,-95 Q15,-95 15,-78 L15,0 Z" />
      <path d="M15,-44 L33,-44 Q44,-44 44,-58 L44,-74 Q44,-86 55,-86 Q66,-86 66,-74 L66,-30 L48,-30 Q15,-30 15,-44 Z" />
      <path d="M-15,-54 L-30,-54 Q-40,-54 -40,-66 L-40,-80 Q-40,-90 -49,-90 Q-58,-90 -58,-80 L-58,-40 L-42,-40 Q-15,-40 -15,-54 Z" />
    </g>
  );
}

export function TehuacanScene() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const D = 760;

  const yFar = useTransform(scrollY, [0, D], [0, 55]);
  const yMid = useTransform(scrollY, [0, D], [0, 30]);
  const yWater = useTransform(scrollY, [0, D], [0, -12]);
  const yFg = useTransform(scrollY, [0, D], [0, -64]);
  const ySun = useTransform(scrollY, [0, D], [0, 88]);

  const mx = useMotionValue(0);
  const sunX = useSpring(useTransform(mx, [-0.5, 0.5], [18, -18]), { stiffness: 60, damping: 20 });
  const farX = useSpring(useTransform(mx, [-0.5, 0.5], [10, -10]), { stiffness: 60, damping: 20 });
  const fgX = useSpring(useTransform(mx, [-0.5, 0.5], [-22, 22]), { stiffness: 60, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    if (!reduce) mx.set(e.clientX / window.innerWidth - 0.5);
  };

  const par = (y: MotionValue<number>, x?: MotionValue<number>): MotionStyle =>
    reduce ? { scale: 1.12 } : x ? { y, x, scale: 1.12 } : { y, scale: 1.12 };

  const enter = (delay: number, y: number, scale?: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y, ...(scale ? { scale } : {}) },
          whileInView: { opacity: 1, y: 0, scale: 1 },
          viewport: { once: true, amount: 0.15 as const },
          transition: { duration: 1, delay, ease: EASE },
        };

  return (
    <div onMouseMove={onMove} className="absolute inset-0 -z-20 overflow-hidden" aria-hidden="true">
      {/* Sky */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #0B1A3A 0%, #22407A 40%, #4E7AB8 64%, #CBD9EE 80%)",
        }}
        initial={reduce ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: EASE }}
      />

      {/* Sun + (static) birds */}
      <motion.div className="absolute inset-0" {...enter(0.1, 0, 0.7)}>
        <motion.svg viewBox={VB} preserveAspectRatio={SLICE} className={LAYER} style={par(ySun, sunX)}>
          <defs>
            <radialGradient id="sunGlow" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="#9FB0D8" stopOpacity="0.55" />
              <stop offset="0.45" stopColor="#7E8FC2" stopOpacity="0.22" />
              <stop offset="1" stopColor="#7E8FC2" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="1015" cy="450" r="300" fill="url(#sunGlow)" />
          <circle cx="1015" cy="450" r="58" fill="#E7DBB0" />
          <g stroke="#0A1830" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.5">
            <path d="M1030,360 q16,-13 32,0 q16,-13 32,0" />
            <path d="M1108,393 q12,-10 24,0 q12,-10 24,0" />
            <path d="M988,399 q13,-11 26,0 q13,-11 26,0" />
          </g>
        </motion.svg>
      </motion.div>

      {/* Far sierra */}
      <motion.div className="absolute inset-0" {...enter(0.22, 70)}>
        <motion.svg viewBox={VB} preserveAspectRatio={SLICE} className={LAYER} style={par(yFar, farX)}>
          <defs>
            <linearGradient id="far" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#A9BEDE" /><stop offset="1" stopColor="#8AA4CF" /></linearGradient>
            <linearGradient id="haze" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#EAF5FB" stopOpacity="0" /><stop offset="0.5" stopColor="#EAF5FB" stopOpacity="0.55" /><stop offset="1" stopColor="#EAF5FB" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0,512 L120,468 L210,498 L330,432 L440,500 L560,452 L690,508 L835,446 L980,498 L1130,436 L1270,492 L1380,458 L1440,486 L1440,900 L0,900 Z" fill="url(#far)" />
          <rect x="0" y="486" width="1440" height="110" fill="url(#haze)" />
        </motion.svg>
      </motion.div>

      {/* Mid sierra */}
      <motion.div className="absolute inset-0" {...enter(0.34, 90)}>
        <motion.svg viewBox={VB} preserveAspectRatio={SLICE} className={LAYER} style={par(yMid)}>
          <defs>
            <linearGradient id="mid" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3F5D96" /><stop offset="1" stopColor="#2C3F70" /></linearGradient>
            <linearGradient id="haze2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#EAF5FB" stopOpacity="0" /><stop offset="0.5" stopColor="#EAF5FB" stopOpacity="0.55" /><stop offset="1" stopColor="#EAF5FB" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0,602 L170,536 L330,592 L520,494 L700,584 L900,512 L1080,588 L1280,534 L1440,584 L1440,900 L0,900 Z" fill="url(#mid)" />
          <rect x="0" y="582" width="1440" height="90" fill="url(#haze2)" opacity="0.7" />
        </motion.svg>
      </motion.div>

      {/* Lake (fades to white) + plant */}
      <motion.div className="absolute inset-0" {...enter(0.5, 40)}>
        <motion.svg viewBox={VB} preserveAspectRatio={SLICE} className={LAYER} style={par(yWater)}>
          <defs>
            <linearGradient id="waterFade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#CBD9EE" /><stop offset="0.34" stopColor="#5F7FC0" /><stop offset="0.66" stopColor="#A6B8E0" /><stop offset="1" stopColor="#FFFFFF" />
            </linearGradient>
            <linearGradient id="sunRefl" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#E7DBB0" stopOpacity="0.55" /><stop offset="1" stopColor="#E7DBB0" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect x="0" y="628" width="1440" height="272" fill="url(#waterFade)" />
          <path d="M985,630 L1045,630 L1020,762 L1010,762 Z" fill="url(#sunRefl)" opacity="0.55" />
          {/* plant reflection */}
          <g transform="matrix(1,0,0,-1,0,1256)" opacity="0.16" fill="#0A1830">
            <rect x="686" y="584" width="34" height="44" /><rect x="722" y="574" width="88" height="54" /><rect x="808" y="545" width="52" height="83" /><rect x="846" y="510" width="9" height="40" />
          </g>
          {/* bottling plant */}
          <g>
            <rect x="686" y="584" width="34" height="44" fill="#0A1830" /><ellipse cx="703" cy="584" rx="17" ry="6" fill="#25406E" />
            <rect x="722" y="574" width="88" height="54" fill="#0A1830" />
            <rect x="808" y="545" width="52" height="83" fill="#0E2240" />
            <rect x="846" y="510" width="9" height="40" fill="#0A1830" />
            <rect x="722" y="574" width="88" height="5" fill="#25406E" />
            <g fill="#E7DBB0">
              <rect x="731" y="590" width="9" height="9" /><rect x="747" y="590" width="9" height="9" /><rect x="763" y="590" width="9" height="9" /><rect x="779" y="590" width="9" height="9" />
              <rect x="731" y="607" width="9" height="9" /><rect x="747" y="607" width="9" height="9" /><rect x="763" y="607" width="9" height="9" /><rect x="779" y="607" width="9" height="9" />
              <rect x="818" y="560" width="8" height="10" /><rect x="832" y="560" width="8" height="10" /><rect x="846" y="560" width="8" height="10" />
              <rect x="818" y="580" width="8" height="10" /><rect x="832" y="580" width="8" height="10" /><rect x="846" y="580" width="8" height="10" />
            </g>
          </g>
          {/* still ripples */}
          <g stroke="#EAF5FB" strokeLinecap="round" fill="none" opacity="0.34">
            <path d="M150,688 q55,-7 110,0 t110,0" strokeWidth="3" />
            <path d="M470,724 q70,-8 140,0 t140,0" strokeWidth="3" opacity="0.8" />
          </g>
        </motion.svg>
      </motion.div>

      {/* Foreground cacti (bottom corners, on the light water edge) */}
      <motion.div className="absolute inset-0" {...enter(0.4, 80)}>
        <motion.svg viewBox={VB} preserveAspectRatio={SLICE} className={LAYER} style={par(yFg, fgX)}>
          <g transform="translate(132,902) scale(1.05)"><Cactus /></g>
          <g transform="translate(232,905) scale(0.72)"><Cactus /></g>
          <g transform="translate(1312,900) scale(1.12)"><Cactus /></g>
        </motion.svg>
      </motion.div>
    </div>
  );
}
