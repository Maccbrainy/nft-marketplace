/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "slide-up": "slideIn 300ms ease-in-out",
      },
      keyframes: {
        slideIn: {
          "0%": {
            transform: "translateY(-20px)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1"
          },
        },
      },
      colors: {
        darkTheme: {
          200: "rgba(255,255,255,0.02)",
          bg: "rgba(255,255,255,0.04)",
          hover: "rgba(255,255,255,0.1)",
          text: "rgba(255,255,255,0.6)",
          border: "rgba(255,255,255,0.08)",
          DEFAULT: "rgba(25,28,31,1)",
          bgx: "rgba(31,34,38,0.85)",
        },
      },
    },
  },
  plugins: [],
};
