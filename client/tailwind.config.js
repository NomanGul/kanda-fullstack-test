const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    screens: {
      ...defaultTheme.screens,
      'sm': "575px",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
