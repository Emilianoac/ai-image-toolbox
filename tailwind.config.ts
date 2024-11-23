import type { Config } from "tailwindcss";

export default {
  darkMode: "selector",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "app-primary": "#F84BD3",
        
        "app-light": {
          "100": "#f6f5f5",
          "200": "#e7e6e6",
          "300": "#d2cfcf",
        },

        "app-dark": {
          "100": "#252323",
          "200": "#141313",
          "300": "#0d0c0c",
        },

      },
    },
  },
  plugins: [],
} satisfies Config;
