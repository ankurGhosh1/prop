/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        dark: "#13293D",
        medDark: "#006494",
        neutral: "#247BA0",
        light: "#1B98E0",
        white: "#fff",
        gray: "#E8F1F2",
        textGray: "#7c8198",
        orange: "#ea8b57",
      },
      screens: {
        "max-lg": { max: "1024px" },
        "max-md": { max: "768px" },
        "max-sm": { max: "576px" },
        "3xl": { min: "1690px" },
        "min-md": { min: "768px" },
      },
    },
  },
  plugins: [],
};
