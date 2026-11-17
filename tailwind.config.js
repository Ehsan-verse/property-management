import { defineConfig } from 'tailwindcss'

export default defineConfig({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        manzil: {
          50: '#fcfbfa',
          100: '#f5f2ee',
          200: '#eae3db',
          300: '#d9cdbe',
          400: '#bfab93',
          500: '#a68c70',
          600: '#8c7359',
          700: '#6e5a45',
          800: '#524334',
          900: '#382e23',
          gold: '#c5a880',
          dark: '#1a1816',
        }
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
})
