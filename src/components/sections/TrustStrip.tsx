import { Reveal } from "../ui/Reveal";

/**
 * Kinetic capability strip (the page's single marquee). Outlined poster
 * words drift horizontally; each word inks in on hover, hovering pauses
 * the band. Content is limited to affirmed services/types.
 */
const words = [
  "Agua de Tehuacán",
  "Marca propia",
  "Agua purificada",
  "Envases y tapas",
  "Formulación",
  "Otras bebidas",
];

function Band({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <ul aria-hidden={ariaHidden || undefined} className="flex w-max shrink-0 items-center">
      {words.map((word) => (
        <li key={word} className="flex items-center">
          <span className="poster text-outline whitespace-nowrap px-7 text-[3.4rem] transition-colors duration-300 sm:px-10 sm:text-[5.5rem]">
            {word}
          </span>
          <span aria-hidden="true" className="h-3 w-3 shrink-0 bg-accent" />
        </li>
      ))}
    </ul>
  );
}

export function TrustStrip() {
  return (
    <section className="overflow-hidden border-y border-line bg-paper">
      <div className="container-px pt-16">
        <Reveal>
          <p className="label mx-auto max-w-xl text-center leading-relaxed text-graphite">
            Trabajamos con quien está lanzando su primera marca y con quien ya
            tiene un mercado que atender.
          </p>
        </Reveal>
      </div>

      <div className="group relative py-12" aria-label="Servicios y tipos de producto">
        <div className="flex w-max motion-safe:animate-marquee group-hover:[animation-play-state:paused]">
          <Band />
          <Band ariaHidden />
        </div>
      </div>
    </section>
  );
}
