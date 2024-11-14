/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lexend: ["Lexend", "sans-serif"],
        "fira-sans": ["Fira Sans", " sans-serif"],
        mulish: ["Mulish", "sans-serif"],
      },
      colors:{
        "primary-green": "#00796B",
        "primary-teal": "#00A19D", //#00A19D
        "sec-mint-green": "#A4E56D",
        "accent-soft-coral" : "#FF8A80",
        "neutral-light-gray": "#F5F5F5",
      }
    },
  },
  plugins: [],
}