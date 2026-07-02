import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { Eyebrow } from "../ui/Eyebrow";
import { WaveDivider } from "../ui/WaveDivider";
import { BottleSvg, CanSvg, Floater, JugSvg } from "../hero/Products";

const EASE = [0.16, 1, 0.3, 1] as const;

type Product = "bottle" | "can" | "jug" | "none";

const productSvg: Record<Exclude<Product, "none">, typeof BottleSvg> = {
  bottle: BottleSvg,
  can: CanSvg,
  jug: JugSvg,
};

/**
 * Interior page hero in the same deep-water world as the home hero: giant
 * uppercase display title on the abyss, an optional floating product accent,
 * and the white water-surface seam into the (white) content below.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  product = "none",
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  product?: Product;
  children?: ReactNode;
}) {
  const reduce = useReducedMotion();
  const Svg = product !== "none" ? productSvg[product] : null;

  return (
    <section className="relative isolate overflow-hidden bg-[#03141A]">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(120% 120% at 50% -20%, #0E3A44 0%, #07232C 48%, #03141A 100%)",
        }}
      />
      <svg
        aria-hidden="true"
        className="absolute inset-x-0 top-[18%] -z-10 h-20 w-full opacity-[0.07]"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <g stroke="#BFF0FB" strokeWidth="2" fill="none">
          <path d="M0,40 q180,-26 360,0 t360,0 t360,0 t360,0" />
          <path d="M0,78 q200,26 400,0 t400,0 t400,0" />
        </g>
      </svg>

      {Svg ? (
        <Floater
          delay={0.5}
          depth={0.5}
          floatY={10}
          duration={7}
          className="pointer-events-none absolute right-[5%] top-1/2 z-0 hidden h-52 -translate-y-1/3 lg:block xl:h-60"
        >
          <Svg className="h-full w-auto rotate-[8deg] opacity-90 drop-shadow-[0_26px_40px_rgba(3,16,22,0.5)]" />
        </Floater>
      ) : null}

      <div className="container-px relative pb-32 pt-36 md:pb-36 md:pt-44">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: EASE }}
          className="max-w-4xl"
        >
          {eyebrow ? (
            <Eyebrow tone="dark" className="mb-5">
              {eyebrow}
            </Eyebrow>
          ) : null}
          <h1 className="font-display text-[clamp(2.6rem,5.6vw,4.7rem)] font-extrabold uppercase leading-[0.96] tracking-[-0.02em] text-white">
            {title}
          </h1>
          {lead ? (
            <p className="mt-6 max-w-prose text-[1.075rem] leading-[1.7] text-mist/90">
              {lead}
            </p>
          ) : null}
          {children}
        </motion.div>
      </div>

      {/* Water surface into the white content below */}
      <div className="absolute inset-x-0 bottom-0">
        <WaveDivider nextColor="#FFFFFF" />
      </div>
    </section>
  );
}
