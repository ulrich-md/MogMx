import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
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
import { ArrowRight, ArrowUpRight, ArrowCounterClockwise, ArrowsHorizontal, Check } from "@phosphor-icons/react";
import { Eyebrow } from "../ui/Eyebrow";
import { ASSEMBLY, BottleAssembly, assemblyStep } from "./BottleAssembly";
import { bottle } from "@/lib/assets";
import { primaryCta, processSteps, site } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;
const DURATION = 6.6;

/** The four build stages map onto the existing process steps 03-06. */
const STAGES = processSteps.slice(2);
/** Where each stage is fully shown (progress), used by the stage buttons. */
const STAGE_END = [ASSEMBLY.enter[1], ASSEMBLY.cap[1], ASSEMBLY.label[1], 1];
/** Track ticks at the start of every stage after the first. */
const TICKS = [ASSEMBLY.fill[0], ASSEMBLY.label[0], ASSEMBLY.finish[0]];

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
  const [value, setValue] = useState(reduce ? 1 : 0);

  useMotionValueEvent(progress, "change", (p) => {
    setStep(assemblyStep(p));
    setValue(p);
  });

  const play = useCallback(
    (delay = 0) => {
      controls.current?.stop();
      progress.set(0);
      controls.current = animate(progress, 1, { duration: DURATION, ease: "linear", delay });
    },
    [progress],
  );

  /** Glide to a target (stage buttons): speed scales with distance. */
  const glideTo = useCallback(
    (target: number) => {
      controls.current?.stop();
      if (reduce) return progress.set(target);
      const d = Math.abs(target - progress.get());
      controls.current = animate(progress, target, { duration: Math.max(0.45, d * DURATION * 0.8), ease: "linear" });
    },
    [progress, reduce],
  );

  /** Direct scrub (slider): the user's hand drives the build. */
  const scrub = (v: number) => {
    controls.current?.stop();
    progress.set(v);
  };

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

  const panelScale = useTransform(progress, [0, 0.12], [0.35, 1]);

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

  const done = value >= 0.999;
  const current = STAGES[step];

  return (
    <section className="grain relative isolate overflow-hidden bg-paper pt-[72px]">
      <div className="container-px relative grid grid-cols-1 lg:min-h-[calc(100dvh-72px)] lg:grid-cols-12 lg:grid-rows-[1fr_auto] lg:gap-x-8">
        {/* 1 · Headline (never overlapped: the bottle owns its own column) */}
        <div className="pt-6 lg:col-span-7 lg:col-start-1 lg:row-start-1 lg:pt-12">
          <motion.div {...rise(0.15)}>
            <Eyebrow>AGUA MINERAL DE TEHUACÁN · MARCA PROPIA</Eyebrow>
          </motion.div>

          <h1 className="poster mt-6 text-[15.4vw] text-ink sm:text-[clamp(5rem,14vw,9rem)] lg:text-[clamp(5rem,9.6vw,8.6rem)]">
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
        </div>

        {/* 2 · Bottle column: a water-tinted display panel aligned to the grid.
            No transform / z-index on this column, so the clear plastic
            (multiply) reads the panel through it like real PET. */}
        <div
          className="relative mt-8 h-[min(68vh,640px)] [--stage-h:min(66vh,620px)] lg:col-span-2 lg:col-start-8 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:h-auto lg:max-h-none lg:[--stage-h:min(calc(100dvh-120px),55vw,900px)]"
        >
          <motion.div
            aria-hidden="true"
            style={{ scaleY: panelScale, originY: 1 }}
            className="absolute inset-x-[14%] bottom-[2%] top-[8%] bg-[linear-gradient(180deg,#E6F6F9_0%,#CDEDF2_100%)] lg:-inset-x-6 lg:bottom-0 lg:top-0"
          />
          <div className="absolute inset-x-0 bottom-[2%] top-0 flex justify-center lg:bottom-[4vh]">
            <div
              className="absolute bottom-0 h-[var(--stage-h)]"
              style={{ left: "calc(50% - var(--stage-h) / 3)" } as CSSProperties}
            >
              <BottleAssembly progress={progress} priority className="h-full" />
            </div>
          </div>
        </div>

        {/* 3 · CTA card */}
        <div className="pb-10 pt-8 lg:col-span-6 lg:col-start-1 lg:row-start-2 lg:pb-12 lg:pt-6">
          <motion.div {...rise(0.5)} className="max-w-[380px] overflow-hidden rounded-card bg-white shadow-soft ring-1 ring-line">
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
              className="label group flex items-center justify-between border-t border-line px-5 py-4 text-ink transition-colors hover:bg-bone"
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

        {/* 4 · Rail: the build is interactive. Drag the slider or pick a stage. */}
        <motion.aside
          {...rise(0.6)}
          aria-label="Proceso de embotellado"
          className="mb-12 flex flex-col border-t border-line pt-6 lg:col-span-3 lg:col-start-10 lg:row-span-2 lg:row-start-1 lg:mb-0 lg:border-t-0 lg:pb-10 lg:pt-12"
        >
          <div className="flex items-center justify-between border-b border-line pb-3">
            <span className="label text-graphite">Proceso</span>
            <ArrowsHorizontal size={16} weight="bold" aria-hidden="true" className="text-slate" />
          </div>

          {/* Current stage readout */}
          <div className="border-b border-line py-5" aria-live="polite">
            <p className="flex items-baseline font-display leading-[0.8]">
              <span className="text-[clamp(4.5rem,6.4vw,6.2rem)] text-accent">{current?.n}</span>
              <span className="ml-2 text-2xl text-ink/20">/ 06</span>
            </p>
            <p className="label mt-4 text-blue-deep">{current?.title}</p>

            {/* Scrubber */}
            <div className="relative mt-6">
              <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 bg-line">
                <div className="h-full bg-gradient-to-r from-aqua to-blue" style={{ width: `${value * 100}%` }} />
                {TICKS.map((t) => (
                  <span
                    key={t}
                    className={`absolute top-1/2 h-2.5 w-[2px] -translate-y-1/2 ${value >= t ? "bg-blue" : "bg-ink/20"}`}
                    style={{ left: `${t * 100}%` }}
                  />
                ))}
              </div>
              <input
                type="range"
                min={0}
                max={1000}
                step={1}
                value={Math.round(value * 1000)}
                onChange={(e) => scrub(Number(e.target.value) / 1000)}
                aria-label="Armar la botella"
                aria-valuetext={`${current?.n} ${current?.title}`}
                className="scrubber relative block w-full"
              />
            </div>
          </div>

          <ol>
            {STAGES.map((s, i) => {
              const state = done || i < step ? "done" : i === step ? "active" : "idle";
              return (
                <li key={s.n} className="border-b border-line">
                  <button
                    type="button"
                    onClick={() => glideTo(STAGE_END[i])}
                    aria-current={i === step ? "step" : undefined}
                    className="group flex w-full items-center justify-between gap-4 py-3.5 text-left"
                  >
                    <span className="flex items-baseline gap-3">
                      <span className="readout text-slate">{s.n}</span>
                      <span
                        className={`label transition-colors duration-300 group-hover:text-ink ${
                          state === "idle" ? "text-slate/60" : state === "active" ? "text-blue-deep" : "text-ink"
                        }`}
                      >
                        {s.title}
                      </span>
                    </span>
                    <span aria-hidden="true" className="grid h-5 w-5 place-items-center">
                      {state === "done" ? (
                        <Check size={14} weight="bold" className="text-blue" />
                      ) : state === "active" ? (
                        <span className="h-2 w-2 animate-pulse-dot rounded-full bg-accent" />
                      ) : (
                        <span className="h-1.5 w-1.5 rounded-full bg-ink/20" />
                      )}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          {!reduce ? (
            <button
              type="button"
              onClick={() => play()}
              aria-label="Repetir la animación de la botella"
              className="group mt-5 grid h-10 w-10 place-items-center self-start rounded-full border border-ink/15 text-graphite transition-colors hover:bg-ink hover:text-white"
            >
              <ArrowCounterClockwise
                size={15}
                weight="bold"
                className="transition-transform duration-500 ease-water group-hover:-rotate-180"
              />
            </button>
          ) : null}

          <p className="readout mt-auto hidden pt-10 text-slate lg:block">
            © {new Date().getFullYear()} {site.name}
          </p>
        </motion.aside>
      </div>
    </section>
  );
}
