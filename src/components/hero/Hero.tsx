import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Button } from "../ui/Button";
import { Eyebrow } from "../ui/Eyebrow";
import { Spotlight } from "../ui/spotlight";
import { WaterBottle } from "./WaterBottle";
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
        className="absolute right-[8%] top-1/2 -z-10 hidden h-[58%] w-[34%] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(124,240,204,0.18)_0%,_transparent_66%)] blur-3xl lg:block"
      />
      <Spotlight className="-top-40 left-0 md:-top-24 md:left-20" fill="#8FE8C9" />

      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="container-px relative flex min-h-[100dvh] flex-col justify-center pb-16 pt-24"
      >
        <motion.div {...rise(0.35)}>
          <Eyebrow tone="dark">MAQUILA · EMBOTELLADO · MARCA PRIVADA</Eyebrow>
        </motion.div>

        {/* DESKTOP: the object pierces between the two headline lines.
            Line 1 sits behind (z-10), the bottle between (z-20, absolute so it
            can tower without inflating the layout), line 2 in front (z-30). */}
        <h1 className="relative mt-6 hidden lg:block">
          <motion.span
            {...clip(0.45)}
            className={`relative z-10 block text-[clamp(5rem,8.4vw,8.8rem)] ${HEADLINE}`}
          >
            Tu marca
          </motion.span>
          <motion.span
            {...clip(0.6)}
            className={`relative z-30 block text-[clamp(5rem,8.4vw,8.8rem)] [text-shadow:_0_6px_28px_rgba(4,12,28,0.5)] ${HEADLINE}`}
          >
            De <span className="text-mint">agua</span>.
          </motion.span>
        </h1>
        <div className="pointer-events-none absolute right-[5%] top-1/2 z-20 hidden aspect-[260/600] h-[76vh] max-h-[780px] -translate-y-1/2 lg:block">
          <WaterBottle />
        </div>

        {/* MOBILE/TABLET: clean stack, no overlap */}
        <div className="lg:hidden">
          <motion.h1
            {...rise(0.45)}
            className={`mt-6 text-center text-[clamp(2.9rem,13vw,5rem)] ${HEADLINE}`}
          >
            Tu marca
            <br />
            De <span className="text-mint">agua</span>.
          </motion.h1>
          <motion.div {...rise(0.55)} className="mx-auto mt-6 h-[290px] w-full max-w-[320px]">
            <WaterBottle />
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
          className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:items-center lg:justify-start"
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
