import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, WhatsappLogo } from "@phosphor-icons/react";
import { Seo } from "@/lib/seo";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { whatsappHref, wine } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * "Hablemos de vino": a single editorial page that hands visitors over to
 * Casa Balseca. Copy lives in `wine` (src/lib/site.ts).
 */
export default function Wine() {
  const reduce = useReducedMotion();
  const rise = (delay: number) =>
    reduce
      ? {}
      : { initial: { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay, ease: EASE } };

  return (
    <>
      <Seo title={wine.title} description={`${wine.title}. ${wine.lead}`} path="/vino" />

      <section
        className="relative isolate flex min-h-[100dvh] flex-col overflow-hidden pt-[72px] text-white"
        style={{ background: "linear-gradient(160deg, #03141A 0%, #07232C 55%, #0F4C58 100%)" }}
      >
        {/* Ghost word, decorative */}
        <span
          aria-hidden="true"
          data-text="Vino"
          className="poster pseudo-text pointer-events-none absolute -bottom-[0.12em] right-[-0.04em] -z-10 select-none text-[42vw] leading-[0.8] text-white/[0.04] lg:text-[30vw]"
        />

        <div className="container-px flex flex-1 flex-col justify-center py-20">
          <motion.div {...rise(0.05)}>
            <Eyebrow tone="dark">{wine.brand}</Eyebrow>
          </motion.div>

          <h1 className="poster mt-6 text-[clamp(4rem,15vw,13rem)]">
            <span className="block overflow-hidden pb-[0.05em]">
              <motion.span
                className="block"
                initial={reduce ? false : { y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, delay: 0.1, ease: EASE }}
              >
                {wine.title}
              </motion.span>
            </span>
          </h1>

          <motion.div
            {...rise(0.3)}
            className="mt-10 grid gap-8 border-t border-white/15 pt-8 md:grid-cols-12 md:items-end"
          >
            <div className="md:col-span-6">
              <p className="text-[1.2rem] leading-[1.6] text-mist md:text-[1.35rem]">{wine.lead}</p>
              <a
                href={wine.url}
                target="_blank"
                rel="noopener noreferrer"
                className="poster group mt-6 inline-flex items-center gap-3 text-[2rem] text-white transition-colors hover:text-aqua sm:text-[2.6rem]"
              >
                {wine.domain}
                <ArrowUpRight
                  size={28}
                  weight="bold"
                  className="transition-transform duration-300 ease-water group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </a>
            </div>

            <div data-primary-cta className="flex flex-wrap gap-3 md:col-span-6 md:justify-end">
              <Button href={wine.url} target="_blank" size="lg" withArrow>
                Visitar {wine.domain}
              </Button>
              <Button href={whatsappHref(wine.whatsappMessage)} target="_blank" variant="outlineDark" size="lg">
                <span className="inline-flex items-center gap-2">
                  <WhatsappLogo size={17} weight="fill" />
                  WhatsApp
                </span>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
