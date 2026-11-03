import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { Eyebrow } from "../ui/Eyebrow";
import { FinishedBottle } from "../hero/BottleAssembly";
import { products } from "@/lib/assets";
import { site } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

type Visual = "bottle" | "brands" | "none";

/**
 * Interior page hero, same editorial world as the home hero: paper, poster
 * title, lead pinned to the right column, optional product photograph on a
 * signal block. Ends on a hairline into the content.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  visual = "none",
  tight = false,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  visual?: Visual;
  /** Less space below the hero (when the next section opens with its own headline). */
  tight?: boolean;
  children?: ReactNode;
}) {
  const reduce = useReducedMotion();
  const enter = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.85, delay, ease: EASE },
        };

  return (
    <section className="relative isolate overflow-hidden bg-paper pt-[72px]">
      <div className={`container-px relative grid gap-10 pt-14 md:pt-20 lg:grid-cols-12 lg:gap-8 ${tight ? "pb-4 md:pb-6" : "pb-14 md:pb-20"}`}>
        <div className={visual === "none" ? "lg:col-span-12" : "lg:col-span-8"}>
          {eyebrow ? (
            <motion.div {...enter(0)}>
              <Eyebrow>{eyebrow}</Eyebrow>
            </motion.div>
          ) : null}
          <h1 className="poster mt-6 text-[clamp(3.3rem,9.4vw,9rem)] text-ink">
            <span className="block overflow-hidden pb-[0.05em]">
              <motion.span
                className="block"
                initial={reduce ? false : { y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, delay: 0.08, ease: EASE }}
              >
                {title}
              </motion.span>
            </span>
          </h1>
          {lead || children ? (
            <motion.div
              {...enter(0.25)}
              className={`mt-10 grid gap-8 border-t border-line pt-10 ${visual === "none" ? "md:grid-cols-12 md:items-center" : ""}`}
            >
              {visual === "none" ? (
                <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border-l-2 border-accent pl-5 md:col-span-5">
                  <div className="col-span-2">
                    <dt className="readout text-slate">Origen</dt>
                    <dd className="poster mt-1 text-[1.9rem] text-ink md:text-[2.2rem]">{site.location.label}</dd>
                  </div>
                  <div>
                    <dt className="readout text-slate">Coordenadas</dt>
                    <dd className="mt-1 text-[14.5px] font-semibold text-graphite">{site.location.coordinates}</dd>
                  </div>
                  <div>
                    <dt className="readout text-slate">Altitud</dt>
                    <dd className="mt-1 text-[14.5px] font-semibold text-graphite">{site.location.altitude}</dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="readout text-slate">Biosfera</dt>
                    <dd className="mt-1 text-[14.5px] font-semibold text-graphite">{site.location.reserve}</dd>
                  </div>
                </dl>
              ) : null}
              {lead ? (
                <p
                  className={`max-w-prose text-[1.075rem] leading-[1.7] text-slate ${
                    visual === "none" ? "md:col-span-6 md:col-start-7 md:text-[1.35rem] md:leading-[1.6] text-graphite" : ""
                  }`}
                >
                  {lead}
                </p>
              ) : null}
              {children}
            </motion.div>
          ) : null}
        </div>

        {visual !== "none" ? (
          <motion.div
            {...enter(0.35)}
            aria-hidden="true"
            className="relative hidden h-[460px] lg:col-span-4 lg:block xl:h-[520px]"
          >
            {visual === "bottle" ? (
              <>
                <div className="absolute inset-0 flex justify-center">
                  <FinishedBottle className="h-full" />
                </div>
              </>
            ) : (
              <>
                <img
                  src={products.privateLabels}
                  alt=""
                  decoding="async"
                  className="absolute inset-0 m-auto h-full w-auto object-contain"
                />
              </>
            )}
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
