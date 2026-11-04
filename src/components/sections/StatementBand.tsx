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
    <section ref={ref} className="relative isolate overflow-hidden bg-abyss">
      <motion.img
        src={photos.table}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        style={reduce ? undefined : { y: imgY, scale: imgScale }}
        className="absolute inset-y-0 right-0 -z-20 hidden h-full w-[60%] object-cover object-[60%_50%] lg:block"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 hidden lg:block lg:bg-[linear-gradient(90deg,#03141A_0%,#03141A_40%,rgba(3,20,26,0.55)_52%,rgba(3,20,26,0)_70%)]"
      />

      {/* Phones: the photo stands on its own, then the type on ink */}
      <div className="relative aspect-[4/3] w-full overflow-hidden lg:hidden">
        <img
          src={photos.table}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-[72%_50%]"
        />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-abyss to-transparent" />
      </div>

      <div className="container-px relative pb-20 pt-6 md:py-40 lg:py-40">
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
