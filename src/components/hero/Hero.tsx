import { motion, useReducedMotion } from "framer-motion";
import { Button } from "../ui/Button";
import { Eyebrow } from "../ui/Eyebrow";
import { primaryCta } from "@/lib/site";
import { TehuacanScene } from "./TehuacanScene";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: EASE },
        };

  return (
    <section className="relative isolate min-h-[100dvh] overflow-hidden bg-navy">
      <TehuacanScene className="absolute inset-0 -z-20 h-full w-full" />

      {/* Scrim so the white headline stays legible over the scene */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(105deg, rgba(10,32,56,0.74) 0%, rgba(10,32,56,0.42) 40%, rgba(10,32,56,0) 66%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-40"
        style={{
          background: "linear-gradient(to bottom, rgba(10,32,56,0.5), transparent)",
        }}
      />

      <div className="container-px relative flex min-h-[100dvh] flex-col justify-center pb-24 pt-28">
        <div className="max-w-xl lg:max-w-[42rem]">
          <motion.div {...rise(0)}>
            <Eyebrow tone="dark">MAQUILA · EMBOTELLADO · MARCA PRIVADA</Eyebrow>
          </motion.div>

          <motion.h1
            {...rise(0.08)}
            className="mt-5 font-display text-[2.6rem] font-bold leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-[3.6rem]"
          >
            Tu marca de agua, embotellada en{" "}
            <span className="text-aqua">Tehuacán</span>.
          </motion.h1>

          <motion.p
            {...rise(0.16)}
            className="mt-6 max-w-md text-[1.075rem] leading-[1.7] text-mist"
          >
            Maquila, embotellado y marca privada de agua mineral y purificada,
            desde la cuna del agua mineral en México. Producimos tu línea de
            principio a fin.
          </motion.p>

          <motion.div
            {...rise(0.24)}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Button to={primaryCta.to} withArrow size="lg">
              {primaryCta.label}
            </Button>
            <Button to="/servicios" variant="ghostDark" size="lg">
              Ver servicios
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
