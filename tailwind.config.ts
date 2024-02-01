import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#111517",
        "body-light": "#FAFAFA",
        "header-dark": "#2B3844",
        "body-dark": "#202C36",
      },
      borderRadius: {
        "x/2": "5px",
      },
    },
  },
  plugins: [],
};
export default config;
