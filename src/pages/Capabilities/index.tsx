import { Seo } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { ProductScene } from "@/components/ui/ProductScene";
import { CtaBand } from "@/components/sections/CtaBand";
import { WaveDivider } from "@/components/ui/WaveDivider";
import { waterTypes, qualityPoints } from "@/lib/site";

const strip = (s: string) => s.replace(/\s*\/\/ EDITABLE.*$/, "");

export default function Capabilities() {
  return (
    <>
      <Seo
        title="Capacidades"
        description="Agua mineral y purificada, versatilidad de envase y presentación, con control de calidad y trazabilidad por lote en Tehuacán, Puebla."
        path="/capacidades"
      />
      <PageHero
        product="jug"
        eyebrow="Capacidades"
        title="Todo lo que tu producto puede ser"
        lead="Tipos de agua, envases, tapas y presentaciones, con control de calidad y seguimiento por lote. La versatilidad para que tu marca encuentre su forma exacta."
      />

      {/* Tipos de agua + planta */}
      <section className="bg-white">
        <div className="container-px section grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <SectionHeading
              title="Agua mineral y purificada"
              lead="Producimos dos perfiles de agua, cada uno cuidado para mantener su carácter en cada lote."
            />
            <div className="mt-8 space-y-4">
              {waterTypes.map((t) => (
                <div
                  key={t.title}
                  className="flex gap-4 rounded-card bg-mist/60 p-5 ring-1 ring-line"
                >
                  <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-blue shadow-soft">
                    <Icon name="Drop" size={20} />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-semibold text-navy">
                      {t.title}
                    </h3>
                    <p className="mt-1 text-[14.5px] leading-relaxed text-slate">
                      {t.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-7">
            <Reveal>
              <div className="aspect-[4/3] overflow-hidden rounded-card ring-1 ring-white/10">
                <ProductScene variant="single" className="h-full w-full" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Calidad y trazabilidad */}
      <section className="bg-foam">
        <div className="container-px section">
          <SectionHeading
            eyebrow="Calidad"
            title="Calidad y trazabilidad en cada lote"
            lead="Controles a lo largo del proceso y seguimiento por lote, del origen al producto terminado."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {qualityPoints.map((q, i) => (
              <Reveal key={q.title} delay={i * 0.06}>
                <div className="h-full rounded-card bg-white p-7 shadow-soft ring-1 ring-line">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-mist text-blue">
                    <Icon name={q.icon} size={24} />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-navy">
                    {q.title}
                  </h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-slate">
                    {strip(q.description)}
                  </p>
                </div>
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
