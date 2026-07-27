import { Seo } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceRow } from "@/components/ui/ServiceRow";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { WaveDivider } from "@/components/ui/WaveDivider";
import { services } from "@/lib/site";

export default function Services() {
  return (
    <>
      <Seo
        title="Servicios"
        description="Agua mineral de Tehuacán con tu marca: marca propia, mejora de formulación, diversidad de envases y tapas, otras bebidas y producto final."
        path="/servicios"
      />
      <PageHero
        eyebrow="Servicios"
        product="can"
        title="Una solución para toda tu marca"
        lead="Seis formas de trabajar juntos, del agua de origen al producto en anaquel. Entra donde nos necesites; el resto lo cuidamos nosotros."
      />

      <section className="bg-white">
        <div className="container-px pb-24">
          <div className="border-b border-line">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={i * 0.04}>
                <ServiceRow service={service} index={i} detailed />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider nextColor="#07232C" className="bg-white" />
      <CtaBand
        title="¿Qué servicio necesitas?"
        lead="Cuéntanos en qué etapa estás y preparamos una propuesta a la medida de tu proyecto."
      />
    </>
  );
}
