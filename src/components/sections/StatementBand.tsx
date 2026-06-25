import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Button } from "../ui/Button";
import { Eyebrow } from "../ui/Eyebrow";
import { media } from "@/lib/media";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Cinematic navy editorial band. Amber accent is valid on dark. */
export function StatementBand() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [-55, 55]);

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-navy">
      <motion.img
        src={media.waterPour}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        style={reduce ? undefined : { y: imgY, scale: 1.18 }}
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-45"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(90deg, #0E2A47 0%, rgba(14,42,71,0.88) 46%, rgba(14,42,71,0.55) 100%)",
        }}
      />
      <div className="container-px section relative">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="max-w-3xl"
        >
          <Eyebrow tone="dark">Pureza + capacidad</Eyebrow>
          <h2 className="mt-5 font-display text-[2.4rem] font-bold uppercase leading-[0.95] tracking-tight text-white sm:text-5xl lg:text-[3.6rem]">
            Del agua de origen
            <br />
            <span className="text-amber">a tu marca.</span>
          </h2>
          <p className="mt-6 max-w-xl text-[1.075rem] leading-[1.7] text-mist">
            Maquila y embotellado con control de calidad y trazabilidad por lote.
            Cuidamos el detalle para que tu producto sea siempre el mismo.
          </p>
          <div className="mt-9">
            <Button to="/proceso" variant="ghostDark" size="lg" withArrow>
              Conoce el proceso
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
