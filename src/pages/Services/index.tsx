import { Seo } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { WaveDivider } from "@/components/ui/WaveDivider";
import { services } from "@/lib/site";

export default function Services() {
  return (
    <>
      <Seo
        title="Servicios"
        description="Maquila de agua mineral, embotellado, marca privada, desarrollo de producto, líneas de envasado y etiquetado en Tehuacán, Puebla."
        path="/servicios"
      />
      <PageHero
        eyebrow="Servicios"
        title="Maquila y embotellado, de principio a fin"
        lead="Seis servicios para producir tu marca de agua con calidad constante. Elige el punto donde nos necesitas; nos encargamos del resto."
      />

      <section className="bg-white">
        <div className="container-px pb-24">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={i * 0.06}>
                <ServiceCard service={service} detailed />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider nextColor="#0E2A47" className="bg-white" />
      <CtaBand
        title="¿Qué servicio necesitas?"
        lead="Cuéntanos en qué etapa estás y preparamos una propuesta a la medida de tu proyecto."
      />
    </>
  );
}
