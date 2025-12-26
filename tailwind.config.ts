/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode:false,
  theme: {
    
    extend: {
      
      colors: {
        primary: "#1b2024",     // Gold (buttons, totals, accents)
        secondary: "#d1a054",   // Dark text / headings
      },
      fontFamily: {
        geist: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
        cinzel: ["var(--font-cinzel)"],
        allura: ["var(--font-allura)"],
      },
    },
  },
  plugins: [],
};
