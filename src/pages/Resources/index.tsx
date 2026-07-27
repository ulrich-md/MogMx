import { Seo } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { VideoGallery } from "@/components/resources/VideoGallery";
import { DownloadCard } from "@/components/resources/DownloadCard";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { WaveDivider } from "@/components/ui/WaveDivider";
import { downloads } from "@/lib/site";

export default function Resources() {
  return (
    <>
      <Seo
        title="Recursos"
        description="Videos del proceso, ficha técnica, catálogo de presentaciones y certificaciones de MOG México."
        path="/recursos"
      />
      <PageHero
        product="can"
        eyebrow="Recursos"
        title="Videos y documentos"
        lead="Conoce cómo trabajamos, el proceso y la documentación de producto. Descarga lo que necesites para evaluar tu proyecto."
      />

      <section className="bg-white">
        <div className="container-px pb-20">
          <VideoGallery />
        </div>
      </section>

      <section className="bg-foam">
        <div className="container-px section">
          <SectionHeading
            title="Descargas"
            lead="Documentación lista para revisar internamente o compartir con tu equipo."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {downloads.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.06}>
                <DownloadCard item={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider nextColor="#07232C" className="bg-foam" />
      <CtaBand />
    </>
  );
}
