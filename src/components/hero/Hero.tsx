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
import { ArrowRight, ArrowCounterClockwise, PencilSimple } from "@phosphor-icons/react";
import { Eyebrow } from "../ui/Eyebrow";
import { ASSEMBLY, BottleAssembly } from "./BottleAssembly";
import { Button } from "../ui/Button";
import { bottle } from "@/lib/assets";
import { primaryCta, processSteps } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;
const DURATION = 6.6;
/** Volume shown by the fill readout. */
const HERO_ML = 600;
const BRAND_MAX = 12;

/** Desktop: the bottle starts just under the header and owns the right half. */
const STAGE_TOP = 88;
/** Visible half-width of the bottle as a fraction of its canvas height. */
const BOTTLE_HALF = 0.1435;
const STAGE_H = "min(calc(100dvh - 88px - 3vh), 62vw, 1000px)";
/** Centre of the bottle at 74% of the 1440 shell (inside its 48 px gutters). */
const STAGE_LEFT = `calc((100% - min(100%, 1440px)) / 2 + 48px + 0.74 * (min(100%, 1440px) - 96px) - ${STAGE_H} / 3)`;

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
  const sectionRef = useRef<HTMLElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [stageTop, setStageTop] = useState<number | null>(null);
  /** Desktop headline size, capped so "embotellada." always ends before the bottle. */
  const [headFont, setHeadFont] = useState<number | null>(null);
  /** Extra room under the first screen so the whole bottle (and its shadow) fits. */
  const [padBottom, setPadBottom] = useState(0);

  /*
   * Desktop: keep the bottle big, and drop it so the opaque label starts just
   * under "embotellada." Only the clear neck/shoulder crosses the headline;
   * the base bleeds past the fold into the next section.
   */
  useLayoutEffect(() => {
    const measure = () => {
      const sec = sectionRef.current;
      const h1 = h1Ref.current;
      const st = stageRef.current;
      if (!sec || !h1 || !st || window.innerWidth < 1024) return setHeadFont(null);
      const h = st.offsetHeight;
      // Leave room above the cap for the filler nozzle body (~20% of the bottle height)
      const top = Math.round(STAGE_TOP - 16 + 0.2 * h);
      // "embotellada." is ~5.3 em wide in Anton; keep a clear gap to the bottle.
      const base = Math.min(Math.max(112, 0.116 * window.innerWidth), 184);
      const bottleLeft = st.getBoundingClientRect().left + (1 / 3 - BOTTLE_HALF) * h;
      const avail = bottleLeft - h1.getBoundingClientRect().left - 32;
      setHeadFont(Math.floor(Math.min(base, avail / 5.33)));
      setStageTop(top);
      // The base bleeds past the fold on load, but the section must contain it
      // so scrolling never reveals a hard crop.
      const natural = 72 + (gridRef.current?.offsetHeight ?? 0);
      setPadBottom(Math.max(0, Math.ceil(top + h + 36 - natural)));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (h1Ref.current) ro.observe(h1Ref.current);
    if (stageRef.current) ro.observe(stageRef.current);
    if (gridRef.current) ro.observe(gridRef.current);
    document.fonts?.ready.then(measure).catch(() => undefined);
    return () => ro.disconnect();
  }, []);
  const [done, setDone] = useState(!!reduce);
  const [brand, setBrand] = useState("");
  const fieldId = useId();


  useMotionValueEvent(progress, "change", (p) => {
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


  const fill = useTransform(progress, [...ASSEMBLY.fill], [0, 1]);
  const mlText = useTransform(fill, (f) => String(Math.round(f * HERO_ML)).padStart(3, "0"));
  const noteOpacity = useTransform(progress, [ASSEMBLY.fill[0], ASSEMBLY.fill[0] + 0.05], [0, 1]);

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

  const replay = !reduce ? (
    <button
      type="button"
      onClick={() => play()}
      disabled={!done}
      aria-label="Repetir la animación de la botella"
      className="group grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink/15 text-graphite transition-[opacity,color,background-color] hover:bg-ink hover:text-white disabled:opacity-30"
    >
      <ArrowCounterClockwise
        size={14}
        weight="bold"
        className="transition-transform duration-500 ease-water group-hover:-rotate-180"
      />
    </button>
  ) : null;

  // "Tu marca": the visitor's brand prints on the label, then the CTA converts it
  const brandField = (id: string) => (
    <div className="max-w-[420px]">
      <label htmlFor={id} className="label flex items-center gap-2 text-graphite">
        <PencilSimple size={14} weight="bold" aria-hidden="true" className="text-blue-deep" />
        {processSteps[4].title}
      </label>
      <input
        id={id}
        type="text"
        value={brand}
        maxLength={BRAND_MAX}
        autoComplete="off"
        spellCheck={false}
        placeholder="MOG"
        onChange={(e) => setBrand(e.target.value.replace(/[^\p{L}\p{N} &.'-]/gu, ""))}
        className="poster mt-2 w-full min-w-0 border-b-2 border-ink/80 bg-transparent pb-1 text-[2.4rem] text-ink caret-accent placeholder:text-ink/20 focus:border-blue focus:outline-none sm:text-[2.8rem]"
      />
    </div>
  );

  const actions = (
    <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-4">
      <Button to={primaryCta.to} size="lg" withArrow>
        {primaryCta.label}
      </Button>
      <Link
        to="/servicios"
        className="label group inline-flex items-center gap-2 text-ink underline-offset-[6px] hover:underline"
      >
        Ver servicios
        <ArrowRight size={15} weight="bold" className="transition-transform duration-300 ease-water group-hover:translate-x-1" />
      </Link>
    </div>
  );

  const lead = (
    <p className="max-w-[34rem] text-[1.075rem] leading-[1.65] text-graphite md:text-[1.15rem]">
      Nace en Tehuacán, la cuna del agua mineral en México. Sale con tu
      nombre, en el envase y la bebida que tu marca necesite.
    </p>
  );

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-paper pt-[72px]"
      style={padBottom ? { paddingBottom: padBottom } : undefined}
    >

      <div ref={gridRef} className="container-px relative grid min-h-[calc(100dvh-72px)] grid-cols-1 lg:grid-cols-12 lg:gap-x-8">
        <div className="relative flex flex-col pb-12 pt-6 lg:col-span-12 lg:pb-14 lg:pt-10">
          <motion.div {...rise(0.15)}>
            <Eyebrow>AGUA MINERAL DE TEHUACÁN · MARCA PROPIA</Eyebrow>
          </motion.div>

          <h1 ref={h1Ref} style={headFont ? { fontSize: headFont } : undefined} className="poster mt-5 text-[15.4vw] text-ink sm:text-[clamp(5rem,14vw,9rem)] lg:text-[clamp(7rem,11.6vw,11.5rem)]">
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

          {/* Mobile / tablet: bottle in flow, a quiet readout under it */}
          <div className="relative mx-auto mt-4 h-[min(66vh,620px)] w-full lg:hidden">
            <div className="absolute inset-0 flex justify-center">
              <BottleAssembly progress={progress} brand={brand} filler={false} priority className="h-full" />
            </div>
          </div>
          <div className="mt-5 flex items-center justify-between border-y border-line py-3 lg:hidden">
            <p className="flex items-baseline gap-2">
              <motion.span className="poster text-[2rem] tabular-nums text-ink">{mlText}</motion.span>
              <span className="label text-blue-deep">ml · Agua mineral de Tehuacán</span>
            </p>
            {replay}
          </div>

          {/* Reading order: headline -> bottle -> lead -> tu marca -> cotizar */}
          <motion.div {...rise(0.5)} className="mt-8 lg:mt-auto lg:max-w-[min(48%,560px)] lg:pt-10">
            {lead}
            <div className="mt-8">{brandField(fieldId)}</div>
            {actions}
          </motion.div>
        </div>
      </div>

      {/* Desktop stage: the single focal point. Opaque label just below the
          headline, base bleeding past the fold. No transform / z-index here:
          the clear plastic multiplies over the type. */}
      <div
        ref={stageRef}
        className="pointer-events-none absolute hidden lg:block"
        style={{
          top: stageTop ?? STAGE_TOP,
          left: STAGE_LEFT,
        }}
      >
        <BottleAssembly
          progress={progress}
          brand={brand}
          reflection={false}
          priority
          className="h-[min(calc(100dvh-88px-3vh),62vw,1000px)]"
        />

        {/* Ghost type, quieter: "Tehuacán" running up beside the bottle */}
        <span
          aria-hidden="true"
          className="poster ghost-type absolute left-[78%] top-[6%] rotate-180 whitespace-nowrap text-[min(calc((100dvh-150px)/3.6),10.5rem)] leading-[0.82] opacity-50 [writing-mode:vertical-rl]"
        >
          Tehuacán
        </span>

        {/* Fill annotation: a hairline from the water to the readout */}
        <motion.div
          style={{ opacity: noteOpacity }}
          className="pointer-events-auto absolute left-[73%] top-[70%] flex items-center gap-3 rounded-card bg-paper/85 py-2 pr-2"
        >
          <span aria-hidden="true" className="h-px w-14 bg-ink/40" />
          <div>
            <p className="flex items-baseline gap-1.5 leading-none">
              <motion.span className="poster text-[2.6rem] tabular-nums text-ink">{mlText}</motion.span>
              <span className="poster text-[1.2rem] text-ink">ml</span>
            </p>
            <p className="label mt-2 max-w-[10.5rem] text-blue-deep">Agua mineral de Tehuacán</p>
          </div>
          <div className="ml-1 self-start">{replay}</div>
        </motion.div>
      </div>
    </section>
  );
}
