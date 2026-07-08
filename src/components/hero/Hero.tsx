import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "../ui/Button";
import { Eyebrow } from "../ui/Eyebrow";
import { WaveDivider } from "../ui/WaveDivider";
import { BottleSvg, CanSvg, Floater, GlassSvg, JugSvg, MiniSvg } from "./Products";
import { primaryCta } from "@/lib/site";
// Hero-only headline face: the rest of the site uses Syne (font-display),
// but the hero keeps the earlier Bricolage Grotesque treatment.
import "@fontsource/bricolage-grotesque/800.css";

const EASE = [0.16, 1, 0.3, 1] as const;
const HEADLINE =
  "block font-['Bricolage_Grotesque'] font-extrabold uppercase leading-[0.98] tracking-[-0.035em] text-white";

export function Hero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 520], [0, -44]);
  const contentOpacity = useTransform(scrollY, [0, 480], [1, 0]);

  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: EASE },
        };

  // Headline lines wipe up into place.
  const clip = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: "0.4em", clipPath: "inset(0 0 100% 0)" },
          animate: { opacity: 1, y: 0, clipPath: "inset(0 0 -12% 0)" },
          transition: { duration: 0.9, delay, ease: EASE },
        };

  return (
    <section className="relative isolate flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-[#03141A] px-5 pb-24 pt-24 text-center">
      {/* Deep-water base + light from the surface + faint caustics */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(125% 85% at 50% -12%, #0E3A44 0%, #07232C 46%, #03141A 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-[42%]"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 0%, rgba(124,237,236,0.16) 0%, rgba(124,237,236,0) 70%)",
        }}
      />
      <svg
        aria-hidden="true"
        className="absolute inset-x-0 top-[13%] -z-10 h-24 w-full opacity-[0.07]"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <g stroke="#BFF0FB" strokeWidth="2" fill="none">
          <path d="M0,40 q180,-26 360,0 t360,0 t360,0 t360,0" />
          <path d="M0,78 q200,26 400,0 t400,0 t400,0" />
        </g>
      </svg>
      {/* Soft glows behind the products */}
      <div
        aria-hidden="true"
        className="absolute left-[2%] top-[26%] -z-10 hidden h-[54%] w-[30%] rounded-full bg-[radial-gradient(circle,_rgba(111,211,220,0.22)_0%,_transparent_70%)] blur-3xl lg:block"
      />
      <div
        aria-hidden="true"
        className="absolute right-[0%] top-[12%] -z-10 hidden h-[46%] w-[26%] rounded-full bg-[radial-gradient(circle,_rgba(251,111,87,0.2)_0%,_transparent_70%)] blur-3xl lg:block"
      />

      {/* Floating products, layered around the headline (desktop) */}
      <motion.div
        aria-hidden="true"
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="pointer-events-none absolute inset-0 hidden lg:block"
      >
        {/* Behind the type: garrafon bleeding off the right edge */}
        <Floater
          delay={0.9}
          depth={0.4}
          floatY={10}
          duration={7.5}
          className="absolute -right-16 top-[40%] z-0 h-[31vh] opacity-90"
        >
          <JugSvg className="h-full w-auto -rotate-[8deg] drop-shadow-[0_30px_44px_rgba(3,16,22,0.5)]" />
        </Floater>
        {/* Behind the type: glass juice bottle bleeding off the left edge */}
        <Floater
          delay={1}
          depth={0.3}
          floatY={9}
          duration={8.2}
          className="absolute -left-6 top-[32%] z-0 h-[38vh] opacity-85"
        >
          <GlassSvg className="h-full w-auto rotate-[10deg] drop-shadow-[0_28px_42px_rgba(3,16,22,0.5)]" />
        </Floater>
        {/* Far depth: mini personal bottle drifting top-right */}
        <Floater
          delay={1.1}
          depth={0.22}
          floatY={7}
          duration={5.8}
          className="absolute right-[22%] top-[7%] z-0 h-[16vh] opacity-80"
        >
          <MiniSvg className="h-full w-auto -rotate-[14deg] drop-shadow-[0_22px_34px_rgba(3,16,22,0.5)]" />
        </Floater>
        {/* In front: bottle kissing the left edge of the type */}
        <Floater
          delay={0.65}
          depth={1}
          floatY={16}
          duration={6}
          className="pointer-events-auto absolute left-[3%] top-[13%] z-20 h-[56vh] max-h-[600px]"
        >
          <BottleSvg className="h-full w-auto -rotate-[8deg] drop-shadow-[0_40px_56px_rgba(3,16,22,0.55)]" />
        </Floater>
        {/* In front: can clipping the right corner of line one */}
        <Floater
          delay={0.78}
          depth={0.75}
          floatY={13}
          duration={6.8}
          className="pointer-events-auto absolute right-[2%] top-[15%] z-20 h-[34vh] max-h-[380px]"
        >
          <CanSvg className="h-full w-auto rotate-[11deg] drop-shadow-[0_36px_50px_rgba(3,16,22,0.55)]" />
        </Floater>
      </motion.div>

      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex w-full max-w-[1180px] flex-col items-center"
      >
        <motion.div {...rise(0.2)}>
          <Eyebrow tone="dark">MAQUILA · EMBOTELLADO · MARCA PRIVADA</Eyebrow>
        </motion.div>

        <h1 className="mt-6">
          <motion.span {...clip(0.35)} className={`${HEADLINE} text-[min(13vw,11.4rem)]`}>
            Tu marca,
          </motion.span>
          <motion.span {...clip(0.5)} className={`${HEADLINE} text-[min(10.2vw,8.9rem)]`}>
            embotellada.
          </motion.span>
        </h1>

        {/* Mobile: compact floating product row (no overlaps) */}
        <div className="mt-8 flex items-end justify-center gap-7 lg:hidden" aria-hidden="true">
          <Floater delay={0.6} depth={0.6} floatY={8} duration={6} className="h-36">
            <BottleSvg className="h-full w-auto -rotate-6" />
          </Floater>
          <Floater delay={0.72} depth={0.45} floatY={7} duration={7} className="h-28">
            <CanSvg className="h-full w-auto rotate-6" />
          </Floater>
          <Floater delay={0.84} depth={0.3} floatY={6} duration={7.8} className="h-24">
            <JugSvg className="h-full w-auto -rotate-3" />
          </Floater>
        </div>

        <motion.p
          {...rise(0.62)}
          className="mx-auto mt-8 max-w-xl text-[1.0625rem] leading-[1.6] text-[#B7DDE3]"
        >
          Maquila y embotellado de agua y bebidas en Tehuacán, la cuna del
          agua mineral. Tu línea, de principio a fin.
        </motion.p>

        <motion.div
          {...rise(0.74)}
          className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:gap-6"
        >
          <Button to={primaryCta.to} withArrow size="lg" className="w-full sm:w-auto">
            {primaryCta.label}
          </Button>
          <Link
            to="/servicios"
            className="text-[15px] font-semibold text-white underline-offset-[6px] transition-colors hover:text-mint hover:underline"
          >
            Ver servicios
          </Link>
        </motion.div>
      </motion.div>

      {/* Water surface: the white of the next section laps into the hero. */}
      <div className="absolute inset-x-0 bottom-0 z-30">
        <WaveDivider nextColor="#FFFFFF" />
      </div>
    </section>
  );
}
