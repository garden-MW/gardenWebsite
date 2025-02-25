/* eslint-disable import/no-anonymous-default-export */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        water: "var(--color-water)",
        nutrition: "var(--color-nutrition)",
        pH: "var(--color-pH)",
        action: "var(--color-action)",
        caution: "var(--color-caution)",
        good: "var(--color-good)",
      },
    },
  },
  plugins: [],
};
