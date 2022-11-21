const { url } = require("inspector");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        splash: "url('../images/splashBg.jpg')",
      },
    },
    fontFamily: {
      pacifico: ["Regular", "cursive"],
    },
  },

  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=light]"],
          "info-content": "#d3d3d3",
          info: "#121212",
        },
      },
      "dark",
      {
        autumn: {
          ...require("daisyui/src/colors/themes")["[data-theme=autumn]"],
          "info-content": "#d3d3d3",
          info: "#121212",
        },
      },
      {
        winter: {
          ...require("daisyui/src/colors/themes")["[data-theme=winter]"],
          "info-content": "#d3d3d3",
          info: "#121212",
        },
      },
      ,
    ],
  },
};
