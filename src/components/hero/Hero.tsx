import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Button } from "../ui/Button";
import { Eyebrow } from "../ui/Eyebrow";
import { primaryCta } from "@/lib/site";
import { TehuacanScene } from "./TehuacanScene";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 520], [0, -48]);
  const contentOpacity = useTransform(scrollY, [0, 440], [1, 0]);

  // content enters after the scene has begun rising
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 26 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: EASE },
        };

  return (
    <section className="relative isolate min-h-[100dvh] overflow-hidden bg-navy">
      <TehuacanScene />

      {/* Scrim: vertical (top, for mobile) + diagonal (left, for desktop) so the
          whole text block keeps WCAG-AA contrast over the illustration. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,20,38,0.55) 0%, rgba(8,20,38,0.24) 32%, rgba(8,20,38,0) 60%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(100deg, rgba(8,20,38,0.9) 0%, rgba(8,20,38,0.66) 30%, rgba(8,20,38,0.4) 50%, rgba(8,20,38,0.1) 72%, rgba(8,20,38,0) 86%)",
        }}
      />

      <div className="container-px relative flex min-h-[100dvh] flex-col justify-center pb-24 pt-28">
        <motion.div
          style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
          className="max-w-xl lg:max-w-[42rem]"
        >
          <motion.div {...rise(0.5)}>
            <Eyebrow tone="dark">MAQUILA · EMBOTELLADO · MARCA PRIVADA</Eyebrow>
          </motion.div>

          <motion.h1
            {...rise(0.6)}
            className="mt-5 font-display text-[2.25rem] font-extrabold leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]"
          >
            Tu marca de agua, embotellada en{" "}
            <span className="text-[#3FC2EC]">Tehuacán</span>.
          </motion.h1>

          <motion.p
            {...rise(0.72)}
            className="mt-5 max-w-md text-[1.0625rem] leading-[1.65] text-mist"
          >
            Maquila, embotellado y marca privada de agua mineral y purificada,
            desde la cuna del agua mineral en México. Producimos tu línea de
            principio a fin.
          </motion.p>

          <motion.div
            {...rise(0.84)}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button
              to={primaryCta.to}
              withArrow
              size="lg"
              className="w-full sm:w-auto"
            >
              {primaryCta.label}
            </Button>
            <Button
              to="/servicios"
              variant="ghostDark"
              size="lg"
              className="w-full sm:w-auto"
            >
              Ver servicios
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
