/**
 * MOG Mexico - Centralized design tokens.
 * Single accent (amber) is reserved EXCLUSIVELY for CTAs / primary buttons.
 * Brand water colors (navy / blue / aqua / mist) are used with restraint.
 * These tokens mirror the CSS custom properties declared in src/index.css.
 */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Deep mineral navy: dark sections + primary text
        navy: "#0E2A47",
        "navy-deep": "#0A2038",
        // Water blues: accents, used sparingly
        blue: "#1E7FB8",
        // AA-safe deeper blue for small body text / links on light surfaces (>=5.4:1)
        "blue-deep": "#176FA3",
        aqua: "#2BA6D9",
        // Very light blue: soft backgrounds
        mist: "#CFE8F2",
        foam: "#F2F9FC",
        // Secondary text
        slate: "#5B6B78",
        // Single warm CTA accent (ties to the brand family). CTAs only.
        amber: "#C9892F",
        "amber-deep": "#A8701C",
        // Hairlines / dividers
        line: "#E3EDF3",
        white: "#FFFFFF",
      },
      fontFamily: {
        display: ['"Space Grotesk"', "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        eyebrow: "0.24em",
      },
      borderRadius: {
        card: "1.25rem",
        input: "0.75rem",
      },
      maxWidth: {
        prose: "65ch",
      },
      boxShadow: {
        // Tinted to the brand navy hue, never pure black
        soft: "0 2px 10px -3px rgba(14,42,71,0.08), 0 12px 40px -16px rgba(14,42,71,0.12)",
        lift: "0 18px 50px -18px rgba(14,42,71,0.22)",
        amber: "0 12px 30px -10px rgba(201,137,47,0.45)",
        inset: "inset 0 1px 0 rgba(255,255,255,0.6)",
      },
      transitionTimingFunction: {
        water: "cubic-bezier(0.32, 0.72, 0, 1)",
        smooth: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "wave-x": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        drift: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        sheen: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(120%)" },
        },
      },
      animation: {
        "wave-slow": "wave-x 18s linear infinite",
        "wave-mid": "wave-x 12s linear infinite",
        drift: "drift 7s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
