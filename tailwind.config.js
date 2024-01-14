/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {},
  },
  plugins: [require('tailwind-scrollbar')],
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
};
