import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { ServiceRow } from "../ui/ServiceRow";
import { ServiceVisual } from "../ui/ServiceVisual";
import { Reveal } from "../ui/Reveal";
import { Button } from "../ui/Button";
import { serviceImages } from "@/lib/assets";
import { services } from "@/lib/site";

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

        <div className="lg:col-span-7">
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
