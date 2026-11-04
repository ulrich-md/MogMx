import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { ShelfExplorer } from "./ShelfExplorer";
import { waterTypes } from "@/lib/site";

export function CapabilitiesBlock() {
  return (
    <section className="overflow-hidden bg-paper">
      <div className="container-px section grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-10">
        {/* Interactive tiendita shelf: hotspots per presentation */}
        <Reveal className="relative lg:col-span-7">
          <ShelfExplorer />
          <p className="readout mt-3 text-slate">
            <span className="lg:hidden">Toca los puntos</span>
            <span className="hidden lg:inline">Pasa el cursor sobre los puntos</span>
          </p>
        </Reveal>

        <div className="lg:col-span-5">
          <SectionHeading
            index="04"
            eyebrow="Capacidades"
            size="md"
            title="Versatilidad que se nota en el anaquel"
            lead="Múltiples envases, tapas y presentaciones, con control de calidad y trazabilidad por lote para que tu producto sea siempre el mismo."
          />
          <ul className="mt-10 border-t border-line">
            {waterTypes.map((t, i) => (
              <li key={t.title} className="group grid grid-cols-[auto_1fr] gap-x-5 border-b border-line py-5">
                <span className="readout pt-1 text-slate transition-colors group-hover:text-accent-deep">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="label text-[12.5px] text-ink">{t.title}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-slate">{t.description}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="group rounded-card bg-ink p-5 text-white transition-transform duration-500 ease-water hover:-translate-y-1">
              <Icon name="ShieldCheck" size={22} weight="bold" className="text-accent" />
              <h3 className="label mt-5 text-[12px]">Control de calidad</h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-white/65">
                Controles a lo largo del proceso para mantener la consistencia
                entre lotes.
              </p>
            </div>
            <div className="group rounded-card bg-accent p-5 text-ink transition-transform duration-500 ease-water hover:-translate-y-1">
              <Icon name="MapPin" size={22} weight="bold" />
              <h3 className="label mt-5 text-[12px]">Trazabilidad por lote</h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-ink/75">
                Cada lote queda identificado, del origen al producto terminado.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <Button to="/capacidades" variant="secondary" withArrow>
              Ver capacidades
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
