import { Seo } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { TehuacanScene } from "@/components/hero/TehuacanScene";
import { CtaBand } from "@/components/sections/CtaBand";
import { WaveDivider } from "@/components/ui/WaveDivider";
import { values } from "@/lib/site";

export default function About() {
  return (
    <>
      <Seo
        title="Nosotros"
        description="MOG México produce agua mineral y purificada en Tehuacán, Puebla, región históricamente conocida como cuna del agua mineral en México."
        path="/nosotros"
      />
      <PageHero
        eyebrow="Nosotros"
        title="Somos de donde nace el agua mineral"
        lead="Trabajamos desde Tehuacán, Puebla, la región que en México lleva generaciones ligada a los manantiales y al agua mineral."
      />

      {/* Tehuacán context (city context is affirmable; no company metrics) */}
      <section className="bg-white">
        <div className="container-px section grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <SectionHeading title="Hechos en Tehuacán, Puebla" />
            <div className="mt-6 space-y-4 text-[1.02rem] leading-[1.75] text-slate">
              <p>
                Tehuacán es históricamente conocida como una de las cunas del
                agua mineral en México, una región asociada por generaciones a
                sus manantiales y a la cultura del agua mineral.
              </p>
              <p>
                Desde aquí embotellamos agua mineral y purificada con la marca
                de cada cliente, y también otras bebidas cuando el proyecto lo
                pide. Cuidamos el perfil del agua y la consistencia lote a lote.
              </p>
              <p>
                Trabajamos igual con quien está lanzando su primera marca y con
                quien ya tiene un mercado que atender: mismo cuidado, mismos
                controles, la misma atención al detalle.
              </p>
            </div>
          </div>
          <div className="lg:col-span-6">
            <Reveal>
              <div className="relative aspect-[4/3] overflow-hidden rounded-card ring-1 ring-line">
                <TehuacanScene />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="bg-foam">
        <div className="container-px section">
          <SectionHeading
            eyebrow="Lo que nos guía"
            title="Cómo cuidamos tu producto"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.06}>
                <div className="h-full rounded-card bg-white p-7 shadow-soft ring-1 ring-line">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-mist text-blue">
                    <Icon name={v.icon} size={24} />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-navy">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-slate">
                    {v.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider nextColor="#07232C" className="bg-foam" />
      <CtaBand
        title="Produce tu marca con nosotros"
        lead="Llevamos tu idea del concepto al producto terminado, listo para tu canal de venta."
      />
    </>
  );
}
