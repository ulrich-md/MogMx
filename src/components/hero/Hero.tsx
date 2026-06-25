import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Button } from "../ui/Button";
import { primaryCta } from "@/lib/site";
import { media } from "@/lib/media";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const imgY = useTransform(scrollY, [0, 700], [0, 64]);

  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: EASE },
        };

  return (
    <section className="relative isolate grid min-h-[100dvh] grid-cols-1 lg:grid-cols-2">
      {/* Left: high-contrast type panel */}
      <div className="relative flex flex-col justify-center overflow-hidden bg-ink px-5 pb-14 pt-28 sm:px-8 lg:px-14 lg:pb-10">
        {/* reticule */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to right, rgba(255,255,255,0.05) 0 1px, transparent 1px calc(100% / 4))",
          }}
        />

        <div className="relative mb-auto hidden font-mono text-[12px] tracking-[0.2em] text-mist/60 lg:block">
          MOG® /// EMBOTELLADORA &amp; MAQUILA
        </div>

        <div className="relative">
          <motion.p
            {...rise(0)}
            className="font-mono text-[12px] font-medium tracking-[0.22em] text-amber sm:text-[13px]"
          >
            MAQUILA · EMBOTELLADO · MARCA PRIVADA
          </motion.p>

          <motion.h1
            {...rise(0.08)}
            className="mt-5 font-display text-[2.9rem] font-extrabold uppercase leading-[0.9] tracking-[-0.03em] text-white sm:text-6xl lg:text-[4.7rem] xl:text-[5.5rem]"
          >
            Embotellamos
            <br />
            agua con
            <br />
            tu <span className="text-aqua">marca</span>.
          </motion.h1>

          <motion.p
            {...rise(0.16)}
            className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-mist"
          >
            Maquila de agua mineral y purificada en Tehuacán, Puebla. Tu línea,
            producida de principio a fin.
          </motion.p>

          <motion.div
            {...rise(0.24)}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Button to={primaryCta.to} withArrow size="lg">
              {primaryCta.label}
            </Button>
            <Button to="/servicios" variant="ghostDark" size="lg">
              Ver servicios
            </Button>
          </motion.div>
        </div>

        <div className="relative mt-auto hidden pt-10 font-mono text-[12px] tracking-[0.18em] text-mist/55 lg:block">
          TEHUACÁN, PUEBLA / MÉXICO · 19.46°N 97.39°W
        </div>
      </div>

      {/* Right: the subject (product photo) */}
      <div className="relative min-h-[44vh] overflow-hidden bg-gradient-to-b from-foam to-mist lg:min-h-0">
        <div
          aria-hidden="true"
          className="absolute left-0 top-0 z-10 hidden h-full w-[3px] bg-amber lg:block"
        />
        <motion.img
          src={media.heroBottle}
          alt="Botella de agua premium de MOG México con un splash de agua"
          style={reduce ? { scale: 1.05 } : { y: imgY, scale: 1.1 }}
          className="h-full w-full object-cover object-[68%_center]"
          fetchPriority="high"
          decoding="async"
        />
        {/* mono caption */}
        <div className="absolute bottom-4 right-5 z-10 hidden font-mono text-[11px] tracking-[0.18em] text-navy/55 lg:block">
          AGUA MINERAL / PURIFICADA
        </div>
      </div>
    </section>
  );
}
