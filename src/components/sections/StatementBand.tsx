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
            "linear-gradient(90deg, #07232C 0%, rgba(7,35,44,0.88) 46%, rgba(7,35,44,0.55) 100%)",
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
          <Eyebrow tone="dark">Origen + oficio</Eyebrow>
          <h2 className="mt-5 font-display text-[2.4rem] font-bold uppercase leading-[0.95] tracking-tight text-white sm:text-5xl lg:text-[3.6rem]">
            Del manantial
            <br />
            <span className="text-mint">a tu marca.</span>
          </h2>
          <p className="mt-6 max-w-xl text-[1.075rem] leading-[1.7] text-mist">
            No hace falta ser una marca mundial para tener la tuya. Hace falta
            empezar con el agua correcta y con quien sepa trabajarla.
          </p>
          <div className="mt-9">
            <Button to="/contacto" size="lg" withArrow>
              Cotiza tu proyecto
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
