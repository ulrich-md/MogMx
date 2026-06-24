import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { Eyebrow } from "../ui/Eyebrow";

export function PageHero({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
}) {
  const reduce = useReducedMotion();
  return (
    <section className="relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-foam via-white to-white"
      />
      <div className="container-px pb-14 pt-36 md:pb-20 md:pt-44">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          {eyebrow ? <Eyebrow className="mb-4">{eyebrow}</Eyebrow> : null}
          <h1 className="font-display text-[2.5rem] font-bold leading-[1.0] tracking-tight text-navy sm:text-5xl md:text-[3.4rem]">
            {title}
          </h1>
          {lead ? (
            <p className="mt-5 max-w-prose text-[1.075rem] leading-[1.7] text-slate">
              {lead}
            </p>
          ) : null}
          {children}
        </motion.div>
      </div>
    </section>
  );
}
