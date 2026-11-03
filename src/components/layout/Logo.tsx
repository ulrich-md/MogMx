import { Link } from "react-router-dom";

/** MOG wordmark: poster "MOG" + the label's signal bar + tracked "México". */
export function Logo({ tone = "ink" }: { tone?: "ink" | "white" | "navy" }) {
  const main = tone === "white" ? "text-white" : "text-ink";
  const sub = tone === "white" ? "text-white/60" : "text-slate";
  return (
    <Link to="/" className="group inline-flex items-center gap-3" aria-label="MOG México - inicio">
      <span className={`font-display text-[30px] uppercase leading-none tracking-[0.01em] ${main}`}>
        MOG
      </span>
      <span
        aria-hidden="true"
        className="h-7 w-[3px] origin-bottom bg-accent transition-transform duration-500 ease-water group-hover:scale-y-125"
      />
      <span className={`label leading-none ${sub}`}>México</span>
    </Link>
  );
}
