/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/views/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        Gentona: ['Gentona', 'serif'],
        GentonaExtraBold: ['gentonaextrabold_demo'],
        ProximaNova: ['ProximaNova', 'sans-serif'],
        ProximaNovaBold: ['ProximaNovaBold', 'sans-serif'],
        Vujahday: ['Vujahday Script', 'cursive'],
        ReadexPro: ['Readex Pro', 'sans-serif']
      },
      colors: {
        it: {
          dark: {
            900: '#06121b',
            800: '#212b35',
          },
          light: {
            900: '#e1e8e0',
            800: '#f3f3f3',
            700: '#eceeee',
            200: '#fcfbfb',
          },
        },
      },
    },
  },
  plugins: [],
};
