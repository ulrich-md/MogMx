import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Button } from "../ui/Button";
import { Eyebrow } from "../ui/Eyebrow";
import { Spotlight } from "../ui/spotlight";
import { WaterBottle } from "./WaterBottle";
import { primaryCta } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 520], [0, -40]);
  const contentOpacity = useTransform(scrollY, [0, 460], [1, 0]);

  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: EASE },
        };

  return (
    <section className="relative isolate min-h-[100dvh] overflow-hidden bg-navy-deep">
      {/* Dark night-blue base + subtle dot texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(120% 90% at 78% 12%, #12325C 0%, #0B1F3C 48%, #081426 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(127,167,200,0.08) 1.4px, transparent 1.4px)",
          backgroundSize: "26px 26px",
        }}
      />
      <Spotlight className="-top-40 left-0 md:-top-24 md:left-32" fill="#8FE8C9" />

      <div className="container-px relative flex min-h-[100dvh] flex-col justify-center pb-20 pt-28 md:pb-28">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-6">
          {/* Copy */}
          <motion.div
            style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
            className="order-2 text-center md:order-1 md:text-left"
          >
            <motion.div {...rise(0.45)}>
              <Eyebrow tone="dark">MAQUILA · EMBOTELLADO · MARCA PRIVADA</Eyebrow>
            </motion.div>

            <motion.h1
              {...rise(0.55)}
              className="mt-5 font-display text-[3.5rem] font-extrabold leading-[0.92] tracking-[-0.02em] text-white sm:text-6xl md:text-[4.6rem] lg:text-[5.6rem]"
            >
              Tu marca
              <br />
              de <span className="text-mint">agua</span>.
            </motion.h1>

            <motion.p
              {...rise(0.67)}
              className="mx-auto mt-6 max-w-md text-[1.0625rem] leading-[1.6] text-mist md:mx-0"
            >
              Embotellada en Tehuacán, la cuna del agua mineral. Maquila y
              embotellado de tu línea, de principio a fin.
            </motion.p>

            <motion.div
              {...rise(0.79)}
              className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:items-center md:justify-start"
            >
              <Button to={primaryCta.to} withArrow size="lg" className="w-full sm:w-auto">
                {primaryCta.label}
              </Button>
              <Button
                to="/servicios"
                variant="outlineDark"
                size="lg"
                className="w-full sm:w-auto"
              >
                Ver servicios
              </Button>
            </motion.div>
          </motion.div>

          {/* Product object */}
          <div className="order-1 md:order-2">
            <WaterBottle />
          </div>
        </div>
      </div>
    </section>
  );
}
