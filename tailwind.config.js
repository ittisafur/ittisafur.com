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
                primary: '#232931',
                secondary: '#e9eaea',
                website: {
                    50: '#f4f4f5',
                    100: '#e9eaea',
                    200: '#c8cacc',
                    300: '#a7a9ad',
                    400: '#65696f',
                    500: '#232931',
                    600: '#20252c',
                    700: '#1a1f25',
                    800: '#15191d',
                    900: '#111418',
                },
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
