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
            title="Una solución para toda tu marca"
            lead="Del agua de Tehuacán al producto en la mano de tu cliente: fórmula, envase, tapa y etiqueta, trabajados contigo."
            className="md:max-w-2xl"
          />
          <div className="shrink-0">
            <Button to="/servicios" variant="secondary">
              Ver servicios
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
