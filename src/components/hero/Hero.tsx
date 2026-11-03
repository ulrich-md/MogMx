import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
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
import { ArrowRight, ArrowUpRight, ArrowCounterClockwise, Check, PencilSimple } from "@phosphor-icons/react";
import { Eyebrow } from "../ui/Eyebrow";
import { ASSEMBLY, BottleAssembly, assemblyStep } from "./BottleAssembly";
import { bottle } from "@/lib/assets";
import { primaryCta, processSteps, site } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;
const DURATION = 6.6;
/** Volume shown by the fill readout. */
const HERO_ML = 600;
const BRAND_MAX = 12;

/** The four build stages map onto the existing process steps 03-06. */
const STAGES = processSteps.slice(2);
/** Visible half-width of the bottle, as a fraction of the stage height. */
const HALF_W = 0.1435;

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
  const controls = useRef<AnimationPlaybackControls | null>(null);
  const [step, setStep] = useState(reduce ? 3 : 0);
  const [done, setDone] = useState(!!reduce);
  const [brand, setBrand] = useState("");
  const fieldId = useId();

  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const railRef = useRef<HTMLElement>(null);
  const [stage, setStage] = useState<Stage | null>(null);

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

  /*
   * Desktop placement. The bottle is BIG from the first frame: it spans the
   * full hero height under the header. Horizontally it lands on the end of
   * "embotellada." so it pierces the final "A." (the word stays readable,
   * and the clear plastic shows the letters through it), never touching the rail.
   */
  useLayoutEffect(() => {
    const measure = () => {
      const sec = sectionRef.current;
      const line = lineRef.current;
      const rail = railRef.current;
      if (!sec || !line || !rail || window.innerWidth < 1024) return setStage(null);
      const s = sec.getBoundingClientRect();
      const lineEnd = line.getBoundingClientRect().right - s.left;
      const railLeft = rail.getBoundingClientRect().left - s.left + 32;
      const top = 80;
      const h = Math.min(s.height - top - Math.max(20, window.innerHeight * 0.035), 1040);
      const cx = Math.min(lineEnd - 0.02 * h, railLeft - 28 - HALF_W * h);
      setStage({ h, top, left: cx - h / 3 });
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (sectionRef.current) ro.observe(sectionRef.current);
    if (lineRef.current) ro.observe(lineRef.current);
    document.fonts?.ready.then(measure).catch(() => undefined);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const fill = useTransform(progress, [...ASSEMBLY.fill], [0, 1]);
  const mlText = useTransform(fill, (f) => String(Math.round(f * HERO_ML)).padStart(3, "0"));
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
      className="group grid h-10 w-10 shrink-0 place-items-center rounded-full border border-ink/15 text-graphite transition-[opacity,color,background-color] hover:bg-ink hover:text-white disabled:opacity-30"
    >
      <ArrowCounterClockwise
        size={15}
        weight="bold"
        className="transition-transform duration-500 ease-water group-hover:-rotate-180"
      />
    </button>
  ) : null;

  // Readout (counts with the fill) + the private-label field (after the build)
  const meterBlock = (
      <div className="border-b border-line py-5">
        <p className="flex items-start font-display leading-[0.8] text-accent">
          <motion.span className="text-[clamp(4.2rem,6.4vw,6.6rem)] tabular-nums">{mlText}</motion.span>
          <span className="ml-1.5 mt-2 text-2xl">ml</span>
        </p>
        <p className="label mt-3 text-blue-deep">Agua mineral de Tehuacán</p>
        <div className="mt-5 h-[3px] w-full overflow-hidden bg-line">
          <motion.div style={{ scaleX: meter, originX: 0 }} className="h-full bg-gradient-to-r from-aqua to-blue" />
        </div>
      </div>
  );

  const brandBlock = (id: string) => (
      <div
        className={`border-b border-line py-5 transition-[opacity,transform] duration-700 ease-smooth ${
          done ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
        }`}
      >
        <label htmlFor={id} className="label flex items-center justify-between text-graphite">
          {processSteps[4].title}
          <PencilSimple size={15} weight="bold" aria-hidden="true" className="text-accent" />
        </label>
        <div className="mt-2 flex items-end gap-3">
          <input
            id={id}
            type="text"
            value={brand}
            maxLength={BRAND_MAX}
            disabled={!done}
            autoComplete="off"
            spellCheck={false}
            placeholder="MOG"
            onChange={(e) => setBrand(e.target.value.replace(/[^\p{L}\p{N} &.'-]/gu, ""))}
            className="poster w-full min-w-0 border-b-2 border-ink bg-transparent pb-1 text-[2.6rem] text-ink caret-accent placeholder:text-ink/20 focus:border-accent focus:outline-none"
          />
          {replay}
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
            top: stage.top + stage.h * 0.08,
            height: stage.h * 0.66,
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

          <h1 className="poster relative z-20 mt-5 text-[15.4vw] text-ink sm:text-[clamp(5rem,14vw,9rem)] lg:text-[clamp(7rem,11.6vw,10.5rem)]">
            <span className="block overflow-hidden pb-[0.04em]">
              <motion.span {...line(0.2)} className="block">
                Tu marca
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.04em]">
              <motion.span {...line(0.32)} className="block">
                <span ref={lineRef}>embotellada.</span>
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
              <BottleAssembly progress={progress} brand={brand} priority className="h-full" />
            </div>
          </div>

          {/* Mobile readout + brand field, right under the bottle */}
          <div className="mt-6 border-t border-line lg:hidden">
            <div className="flex items-center justify-between border-b border-line py-3">
              <span className="label text-graphite">{STAGES[step]?.title}</span>
              <span className="readout text-slate">{STAGES[step]?.n ?? "06"} / 06</span>
            </div>
            {meterBlock}
            {brandBlock(`${fieldId}-m`)}
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

        {/* Right rail (desktop): build readout, stages, brand field */}
        <motion.aside
          ref={railRef}
          {...rise(0.6)}
          aria-label="Proceso de embotellado"
          className="relative z-10 hidden lg:col-span-3 lg:mt-10 lg:flex lg:flex-col lg:pb-10 lg:pl-8"
        >
          <div className="flex items-center justify-between border-b border-line pb-3">
            <span className="label text-graphite">Proceso</span>
            <span className="readout text-slate">{STAGES[step]?.n ?? "06"} / 06</span>
          </div>

          {meterBlock}

          <ol>
            {STAGES.map((s, i) => {
              const state = done || i < step ? "done" : i === step ? "active" : "idle";
              return (
                <li key={s.n} className="flex items-center justify-between gap-4 border-b border-line py-3">
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

          {brandBlock(`${fieldId}-d`)}

          <p className="readout mt-auto hidden pt-10 text-slate lg:block">
            © {new Date().getFullYear()} {site.name}
          </p>
        </motion.aside>
      </div>

      {/* Desktop stage (z auto): the headline (z-20) paints ABOVE the bottle,
          label included, so the type always reads. No transform / z-index
          here, so the clear plastic still multiplies over the panel. */}
      {stage ? (
        <div
          className="pointer-events-none absolute hidden lg:block"
          style={{ left: stage.left, top: stage.top, height: stage.h, width: (stage.h * 2) / 3 }}
        >
          <BottleAssembly progress={progress} brand={brand} priority className="h-full" />
        </div>
      ) : null}
    </section>
  );
}
