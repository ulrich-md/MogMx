import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
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
import { bottleVolumes, heroVolume, primaryCta, processSteps, site } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;
const DURATION = 6.6;

/** The four build stages map onto the existing process steps 03-06. */
const STAGES = processSteps.slice(2);
const HERO_INDEX = Math.max(0, bottleVolumes.indexOf(heroVolume));
const MAX_ML = Math.max(...bottleVolumes);

/** Bottle size for a volume: gentle (not literal) so every format stays on screen. */
const sizeFor = (ml: number) => Math.pow(ml / heroVolume, 0.22);

/** Label band on the 1024x1536 canvas (fraction of height from the top). */
const LABEL_TOP = 0.39;

type Stage = { left: number; top: number; h: number };

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
  const ml = useMotionValue(reduce ? heroVolume : 0);
  const size = useMotionValue(1);
  const controls = useRef<AnimationPlaybackControls | null>(null);
  const [step, setStep] = useState(reduce ? 3 : 0);
  const [done, setDone] = useState(!!reduce);
  const [vol, setVol] = useState(HERO_INDEX);

  const sectionRef = useRef<HTMLElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const [stage, setStage] = useState<Stage | null>(null);

  // While building, the readout follows the water line up to the hero volume.
  useMotionValueEvent(progress, "change", (p) => {
    setStep(assemblyStep(p));
    setDone(p >= 0.999);
    const f = Math.min(1, Math.max(0, (p - ASSEMBLY.fill[0]) / (ASSEMBLY.fill[1] - ASSEMBLY.fill[0])));
    if (p < 0.999) ml.set(f * heroVolume);
  });

  const play = useCallback(
    (delay = 0) => {
      controls.current?.stop();
      setVol(HERO_INDEX);
      animate(size, 1, { duration: 0.4 });
      progress.set(0);
      ml.set(0);
      controls.current = animate(progress, 1, { duration: DURATION, ease: "linear", delay });
    },
    [ml, progress, size],
  );

  /** After the build: pick a format. The readout counts and the bottle resizes. */
  const pickVolume = (i: number) => {
    setVol(i);
    const target = bottleVolumes[i];
    animate(ml, target, { duration: reduce ? 0 : 0.55, ease: EASE });
    animate(size, sizeFor(target), reduce ? { duration: 0 } : { type: "spring", stiffness: 170, damping: 20 });
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

  /*
   * Desktop placement: the bottle is sized and positioned from the real
   * headline box so its clear neck pierces the type while the label sits
   * just BELOW the headline (the type always reads).
   */
  useLayoutEffect(() => {
    const measure = () => {
      const sec = sectionRef.current;
      const h1 = h1Ref.current;
      if (!sec || !h1 || window.innerWidth < 1024) return setStage(null);
      const s = sec.getBoundingClientRect();
      const t = h1.getBoundingClientRect();
      const headBottom = t.bottom - s.top + 14;
      const room = s.height - 8 - headBottom; // space below the headline
      const byFit = room / (1 - LABEL_TOP);
      const byTop = (headBottom - 84) / LABEL_TOP; // keep the cap under the header
      const h = Math.min(byFit, byTop, 1000);
      setStage({ h, top: headBottom - LABEL_TOP * h, left: s.width * 0.565 - h / 3 });
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (sectionRef.current) ro.observe(sectionRef.current);
    if (h1Ref.current) ro.observe(h1Ref.current);
    document.fonts?.ready.then(measure).catch(() => undefined);
    return () => ro.disconnect();
  }, []);

  const mlText = useTransform(ml, (v) => String(Math.round(v)).padStart(3, "0"));
  const meter = useTransform(progress, [0, 1], [0, 1]);
  const panelScale = useTransform(progress, [0, 0.14], [0, 1]);

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

  const PANEL = "bg-[linear-gradient(180deg,#E6F6F9_0%,#CDEDF2_100%)]";

  const replay = !reduce ? (
    <button
      type="button"
      onClick={() => play()}
      disabled={!done}
      aria-label="Repetir la animación de la botella"
      className="group mt-5 grid h-10 w-10 place-items-center self-start rounded-full border border-ink/15 text-graphite transition-[opacity,color,background-color] hover:bg-ink hover:text-white disabled:opacity-30"
    >
      <ArrowCounterClockwise
        size={15}
        weight="bold"
        className="transition-transform duration-500 ease-water group-hover:-rotate-180"
      />
    </button>
  ) : null;

  // Live readout: counts with the fill, then becomes the volume slider.
  const readout = (
          <div className="border-b border-line py-5">
      <p className="flex items-start font-display leading-[0.8] text-accent">
        <motion.span className="text-[clamp(4.2rem,6.4vw,6.4rem)] tabular-nums">{mlText}</motion.span>
        <span className="ml-1.5 mt-2 text-2xl">ml</span>
      </p>
      <p className="label mt-3 text-blue-deep">Agua mineral de Tehuacán</p>

      {/* One track: shows the build while it runs, becomes the volume slider after */}
      <div className="relative mt-5">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 bg-line">
          {done ? (
            <div
              className="h-full bg-gradient-to-r from-aqua to-blue transition-[width] duration-500 ease-water"
              style={{ width: `${(vol / (bottleVolumes.length - 1)) * 100}%` }}
            />
          ) : (
            <motion.div style={{ scaleX: meter, originX: 0 }} className="h-full bg-gradient-to-r from-aqua to-blue" />
          )}
          {done
            ? bottleVolumes.map((v, i) => (
                <span
                  key={v}
                  className={`absolute top-1/2 h-2.5 w-[2px] -translate-x-1/2 -translate-y-1/2 ${i <= vol ? "bg-blue" : "bg-ink/20"}`}
                  style={{ left: `${(i / (bottleVolumes.length - 1)) * 100}%` }}
                />
              ))
            : null}
        </div>
        <input
          type="range"
          min={0}
          max={bottleVolumes.length - 1}
          step={1}
          value={vol}
          disabled={!done}
          onChange={(e) => pickVolume(Number(e.target.value))}
          aria-label="Cantidad en mililitros"
          aria-valuetext={`${bottleVolumes[vol]} ml`}
          className={`scrubber relative block w-full transition-opacity duration-500 ${done ? "opacity-100" : "pointer-events-none opacity-0"}`}
        />
      </div>
      <div
        aria-hidden="true"
        className={`readout mt-1 flex justify-between text-slate transition-opacity duration-500 ${done ? "opacity-100" : "opacity-0"}`}
      >
        <span>{bottleVolumes[0]} ml</span>
        <span>{MAX_ML} ml</span>
      </div>
    </div>
  );

  return (
    <section ref={sectionRef} className="grain relative isolate overflow-hidden bg-paper pt-[72px]">
      {/* Water display panel behind the bottle. Painted BEFORE the type so the
          headline reads over it, and the clear plastic shows both through it. */}
      {stage ? (
        <motion.div
          aria-hidden="true"
          style={{
            scaleY: panelScale,
            originY: 1,
            left: stage.left + stage.h * (2 / 3) * 0.2,
            width: stage.h * (2 / 3) * 0.6,
            top: stage.top + stage.h * 0.07,
            height: stage.h * 0.72,
          }}
          className={`absolute hidden lg:block ${PANEL}`}
        />
      ) : null}

      <div className="container-px relative grid min-h-[calc(100dvh-72px)] grid-cols-1 lg:grid-cols-12 lg:gap-x-8">
        {/* Left: headline + CTA card */}
        <div className="relative flex flex-col pb-10 pt-6 lg:col-span-9 lg:pb-12 lg:pt-10">
          <motion.div {...rise(0.15)}>
            <Eyebrow>AGUA MINERAL DE TEHUACÁN · MARCA PROPIA</Eyebrow>
          </motion.div>

          <h1
            ref={h1Ref}
            className="poster mt-5 text-[15.4vw] text-ink sm:text-[clamp(5rem,14vw,9rem)] lg:text-[clamp(7rem,11.6vw,13.5rem)]"
          >
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

          {/* Mobile / tablet stage (in flow, below the headline) */}
          <div className="relative mx-auto mt-4 h-[min(66vh,620px)] w-full lg:hidden">
            <motion.div
              aria-hidden="true"
              style={{ scaleY: panelScale, originY: 1, x: "-50%" }}
              className={`absolute bottom-[22%] left-1/2 top-[8%] w-[min(62%,300px)] ${PANEL}`}
            />
            <div className="absolute inset-0 flex justify-center">
              <BottleAssembly progress={progress} scale={size} priority className="h-full" />
            </div>
          </div>

          {/* Mobile readout + slider, right under the bottle it controls */}
          <div className="mt-6 border-t border-line lg:hidden">
            <div className="flex items-center justify-between border-b border-line py-3">
              <span className="label text-graphite">{STAGES[step]?.title}</span>
              <span className="readout text-slate">{STAGES[step]?.n ?? "06"} / 06</span>
            </div>
            {readout}
            {replay}
          </div>

          <div className="mt-auto grid gap-6 pt-8 sm:grid-cols-[minmax(0,380px)_1fr] lg:pt-10">
            <motion.div {...rise(0.5)} className="overflow-hidden rounded-card bg-white shadow-soft ring-1 ring-line">
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
        </div>

        {/* Right rail: live build readout, then a volume slider */}
        <motion.aside
          {...rise(0.6)}
          aria-label="Proceso de embotellado"
          className="relative z-10 hidden lg:col-span-3 lg:flex lg:flex-col lg:mt-10 lg:pb-10 lg:pl-8"
        >
          <div className="flex items-center justify-between border-b border-line pb-3">
            <span className="label text-graphite">Proceso</span>
            <span className="readout text-slate">{STAGES[step]?.n ?? "06"} / 06</span>
          </div>

          {readout}

          <ol className="hidden lg:block">
            {STAGES.map((s, i) => {
              const state = done || i < step ? "done" : i === step ? "active" : "idle";
              return (
                <li key={s.n} className="flex items-center justify-between gap-4 border-b border-line py-3.5">
                  <div className="flex items-baseline gap-3">
                    <span className="readout text-slate">{s.n}</span>
                    <span
                      className={`label transition-colors duration-300 ${
                        state === "idle" ? "text-slate/60" : state === "active" ? "text-blue-deep" : "text-ink"
                      }`}
                    >
                      {s.title}
                    </span>
                  </div>
                  <span aria-hidden="true" className="grid h-5 w-5 place-items-center">
                    {state === "done" ? (
                      <Check size={14} weight="bold" className="text-blue" />
                    ) : state === "active" ? (
                      <span className="h-2 w-2 animate-pulse-dot rounded-full bg-accent" />
                    ) : (
                      <span className="h-1.5 w-1.5 rounded-full bg-ink/20" />
                    )}
                  </span>
                </li>
              );
            })}
          </ol>

          {replay}

          <p className="readout mt-auto hidden pt-10 text-slate lg:block">
            © {new Date().getFullYear()} {site.name}
          </p>
        </motion.aside>
      </div>

      {/* Desktop stage: placed from the headline box. No transform / z-index
          on this wrapper, so the multiply blend reaches the type and panel. */}
      {stage ? (
        <div
          className="pointer-events-none absolute hidden lg:block"
          style={{ left: stage.left, top: stage.top, height: stage.h, width: (stage.h * 2) / 3 }}
        >
          <BottleAssembly progress={progress} scale={size} priority className="h-full" />
        </div>
      ) : null}
    </section>
  );
}
