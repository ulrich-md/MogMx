/**
 * Bespoke flat editorial illustration of the Tehuacán valley, in MOG's brand
 * palette: sierra + spring (manantial) + bottling plant + premium bottle.
 * Pure vector (crisp, themeable, no external asset). Subtle motion on clouds
 * and water; collapses to static under prefers-reduced-motion.
 *
 * Story left->right: origin (mountains + spring) -> plant -> finished bottle.
 */
export function TehuacanScene({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="1440" y2="900" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#0A2038" />
          <stop offset="0.5" stopColor="#1E7FB8" />
          <stop offset="1" stopColor="#2BA6D9" />
        </linearGradient>
        <radialGradient id="sun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#E7B468" stopOpacity="0.95" />
          <stop offset="0.35" stopColor="#C9892F" stopOpacity="0.55" />
          <stop offset="1" stopColor="#C9892F" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="bottle" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F2F9FC" />
          <stop offset="1" stopColor="#CFE8F2" />
        </linearGradient>
        <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#CFE8F2" />
          <stop offset="1" stopColor="#2BA6D9" />
        </linearGradient>
      </defs>

      {/* Sky */}
      <rect width="1440" height="900" fill="url(#sky)" />

      {/* Sun glow + core (upper right) */}
      <circle cx="1170" cy="210" r="230" fill="url(#sun)" className="motion-safe:animate-drift" />
      <circle cx="1170" cy="210" r="62" fill="#E7B468" opacity="0.9" />

      {/* Clouds */}
      <g fill="#F2F9FC" className="motion-safe:animate-drift">
        <g opacity="0.45">
          <ellipse cx="330" cy="180" rx="90" ry="26" />
          <ellipse cx="400" cy="166" rx="60" ry="22" />
          <ellipse cx="260" cy="172" rx="52" ry="20" />
        </g>
      </g>
      <g fill="#CFE8F2" opacity="0.4">
        <ellipse cx="880" cy="120" rx="70" ry="20" />
        <ellipse cx="940" cy="110" rx="46" ry="16" />
      </g>

      {/* Back sierra */}
      <path
        d="M0,470 C240,400 360,360 540,420 C720,480 860,300 1020,380 C1200,470 1320,430 1440,470 L1440,900 L0,900 Z"
        fill="#0A2038"
      />
      {/* snow/light caps hint */}
      <path d="M1020,380 C1075,408 1110,430 1150,440 C1110,432 1070,432 1035,452 Z" fill="#CFE8F2" opacity="0.5" />

      {/* Mid hill */}
      <path
        d="M0,585 C300,520 480,560 720,540 C960,520 1150,585 1440,560 L1440,900 L0,900 Z"
        fill="#143D5E"
      />

      {/* Bottling plant on the mid hill */}
      <g>
        <rect x="556" y="486" width="120" height="62" rx="3" fill="#0A2038" />
        <rect x="676" y="500" width="46" height="48" rx="3" fill="#0A2038" />
        <rect x="600" y="456" width="30" height="34" rx="15" fill="#0A2038" />
        <path d="M556,486 L616,462 L676,486 Z" fill="#0A2038" />
        {/* lit windows */}
        <rect x="572" y="506" width="12" height="12" rx="2" fill="#E7B468" opacity="0.9" />
        <rect x="592" y="506" width="12" height="12" rx="2" fill="#E7B468" opacity="0.9" />
        <rect x="612" y="506" width="12" height="12" rx="2" fill="#E7B468" opacity="0.9" />
        <rect x="688" y="514" width="10" height="10" rx="2" fill="#E7B468" opacity="0.9" />
        <rect x="704" y="514" width="10" height="10" rx="2" fill="#E7B468" opacity="0.9" />
      </g>

      {/* Aqua hill */}
      <path
        d="M0,665 C360,620 600,685 900,652 C1140,626 1320,675 1440,658 L1440,900 L0,900 Z"
        fill="#1E7FB8"
      />

      {/* Spring / waterfall from the hill into the pool */}
      <path d="M735,548 C742,610 738,660 744,742 L772,742 C770,660 772,610 766,548 Z" fill="url(#water)" opacity="0.85" className="motion-safe:animate-drift" />

      {/* Foreground hill */}
      <path
        d="M0,752 C320,712 560,772 860,746 C1140,722 1320,762 1440,750 L1440,900 L0,900 Z"
        fill="#2BA6D9"
      />
      {/* amber sunlit rim on foreground hill (right) */}
      <path
        d="M860,746 C1060,729 1260,748 1440,740 L1440,762 C1260,768 1080,752 880,769 Z"
        fill="#C9892F"
        opacity="0.5"
      />

      {/* Water pool with foam line */}
      <path d="M0,832 C300,812 600,846 900,826 C1140,810 1320,838 1440,828 L1440,900 L0,900 Z" fill="#1E7FB8" />
      <path
        d="M0,832 C300,812 600,846 900,826 C1140,810 1320,838 1440,828"
        fill="none"
        stroke="#CFE8F2"
        strokeWidth="4"
        opacity="0.6"
        className="motion-safe:animate-drift"
      />

      {/* Premium bottle in the foreground (right) */}
      <g transform="translate(1086 600)">
        <ellipse cx="44" cy="232" rx="42" ry="9" fill="#0A2038" opacity="0.25" />
        <path
          d="M30,8 L58,8 L58,40 C58,52 70,58 70,86 L70,210 C70,224 60,232 44,232 C28,232 18,224 18,210 L18,86 C18,58 30,52 30,40 Z"
          fill="url(#bottle)"
          stroke="#CFE8F2"
          strokeWidth="1.5"
        />
        {/* water level */}
        <path d="M18,150 L70,150 L70,210 C70,224 60,232 44,232 C28,232 18,224 18,210 Z" fill="#2BA6D9" opacity="0.85" />
        {/* label */}
        <rect x="22" y="120" width="44" height="40" rx="3" fill="#0E2A47" />
        <rect x="28" y="133" width="32" height="4" rx="2" fill="#2BA6D9" />
        <rect x="28" y="143" width="22" height="3" rx="1.5" fill="#CFE8F2" opacity="0.8" />
        {/* cap */}
        <rect x="30" y="0" width="28" height="12" rx="3" fill="#C9892F" />
        {/* highlight */}
        <path d="M30,60 C28,110 28,170 32,214" fill="none" stroke="#FFFFFF" strokeWidth="3" opacity="0.45" strokeLinecap="round" />
      </g>

      {/* droplets */}
      <circle cx="1060" cy="690" r="5" fill="#CFE8F2" opacity="0.8" className="motion-safe:animate-drift" />
      <circle cx="1210" cy="730" r="4" fill="#CFE8F2" opacity="0.7" />
    </svg>
  );
}
