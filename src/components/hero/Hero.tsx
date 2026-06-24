import { motion, useReducedMotion } from "framer-motion";
import { WaterBackdrop } from "./WaterBackdrop";
import { Button } from "../ui/Button";
import { Eyebrow } from "../ui/Eyebrow";
import { MediaPlaceholder } from "../ui/MediaPlaceholder";
import { primaryCta } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: EASE },
        };

  return (
    <section className="relative isolate flex min-h-[100dvh] items-center overflow-hidden pb-20 pt-24">
      <WaterBackdrop />

      <div className="container-px grid w-full items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <motion.div {...rise(0)}>
            <Eyebrow>MAQUILA · EMBOTELLADO · MARCA PRIVADA</Eyebrow>
          </motion.div>

          <motion.h1
            {...rise(0.08)}
            className="mt-5 font-display text-[2.3rem] font-bold leading-[1.04] tracking-tight text-navy sm:text-5xl lg:text-[3.25rem]"
          >
            Embotellamos tu marca,
            <br />
            <span className="text-blue">tú creces.</span>
          </motion.h1>

          <motion.p
            {...rise(0.16)}
            className="mt-6 max-w-prose text-[1.075rem] leading-[1.7] text-slate"
          >
            Maquila, embotellado y marca privada de agua mineral y purificada en
            Tehuacán, Puebla. Producimos tu línea de principio a fin.
          </motion.p>

          <motion.div
            {...rise(0.24)}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Button to={primaryCta.to} withArrow size="lg">
              {primaryCta.label}
            </Button>
            <Button to="/servicios" variant="secondary" size="lg">
              Ver servicios
            </Button>
          </motion.div>
        </div>

        <div className="lg:col-span-5">
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
            className="relative mx-auto max-w-md lg:ml-auto lg:max-w-none"
          >
            {/* Double-bezel frame: glass tray holding the product photo */}
            <div className="rounded-[2rem] bg-white/70 p-2 shadow-lift ring-1 ring-white/70">
              <MediaPlaceholder
                // REEMPLAZAR: foto de producto (botella sobre fondo claro)
                label="Botella de agua / vidrio sobre fondo claro, con gotas"
                alt="Botella de agua mineral de MOG México sobre fondo claro"
                aspect="4/3"
                rounded="rounded-[calc(2rem-0.5rem)]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
