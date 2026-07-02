import { Seo } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessTimeline } from "@/components/process/ProcessTimeline";
import { CtaBand } from "@/components/sections/CtaBand";
import { WaveDivider } from "@/components/ui/WaveDivider";

export default function Process() {
  return (
    <>
      <Seo
        title="Proceso"
        description="De la cotización a la entrega: cotización, formulación, producción, envasado, etiquetado y entrega de tu marca."
        path="/proceso"
      />
      <PageHero
        product="bottle"
        eyebrow="Cómo trabajamos"
        title="Un proceso claro, de la cotización a la entrega"
        lead="Cada proyecto sigue seis etapas trazables. Sabes en qué punto está tu producción en todo momento."
      />

      <section className="bg-white">
        <div className="container-px pb-24 md:pb-28">
          <ProcessTimeline />
        </div>
      </section>

      <WaveDivider nextColor="#07232C" className="bg-white" />
      <CtaBand
        title="¿Empezamos tu proyecto?"
        lead="El primer paso es una cotización. Cuéntanos tu idea y la aterrizamos contigo."
      />
    </>
  );
}
