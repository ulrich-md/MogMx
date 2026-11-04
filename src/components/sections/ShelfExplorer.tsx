import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { photos, srcSet } from "@/lib/assets";

/**
 * Interactive shelf: the tiendita fridge photo with hotspots. Hover, focus
 * or tap a hotspot to read the presentation. Positions are % of the image.
 */
const SPOTS = [
  { x: 13.4, y: 34, title: "Botella PET", sub: "600 ml" },
  { x: 13.4, y: 58, title: "Lata", sub: "Envase y tapa" },
  { x: 13.4, y: 82, title: "Botella de vidrio", sub: "Envase y tapa" },
  { x: 36.6, y: 34, title: "Limón", sub: "Otras bebidas" },
  { x: 63.4, y: 58, title: "Jamaica", sub: "Otras bebidas" },
  { x: 84.5, y: 82, title: "Mango", sub: "Otras bebidas" },
] as const;

export function ShelfExplorer({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<number | null>(0);

  return (
    <div className={`relative overflow-hidden rounded-card bg-ink ${className}`}>
      <img
        src={photos.fridge} srcSet={srcSet(photos.fridge)} sizes="(min-width: 1024px) 55vw, 92vw"
        alt="Refrigerador de una tiendita con productos MOG: agua en PET, lata y vidrio, y bebidas de limón, jamaica y mango"
        loading="lazy"
        decoding="async"
        width={1079}
        height={1024}
        className="block w-full"
      />

      {SPOTS.map((s, i) => {
        const on = active === i;
        const flip = s.x > 55;
        return (
          <div key={s.title} className="absolute" style={{ left: `${s.x}%`, top: `${s.y}%` }}>
            <button
              type="button"
              aria-label={`${s.title}: ${s.sub}`}
              aria-expanded={on}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(on ? null : i)}
              className="relative -ml-4 -mt-4 grid h-8 w-8 place-items-center rounded-full"
            >
              <span
                aria-hidden="true"
                className={`absolute inset-0 rounded-full bg-accent/40 ${on || reduce ? "" : "animate-ping"}`}
              />
              <span
                aria-hidden="true"
                className={`relative grid h-6 w-6 place-items-center rounded-full border-2 border-white text-[13px] font-bold leading-none text-ink shadow-lift transition-colors duration-300 ${
                  on ? "bg-white" : "bg-accent"
                }`}
              >
                +
              </span>
            </button>

            <AnimatePresence>
              {on ? (
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 6, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className={`pointer-events-none absolute top-1/2 z-10 w-max -translate-y-1/2 rounded-card bg-white px-4 py-3 shadow-lift ${
                    flip ? "right-6" : "left-6"
                  }`}
                >
                  <span className="label block text-ink">{s.title}</span>
                  <span className="readout mt-1 block text-blue-deep">{s.sub}</span>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
