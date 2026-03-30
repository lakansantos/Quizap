import type {Config} from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // All colors use CSS variables for theme switching
        primary: "var(--color-primary)",
        "primary-dim": "var(--color-primary-dim)",
        "primary-container": "var(--color-primary-container)",
        "primary-fixed": "var(--color-primary-fixed)",
        "primary-fixed-dim": "var(--color-primary-fixed-dim)",
        "on-primary": "var(--color-on-primary)",
        "on-primary-container": "var(--color-on-primary-container)",
        "on-primary-fixed": "var(--color-on-primary-fixed)",
        "on-primary-fixed-variant": "var(--color-on-primary-fixed-variant)",
        "inverse-primary": "var(--color-inverse-primary)",

        secondary: "var(--color-secondary)",
        "secondary-dim": "var(--color-secondary-dim)",
        "secondary-container": "var(--color-secondary-container)",
        "secondary-fixed": "var(--color-secondary-fixed)",
        "secondary-fixed-dim": "var(--color-secondary-fixed-dim)",
        "on-secondary": "var(--color-on-secondary)",
        "on-secondary-container": "var(--color-on-secondary-container)",
        "on-secondary-fixed": "var(--color-on-secondary-fixed)",
        "on-secondary-fixed-variant": "var(--color-on-secondary-fixed-variant)",

        tertiary: "var(--color-tertiary)",
        "tertiary-dim": "var(--color-tertiary-dim)",
        "tertiary-container": "var(--color-tertiary-container)",
        "tertiary-fixed": "var(--color-tertiary-fixed)",
        "tertiary-fixed-dim": "var(--color-tertiary-fixed-dim)",
        "on-tertiary": "var(--color-on-tertiary)",
        "on-tertiary-container": "var(--color-on-tertiary-container)",
        "on-tertiary-fixed": "var(--color-on-tertiary-fixed)",
        "on-tertiary-fixed-variant": "var(--color-on-tertiary-fixed-variant)",

        surface: "var(--color-surface)",
        "surface-dim": "var(--color-surface-dim)",
        "surface-bright": "var(--color-surface-bright)",
        "surface-container-lowest": "var(--color-surface-container-lowest)",
        "surface-container-low": "var(--color-surface-container-low)",
        "surface-container": "var(--color-surface-container)",
        "surface-container-high": "var(--color-surface-container-high)",
        "surface-container-highest": "var(--color-surface-container-highest)",
        "surface-variant": "var(--color-surface-variant)",
        "surface-tint": "var(--color-surface-tint)",
        background: "var(--color-background)",

        "on-surface": "var(--color-on-surface)",
        "on-surface-variant": "var(--color-on-surface-variant)",
        "on-background": "var(--color-on-background)",
        "inverse-surface": "var(--color-inverse-surface)",
        "inverse-on-surface": "var(--color-inverse-on-surface)",

        outline: "var(--color-outline)",
        "outline-variant": "var(--color-outline-variant)",

        error: "var(--color-error)",
        "error-dim": "var(--color-error-dim)",
        "error-container": "var(--color-error-container)",
        "on-error": "var(--color-on-error)",
        "on-error-container": "var(--color-on-error-container)",
      },
      fontFamily: {
        headline: ["var(--font-sora)", "sans-serif"],
        body: ["var(--font-dm-sans)", "sans-serif"],
        label: ["var(--font-manrope)", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "1rem",
        lg: "2rem",
        xl: "3rem",
        full: "9999px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-primary":
          "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dim) 100%)",
      },
      boxShadow: {
        "neon-primary": "0 0 20px rgba(196, 154, 255, 0.3)",
        "neon-secondary": "0 0 20px rgba(93, 249, 239, 0.3)",
        "neon-tertiary": "0 0 20px rgba(255, 161, 211, 0.3)",
        "neon-primary-lg": "0 0 40px rgba(196, 154, 255, 0.4)",
        ambient: "0 12px 40px rgba(0, 0, 0, 0.3)",
      },
      animation: {
        "float-slow": "float 3s ease-in-out infinite",
        "float-medium": "float 2.5s ease-in-out infinite",
        "float-fast": "float 2s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        confetti: "confetti-fall 2s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": {transform: "translateY(0)"},
          "50%": {transform: "translateY(-10px)"},
        },
        "pulse-glow": {
          "0%, 100%": {opacity: "0.3"},
          "50%": {opacity: "0.6"},
        },
        "confetti-fall": {
          "0%": {
            transform: "translateY(-10vh) rotate(0deg)",
            opacity: "1",
          },
          "100%": {
            transform: "translateY(100vh) rotate(720deg)",
            opacity: "0",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
