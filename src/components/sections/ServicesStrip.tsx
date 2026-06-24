import { SectionHeading } from "../ui/SectionHeading";
import { ServiceRow } from "../ui/ServiceRow";
import { Reveal } from "../ui/Reveal";
import { Button } from "../ui/Button";
import { services } from "@/lib/site";

export function ServicesStrip() {
  return (
    <section className="bg-white">
      <div className="container-px section">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            title="Una planta, tu marca de agua"
            lead="Maquila y embotellado de principio a fin: del agua de origen al producto terminado, con tu identidad."
            className="md:max-w-2xl"
          />
          <div className="shrink-0">
            <Button to="/servicios" variant="secondary">
              Ver todos los servicios
            </Button>
          </div>
        </div>

        <div className="mt-12 border-b border-line">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={i * 0.04}>
              <ServiceRow service={service} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
