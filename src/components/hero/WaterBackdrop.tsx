/**
 * Subtle hero water atmosphere: a clean light base, two slow-drifting
 * brand-color orbs, and a gentle liquid wave at the bottom.
 * Decorative only, pointer-events-none, GPU transforms, reduced-motion safe.
 */
const WAVE =
  "M0,120 C240,80 480,80 720,120 C960,160 1200,160 1440,120 C1680,80 1920,80 2160,120 C2400,160 2640,160 2880,120 L2880,200 L0,200 Z";

export function WaterBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white via-foam to-mist/50" />

      <div
        className="absolute -left-28 top-8 h-[32rem] w-[32rem] rounded-full opacity-60 blur-3xl motion-safe:animate-drift"
        style={{
          background:
            "radial-gradient(circle at center, rgba(43,166,217,0.18), transparent 62%)",
        }}
      />
      <div
        className="absolute -right-24 top-1/3 h-[26rem] w-[26rem] rounded-full opacity-50 blur-3xl motion-safe:animate-drift"
        style={{
          background:
            "radial-gradient(circle at center, rgba(30,127,184,0.14), transparent 62%)",
          animationDelay: "1.8s",
        }}
      />

      {/* Floating droplets */}
      <span className="absolute left-[18%] top-[30%] h-2 w-2 rounded-full bg-aqua/40 motion-safe:animate-drift" />
      <span
        className="absolute right-[28%] top-[24%] h-1.5 w-1.5 rounded-full bg-blue/40 motion-safe:animate-drift"
        style={{ animationDelay: "1.2s" }}
      />
      <span
        className="absolute left-[42%] top-[16%] h-1 w-1 rounded-full bg-aqua/50 motion-safe:animate-drift"
        style={{ animationDelay: "0.6s" }}
      />

      {/* Bottom liquid surface */}
      <div className="absolute inset-x-0 bottom-0 h-44 overflow-hidden">
        <svg
          className="absolute bottom-0 left-0 h-full w-[200%] motion-safe:animate-wave-slow"
          viewBox="0 0 2880 200"
          preserveAspectRatio="none"
        >
          <path d={WAVE} fill="#CFE8F2" opacity="0.5" />
        </svg>
        <svg
          className="absolute bottom-0 left-0 h-full w-[200%] motion-safe:animate-wave-mid"
          viewBox="0 0 2880 200"
          preserveAspectRatio="none"
        >
          <path d={WAVE} fill="#2BA6D9" opacity="0.16" />
        </svg>
      </div>
    </div>
  );
}
