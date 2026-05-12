/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        cyber: {
          50: "#e6fbff",
          100: "#ccf7fe",
          200: "#99effd",
          300: "#66e7fc",
          400: "#33dffb",
          500: "#00d4fa",
          600: "#00b8d4",
          700: "#008fa6",
          800: "#006678",
          900: "#003d4a",
          950: "#001f26",
        },
      },
      fontFamily: {
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
    },
  },
  plugins: [],
};
