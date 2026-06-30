import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "../ui/Button";
import { Eyebrow } from "../ui/Eyebrow";
import { WaterHeadline } from "./WaterHeadline";
import { primaryCta } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 520], [0, -44]);
  const contentOpacity = useTransform(scrollY, [0, 480], [1, 0]);

  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: EASE },
        };

  return (
    <section className="relative isolate flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-[#03141A] px-5 text-center">
      {/* Deep-water base */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(125% 85% at 50% -12%, #0E3A44 0%, #07232C 46%, #03141A 100%)",
        }}
      />
      {/* Light filtering down from the surface */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-[42%]"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 0%, rgba(124,237,236,0.16) 0%, rgba(124,237,236,0) 70%)",
        }}
      />
      {/* Faint caustic ripples near the surface */}
      <svg
        aria-hidden="true"
        className="absolute inset-x-0 top-[14%] -z-10 h-24 w-full opacity-[0.07]"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <g stroke="#BFF0FB" strokeWidth="2" fill="none">
          <path d="M0,40 q180,-26 360,0 t360,0 t360,0 t360,0" />
          <path d="M0,78 q200,26 400,0 t400,0 t400,0" />
        </g>
      </svg>

      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex w-full max-w-[1180px] flex-col items-center"
      >
        <motion.div {...rise(0.2)}>
          <Eyebrow tone="dark">MAQUILA · EMBOTELLADO · MARCA PRIVADA</Eyebrow>
        </motion.div>

        <h1 className="sr-only">Tu marca de agua</h1>
        <WaterHeadline className="mt-7 w-full max-w-[1060px]" />

        <motion.p
          {...rise(0.5)}
          className="mx-auto mt-7 max-w-xl text-[1.0625rem] leading-[1.6] text-[#B7DDE3]"
        >
          Embotellada en Tehuacán, la cuna del agua mineral. Maquila y
          embotellado de tu línea, de principio a fin.
        </motion.p>

        <motion.div
          {...rise(0.62)}
          className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:gap-6"
        >
          <Button to={primaryCta.to} withArrow size="lg" className="w-full sm:w-auto">
            {primaryCta.label}
          </Button>
          <Link
            to="/servicios"
            className="text-[15px] font-semibold text-white underline-offset-[6px] transition-colors hover:text-mint hover:underline"
          >
            Ver servicios
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
