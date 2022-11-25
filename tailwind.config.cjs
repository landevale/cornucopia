/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: { neohellenic: [`"GFS Neohellenic"`, "sans-serif"] },
    },
  },
  plugins: [],
};
