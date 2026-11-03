import { SectionHeading } from "../ui/SectionHeading";
import { ServiceRow } from "../ui/ServiceRow";
import { Reveal } from "../ui/Reveal";
import { Button } from "../ui/Button";
import { products } from "@/lib/assets";
import { services } from "@/lib/site";

export function ServicesStrip() {
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

            <Reveal className="relative mt-12 hidden lg:block">
              <div aria-hidden="true" className="absolute inset-x-[12%] bottom-[8%] top-[22%] bg-bone" />
              <img
                src={products.family}
                alt="Familia de envases MOG: botella PET, lata, botella de vidrio y garrafón"
                loading="lazy"
                decoding="async"
                width={1536}
                height={1024}
                className="relative w-full"
              />
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="border-b border-line">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={i * 0.04}>
                <ServiceRow service={service} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
