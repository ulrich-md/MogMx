import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { Eyebrow } from "../ui/Eyebrow";
import { FinishedBottle } from "../hero/BottleAssembly";
import { products } from "@/lib/assets";

const EASE = [0.16, 1, 0.3, 1] as const;

type Visual = "bottle" | "family" | "none";

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
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  visual?: Visual;
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
    <section className="grain relative isolate overflow-hidden bg-paper pt-[72px]">
      <div className="container-px relative grid gap-10 pb-14 pt-14 md:pb-20 md:pt-20 lg:grid-cols-12 lg:gap-8">
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
              className={`mt-10 grid gap-6 border-t border-line pt-8 ${visual === "none" ? "md:grid-cols-12" : ""}`}
            >
              {lead ? (
                <p
                  className={`max-w-prose text-[1.075rem] leading-[1.7] text-slate ${
                    visual === "none" ? "md:col-span-7 md:col-start-6" : ""
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
                <div className="absolute bottom-0 left-[22%] right-[22%] top-0 bg-[linear-gradient(180deg,#E6F6F9_0%,#CDEDF2_100%)]" />
                <div className="absolute inset-0 flex justify-center">
                  <FinishedBottle className="h-full" />
                </div>
              </>
            ) : (
              <>
                <div className="absolute bottom-[18%] left-[8%] right-0 top-[24%] bg-[linear-gradient(180deg,#E6F6F9_0%,#CDEDF2_100%)]" />
                <img
                  src={products.family}
                  alt=""
                  decoding="async"
                  className="absolute inset-x-0 bottom-[12%] w-full"
                />
              </>
            )}
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
