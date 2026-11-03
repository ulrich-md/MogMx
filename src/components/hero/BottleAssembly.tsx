import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useTransform,
  cubicBezier,
  type MotionValue,
} from "framer-motion";
import { bottle } from "@/lib/assets";

/**
 * The bottle builds itself from real photographic layers that share one
 * pixel-aligned 1024x1536 canvas:
 *
 *   envase vacío  ->  llenado (mask rises with a falling stream)
 *   ->  tapa (drops and seats)  ->  etiqueta (wraps on, left to right)
 *   ->  producto final (splash crown blooms at the base)
 *
 * Everything is driven by ONE progress value (0..1) so the same component
 * can autoplay in the hero or be scrubbed by scroll on the Process page.
 *
 * Blending: the clear-plastic layers render with `multiply` so whatever sits
 * behind the bottle (type, the signal block) reads THROUGH the PET like real
 * plastic. The label renders normally so it stays opaque paper. For the blend
 * to reach the page, no ancestor between this stage and the backdrop may
 * create a stacking context (no transform / z-index / opacity wrappers).
 */

/** Timeline checkpoints (progress 0..1). Shared with the HUD. */
export const ASSEMBLY = {
  enter: [0, 0.12],
  fill: [0.14, 0.5],
  cap: [0.52, 0.64],
  label: [0.68, 0.84],
  finish: [0.84, 0.96],
} as const;

/** Index of the active process step for a given progress. */
export function assemblyStep(p: number) {
  if (p < ASSEMBLY.fill[0]) return 0; // Envase
  if (p < ASSEMBLY.label[0]) return 1; // Producción (llenado + tapa)
  if (p < ASSEMBLY.finish[0]) return 2; // Tu marca
  return 3; // Producto final
}

const out = cubicBezier(0.16, 1, 0.3, 1);
const inOut = cubicBezier(0.65, 0, 0.35, 1);
const drop = cubicBezier(0.5, 0, 0.75, 0);

// Deterministic bubble field (x%, start y%, size px, delay share)
const BUBBLES = [
  [40, 92, 5, 0], [55, 88, 4, 0.15], [47, 80, 6, 0.3], [61, 94, 3, 0.45],
  [36, 70, 4, 0.6], [52, 66, 3, 0.75], [44, 96, 3, 0.9], [58, 76, 5, 0.22],
  [38, 86, 3, 0.52], [63, 60, 4, 0.68],
] as const;

export function BottleAssembly({
  progress,
  className = "",
  showSplash = true,
  bubbles = true,
  priority = false,
}: {
  progress: MotionValue<number>;
  className?: string;
  showSplash?: boolean;
  bubbles?: boolean;
  /** Eager-load the layers (above the fold). */
  priority?: boolean;
}) {
  // 1 · Empty container rises into place
  const enterOpacity = useTransform(progress, [...ASSEMBLY.enter], [0, 1]);
  const enterY = useTransform(progress, [...ASSEMBLY.enter], ["6%", "0%"], { ease: out });

  // 2 · Fill: the water line climbs from the base (1%) to the neck (100%)
  const fill = useTransform(progress, [...ASSEMBLY.fill], [0, 1], { ease: inOut });
  const level = useTransform(fill, [0, 1], [0, 101]);
  const levelSoft = useTransform(level, (l) => l + 2.2);
  const fillMask = useMotionTemplate`linear-gradient(to top, #000 ${level}%, transparent ${levelSoft}%)`;
  const tintMask = useMotionTemplate`url(${bottle.filled}), linear-gradient(to top, #000 ${level}%, transparent ${levelSoft}%)`;
  // Meniscus: a bright line riding the water surface while filling
  const meniscusTop = useTransform(level, (l) => `${100 - l}%`);
  const meniscusOpacity = useTransform(fill, [0, 0.03, 0.68, 0.76], [0, 1, 1, 0]);
  // Falling stream from above the neck down to the current water line
  const streamH = useTransform(level, (l) => `${Math.max(0, 100 - l) + 22}%`);
  const streamOpacity = useTransform(fill, [0, 0.04, 0.9, 1], [0, 1, 1, 0]);

  // 3 · Cap drops from above and seats with a small settle
  const capY = useTransform(progress, [ASSEMBLY.cap[0], ASSEMBLY.cap[0] + 0.08, ASSEMBLY.cap[1]], ["-38%", "0.6%", "0%"], {
    ease: [drop, out],
  });
  const capOpacity = useTransform(progress, [ASSEMBLY.cap[0], ASSEMBLY.cap[0] + 0.03], [0, 1]);
  const capRotate = useTransform(progress, [...ASSEMBLY.cap], [-14, 0], { ease: out });

  // 4 · Label wraps on, left to right, with a paper sheen chasing the edge
  // The label spans x 28.4%..71.6% of the canvas, so the right inset travels that span.
  const labelWrap = useTransform(progress, [...ASSEMBLY.label], [71.6, 28.2], { ease: inOut });
  const labelClip = useMotionTemplate`inset(0 ${labelWrap}% 0 0)`;
  const sheenX = useTransform(labelWrap, (w) => `${100 - w}%`);
  const sheenOpacity = useTransform(progress, [ASSEMBLY.label[0], ASSEMBLY.label[0] + 0.02, ASSEMBLY.label[1] - 0.02, ASSEMBLY.label[1]], [0, 1, 1, 0]);

  // 5 · Finish: the splash crown blooms at the base
  const splashScale = useTransform(progress, [...ASSEMBLY.finish], [0.55, 1], { ease: out });
  const splashOpacity = useTransform(progress, [ASSEMBLY.finish[0], ASSEMBLY.finish[0] + 0.05], [0, 1]);
  const bubbleOpacity = useTransform(progress, [ASSEMBLY.fill[1] - 0.1, ASSEMBLY.fill[1]], [0, 1]);

  const loading = priority ? "eager" : "lazy";
  const img = "pointer-events-none absolute inset-0 h-full w-full select-none object-contain";

  return (
    <div className={`relative aspect-[2/3] ${className}`} role="img" aria-label="Botella de agua mineral MOG armándose: envase, llenado, tapa y etiqueta">
      {/* Contact shadow (behind everything) */}
      <motion.div
        aria-hidden="true"
        style={{ opacity: enterOpacity }}
        className="absolute bottom-[-1.5%] left-1/2 h-[4%] w-[52%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(18,21,21,0.32),rgba(18,21,21,0))]"
      />

      {/* Splash crown behind the base */}
      {showSplash ? (
        <motion.img
          src={bottle.splash}
          alt=""
          aria-hidden="true"
          loading={loading}
          decoding="async"
          style={{ scale: splashScale, opacity: splashOpacity, x: "-50%", originY: 1 }}
          className="pointer-events-none absolute bottom-[-5.5%] left-1/2 w-[104%] max-w-none select-none mix-blend-multiply"
        />
      ) : null}

      {/* Clear plastic + water + cap (multiply: the backdrop reads through) */}
      <motion.div
        aria-hidden="true"
        style={{ opacity: enterOpacity, y: enterY }}
        className="absolute inset-0 mix-blend-multiply"
      >
        <img src={bottle.empty} alt="" loading={loading} decoding="async" className={img} />
        <motion.img
          src={bottle.filled}
          alt=""
          loading={loading}
          decoding="async"
          style={{ WebkitMaskImage: fillMask, maskImage: fillMask }}
          className={img}
        />
        {/* Cool water tint: bottle silhouette ∩ rising level, so the line reads */}
        <motion.div
          style={{
            WebkitMaskImage: tintMask,
            maskImage: tintMask,
            WebkitMaskSize: "100% 100%",
            maskSize: "100% 100%",
            WebkitMaskComposite: "source-in",
            maskComposite: "intersect",
          }}
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(116,186,196,0.2),rgba(64,140,152,0.3))]"
        />
        {/* Filling stream */}
        <motion.div
          style={{ height: streamH, opacity: streamOpacity }}
          className="absolute left-1/2 top-[-22%] w-[1.6%] -translate-x-1/2 rounded-b-full bg-gradient-to-b from-[#9fb7bb]/0 via-[#9fb7bb]/70 to-[#7f9ea3]/80"
        />
        <motion.img
          src={bottle.cap}
          alt=""
          loading={loading}
          decoding="async"
          style={{ y: capY, opacity: capOpacity, rotate: capRotate, originX: 0.5, originY: 0.05 }}
          className={img}
        />
      </motion.div>

      {/* Meniscus highlight (normal blend) */}
      <motion.div
        aria-hidden="true"
        style={{ top: meniscusTop, opacity: meniscusOpacity, y: enterY }}
        className="pointer-events-none absolute left-[29.5%] right-[29.5%] -mt-[0.35%] h-[0.7%] rounded-[50%] bg-[radial-gradient(closest-side,rgba(255,255,255,0.95),rgba(255,255,255,0))]"
      />

      {/* Live carbonation (normal blend, under the label) */}
      {bubbles ? (
        <motion.div
          aria-hidden="true"
          style={{ opacity: bubbleOpacity, y: enterY }}
          className="pointer-events-none absolute inset-0 overflow-hidden motion-reduce:hidden"
        >
          <div className="absolute inset-x-[31%] bottom-[3%] top-[20%] overflow-hidden">
            {BUBBLES.map(([x, y, s, d], i) => (
              <span
                key={i}
                className="absolute rounded-full border border-white/90 bg-white/30 shadow-[0_0_0_0.5px_rgba(18,21,21,0.18)]"
                style={{
                  left: `${(x - 31) * (100 / 38)}%`,
                  top: `${y}%`,
                  width: s,
                  height: s,
                  animation: `bubble-rise ${5 + (i % 4)}s linear ${d * 5}s infinite`,
                }}
              />
            ))}
          </div>
        </motion.div>
      ) : null}

      {/* Label (opaque paper) */}
      <motion.div aria-hidden="true" style={{ y: enterY }} className="absolute inset-0">
        <motion.img
          src={bottle.label}
          alt=""
          loading={loading}
          decoding="async"
          style={{ clipPath: labelClip, WebkitClipPath: labelClip }}
          className={img}
        />
        {/* Sheen riding the wrapping edge */}
        <motion.div
          style={{ left: sheenX, opacity: sheenOpacity }}
          className="absolute top-[38.8%] h-[26.4%] w-[3%] -translate-x-full bg-gradient-to-r from-transparent via-white/80 to-transparent blur-[2px]"
        />
      </motion.div>
    </div>
  );
}

/** The finished bottle (clear plastic blends with its backdrop, label stays opaque). */
export function FinishedBottle({ className = "", splash = false }: { className?: string; splash?: boolean }) {
  const done = useMotionValue(1);
  return <BottleAssembly progress={done} showSplash={splash} className={className} />;
}
