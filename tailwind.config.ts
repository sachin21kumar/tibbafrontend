/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false,
  theme: {
    extend: {

      /* ✅ YOUR COLORS (unchanged) */
      colors: {
        primary: "#1b2024",
        secondary: "#d1a054",
      },

      /* ✅ YOUR FONTS (unchanged) */
      fontFamily: {
        geist: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
        cinzel: ["var(--font-cinzel)"],
        allura: ["var(--font-allura)"],
      },

      /* 🔥 ADD THESE ANIMATIONS */
      keyframes: {
        zoomFade1: {
          "0%": { opacity: "1", transform: "scale(1)" },
          "45%": { opacity: "1", transform: "scale(1.08)" },
          "50%": { opacity: "0", transform: "scale(1.08)" },
          "100%": { opacity: "0", transform: "scale(1)" },
        },
        zoomFade2: {
          "0%": { opacity: "0", transform: "scale(1)" },
          "50%": { opacity: "0", transform: "scale(1)" },
          "55%": { opacity: "1", transform: "scale(1)" },
          "95%": { opacity: "1", transform: "scale(1.08)" },
          "100%": { opacity: "0", transform: "scale(1.08)" },
        },
      },

      animation: {
        zoomFade1: "zoomFade1 10s ease-in-out infinite",
        zoomFade2: "zoomFade2 10s ease-in-out infinite",
      },

    },
  },
  plugins: [],
};
