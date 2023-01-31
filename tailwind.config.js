/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dark1: "#111B21",
        dark2: "#202C33",
        dark3: "#233138",
        dark4: "#2A3942",
        gray1: "#AEBAC1",
        gray2: "#78949F",
        gray3: "#e9edef",
        green1: "#005C4B",
        blue1: "#49A1C8",
        gray1Light: "rgb(174 186 193 / 20%)",
      },
    },
  },
  plugins: [],
};
