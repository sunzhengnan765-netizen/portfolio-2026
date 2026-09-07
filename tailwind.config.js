/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        accent: "#5ed29c",
        ink: "#070b0a",
        "ink-2": "#0b1311",
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "Inter", "system-ui", "sans-serif"],
        display: ['"Inter"', '"Plus Jakarta Sans"', "sans-serif"],
        serif: ['"Instrument Serif"', "Georgia", "serif"],
      },
      backdropBlur: { xs: "4px" },
    },
  },
  plugins: [],
}
