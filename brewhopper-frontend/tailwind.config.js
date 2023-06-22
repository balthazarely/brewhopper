/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        lemonade: {
          ...require("daisyui/src/theming/themes")["[data-theme=lemonade]"],
          // primary: "#6FBD43",
          // "primary-focus": "mediumblue",
        },
      },
    ],
  },
};
