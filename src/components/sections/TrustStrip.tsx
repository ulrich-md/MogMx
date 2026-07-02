import { Drop } from "@phosphor-icons/react";
import { Reveal } from "../ui/Reveal";

/**
 * Kinetic capability strip (the page's single marquee). Giant ghost words
 * drift horizontally; each word inks in on hover, and hovering pauses the
 * band. Content is limited to affirmed services/types (no invented clients),
 * replacing the old placeholder logo wall.
 */
const words = [
  "Agua mineral",
  "Agua purificada",
  "Marca privada",
  "Maquila de bebidas",
  "Etiquetado",
  "Envasado",
];

function Band({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <ul
      aria-hidden={ariaHidden || undefined}
      className="flex w-max shrink-0 items-center"
    >
      {words.map((word) => (
        <li key={word} className="flex items-center">
          <span className="whitespace-nowrap px-6 font-display text-[2.6rem] font-extrabold uppercase leading-none tracking-tight text-navy/[0.14] transition-colors duration-300 hover:text-blue-deep sm:px-8 sm:text-6xl">
            {word}
          </span>
          <Drop size={18} weight="fill" aria-hidden="true" className="text-aqua/40" />
        </li>
      ))}
    </ul>
  );
}

export function TrustStrip() {
  return (
    <section className="overflow-hidden border-y border-line bg-foam">
      <div className="container-px pt-14">
        <Reveal>
          <p className="text-center text-[15px] text-slate">
            Producimos para marcas y distribuidores que quieren su propia
            bebida embotellada.
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
