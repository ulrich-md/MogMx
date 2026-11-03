import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import { Seo } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CtaBand } from "@/components/sections/CtaBand";
import { photos } from "@/lib/assets";
import { values, tehuacanFacts, biosphereLink } from "@/lib/site";

function ValleyBand() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={ref} className="relative h-[72vh] min-h-[420px] w-full overflow-hidden bg-abyss">
      <motion.img
        src={photos.valley}
        alt="El valle de Tehuacán al atardecer, con cactáceas columnares y el Pico de Orizaba al fondo"
        loading="lazy"
        decoding="async"
        style={reduce ? undefined : { y, scale: 1.2 }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,20,26,0.25)_0%,rgba(3,20,26,0)_35%,rgba(3,20,26,0.78)_100%)]"
      />
      <div className="container-px absolute inset-x-0 bottom-0 pb-10 md:pb-14">
        <p className="label text-aqua">Tehuacán, Puebla</p>
        <p className="poster mt-3 max-w-3xl text-[clamp(2.6rem,6vw,5.6rem)] text-white">
          Del valle y su manantial, a tu marca.
        </p>
      </div>
    </section>
  );
}

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

      {/* El origen */}
      <section className="bg-paper">
        <div className="container-px section">
          <Reveal>
            <Eyebrow>El origen</Eyebrow>
            <h2 className="poster mt-6 max-w-5xl text-[clamp(2.8rem,6.4vw,6.2rem)] text-ink">
              El agua mineral de México nació en{" "}
              <span className="text-accent">este valle.</span>
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-10 border-t border-line pt-10 md:grid-cols-12 md:gap-8">
            <Reveal className="md:col-span-5">
              <figure className="relative overflow-hidden rounded-card bg-bone">
                <img
                  src={photos.street}
                  alt="Botella de agua mineral MOG en la mano, en una calle de un pueblo mexicano"
                  loading="lazy"
                  decoding="async"
                  width={1024}
                  height={1536}
                  className="aspect-[4/5] w-full object-cover"
                />
                <span aria-hidden="true" className="absolute left-0 top-0 h-[3px] w-24 bg-accent" />
              </figure>
            </Reveal>
            <Reveal delay={0.08} className="flex flex-col justify-end md:col-span-6 md:col-start-7">
              <p className="text-[1.1rem] leading-[1.8] text-graphite">
                Tehuacán es históricamente conocida como una de las cunas del
                agua mineral en México, una región asociada por generaciones a
                sus manantiales y a la cultura del agua mineral. Ese origen no se
                fabrica ni se copia: se tiene o no se tiene.
              </p>
              <p className="mt-6 text-[1.05rem] leading-[1.8] text-slate">
                Desde aquí embotellamos agua mineral y purificada con la marca de
                cada cliente, y también otras bebidas cuando el proyecto lo pide.
                Cuidamos el perfil del agua y la consistencia lote a lote, porque
                una marca se construye en que sepa siempre igual.
              </p>
              <p className="mt-6 text-[1.05rem] leading-[1.8] text-slate">
                Trabajamos igual con quien está lanzando su primera marca y con
                quien ya tiene un mercado que atender: mismo cuidado, mismos
                controles, la misma atención al detalle.
              </p>
            </Reveal>
          </div>

          <Reveal>
            <p className="mt-12 flex flex-col gap-4 border-t border-line pt-8 text-[1.02rem] leading-[1.7] text-slate sm:flex-row sm:items-center sm:justify-between">
              <span>
                Producimos dentro de la Reserva de la Biosfera Tehuacán-Cuicatlán,
                Patrimonio Mundial de la UNESCO.
              </span>
              <a
                href={biosphereLink}
                target="_blank"
                rel="noopener noreferrer"
                className="label group inline-flex shrink-0 items-center gap-2 text-ink"
              >
                Conoce la reserva
                <span className="grid h-9 w-9 place-items-center rounded-full border border-ink/15 transition-colors duration-300 group-hover:border-accent group-hover:bg-accent">
                  <ArrowUpRight size={15} weight="bold" />
                </span>
              </a>
            </p>
          </Reveal>
        </div>
      </section>

      <ValleyBand />

      {/* Conoce más de Tehuacán */}
      <section className="bg-paper">
        <div className="container-px section grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Reveal className="lg:sticky lg:top-28">
              <Eyebrow>El lugar</Eyebrow>
              <h2 className="poster mt-6 text-[clamp(2.6rem,5vw,4.6rem)] text-ink">Conoce más de Tehuacán</h2>
              <p className="mt-6 max-w-md text-[1.02rem] leading-[1.75] text-slate">
                No es solo de donde viene el agua. Es uno de los lugares donde,
                hace miles de años, la gente aprendió a cultivar y a manejar el
                agua. Ese es el suelo en el que nace tu marca.
              </p>
              <a
                href={biosphereLink}
                target="_blank"
                rel="noopener noreferrer"
                className="label group mt-8 inline-flex items-center gap-3 text-ink"
              >
                Conoce la reserva de la biosfera
                <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-white transition-colors duration-300 group-hover:bg-accent group-hover:text-ink">
                  <ArrowUpRight size={15} weight="bold" />
                </span>
              </a>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="border-t border-line">
              {tehuacanFacts.map((f, i) => (
                <Reveal key={f.term} delay={i * 0.05}>
                  <div className="group grid gap-x-8 gap-y-2 border-b border-line py-8 sm:grid-cols-12">
                    <div className="flex items-baseline gap-4 sm:col-span-5">
                      <span className="readout text-slate">{String(i + 1).padStart(2, "0")}</span>
                      <h3 className="poster text-[2.1rem] text-ink transition-colors duration-300 group-hover:text-accent">
                        {f.term}
                      </h3>
                    </div>
                    <p className="text-[15px] leading-relaxed text-slate sm:col-span-7 sm:pt-2">{f.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Principios */}
      <section className="bg-bone">
        <div className="container-px section">
          <Reveal>
            <Eyebrow>Cómo trabajamos</Eyebrow>
            <h2 className="poster mt-6 max-w-3xl text-[clamp(2.6rem,5.6vw,5.2rem)] text-ink">
              Cuatro principios, sin excepción
            </h2>
          </Reveal>

          <div className="mt-14 grid border-t border-ink/15 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal
                key={v.title}
                delay={i * 0.05}
                className="group relative border-b border-ink/15 py-10 sm:px-6 sm:[&:nth-child(odd)]:border-r lg:border-b-0 lg:border-r lg:first:pl-0 lg:last:border-r-0"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-[-1px] h-[3px] w-0 bg-accent transition-[width] duration-500 ease-water group-hover:w-full"
                />
                <span className="poster block text-[4rem] text-ink/15 transition-colors duration-300 group-hover:text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="poster mt-4 text-[2.3rem] text-ink">{v.title}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-slate">{v.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Produce tu marca con nosotros"
        lead="Llevamos tu idea del concepto al producto terminado, listo para tu canal de venta."
      />
    </>
  );
}
