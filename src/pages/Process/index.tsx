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
        description="De la posibilidad a la realidad: tu idea, formulación, envase y tapa, producción, tu marca y el producto final."
        path="/proceso"
      />
      <PageHero
        product="bottle"
        eyebrow="Cómo trabajamos"
        title="De la posibilidad a la realidad"
        lead="Seis pasos entre la idea que traes hoy y el producto que vas a vender. Sabes en qué punto está el tuyo en todo momento."
      />

      <section className="bg-white">
        <div className="container-px pb-24 md:pb-28">
          <ProcessTimeline />
        </div>
      </section>

      <WaveDivider nextColor="#07232C" className="bg-white" />
      <CtaBand
        title="¿Empezamos tu proyecto?"
        lead="El primer paso es contarnos qué quieres lograr. De ahí lo aterrizamos contigo."
      />
    </>
  );
}
