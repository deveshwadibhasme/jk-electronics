/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        admin: {
          50: "#edf5ff",
          100: "#d9e9ff",
          200: "#bcd6ff",
          300: "#8db8ff",
          400: "#588fff",
          500: "#3569ff",
          600: "#264cff",
          700: "#1f3ce8",
          800: "#2236bc",
          900: "#24358f",
        },
      },
      boxShadow: {
        panel: "0 12px 30px rgba(12, 27, 77, 0.12)",
      },
    },
  },
  plugins: [],
};
