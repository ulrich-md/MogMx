/**
 * MOG Mexico - Centralized design tokens (editorial / industrial direction).
 *
 * Original MOG palette (azul noche + teal del agua + coral) applied to an
 * editorial layout: white/foam surfaces, deep-water ink type, one coral
 * accent for CTAs, signal blocks and big numerals.
 * These tokens mirror the CSS custom properties declared in src/index.css.
 */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Surfaces (original palette: white + foam)
        paper: "#FFFFFF",
        bone: "#EFF9FA",
        white: "#FFFFFF",
        // Deep-water ink: primary text + dark sections
        ink: "#0B2B33",
        "ink-soft": "#07232C",
        abyss: "#03141A",
        graphite: "#24474F",
        // Secondary text (teal-gray, AA on white)
        slate: "#56707A",
        // Hairlines / dividers
        line: "#DDEDF0",
        "line-dark": "#1A4049",
        // Coral: the single warm accent (CTAs, signal blocks, big numerals)
        accent: "#FB6F57",
        // AA-safe coral for small text on light surfaces
        "accent-deep": "#D2482F",
        // Water teals
        blue: "#1893A6",
        "blue-deep": "#10707F",
        aqua: "#2FC1CF",
        mint: "#5FE0E6",
        mist: "#CDEDF2",
        foam: "#EFF9FA",
        water: "#07232C",
        // Legacy aliases
        navy: "#0B2B33",
        "navy-deep": "#07232C",
      },
      fontFamily: {
        // Condensed poster grotesque for display type, always uppercase
        display: ["Anton", "Impact", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ['"Instrument Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
      letterSpacing: {
        eyebrow: "0.2em",
        poster: "-0.01em",
      },
      lineHeight: {
        poster: "0.86",
      },
      borderRadius: {
        card: "0.375rem",
        input: "0.375rem",
      },
      maxWidth: {
        prose: "62ch",
        shell: "1440px",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(11,43,51,0.06), 0 10px 30px -14px rgba(11,43,51,0.18)",
        lift: "0 24px 60px -24px rgba(11,43,51,0.35)",
        accent: "0 16px 36px -16px rgba(251,111,87,0.55)",
      },
      transitionTimingFunction: {
        water: "cubic-bezier(0.32, 0.72, 0, 1)",
        smooth: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "marquee-x": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.35", transform: "scale(0.7)" },
        },
      },
      animation: {
        marquee: "marquee-x 48s linear infinite",
        "pulse-dot": "pulse-dot 1.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
