import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Button } from "../ui/Button";
import { Eyebrow } from "../ui/Eyebrow";
import { Spotlight } from "../ui/spotlight";
import { SplineRobot } from "./SplineRobot";
import { primaryCta } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;
const HEADLINE = "uppercase font-extrabold leading-[0.84] tracking-[-0.03em] text-white";

export function Hero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 520], [0, -36]);
  const contentOpacity = useTransform(scrollY, [0, 480], [1, 0]);

  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 26 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: EASE },
        };

  // Headline lines reveal with a clip so the type "wipes" up into place.
  const clip = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: "0.5em", clipPath: "inset(0 0 100% 0)" },
          animate: { opacity: 1, y: 0, clipPath: "inset(0 0 -10% 0)" },
          transition: { duration: 0.9, delay, ease: EASE },
        };

  return (
    <section className="relative isolate min-h-[100dvh] overflow-hidden bg-[#070F20]">
      {/* Night-blue base + dot texture + emerald glow behind the object */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(120% 100% at 60% 6%, #153563 0%, #0B1F3C 46%, #070F20 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(127,167,200,0.08) 1.4px, transparent 1.4px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute right-[6%] top-1/2 -z-10 hidden h-[64%] w-[40%] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(124,240,204,0.16)_0%,_transparent_66%)] blur-3xl lg:block"
      />
      <Spotlight className="-top-40 left-0 md:-top-24 md:left-20" fill="#8FE8C9" />

      {/* Interactive 3D scene, behind the copy and draggable (desktop). */}
      <div className="absolute inset-y-0 right-[-6%] z-0 hidden w-[58%] lg:block">
        <SplineRobot />
      </div>

      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="container-px pointer-events-none relative z-10 flex min-h-[100dvh] flex-col justify-center pb-16 pt-24"
      >
        <motion.div {...rise(0.35)}>
          <Eyebrow tone="dark">MAQUILA · EMBOTELLADO · MARCA PRIVADA</Eyebrow>
        </motion.div>

        {/* DESKTOP: giant type in front of the scene (the object reads behind). */}
        <h1 className="mt-6 hidden lg:block">
          <motion.span
            {...clip(0.45)}
            className={`block text-[clamp(5rem,8.4vw,8.8rem)] [text-shadow:_0_6px_28px_rgba(4,12,28,0.55)] ${HEADLINE}`}
          >
            Tu marca
          </motion.span>
          <motion.span
            {...clip(0.6)}
            className={`block text-[clamp(5rem,8.4vw,8.8rem)] [text-shadow:_0_6px_28px_rgba(4,12,28,0.55)] ${HEADLINE}`}
          >
            De <span className="text-mint">agua</span>.
          </motion.span>
        </h1>

        {/* MOBILE/TABLET: clean stack with the scene below the headline. */}
        <div className="lg:hidden">
          <motion.h1
            {...rise(0.45)}
            className={`mt-6 text-center text-[clamp(2.9rem,13vw,5rem)] ${HEADLINE}`}
          >
            Tu marca
            <br />
            De <span className="text-mint">agua</span>.
          </motion.h1>
          <motion.div
            {...rise(0.55)}
            className="pointer-events-auto mx-auto mt-4 h-[320px] w-full max-w-[440px]"
          >
            <SplineRobot />
          </motion.div>
        </div>

        <motion.p
          {...rise(0.72)}
          className="mt-8 max-w-md text-center text-[1.0625rem] leading-[1.6] text-mist lg:text-left"
        >
          Embotellada en Tehuacán, la cuna del agua mineral. Maquila y
          embotellado de tu línea, de principio a fin.
        </motion.p>

        <motion.div
          {...rise(0.84)}
          className="pointer-events-auto mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:items-center lg:justify-start"
        >
          <Button to={primaryCta.to} withArrow size="lg" className="w-full sm:w-auto">
            {primaryCta.label}
          </Button>
          <Button to="/servicios" variant="outlineDark" size="lg" className="w-full sm:w-auto">
            Ver servicios
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
