/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blizzard: {
          DEFAULT: "#A8D3EB",
          50: "#FBFDFE",
          100: "#EAF5FA",
          200: "#C9E4F3",
          300: "#A8D3EB",
          400: "#7ABCE1",
          500: "#4DA5D6",
          600: "#2C8ABF",
          700: "#216991",
          800: "#174864",
          900: "#0C2736",
        },
      },
    },
  },
  plugins: [],
};
