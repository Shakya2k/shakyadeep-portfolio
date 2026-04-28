import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0b0f17",
        foreground: "#f8fafc",
        primary: {
          DEFAULT: "#4ade80",
          dark: "#22c55e",
        },
        secondary: {
          DEFAULT: "#60a5fa",
          dark: "#3b82f6",
        },
        accent: {
          DEFAULT: "#9b5de5",
          dark: "#7c3aed",
        },
        card: "#131a24",
        "card-hover": "#1a2332",
        border: "#1f2937",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.6s ease-out",
        "glow": "glow 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(74, 222, 128, 0.3)" },
          "50%": { boxShadow: "0 0 30px rgba(74, 222, 128, 0.6)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
