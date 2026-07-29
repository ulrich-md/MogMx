/**
 * Photography-free brand still-life: MOG's product family standing on a
 * reflective deep-water floor, with caustic light and mirrored reflections.
 * Replaces the old photo/AI-image slots (there are no real product photos),
 * so every image area reads as intentional brand art instead of a placeholder.
 * Fills its parent; the parent sets the aspect ratio.
 */

type Variant = "line" | "single";

function Bottle() {
  return (
    <g>
      <rect x="-26" y="0" width="52" height="18" rx="4" fill="#0A2B33" />
      <rect x="-26" y="16" width="52" height="16" rx="4" fill="#12444F" />
      <path d="M-16,32 L16,32 L26,74 L-26,74 Z" fill="#7FCBD6" />
      <rect x="-56" y="70" width="112" height="400" rx="40" fill="url(#ps-aqua)" />
      <rect x="-42" y="92" width="22" height="356" rx="11" fill="url(#ps-gloss)" opacity="0.8" />
      <rect x="30" y="92" width="16" height="356" rx="8" fill="#0C4A56" opacity="0.35" />
      <rect x="-50" y="250" width="100" height="106" rx="9" fill="#FFFFFF" fillOpacity="0.16" />
      <rect x="-50" y="250" width="100" height="106" rx="9" fill="none" stroke="#FFFFFF" strokeOpacity="0.28" />
      <path d="M-26,292 q13,-14 26,0 q13,14 26,0" stroke="#EAFCFE" strokeWidth="3" fill="none" strokeLinecap="round" />
      <text x="0" y="336" fill="#F2FBFD" fontFamily="'JetBrains Mono', monospace" fontSize="16" letterSpacing="3.5" textAnchor="middle">
        MOG
      </text>
    </g>
  );
}

function Can() {
  return (
    <g>
      <ellipse cx="0" cy="12" rx="78" ry="14" fill="#DCE9EC" />
      <ellipse cx="0" cy="12" rx="62" ry="10" fill="#9FB6BC" />
      <path d="M-78,14 L-74,262 Q-74,290 -46,296 L46,296 Q74,290 74,262 L78,14 Z" fill="url(#ps-cola)" />
      <rect x="-58" y="34" width="20" height="238" rx="10" fill="url(#ps-gloss)" opacity="0.75" />
      <path d="M-40,150 q20,-18 40,0 q20,18 40,0" stroke="#FFE3DB" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.9" />
      <text x="0" y="204" fill="#FFF4F1" fontFamily="'JetBrains Mono', monospace" fontSize="17" letterSpacing="4" textAnchor="middle">
        MOG
      </text>
    </g>
  );
}

function Glass() {
  return (
    <g>
      <rect x="-22" y="0" width="44" height="14" rx="4" fill="#0A2B33" />
      <path d="M-22,12 h44 l3,6 h-50 Z" fill="#123B44" />
      <rect x="-15" y="18" width="30" height="52" rx="6" fill="#BFE9D6" opacity="0.9" />
      <path d="M-15,70 Q-52,96 -52,150 L-52,356 Q-52,392 -16,392 L16,392 Q52,392 52,356 L52,150 Q52,96 15,70 Z" fill="url(#ps-lime)" />
      <rect x="-38" y="120" width="18" height="240" rx="9" fill="url(#ps-gloss)" opacity="0.65" />
      <rect x="-40" y="196" width="80" height="88" rx="8" fill="#FFFFFF" fillOpacity="0.18" />
      <text x="0" y="268" fill="#F2FDF8" fontFamily="'JetBrains Mono', monospace" fontSize="13" letterSpacing="3" textAnchor="middle">
        MOG
      </text>
    </g>
  );
}

const PRODUCT = { bottle: Bottle, can: Can, glass: Glass } as const;
type Item = { k: keyof typeof PRODUCT; cx: number; s: number; h: number };

const LAYOUTS: Record<Variant, Item[]> = {
  line: [
    { k: "bottle", cx: 600, s: 1.0, h: 470 },
    { k: "can", cx: 380, s: 0.86, h: 304 },
    { k: "glass", cx: 820, s: 0.82, h: 400 },
  ],
  single: [
    { k: "bottle", cx: 620, s: 1.05, h: 470 },
    { k: "glass", cx: 400, s: 0.66, h: 400 },
  ],
};

const FLOOR = 508;

export function ProductScene({
  variant = "line",
  className = "",
}: {
  variant?: Variant;
  className?: string;
}) {
  const items = LAYOUTS[variant];
  return (
    <svg
      viewBox="0 0 1200 675"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role="img"
      aria-label="Línea de productos MOG: agua, bebida y presentación en vidrio"
    >
      <defs>
        <linearGradient id="ps-panel" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="#0C3540" />
          <stop offset="0.5" stopColor="#072530" />
          <stop offset="1" stopColor="#04161C" />
        </linearGradient>
        <linearGradient id="ps-aqua" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#DCF6F8" />
          <stop offset="0.3" stopColor="#8FDDE6" />
          <stop offset="0.65" stopColor="#3FB3C4" />
          <stop offset="1" stopColor="#12707F" />
        </linearGradient>
        <linearGradient id="ps-cola" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FF9B85" />
          <stop offset="0.5" stopColor="#FB6F57" />
          <stop offset="1" stopColor="#C74830" />
        </linearGradient>
        <linearGradient id="ps-lime" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#D9F4E4" />
          <stop offset="0.45" stopColor="#7FD6AC" />
          <stop offset="1" stopColor="#2E8F6B" />
        </linearGradient>
        <linearGradient id="ps-gloss" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.6" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="ps-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#6FD3DC" stopOpacity="0.4" />
          <stop offset="1" stopColor="#6FD3DC" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ps-floorfade" cx="0.5" cy="0" r="0.9">
          <stop offset="0" stopColor="#0C3540" stopOpacity="0" />
          <stop offset="1" stopColor="#04161C" stopOpacity="0.85" />
        </radialGradient>
        <clipPath id="ps-reflclip">
          <rect x="0" y={FLOOR} width="1200" height={675 - FLOOR} />
        </clipPath>
        <filter id="ps-soft" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="30" />
        </filter>
        <filter id="ps-cshadow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
      </defs>

      <rect width="1200" height="675" fill="url(#ps-panel)" />
      <ellipse cx="600" cy="120" rx="620" ry="300" fill="url(#ps-glow)" filter="url(#ps-soft)" />
      <g stroke="#CFF3F7" strokeOpacity="0.09" strokeWidth="2" fill="none">
        <path d="M120,120 q160,-30 320,0 t320,0 t320,0" />
        <path d="M60,180 q200,34 400,0 t400,0 t400,0" />
        <path d="M180,250 q140,-24 280,0 t280,0 t280,0" />
      </g>

      {/* mirrored reflections */}
      <g clipPath="url(#ps-reflclip)" opacity="0.4">
        {items.map((i, idx) => {
          const P = PRODUCT[i.k];
          return (
            <g key={idx} transform={`translate(${i.cx},${FLOOR * 2}) scale(${i.s},${-i.s})`}>
              <P />
            </g>
          );
        })}
      </g>
      <rect x="0" y={FLOOR} width="1200" height={675 - FLOOR} fill="url(#ps-floorfade)" />
      <rect x="0" y={FLOOR} width="1200" height="1.5" fill="#7FE0E8" opacity="0.22" />

      {/* contact shadows + standing products */}
      {items.map((i, idx) => (
        <ellipse
          key={`s${idx}`}
          cx={i.cx}
          cy={FLOOR}
          rx={72 * i.s}
          ry={13 * i.s}
          fill="#000000"
          opacity="0.45"
          filter="url(#ps-cshadow)"
        />
      ))}
      {items.map((i, idx) => {
        const P = PRODUCT[i.k];
        return (
          <g key={`p${idx}`} transform={`translate(${i.cx},${FLOOR - i.h * i.s}) scale(${i.s})`}>
            <P />
          </g>
        );
      })}
    </svg>
  );
}
