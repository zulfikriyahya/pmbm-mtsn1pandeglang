export default {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0D1B2A",
          50: "#E8EDF3",
          100: "#C5D0DC",
          200: "#9AAFC4",
          300: "#6F8EAC",
          400: "#4E7294",
          500: "#2E567C",
          600: "#1E3A57",
          700: "#152D45",
          800: "#0D1F30",
          900: "#07121C",
          950: "#030A11",
        },
        gold: { DEFAULT: "#F5A623", light: "#FEF3DC" },
        surface: {
          DEFAULT: "#0A1828",
          100: "#0D1F30",
          200: "#152D45",
        },
      },
      fontFamily: {
        sans: ["Lexend", "ui-sans-serif", "system-ui", "sans-serif"],
        arabic: ["Amiri", "serif"],
      },
      backgroundImage: {
        "gradient-main": "linear-gradient(135deg, #0D1F30 0%, #1E3A57 100%)",
        "gradient-hero": "linear-gradient(135deg, #030A11 0%, #07121C 50%, #0D1F30 100%)",
        "gradient-light": "linear-gradient(135deg, #1E3A57 0%, #2E567C 100%)",
      },
      boxShadow: {
        navy: "0 0 28px rgba(0,0,0,0.50)",
        "navy-sm": "0 4px 18px rgba(0,0,0,0.30)",
        "navy-glow": "0 0 32px rgba(46,86,124,0.30)",
        card: "0 2px 20px rgba(0,0,0,0.32)",
        "card-hover": "0 10px 48px rgba(0,0,0,0.48)",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(60%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        marquee: "marquee 24s linear infinite",
      },
    },
  },
  plugins: [],
};
