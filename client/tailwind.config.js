const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Nunito", ...defaultTheme.fontFamily.sans],
      },
    },
    screens: {
      ...defaultTheme.screens,
      sm: "575px",
    },
    colors: {
      ...colors,
      gray: colors.trueGray,
    },
  },
  variants: {
    extend: {
      borderWidth: ["focus"],
    },
  },
  plugins: [],
};
