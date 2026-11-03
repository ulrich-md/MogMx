import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Button } from "../ui/Button";
import { Eyebrow } from "../ui/Eyebrow";
import { photos } from "@/lib/assets";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Full-bleed deep-water band: real water photography + poster statement. */
export function StatementBand() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.18, 1.08, 1.18]);

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-water">
      <motion.img
        src={photos.water}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        style={reduce ? undefined : { y: imgY, scale: imgScale }}
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(3,20,26,0.94)_0%,rgba(7,35,44,0.72)_45%,rgba(15,76,88,0.25)_100%)]"
      />

      <div className="container-px relative py-28 md:py-40">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="max-w-4xl"
        >
          <div className="flex items-center gap-4">
            <span className="readout text-white/50">02</span>
            <Eyebrow tone="dark">Origen + oficio</Eyebrow>
          </div>
          <h2 className="poster mt-6 text-[clamp(3.6rem,10vw,9.5rem)] text-white">
            Del manantial
            <br />
            <span className="text-mint">a tu marca.</span>
          </h2>
          <div className="mt-10 grid gap-8 border-t border-white/15 pt-8 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
            <p className="max-w-xl text-[1.075rem] leading-[1.7] text-white/75">
              No hace falta ser una marca mundial para tener la tuya. Hace falta
              empezar con el agua correcta y con quien sepa trabajarla.
            </p>
            <Button to="/contacto" variant="accent" size="lg" withArrow>
              Cotiza tu proyecto
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
