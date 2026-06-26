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

      {/* Soft top fade keeps the fixed nav legible over the bright sky. The
          frosted panel below carries the main text contrast. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,20,38,0.55) 0%, rgba(8,20,38,0.14) 28%, rgba(8,20,38,0) 52%)",
        }}
      />
      {/* Gentle center anchor (kept low so the frosted glass still reveals the
          blurred valley behind it). */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 62% 60% at 50% 46%, rgba(8,20,38,0.42) 0%, rgba(8,20,38,0.22) 52%, rgba(8,20,38,0) 84%)",
        }}
      />

      <div className="container-px relative flex min-h-[100dvh] flex-col items-center justify-center pb-24 pt-28 text-center">
        <motion.div
          style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
          className="mx-auto w-full max-w-[54rem]"
        >
          {/* Apple-style frosted glass panel: translucent dark gradient + blur +
              hairline border and a top inner highlight. */}
          <div
            className="relative overflow-hidden rounded-[2rem] border border-white/[0.14] px-6 py-12 shadow-[0_30px_90px_-32px_rgba(4,12,28,0.8)] backdrop-blur-2xl backdrop-saturate-150 sm:rounded-[2.5rem] sm:px-14 sm:py-16"
            style={{
              background:
                "linear-gradient(180deg, rgba(22,48,92,0.40) 0%, rgba(10,24,48,0.52) 100%)",
            }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
            />

            <motion.div {...rise(0.5)}>
              <Eyebrow tone="dark">MAQUILA · EMBOTELLADO · MARCA PRIVADA</Eyebrow>
            </motion.div>

            <motion.h1
              {...rise(0.6)}
              className="mt-5 font-display text-[3.5rem] font-extrabold leading-[0.92] tracking-[-0.02em] text-white sm:text-6xl md:text-7xl lg:text-[5.6rem] xl:text-[6.2rem]"
            >
              Tu marca
              <br />
              de <span className="text-mint">agua</span>.
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
          </div>
        </motion.div>
      </div>
    </section>
  );
}
