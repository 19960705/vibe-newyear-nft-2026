/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 2026 新年主题
        'newyear': {
          red: '#FF4D4F',
          gold: '#FFD700',
          cinnabar: '#FF5722',
          jade: '#00A86B',
          imperial: '#B22222',
          purple: '#9400D3',
          lucky: '#FF6F61',
          spring: '#98FB98',
        },
      },
    },
  },
  plugins: [],
}
