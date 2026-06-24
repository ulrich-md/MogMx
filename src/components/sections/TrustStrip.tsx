import { Reveal } from "../ui/Reveal";

/**
 * Placeholder logo strip. Brand/client names are NOT invented here; these
 * are neutral geometric marks standing in for real client logos.
 * // REEMPLAZAR: logos reales de clientes y aliados (SVG).
 */
const marks = [
  <circle key="c" cx="22" cy="22" r="13" />,
  <rect key="s" x="9" y="9" width="26" height="26" rx="6" transform="rotate(45 22 22)" />,
  <path key="d" d="M22 7c6 7.5 10 12.6 10 17.4C32 30.8 27.6 35 22 35s-10-4.2-10-10.6C12 19.6 16 14.5 22 7Z" />,
  <polygon key="t" points="22,8 36,34 8,34" />,
  <rect key="p" x="8" y="16" width="28" height="12" rx="6" />,
  <path key="h" d="M22 7l13 7.5v15L22 37 9 29.5v-15L22 7Z" />,
];

export function TrustStrip() {
  return (
    <section className="bg-foam">
      <div className="container-px section">
        <Reveal>
          <p className="text-center text-[15px] text-slate">
            Producimos para marcas y distribuidores que quieren su propia agua
            embotellada.
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <ul
            aria-label="Espacio reservado para logotipos de clientes"
            className="mt-9 grid grid-cols-3 items-center gap-x-6 gap-y-8 sm:grid-cols-6"
          >
            {marks.map((mark, i) => (
              <li key={i} className="flex justify-center">
                <svg
                  width="44"
                  height="44"
                  viewBox="0 0 44 44"
                  aria-hidden="true"
                  className="fill-none stroke-slate/40 [&_*]:fill-none [&_*]:stroke-slate/40 opacity-70 transition-opacity duration-300 hover:opacity-100"
                  strokeWidth="1.5"
                >
                  {mark}
                </svg>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
