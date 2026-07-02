import { Seo } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { CountUp } from "@/components/ui/CountUp";
import { CtaBand } from "@/components/sections/CtaBand";
import { WaveDivider } from "@/components/ui/WaveDivider";
import {
  waterTypes,
  formats,
  capabilityStats,
  exampleMetrics,
  qualityPoints,
} from "@/lib/site";
import { media } from "@/lib/media";

const strip = (s: string) => s.replace(/\s*\/\/ EDITABLE.*$/, "");

export default function Capabilities() {
  return (
    <>
      <Seo
        title="Capacidades"
        description="Tipos de agua, formatos y presentaciones, capacidad instalada, calidad y trazabilidad por lote en Tehuacán, Puebla."
        path="/capacidades"
      />
      <PageHero
        eyebrow="Capacidades"
        title="Infraestructura y calidad para tu producción"
        lead="Líneas de embotellado, formatos flexibles y control de calidad con trazabilidad por lote, pensados para producir a escala sin perder consistencia."
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
              <MediaPlaceholder
                src={media.fillingLine}
                label="Interior de planta y línea de embotellado"
                alt="Detalle de llenado y tapado en la línea de MOG México"
                aspect="4/3"
                tone="navy"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Formatos y presentaciones */}
      <section className="bg-foam">
        <div className="container-px section">
          <SectionHeading
            title="Formatos y presentaciones"
            lead="Distintas presentaciones para acompañar tu canal de venta. Confirma medidas exactas con nuestro equipo."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {formats.map((f, i) => (
              <Reveal key={f.label} delay={i * 0.05}>
                <div className="h-full rounded-card bg-white p-6 shadow-soft ring-1 ring-line">
                  <Icon name="Drop" size={26} className="text-blue" />
                  <h3 className="mt-4 font-display text-base font-semibold text-navy">
                    {f.label}
                  </h3>
                  <p className="mt-1 font-display text-lg font-bold text-blue">
                    {strip(f.note)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Capacidad instalada (bracket placeholders) + illustrative count-up */}
      <section className="bg-white">
        <div className="container-px section">
          <SectionHeading
            title="Capacidad instalada"
            lead="Estas cifras son editables: reemplázalas con tus datos verificados."
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {capabilityStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-card bg-navy p-7 text-center"
              >
                <p className="font-display text-3xl font-bold tracking-tight text-white">
                  {stat.value}
                </p>
                <p className="mt-1 text-[13px] font-medium text-aqua">
                  {stat.unit}
                </p>
                <p className="mt-3 text-[13.5px] text-mist">{stat.label}</p>
              </div>
            ))}
            <div className="rounded-card bg-mist p-7 text-center ring-1 ring-line">
              <p className="font-display text-3xl font-bold tracking-tight text-navy">
                [certificación]
              </p>
              <p className="mt-3 text-[13.5px] text-navy/70">
                Certificaciones vigentes
              </p>
            </div>
          </div>

          {/* Illustrative count-up strip (clearly tagged, not claimed facts) */}
          <div className="mt-14 rounded-card border border-dashed border-line bg-foam/70 p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-display text-lg font-semibold text-navy">
                Cifras ilustrativas
              </h3>
              <span className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-eyebrow text-blue-deep ring-1 ring-line">
                ejemplo · editable
              </span>
            </div>
            <div className="mt-7 grid gap-8 sm:grid-cols-3">
              {exampleMetrics.map((m) => (
                <div key={m.label}>
                  <p className="font-display text-4xl font-bold tracking-tight text-blue">
                    <CountUp to={m.to} />
                  </p>
                  <p className="mt-2 text-[14px] text-slate">{m.label}</p>
                </div>
              ))}
            </div>
            <p className="mt-7 text-[13px] text-slate">
              Cifras de ejemplo para ilustrar el formato. Reemplázalas con datos
              reales verificados antes de publicar.
            </p>
          </div>
        </div>
      </section>

      {/* Calidad y trazabilidad */}
      <section className="bg-foam">
        <div className="container-px section">
          <SectionHeading
            eyebrow="Calidad"
            title="Calidad y trazabilidad en cada lote"
            lead="Controles a lo largo del proceso y seguimiento por lote, del agua de origen al producto terminado."
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
