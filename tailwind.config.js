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
            },
            colors: {
                primary: '#1A1A1A',
                secondary: '#FDF1E4',
                cyan: '#00FFFF',
            },
        },
    },
    plugins: [],
};
