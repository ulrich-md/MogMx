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

      {/* Scrim: top fade + a centered radial that darkens the area behind the
          centered text, so it keeps WCAG-AA contrast over the illustration. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,20,38,0.5) 0%, rgba(8,20,38,0.12) 30%, rgba(8,20,38,0) 55%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 64% 62% at 50% 44%, rgba(8,20,38,0.78) 0%, rgba(8,20,38,0.48) 50%, rgba(8,20,38,0.05) 82%, rgba(8,20,38,0) 100%)",
        }}
      />

      <div className="container-px relative flex min-h-[100dvh] flex-col items-center justify-center pb-24 pt-28 text-center">
        <motion.div
          style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
          className="mx-auto max-w-[52rem]"
        >
          <motion.div {...rise(0.5)}>
            <Eyebrow tone="dark">MAQUILA · EMBOTELLADO · MARCA PRIVADA</Eyebrow>
          </motion.div>

          <motion.h1
            {...rise(0.6)}
            className="mt-5 font-display text-[3rem] font-extrabold leading-[0.92] tracking-[-0.02em] text-white sm:text-6xl md:text-7xl lg:text-[6.2rem] xl:text-[7rem]"
          >
            Tu marca
            <br />
            de <span className="text-[#3FC2EC]">agua</span>.
          </motion.h1>

          <motion.p
            {...rise(0.72)}
            className="mx-auto mt-6 max-w-xl text-[1.0625rem] leading-[1.6] text-mist"
          >
            Embotellada en Tehuacán, la cuna del agua mineral. Maquila y
            embotellado de tu línea, de principio a fin.
          </motion.p>

          <motion.div
            {...rise(0.84)}
            className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:items-center"
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
