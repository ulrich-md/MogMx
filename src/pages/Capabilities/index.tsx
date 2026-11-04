import { Seo } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { CtaBand } from "@/components/sections/CtaBand";
import { photos, products, srcSet } from "@/lib/assets";
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
        visual="bottle"
        eyebrow="Capacidades"
        title="Todo lo que tu producto puede ser"
        lead="Tipos de agua, envases, tapas y presentaciones, con control de calidad y seguimiento por lote. La versatilidad para que tu marca encuentre su forma exacta."
      />

      {/* Tipos de agua + familia de envases */}
      <section className="overflow-hidden bg-paper">
        <div className="container-px section grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-5">
            <SectionHeading
              index="01"
              size="md"
              title="Agua mineral y purificada"
              lead="Producimos dos perfiles de agua, cada uno cuidado para mantener su carácter en cada lote."
            />
            <ul className="mt-10 border-t border-line">
              {waterTypes.map((t, i) => (
                <li key={t.title} className="group grid grid-cols-[auto_1fr] gap-x-5 border-b border-line py-6">
                  <span aria-hidden="true" data-text={String(i + 1).padStart(2, "0")} className="pseudo-text poster text-[2.6rem] text-ink/15 transition-colors duration-300 group-hover:text-accent" />
                  <div className="pt-1">
                    <h3 className="label text-[12.5px] text-ink">{t.title}</h3>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-slate">{t.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <Reveal className="relative lg:col-span-7">
            <img
              src={products.family} srcSet={srcSet(products.family)} sizes="(min-width: 1024px) 45vw, 90vw"
              alt="Envases MOG: botella PET de 600 ml, lata de 355 ml y botella de vidrio"
              loading="lazy"
              decoding="async"
              width={880}
              height={945}
              className="relative mx-auto max-h-[600px] w-auto"
            />
          </Reveal>
        </div>
      </section>

      {/* Calidad y trazabilidad: water photography band behind */}
      <section className="relative isolate overflow-hidden bg-water text-white">
        <img
          src={photos.water} srcSet={srcSet(photos.water)} sizes="100vw"
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 -z-20 h-full w-full object-cover opacity-60"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(3,20,26,0.88),rgba(7,35,44,0.82))]" />
        <div className="container-px section">
          <SectionHeading
            index="02"
            tone="dark"
            size="md"
            eyebrow="Calidad"
            title="Calidad y trazabilidad en cada lote"
            lead="Controles a lo largo del proceso y seguimiento por lote, del origen al producto terminado."
          />
          <div className="mt-14 grid border-t border-white/15 md:grid-cols-3">
            {qualityPoints.map((q, i) => (
              <Reveal
                key={q.title}
                delay={i * 0.06}
                className="group border-b border-white/15 py-10 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0"
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-full border border-white/20 text-aqua transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-ink">
                    <Icon name={q.icon} size={22} weight="bold" />
                  </span>
                  <span className="readout text-white/40">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="poster mt-8 text-[2.2rem]">{q.title}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-mist/85">{strip(q.description)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
