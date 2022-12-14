/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pacifico: ["Regular", "cursive"],
        roboto: ["italic, regular"],
      },
      zIndex: {
        100: "100",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=light]"],
          "info-content": "#0f172a",
          info: "#121212",
          "base-200": "#cbd5e1",
          "base-content": "#f8fafc",
        },
      },
      {
        dark: {
          ...require("daisyui/src/colors/themes")["[data-theme=dark]"],
          info: "#f3f4f6",
        },
      },

      ,
    ],
  },
};
