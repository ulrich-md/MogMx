import { Drop } from "@phosphor-icons/react";

type Aspect = "16/9" | "4/3" | "3/4" | "1/1" | "21/9";

const aspectClass: Record<Aspect, string> = {
  "16/9": "aspect-[16/9]",
  "4/3": "aspect-[4/3]",
  "3/4": "aspect-[3/4]",
  "1/1": "aspect-square",
  "21/9": "aspect-[21/9]",
};

/**
 * Editable image slot.
 *
 * - When `src` is provided, renders a real, lazy-loaded <img>.
 * - Otherwise renders a clean, on-brand placeholder that clearly signals a
 *   photo should be dropped in. Never a broken URL, never a blue overlay.
 *
 * // REEMPLAZAR: pass `src` with the real photo (botella / planta / línea).
 */
export function MediaPlaceholder({
  label,
  alt,
  aspect = "4/3",
  src,
  tone = "mist",
  rounded = "rounded-card",
  className = "",
}: {
  label: string;
  alt: string;
  aspect?: Aspect;
  src?: string;
  tone?: "mist" | "navy";
  rounded?: string;
  className?: string;
}) {
  if (src) {
    return (
      <div className={`overflow-hidden ${rounded} ${className}`}>
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={`${aspectClass[aspect]} w-full object-cover transition-transform duration-700 ease-water hover:scale-[1.03]`}
        />
      </div>
    );
  }

  const isNavy = tone === "navy";
  const surface = isNavy
    ? "bg-gradient-to-br from-navy to-navy-deep"
    : "bg-gradient-to-br from-mist via-foam to-white";
  const ring = isNavy ? "ring-white/10" : "ring-line";
  const ink = isNavy ? "text-mist" : "text-slate";
  const ripple = isNavy ? "#2FC1CF" : "#1893A6";

  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative isolate flex w-full items-center justify-center overflow-hidden ring-1 ${ring} ${surface} ${aspectClass[aspect]} ${rounded} ${className}`}
    >
      {/* Concentric ripples */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.5]"
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        {[40, 80, 120, 160, 200].map((r, i) => (
          <circle
            key={r}
            cx="200"
            cy="150"
            r={r}
            fill="none"
            stroke={ripple}
            strokeWidth="1"
            opacity={0.18 - i * 0.025}
          />
        ))}
      </svg>

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <span
          className={`grid h-12 w-12 place-items-center rounded-full ${
            isNavy ? "bg-white/10" : "bg-white shadow-soft"
          } motion-safe:animate-drift`}
        >
          <Drop size={22} weight="light" className={isNavy ? "text-aqua" : "text-blue"} />
        </span>
        <span
          className={`mt-4 text-[10px] font-semibold uppercase tracking-eyebrow ${
            isNavy ? "text-aqua" : "text-blue"
          }`}
        >
          Reemplazar
        </span>
        <span className={`mt-1.5 max-w-[22ch] text-[13px] leading-snug ${ink}`}>
          {label}
        </span>
      </div>
    </div>
  );
}
