import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      spacing: {
        // 100px — used for primary section padding on desktop (md:py-25, md:pt-25, md:pb-25)
        "25": "6.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
