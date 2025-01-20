/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        "poppins": "var(--font-poppins)"
      },
      colors: {
        primary: "#9E8BDF",
        secondary: "#832589", 
        accent: "#CD48BE",
        background: "#0A0513",
        foreground: "#EDE8F9",
      },
      container: {
        center: true,
      }
    },
  },
  plugins: [],
};
