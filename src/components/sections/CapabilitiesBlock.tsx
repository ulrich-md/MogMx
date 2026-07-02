import { Icon } from "../ui/Icon";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { Button } from "../ui/Button";
import { MediaPlaceholder } from "../ui/MediaPlaceholder";
import { waterTypes } from "@/lib/site";
import { media } from "@/lib/media";

export function CapabilitiesBlock() {
  return (
    <section className="bg-white">
      <div className="container-px section grid gap-12 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <SectionHeading
            title="Infraestructura para producir a escala"
            lead="Líneas de embotellado, control de calidad y trazabilidad por lote para mantener tu producto siempre consistente."
          />
          <ul className="mt-8 space-y-5">
            {waterTypes.map((t, i) => (
              <li key={t.title} className="group flex gap-4">
                <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-mist text-blue transition-all duration-300 ease-water group-hover:bg-blue group-hover:text-white">
                  <Icon name={["Drop", "Flask", "Package"][i] ?? "Drop"} size={20} />
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold text-navy">
                    {t.title}
                  </h3>
                  <p className="mt-1 text-[14.5px] leading-relaxed text-slate">
                    {t.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button to="/capacidades" variant="secondary">
              Ver capacidades
            </Button>
          </div>
        </div>

        <div className="lg:col-span-7">
          <Reveal className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <MediaPlaceholder
                src={media.bottlingLine}
                label="Línea de embotellado en operación"
                alt="Línea de embotellado de MOG México en operación"
                aspect="16/9"
                tone="navy"
              />
            </div>
            <div className="group rounded-card bg-mist p-6 ring-1 ring-line transition-all duration-300 ease-water hover:-translate-y-1 hover:shadow-lift">
              <Icon
                name="ShieldCheck"
                size={26}
                className="text-blue transition-transform duration-300 ease-water group-hover:scale-110"
              />
              <h3 className="mt-4 font-display text-lg font-semibold text-navy">
                Control de calidad
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-navy/70">
                Controles a lo largo del proceso para mantener la consistencia
                entre lotes.
              </p>
            </div>
            <div className="group rounded-card bg-navy p-6 transition-all duration-300 ease-water hover:-translate-y-1 hover:shadow-lift">
              <Icon
                name="MapPin"
                size={26}
                className="text-aqua transition-transform duration-300 ease-water group-hover:scale-110"
              />
              <h3 className="mt-4 font-display text-lg font-semibold text-white">
                Trazabilidad por lote
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-mist">
                Cada lote queda identificado, del origen al producto terminado.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
