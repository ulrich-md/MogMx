import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "@phosphor-icons/react";
import { Button } from "../ui/Button";
import { Eyebrow } from "../ui/Eyebrow";
import { primaryCta } from "@/lib/site";
import { media } from "@/lib/media";

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

  const scrollDown = () =>
    window.scrollTo({
      top: Math.round(window.innerHeight * 0.92),
      behavior: reduce ? "auto" : "smooth",
    });

  return (
    <section className="relative isolate min-h-[100dvh] overflow-hidden bg-gradient-to-br from-foam via-white to-mist">
      {/* Full-bleed product photography */}
      <img
        src={media.heroBottle}
        alt="Botella de agua premium con un dinámico splash de agua sobre fondo claro"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        fetchPriority="high"
        decoding="async"
      />
      {/* Legibility scrim (lighter toward the bottle on the right) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(102deg, #ffffff 0%, rgba(255,255,255,0.86) 40%, rgba(255,255,255,0.30) 68%, rgba(255,255,255,0) 100%)",
        }}
      />

      <div className="container-px relative flex min-h-[100dvh] flex-col justify-center pb-28 pt-28">
        <div className="max-w-xl lg:max-w-2xl">
          <motion.div {...rise(0)}>
            <Eyebrow>MAQUILA · EMBOTELLADO · MARCA PRIVADA</Eyebrow>
          </motion.div>

          <motion.h1
            {...rise(0.08)}
            className="mt-6 font-display text-[2.9rem] font-bold uppercase leading-[0.92] tracking-tight text-navy sm:text-6xl lg:text-7xl xl:text-[5.4rem]"
          >
            Embotellamos
            <br />
            tu marca,
            <br />
            <span className="text-blue">tú creces.</span>
          </motion.h1>

          <motion.p
            {...rise(0.16)}
            className="mt-7 max-w-md text-[1.075rem] leading-[1.7] text-slate"
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
      </div>

      {/* Scroll affordance (amber accent) */}
      <button
        type="button"
        onClick={scrollDown}
        aria-label="Desplázate para explorar"
        className="group absolute bottom-8 left-5 z-10 grid h-14 w-14 place-items-center rounded-full bg-amber text-navy shadow-amber transition-transform duration-300 ease-water hover:-translate-y-0.5 sm:left-8"
      >
        <ArrowDown
          size={20}
          weight="bold"
          className="transition-transform duration-300 ease-water group-hover:translate-y-0.5 motion-safe:animate-drift"
        />
      </button>
    </section>
  );
}
