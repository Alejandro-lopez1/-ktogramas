/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#373246',
        paper: '#ffffff',
        brand: '#7B68EE',
        aqua: '#20B2AA',
        coral: '#e889ae',
        butter: '#f2b84b',
        lilac: '#f0edff',
      },
      fontFamily: {
        rounded: ['Quicksand', 'sans-serif'],
      },
    },
  },
  plugins: [],
}