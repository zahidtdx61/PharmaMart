/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "primary-teal": "#00796B",
        "sec-mint-green": "#A4E56D",
        "accent-soft-coral" : "#FF8A80",
        "neutral-light-gray": "#F5F5F5",
      }
    },
  },
  plugins: [],
}