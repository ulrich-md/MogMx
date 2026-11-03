import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  type AnimationPlaybackControls,
} from "framer-motion";
import { ArrowRight, ArrowUpRight, ArrowCounterClockwise, Check } from "@phosphor-icons/react";
import { Eyebrow } from "../ui/Eyebrow";
import { ASSEMBLY, BottleAssembly, assemblyStep } from "./BottleAssembly";
import { bottle } from "@/lib/assets";
import { primaryCta, processSteps, site } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;
const DURATION = 6.6;

/** The four build stages map onto the existing process steps 03-06. */
const STAGES = processSteps.slice(2);

function preload(srcs: string[], timeout = 2500) {
  const all = Promise.all(
    srcs.map(
      (src) =>
        new Promise<void>((resolve) => {
          const im = new Image();
          im.onload = im.onerror = () => resolve();
          im.src = src;
        }),
    ),
  );
  return Promise.race([all, new Promise<void>((r) => setTimeout(r, timeout))]);
}

export function Hero() {
  const reduce = useReducedMotion();
  const progress = useMotionValue(reduce ? 1 : 0);
  const controls = useRef<AnimationPlaybackControls | null>(null);
  const [step, setStep] = useState(reduce ? 3 : 0);
  const [done, setDone] = useState(!!reduce);

  useMotionValueEvent(progress, "change", (p) => {
    setStep(assemblyStep(p));
    setDone(p >= 0.999);
  });

  const play = useCallback(
    (delay = 0) => {
      controls.current?.stop();
      progress.set(0);
      controls.current = animate(progress, 1, { duration: DURATION, ease: "linear", delay });
    },
    [progress],
  );

  useEffect(() => {
    if (reduce) {
      progress.set(1);
      return;
    }
    let cancelled = false;
    preload([bottle.empty, bottle.filled, bottle.cap, bottle.label]).then(() => {
      if (!cancelled) play(0.55);
    });
    return () => {
      cancelled = true;
      controls.current?.stop();
    };
  }, [play, progress, reduce]);

  // HUD readouts
  const fill = useTransform(progress, [...ASSEMBLY.fill], [0, 1]);
  const ml = useTransform(fill, (f) => String(Math.round(f * 600)).padStart(3, "0"));
  const meter = useTransform(progress, [0, 1], [0, 1]);

  const blockScale = useTransform(progress, [0, 0.14], [0, 1]);

  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: EASE },
        };

  const line = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { y: "102%" },
          animate: { y: "0%" },
          transition: { duration: 1, delay, ease: EASE },
        };

  return (
    <section className="grain relative isolate overflow-hidden bg-paper pt-[72px]">
      {/* Signal block behind the bottle (scales up from the base as the build starts) */}
      <motion.div
        aria-hidden="true"
        style={{ scaleY: blockScale, originY: 1 }}
        className="absolute left-[47%] top-[19vh] hidden h-[56vh] w-[19%] bg-accent lg:block"
      />

      <div className="container-px relative grid min-h-[calc(100dvh-72px)] grid-cols-1 lg:grid-cols-12 lg:gap-x-8">
        {/* Left: headline + CTA card */}
        <div className="relative flex flex-col pb-10 pt-6 lg:col-span-9 lg:pb-12 lg:pt-10">
          <motion.div {...rise(0.15)}>
            <Eyebrow>AGUA MINERAL DE TEHUACÁN · MARCA PROPIA</Eyebrow>
          </motion.div>

          <h1 className="poster mt-5 text-[15.4vw] text-ink sm:text-[clamp(5rem,14vw,9rem)] lg:text-[clamp(7rem,11.6vw,13.5rem)]">
            <span className="block overflow-hidden pb-[0.04em]">
              <motion.span {...line(0.2)} className="block">
                Tu marca
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.04em]">
              <motion.span {...line(0.32)} className="block">
                embotellada.
              </motion.span>
            </span>
          </h1>

          {/* Mobile / tablet stage (in flow) */}
          <div className="relative mx-auto -mt-[9vw] h-[66vh] max-h-[620px] lg:hidden">
            <motion.div
              aria-hidden="true"
              style={{ scaleY: blockScale, originY: 1 }}
              className="absolute bottom-[16%] left-[-18%] right-[30%] top-[30%] bg-accent"
            />
            <BottleAssembly progress={progress} priority className="h-full" />
          </div>

          <div className="mt-auto grid gap-6 pt-8 sm:grid-cols-[minmax(0,360px)_1fr] lg:pt-10">
            {/* CTA card (signal header + body + secondary action) */}
            <motion.div {...rise(0.5)} className="overflow-hidden rounded-card bg-white shadow-soft">
              <Link
                to={primaryCta.to}
                className="group flex items-start justify-between gap-4 bg-accent px-5 py-4 text-ink transition-colors duration-300 hover:bg-ink hover:text-white"
              >
                <span>
                  <span className="label block text-[12px] tracking-[0.18em]">{primaryCta.label}</span>
                  <span className="readout mt-1.5 block opacity-70">{site.location.label}</span>
                </span>
                <ArrowUpRight
                  size={18}
                  weight="bold"
                  className="mt-0.5 transition-transform duration-300 ease-water group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
              <p className="px-5 py-4 text-[14.5px] leading-[1.6] text-slate">
                Nace en Tehuacán, la cuna del agua mineral en México. Sale con tu
                nombre, en el envase y la bebida que tu marca necesite.
              </p>
              <Link
                to="/servicios"
                className="label group flex items-center justify-between border-t border-line px-5 py-4 text-ink transition-colors hover:bg-paper"
              >
                Ver servicios
                <ArrowRight
                  size={16}
                  weight="bold"
                  className="transition-transform duration-300 ease-water group-hover:translate-x-1"
                />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Right rail: live build readout */}
        <motion.aside
          {...rise(0.6)}
          aria-label="Proceso de embotellado"
          className="relative z-10 mb-10 flex flex-col border-t border-line pt-6 lg:col-span-3 lg:mb-0 lg:mt-10 lg:border-t-0 lg:pb-10 lg:pl-8 lg:pt-0"
        >
          <div className="flex items-center justify-between border-b border-line pb-3">
            <span className="label text-graphite">
              <span className="lg:hidden">{STAGES[step]?.title}</span>
              <span className="hidden lg:inline">Proceso</span>
            </span>
            <span className="readout text-slate">
              {STAGES[step]?.n ?? "06"} / 06
            </span>
          </div>

          <div className="border-b border-line py-5">
            <p className="flex items-start font-display leading-[0.8] text-accent">
              <motion.span className="text-[clamp(4.5rem,7vw,6.6rem)] tabular-nums">{ml}</motion.span>
              <span className="ml-1.5 mt-2 text-2xl">ml</span>
            </p>
            <p className="label mt-3 text-blue-deep">Agua mineral de Tehuacán</p>
            {/* Progress meter */}
            <div className="mt-5 h-[3px] w-full overflow-hidden bg-line">
              <motion.div style={{ scaleX: meter, originX: 0 }} className="h-full bg-gradient-to-r from-aqua to-blue" />
            </div>
          </div>

          <ol className="hidden lg:block">
            {STAGES.map((s, i) => {
              const state = done || i < step ? "done" : i === step ? "active" : "idle";
              return (
                <li key={s.n} className="flex items-center justify-between gap-4 border-b border-line py-3.5">
                  <div className="flex items-baseline gap-3">
                    <span className="readout text-slate">{s.n}</span>
                    <span
                      className={`label transition-colors duration-300 ${
                        state === "idle" ? "text-slate/60" : state === "active" ? "text-accent-deep" : "text-ink"
                      }`}
                    >
                      {s.title}
                    </span>
                  </div>
                  <span aria-hidden="true" className="grid h-5 w-5 place-items-center">
                    {state === "done" ? (
                      <Check size={14} weight="bold" className="text-ink" />
                    ) : state === "active" ? (
                      <span className="h-2 w-2 animate-pulse-dot rounded-full bg-accent" />
                    ) : (
                      <span className="h-1.5 w-1.5 rounded-full bg-line" />
                    )}
                  </span>
                </li>
              );
            })}
          </ol>

          {!reduce ? (
            <button
              type="button"
              onClick={() => play()}
              disabled={!done}
              className="group mt-5 grid h-10 w-10 place-items-center self-start rounded-full border border-ink/15 text-graphite transition-[opacity,color,background-color] hover:bg-ink hover:text-white disabled:opacity-30"
              aria-label="Repetir la animación de la botella"
            >
              <ArrowCounterClockwise
                size={15}
                weight="bold"
                className="transition-transform duration-500 ease-water group-hover:-rotate-180"
              />
            </button>
          ) : null}

          <p className="readout mt-auto hidden pt-10 text-slate lg:block">© {new Date().getFullYear()} {site.name}</p>
        </motion.aside>
      </div>

      {/* Desktop stage: absolutely placed so the bottle pierces the headline.
          No transform/z-index here: the multiply blend must reach the type. */}
      <div
        className="pointer-events-none absolute bottom-[5vh] top-[72px] hidden items-end lg:flex"
        style={{ left: "calc(56.5% - min(calc((100dvh - 72px - 9vh) / 3), 18vw))" }}
      >
        <BottleAssembly
          progress={progress}
          priority
          className="h-[min(calc(100dvh-72px-9vh),54vw)] max-h-[980px]"
        />
      </div>
    </section>
  );
}
