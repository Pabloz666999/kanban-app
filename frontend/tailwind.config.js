/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#197fe6",
        "background-light": "#f6f7f8",
        "background-dark": "#111921",
        "surface-light": "#ffffff",
        "surface-dark": "#1a242e",
        "text-light-primary": "#0e141b",
        "text-dark-primary": "#f6f7f8",
        "text-light-secondary": "#4e7397",
        "text-dark-secondary": "#a0b3c6",
        "border-light": "#e7edf3",
        "border-dark": "#334155"
      },
      fontFamily: {
        "display": ["Inter", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      }
    }
  },
  plugins: []
}
