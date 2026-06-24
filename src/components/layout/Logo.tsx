import { Link } from "react-router-dom";

/** MOG wordmark with a compact water-drop mark. */
export function Logo({ tone = "navy" }: { tone?: "navy" | "white" }) {
  const main = tone === "white" ? "text-white" : "text-navy";
  const sub = tone === "white" ? "text-mist" : "text-slate";
  return (
    <Link
      to="/"
      className="group inline-flex items-center gap-2.5"
      aria-label="MOG México - inicio"
    >
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-navy shadow-soft transition-transform duration-300 ease-water group-hover:-translate-y-0.5">
        <svg width="18" height="18" viewBox="0 0 64 64" aria-hidden="true">
          <path
            d="M32 13c8.5 10.2 14 17.6 14 24.6C46 46 39.7 51 32 51s-14-5-14-13.4C18 30.6 23.5 23.2 32 13Z"
            fill="#2BA6D9"
          />
          <circle cx="26.5" cy="38" r="3" fill="#FFFFFF" opacity="0.85" />
        </svg>
      </span>
      <span className="leading-none">
        <span className={`block font-display text-[19px] font-bold tracking-tight ${main}`}>
          MOG
        </span>
        <span
          className={`mt-0.5 block text-[9px] font-semibold uppercase tracking-[0.28em] ${sub}`}
        >
          México
        </span>
      </span>
    </Link>
  );
}
