/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkTheme: {
          200: "rgba(255,255,255,0.02)",
          600: "rgba(255,255,255,0.6)",
          800: "rgba(255,255,255,0.08)",
          DEFAULT: "rgba(25,28,31,1)",
        },
      },
    },
  },
  plugins: [],
};
