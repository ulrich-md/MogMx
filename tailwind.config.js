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
        // Deep-water ink: dark sections + primary text (teal family, matches hero)
        navy: "#0B2B33",
        "navy-deep": "#07232C",
        // Abyss: the hero's deepest surface
        ink: "#03141A",
        // Water teals: accents, used sparingly
        blue: "#1893A6",
        // AA-safe deeper teal for small body text / links on light surfaces (>=5.4:1)
        "blue-deep": "#10707F",
        aqua: "#2FC1CF",
        // Very light aqua: soft backgrounds
        mist: "#CDEDF2",
        foam: "#EFF9FA",
        // Secondary text (teal-gray, AA on white)
        slate: "#56707A",
        // Single warm coral CTA accent (pops against the deep-water palette).
        accent: "#FB6F57",
        "accent-deep": "#E2553C",
        // Aqua/mint: type highlight on dark surfaces. Not a CTA color.
        mint: "#5FE0E6",
        // Hairlines / dividers
        line: "#DDEDF0",
        white: "#FFFFFF",
        // shadcn-compatible aliases so primitives from the registry (Card, etc.)
        // resolve to our palette instead of undefined HSL vars.
        card: "#FFFFFF",
        "card-foreground": "#0B2B33",
        "muted-foreground": "#56707A",
      },
      fontFamily: {
        display: ["Syne", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ['"Instrument Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
      letterSpacing: {
        eyebrow: "0.24em",
      },
      borderRadius: {
        card: "1.25rem",
        input: "0.75rem",
        // Used by the liquid-glass primitives (Tailwind 3 has no 4xl by default).
        "4xl": "2rem",
      },
      maxWidth: {
        prose: "65ch",
      },
      boxShadow: {
        // Tinted to the deep-water ink hue, never pure black
        soft: "0 2px 10px -3px rgba(11,43,51,0.08), 0 12px 40px -16px rgba(11,43,51,0.12)",
        lift: "0 18px 50px -18px rgba(11,43,51,0.24)",
        accent: "0 14px 34px -12px rgba(251,111,87,0.5)",
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
        // Aceternity Spotlight entrance (fade + slide + scale).
        spotlight: {
          "0%": { opacity: "0", transform: "translate(-72%, -62%) scale(0.5)" },
          "100%": { opacity: "1", transform: "translate(-50%, -40%) scale(1)" },
        },
      },
      animation: {
        "wave-slow": "wave-x 18s linear infinite",
        "wave-mid": "wave-x 12s linear infinite",
        marquee: "wave-x 44s linear infinite",
        drift: "drift 7s ease-in-out infinite",
        spotlight: "spotlight 2s ease 0.75s 1 forwards",
      },
    },
  },
  plugins: [],
};
