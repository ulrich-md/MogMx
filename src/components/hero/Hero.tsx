import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "@phosphor-icons/react";
import { Button } from "../ui/Button";
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
      <img
        src={media.heroBottle}
        alt="Botella de agua premium con un dinámico splash de agua sobre fondo claro"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        fetchPriority="high"
        decoding="async"
      />
      {/* Legibility scrim (lighter toward the bottle on the right) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(101deg, #ffffff 0%, rgba(255,255,255,0.88) 42%, rgba(255,255,255,0.32) 70%, rgba(255,255,255,0) 100%)",
        }}
      />
      {/* Editorial grid (retícula) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to right, rgba(14,42,71,0.06) 0, rgba(14,42,71,0.06) 1px, transparent 1px, transparent calc(100% / 6))",
        }}
      />

      <div className="container-px relative flex min-h-[100dvh] flex-col pb-8 pt-24">
        {/* Top meta labels */}
        <div className="flex items-center justify-between pt-4 text-[11px] font-semibold uppercase tracking-eyebrow">
          <span className="text-blue-deep">Tehuacán · Puebla</span>
          <span className="hidden text-navy/60 sm:block">
            Maquila / Embotellado / Private label
          </span>
        </div>

        {/* Giant headline */}
        <div className="flex flex-1 items-center py-10">
          <div className="max-w-3xl">
            <motion.h1
              {...rise(0.05)}
              className="font-display text-[2.9rem] font-bold uppercase leading-[0.88] tracking-tight text-navy sm:text-6xl md:text-7xl lg:text-[4.6rem] xl:text-[5.4rem]"
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

        {/* Bottom row: scroll affordance + claim */}
        <div className="flex items-end justify-between gap-6">
          <button
            type="button"
            onClick={scrollDown}
            aria-label="Desplázate para explorar"
            className="group grid h-14 w-14 shrink-0 place-items-center rounded-full bg-amber text-navy shadow-amber transition-transform duration-300 ease-water hover:-translate-y-0.5"
          >
            <ArrowDown
              size={20}
              weight="bold"
              className="motion-safe:animate-drift"
            />
          </button>

          <div className="hidden max-w-xs border-l-2 border-amber pl-4 text-left sm:block">
            <p className="font-display text-lg font-bold leading-tight text-navy">
              Tu agua, nuestra planta.
            </p>
            <p className="mt-1 text-[13px] leading-snug text-slate">
              Producción por contrato con control de calidad y trazabilidad por
              lote.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
