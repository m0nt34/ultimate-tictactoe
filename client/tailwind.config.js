/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#192a32",
        light_background: "#1f3540",
        dark_background: "#102129",
        yellow: "#f2b138",
        blue: "#31c4be",
        gray: "#A8BEC9",
        dark_gray: "#6c8997",
      },
      screens: {
        sm800: { max: "800px" },
        sm600: { max: "600px" },
        sm460: { max: "460px" },
        sm400: { max: "400px" },
      },
    },
  },
  plugins: [],
};
