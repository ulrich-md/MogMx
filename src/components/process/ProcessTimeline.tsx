import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { BottleAssembly } from "../hero/BottleAssembly";
import { processSteps } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Process ledger with a sticky bottle that builds itself as you read:
 * scrolling the six steps scrubs the same photographic assembly used in the
 * home hero (envase -> llenado -> tapa -> etiqueta). Native scroll only,
 * nothing is pinned or hijacked. Static (finished) under reduced motion.
 */
export function ProcessTimeline() {
  const root = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: root, offset: ["start 0.7", "end 0.85"] });
  const progress = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0.04, 1]);
  const meter = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={root} className="relative grid gap-10 lg:grid-cols-12 lg:gap-8">
      {/* Sticky build stage (desktop) */}
      <div className="hidden lg:col-span-5 lg:block">
        <div className="sticky top-[96px] flex h-[calc(100vh-120px)] max-h-[820px] flex-col">
          <div className="relative flex flex-1 justify-center">
            <motion.div
              aria-hidden="true"
              style={{ scaleY: useTransform(scrollYProgress, [0, 0.12], [0.2, 1]), originY: 1 }}
              className="absolute bottom-0 left-[24%] right-[24%] top-0 bg-[linear-gradient(180deg,#E6F6F9_0%,#CDEDF2_100%)]"
            />
            <BottleAssembly progress={progress} className="h-full" />
          </div>
          <div className="mt-4 h-[3px] w-full overflow-hidden bg-line">
            <motion.div style={{ scaleX: meter, originX: 0 }} className="h-full bg-gradient-to-r from-aqua to-blue" />
          </div>
        </div>
      </div>

      {/* Steps */}
      <ol className="border-t border-ink/15 lg:col-span-7">
        {processSteps.map((step) => (
          <motion.li
            key={step.n}
            initial={reduce ? false : { opacity: 0.25 }}
            whileInView={{ opacity: 1 }}
            viewport={{ amount: 0.6, margin: "-10% 0px -10% 0px" }}
            transition={{ duration: 0.5, ease: EASE }}
            className="group grid gap-x-8 gap-y-4 border-b border-ink/15 py-12 sm:grid-cols-[7.5rem_1fr] lg:min-h-[46vh] lg:py-16"
          >
            <span className="poster text-[5.5rem] text-accent sm:text-[6.5rem]">{step.n}</span>
            <div className="sm:pt-3">
              <h3 className="poster text-[2.6rem] text-ink sm:text-[3.4rem]">{step.title}</h3>
              <p className="mt-5 max-w-lg text-[1.05rem] leading-[1.7] text-slate">{step.description}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
