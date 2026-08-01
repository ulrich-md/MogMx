import { Seo } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowUpRight } from "@phosphor-icons/react";
import { ValleyBanner } from "@/components/ui/ValleyBanner";
import { CtaBand } from "@/components/sections/CtaBand";
import { WaveDivider } from "@/components/ui/WaveDivider";
import { values, tehuacanFacts, biosphereLink } from "@/lib/site";

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

      {/* El origen: statement editorial + cuerpo a dos columnas (sin split-imagen) */}
      <section className="bg-white">
        <div className="container-px section">
          <Reveal>
            <Eyebrow>El origen</Eyebrow>
            <h2 className="mt-5 max-w-4xl font-display text-[2.1rem] font-extrabold uppercase leading-[1.02] tracking-[-0.015em] text-navy sm:text-5xl md:text-[3.4rem]">
              El agua mineral de México nació en{" "}
              <span className="text-blue">este valle.</span>
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-10 border-t border-line pt-10 md:grid-cols-2 md:gap-14">
            <Reveal>
              <p className="text-[1.08rem] leading-[1.8] text-slate">
                Tehuacán es históricamente conocida como una de las cunas del
                agua mineral en México, una región asociada por generaciones a
                sus manantiales y a la cultura del agua mineral. Ese origen no se
                fabrica ni se copia: se tiene o no se tiene.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="text-[1.08rem] leading-[1.8] text-slate">
                Desde aquí embotellamos agua mineral y purificada con la marca de
                cada cliente, y también otras bebidas cuando el proyecto lo pide.
                Cuidamos el perfil del agua y la consistencia lote a lote, porque
                una marca se construye en que sepa siempre igual.
              </p>
              <p className="mt-6 text-[1.08rem] leading-[1.8] text-slate">
                Trabajamos igual con quien está lanzando su primera marca y con
                quien ya tiene un mercado que atender: mismo cuidado, mismos
                controles, la misma atención al detalle.
              </p>
            </Reveal>
          </div>

          <Reveal>
            <p className="mt-10 border-t border-line pt-8 text-[1.02rem] leading-[1.7] text-slate">
              Producimos dentro de la Reserva de la Biosfera Tehuacán-Cuicatlán,
              Patrimonio Mundial de la UNESCO.{" "}
              <a
                href={biosphereLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 font-medium text-blue-deep underline-offset-4 transition-colors hover:text-navy hover:underline"
              >
                Conoce la reserva
                <ArrowUpRight
                  size={15}
                  weight="bold"
                  className="transition-transform duration-300 ease-water group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </p>
          </Reveal>
        </div>
      </section>

      {/* Interludio cinematográfico: el valle, full-bleed */}
      <section className="relative h-[46vh] min-h-[320px] w-full overflow-hidden bg-ink">
        <ValleyBanner className="absolute inset-0 h-full w-full" />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(4,22,28,0.35) 0%, rgba(4,22,28,0) 30%, rgba(4,22,28,0.55) 100%)",
          }}
        />
        <div className="container-px absolute inset-x-0 bottom-0 pb-8">
          <p className="font-mono text-[11px] uppercase tracking-eyebrow text-aqua">
            Tehuacán, Puebla
          </p>
          <p className="mt-2 max-w-xl font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
            Del valle y su manantial, a tu marca.
          </p>
        </div>
      </section>

      {/* Conoce más de Tehuacán: contexto cultural (split feature) */}
      <section className="bg-white">
        <div className="container-px section grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>El lugar</Eyebrow>
              <h2 className="mt-5 font-display text-[2rem] font-bold leading-[1.05] tracking-tight text-navy sm:text-4xl md:text-[2.7rem]">
                Conoce más de Tehuacán
              </h2>
              <p className="mt-6 max-w-md text-[1.02rem] leading-[1.75] text-slate">
                No es solo de donde viene el agua. Es uno de los lugares donde,
                hace miles de años, la gente aprendió a cultivar y a manejar el
                agua. Ese es el suelo en el que nace tu marca.
              </p>
              <a
                href={biosphereLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-7 inline-flex items-center gap-2 text-[15px] font-semibold text-blue-deep transition-colors hover:text-navy"
              >
                Conoce la reserva de la biosfera
                <ArrowUpRight
                  size={16}
                  weight="bold"
                  className="transition-transform duration-300 ease-water group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="border-t border-line">
              {tehuacanFacts.map((f, i) => (
                <Reveal key={f.term} delay={i * 0.05}>
                  <div className="group grid gap-x-8 gap-y-1 border-b border-line py-6 sm:grid-cols-12">
                    <h3 className="font-display text-lg font-bold tracking-tight text-navy transition-colors duration-300 group-hover:text-blue sm:col-span-4">
                      {f.term}
                    </h3>
                    <p className="text-[15px] leading-relaxed text-slate sm:col-span-8">
                      {f.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Principios: lista editorial numerada (no 4 tarjetas iguales) */}
      <section className="bg-foam">
        <div className="container-px section">
          <Reveal>
            <Eyebrow>Cómo trabajamos</Eyebrow>
            <h2 className="mt-5 max-w-2xl font-display text-[2rem] font-bold leading-[1.05] tracking-tight text-navy sm:text-4xl md:text-[2.9rem]">
              Cuatro principios, sin excepción
            </h2>
          </Reveal>

          <div className="mt-12 border-t border-line">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.05}>
                <div className="group grid items-baseline gap-x-8 gap-y-2 border-b border-line py-8 md:grid-cols-12">
                  <div className="flex items-baseline gap-4 md:col-span-5">
                    <span className="font-display text-lg font-bold text-slate/40 transition-colors duration-300 group-hover:text-blue">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-2xl font-bold tracking-tight text-navy transition-transform duration-300 ease-water group-hover:translate-x-1 md:text-[1.9rem]">
                      {v.title}
                    </h3>
                  </div>
                  <p className="text-[15px] leading-relaxed text-slate md:col-span-7">
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
