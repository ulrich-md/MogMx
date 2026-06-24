/**
 * Liquid wave section divider (SVG). Two layered, gently drifting waves
 * create a subtle water-surface transition between sections.
 * Motion collapses to static under prefers-reduced-motion.
 *
 * `nextColor` = the hex/token color of the section BELOW the divider.
 */
const WAVE_PATH =
  "M0,60 C240,20 480,20 720,60 C960,100 1200,100 1440,60 C1680,20 1920,20 2160,60 C2400,100 2640,100 2880,60 L2880,120 L0,120 Z";

export function WaveDivider({
  nextColor,
  flip = false,
  className = "",
}: {
  nextColor: string;
  flip?: boolean;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`relative w-full overflow-hidden leading-[0] ${
        flip ? "rotate-180" : ""
      } ${className}`}
      style={{ height: "clamp(48px, 6vw, 96px)" }}
    >
      <svg
        className="absolute bottom-0 left-0 h-full w-[200%] motion-safe:animate-wave-slow"
        viewBox="0 0 2880 120"
        preserveAspectRatio="none"
      >
        <path d={WAVE_PATH} fill={nextColor} opacity="0.45" />
      </svg>
      <svg
        className="absolute bottom-0 left-0 h-full w-[200%] motion-safe:animate-wave-mid"
        viewBox="0 0 2880 120"
        preserveAspectRatio="none"
      >
        <path d={WAVE_PATH} fill={nextColor} />
      </svg>
    </div>
  );
}
