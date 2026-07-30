/**
 * Static, purpose-built illustration of the Tehuacán valley at dusk: receding
 * sierra ranges, a low sun, and the spring pool that gives MOG its water.
 * Replaces the heavy parallax hero scene that rendered poorly in a small box.
 * Fills its parent; render it full-bleed.
 */
const HZ = 430;

export function ValleyBanner({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1600 600"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role="img"
      aria-label="El valle de Tehuacán al atardecer, con su manantial"
    >
      <defs>
        <linearGradient id="vb-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#04161C" />
          <stop offset="0.42" stopColor="#072530" />
          <stop offset="0.66" stopColor="#0C3B44" />
          <stop offset="0.82" stopColor="#1C6270" />
        </linearGradient>
        <radialGradient id="vb-dusk" cx="0.66" cy="0.9" r="0.6">
          <stop offset="0" stopColor="#FB6F57" stopOpacity="0.5" />
          <stop offset="0.45" stopColor="#E98A5C" stopOpacity="0.18" />
          <stop offset="1" stopColor="#E98A5C" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="vb-sun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#FFE9D8" />
          <stop offset="0.55" stopColor="#FFC7A6" stopOpacity="0.6" />
          <stop offset="1" stopColor="#FFC7A6" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="vb-far" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2E5A66" />
          <stop offset="1" stopColor="#244C57" />
        </linearGradient>
        <linearGradient id="vb-mid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#183F49" />
          <stop offset="1" stopColor="#123037" />
        </linearGradient>
        <linearGradient id="vb-near" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0C2A31" />
          <stop offset="1" stopColor="#081F25" />
        </linearGradient>
        <linearGradient id="vb-pool" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2A7382" />
          <stop offset="0.4" stopColor="#134A56" />
          <stop offset="1" stopColor="#06222A" />
        </linearGradient>
        <linearGradient id="vb-haze" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#BFE9F0" stopOpacity="0" />
          <stop offset="0.5" stopColor="#BFE9F0" stopOpacity="0.4" />
          <stop offset="1" stopColor="#BFE9F0" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="vb-sref" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFD9C2" stopOpacity="0.5" />
          <stop offset="1" stopColor="#FFD9C2" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="1600" height="600" fill="url(#vb-sky)" />
      <rect width="1600" height="600" fill="url(#vb-dusk)" />
      <circle cx="1050" cy={HZ - 30} r="230" fill="url(#vb-sun)" />
      <circle cx="1050" cy={HZ - 30} r="46" fill="#FFEFE2" />

      <path
        d={`M0,300 L150,268 L280,296 L430,238 L560,300 L700,250 L860,304 L1010,244 L1180,300 L1330,256 L1470,300 L1600,270 L1600,${HZ} L0,${HZ} Z`}
        fill="url(#vb-far)"
      />
      <rect x="0" y="286" width="1600" height="80" fill="url(#vb-haze)" opacity="0.7" />
      <path
        d={`M0,346 L180,300 L360,352 L540,286 L720,350 L900,296 L1080,352 L1280,304 L1460,350 L1600,320 L1600,${HZ} L0,${HZ} Z`}
        fill="url(#vb-mid)"
      />
      <rect x="0" y="336" width="1600" height="70" fill="url(#vb-haze)" opacity="0.5" />
      <path
        d={`M0,392 L220,356 L430,396 L640,340 L840,398 L1050,352 L1260,398 L1460,360 L1600,392 L1600,${HZ} L0,${HZ} Z`}
        fill="url(#vb-near)"
      />

      <rect x="0" y={HZ} width="1600" height={600 - HZ} fill="url(#vb-pool)" />
      <path d={`M1010,${HZ} L1090,${HZ} L1058,600 L1042,600 Z`} fill="url(#vb-sref)" />
      <g transform={`translate(0,${HZ * 2}) scale(1,-1)`} opacity="0.14" fill="#0A2830">
        <path d={`M0,392 L220,356 L430,396 L640,340 L840,398 L1050,352 L1260,398 L1460,360 L1600,392 L1600,${HZ} L0,${HZ} Z`} />
      </g>
      <g stroke="#CFEFF4" strokeLinecap="round" fill="none" opacity="0.22">
        <path d="M200,478 q70,-8 140,0 t140,0" strokeWidth="2.5" />
        <path d="M980,520 q90,-9 180,0 t180,0" strokeWidth="2.5" opacity="0.8" />
        <path d="M540,556 q60,-7 120,0 t120,0" strokeWidth="2" />
      </g>
      <rect x="0" y={HZ} width="1600" height="1.5" fill="#8FE0E8" opacity="0.3" />
    </svg>
  );
}
