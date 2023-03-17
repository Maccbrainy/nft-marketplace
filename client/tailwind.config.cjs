/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "slide-up": "slideIn 300ms ease-in-out",
        "slide-in-right": "slideInX 300ms ease-in-out",
      },
      keyframes: {
        slideIn: {
          "0%": {
            transform: "translateY(-20px)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
        slideInX: {
          "0%": {
            opacity: "0",
            transform: "translateX(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
      },
      screens: {
        lf: { max: "1260px" },
        lmax: { max: "1023px" },
        lmin: { min: "991px" },
        mf: { max: "990px" },
        mmf: { max: "768px" },
        sf: { max: "639px" },
        xs: { max: "511px" },
        // xxs: { max: "410px" },
      },
      colors: {
        darkTheme: {
          200: "rgba(255,255,255,0.02)",
          bg: "rgba(255,255,255,0.04)",
          hover: "rgba(255,255,255,0.1)",
          "hover-b": "rgba(255,255,255,0.2)",
          text: "rgba(255,255,255,0.6)",
          "text-b": "rgba(255,255,255,0.9)",
          border: "rgba(255,255,255,0.08)",
          "bg-0.08": "rgba(255,255,255,0.08)",
          DEFAULT: "rgba(25,28,31,1)",
          bgx: "rgba(31,34,38,0.85)",
        },
      },
      boxShadow: {
        "3xl": "41px 0px 24px 30px rgba(255, 255, 255, 1)",
        "3xl-dark": "41px 0px 24px 30px rgba(25, 28, 31, 1)",
        "-3xl": "-41px 0px 24px 30px rgba(255, 255, 255, 1)",
        "-3xl-dark": "-41px 0px 24px 30px rgba(25, 28, 31, 1)",
      },
    },
  },
  plugins: [],
};
