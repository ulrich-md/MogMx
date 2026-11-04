import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { ServiceRow } from "../ui/ServiceRow";
import { ServiceVisual } from "../ui/ServiceVisual";
import { Reveal } from "../ui/Reveal";
import { Button } from "../ui/Button";
import { serviceImages } from "@/lib/assets";
import { ArrowUpRight } from "@phosphor-icons/react";
import { services, whatsappHref } from "@/lib/site";

/**
 * Services ledger with a live preview: hovering (or focusing) a row swaps
 * the sticky image on the left to that service.
 */
export function ServicesStrip() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const current = services[active];
  const image = serviceImages[current.slug];

  return (
    <section className="relative bg-paper">
      <div className="container-px section grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              index="01"
              eyebrow="Servicios"
              size="md"
              title="Una solución para toda tu marca"
              lead="Del agua de Tehuacán al producto en la mano de tu cliente: fórmula, envase, tapa y etiqueta, trabajados contigo."
            />
            <div className="mt-8">
              <Button to="/servicios" variant="secondary" withArrow>
                Ver servicios
              </Button>
            </div>

            {/* Live preview of the hovered service */}
            <div className="relative mt-12 hidden aspect-[4/3] lg:block">
              <AnimatePresence initial={false}>
                <motion.div
                  key={current.slug}
                  initial={reduce ? false : { opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  {image ? <ServiceVisual image={image} className="h-full w-full" /> : null}
                </motion.div>
              </AnimatePresence>
              <div className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-between gap-4 rounded-b-card bg-gradient-to-t from-ink/70 to-transparent px-5 pb-4 pt-10">
                <span className="label text-white">{current.title}</span>
                <span className="readout text-white/70">{String(active + 1).padStart(2, "0")} / 06</span>
              </div>
            </div>
          </div>
        </div>

        {/* Phones / tablets: swipeable cards with each service's image */}
        <div className="-mx-5 min-w-0 sm:-mx-8 lg:hidden">
          <ul
            aria-label="Servicios"
            className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:px-8 [&::-webkit-scrollbar]:hidden"
          >
            {services.map((service, i) => {
              const img = serviceImages[service.slug];
              return (
                <li key={service.slug} className="w-[82%] shrink-0 snap-start sm:w-[46%]">
                  <a
                    href={whatsappHref(`Hola, me interesa el servicio: ${service.title}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full flex-col overflow-hidden rounded-card border border-line bg-white"
                  >
                    {img ? <ServiceVisual image={img} className="aspect-[4/3] w-full rounded-none" /> : null}
                    <div className="flex flex-1 flex-col p-5">
                      <span className="readout text-slate">{String(i + 1).padStart(2, "0")} / 06</span>
                      <h3 className="poster mt-3 text-[2rem] text-ink">{service.title}</h3>
                      <p className="mt-2 text-[14.5px] leading-relaxed text-slate">{service.summary}</p>
                      <span className="label mt-auto inline-flex items-center gap-2 pt-5 text-ink">
                        WhatsApp
                        <ArrowUpRight size={14} weight="bold" />
                      </span>
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
          <p className="readout px-5 text-slate sm:px-8">Desliza para ver más →</p>
        </div>

        <div className="hidden lg:col-span-7 lg:block">
          <div className="border-b border-line">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={i * 0.04}>
                <ServiceRow
                  service={service}
                  index={i}
                  active={i === active}
                  onActivate={() => setActive(i)}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
