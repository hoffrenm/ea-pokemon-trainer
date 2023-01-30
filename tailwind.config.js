/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF7E5F",
        secondary: "#FEB47B",
        title: "#1C2826",
        subtitle: "#999999",
      },
      fontFamily: {
        int: ["Inter", "sans-serif"],
        bot: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
