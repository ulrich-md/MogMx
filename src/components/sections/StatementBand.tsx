import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Button } from "../ui/Button";
import { Eyebrow } from "../ui/Eyebrow";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Cinematic deep-water editorial band (photography-free). */
export function StatementBand() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const causticY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden"
      style={{
        background:
          "radial-gradient(120% 130% at 82% 8%, #0F4C58 0%, #07232C 46%, #03141A 100%)",
      }}
    >
      {/* Designed water surface: drifting caustic light, no photo */}
      <motion.svg
        aria-hidden="true"
        viewBox="0 0 1440 500"
        preserveAspectRatio="xMidYMid slice"
        style={reduce ? undefined : { y: causticY }}
        className="absolute inset-0 -z-10 h-full w-full opacity-[0.6]"
      >
        <g stroke="#BFF0FB" strokeOpacity="0.10" strokeWidth="2" fill="none">
          <path d="M0,90 q180,-34 360,0 t360,0 t360,0 t360,0" />
          <path d="M0,150 q200,30 400,0 t400,0 t400,0" />
          <path d="M0,230 q160,-28 320,0 t320,0 t320,0 t320,0" />
          <path d="M0,320 q220,32 440,0 t440,0 t440,0" />
        </g>
        <ellipse cx="1180" cy="40" rx="520" ry="240" fill="#6FD3DC" fillOpacity="0.10" />
      </motion.svg>

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
