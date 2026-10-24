import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Exact 5-Color Palette from User's Reference + Moniqa Dark Tone
        studio: {
          sage: "#CCD5AE",         // Band 1: Muted Sage Green
          tea: "#E9EDC9",          // Band 2: Pale Tea / Sage Light
          cream: "#FEFAE0",        // Band 3: Core Warm Cream / Ivory
          sand: "#FAEDCD",         // Band 4: Soft Cornsilk / Sand Buff
          terracotta: "#D4A373",   // Band 5: Warm Terracotta / Caramel Ochre
          terracottaHover: "#B88554",
          gold: "#FDBB4F",         // Accent Gold from Moniqa specimen
          obsidian: "#041214",     // Deep Spruce Black from Moniqa specimen
          charcoal: "#1F2421",     // High contrast text
          muted: "#5B6358",        // Readable descriptions
          subtle: "#8A9486",       // Borders and meta labels
        },
        // Maintain alias compatibility
        editorial: {
          ivory: "#FEFAE0",
          charcoal: "#1F2421",
          white: "#FFFFFF",
          cobalt: "#D4A373",
          cobaltHover: "#B88554",
          cobaltDim: "rgba(212, 163, 115, 0.12)",
          stone: "#CCD5AE",
          stoneLight: "#E9EDC9",
          muted: "#5B6358",
          subtle: "#8A9486",
        },
      },
      fontFamily: {
        archia: ["Archia", "sans-serif"],
        display: ["Moniqa", "Archia", "serif"],
        moniqa: ["Moniqa", "serif"],
        sans: [
          "Archia",
          "-apple-system",
          "BlinkMacSystemFont",
          "Inter",
          "system-ui",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        button: ["Archia", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.02em",
        wide: "0.04em",
        widest: "0.14em",
      },
    },
  },
  plugins: [],
};
export default config;
