module.exports = {
    content: [
        './src/components/**/*.{js,ts,jsx,tsx}',
        './src/pages/**/*.{js,ts,jsx,tsx}',
        './src/views/**/*.{js,ts,jsx,tsx}',
        './src/layouts/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: '#1A1A1A',
                secondary: '#FDF1E4',
            },
            fontFamily: {
                Gentona: ['GentonaBook', 'sans-serif'],
                GentonaExtraBold: ['GentonaExtraBold', 'sans-serif'],
                GentonaExtraBoldItalic: ['GentonaExtraBoldItalic', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
