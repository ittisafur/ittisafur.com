import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import animate from 'tailwindcss-animate';

export default {
    darkMode: ['class'],
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                chart: {
                    '1': 'hsl(var(--chart-1))',
                    '2': 'hsl(var(--chart-2))',
                    '3': 'hsl(var(--chart-3))',
                    '4': 'hsl(var(--chart-4))',
                    '5': 'hsl(var(--chart-5))',
                },
                it: {
                    dark: {
                        900: '#111111',
                        800: '#1A1A1A',
                    },
                    white: '#F0F0F0',
                },
                gradient: {
                    from: '#9845E8',
                    via: '#33D2FF',
                    to: '#DD5789',
                    // Email gradient
                    'email-from': '#00F5A0',
                    'email-via': '#00D9F5',
                    'email-to': '#00A3FF',

                    // LinkedIn gradient
                    'linkedin-from': '#0077B5',
                    'linkedin-via': '#0A66C2',
                    'linkedin-to': '#0A66C2',

                    // Upwork gradient
                    'upwork-from': '#6FDA44',
                    'upwork-via': '#6FDA44',
                    'upwork-to': '#6FDA44',

                    // GitHub gradient
                    'github-from': '#171515',
                    'github-via': '#24292E',
                    'github-to': '#2DBA4E',
                },
            },
            fontFamily: {
                inter: ['var(--font-inter)'],
                montserrat: ['var(--font-montserrat)'],
                figtree: ['var(--font-figtree)'],
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
        },
    },
    plugins: [
        plugin(function ({ addUtilities, theme }) {
            const gradientUtilities = {
                '.text-gradient': {
                    background: `linear-gradient(to right, ${theme('colors.gradient.from')} 0%, ${theme('colors.gradient.via')} 45%, ${theme('colors.gradient.to')} 100%)`,
                    '-webkit-background-clip': 'text',
                    'background-clip': 'text',
                    '-webkit-text-fill-color': 'transparent',
                    color: 'transparent',
                    display: 'inline-block',
                    width: 'fit-content',
                },
                '.bg-gradient': {
                    background: `linear-gradient(to right, ${theme('colors.gradient.from')} 0%, ${theme('colors.gradient.via')} 45%, ${theme('colors.gradient.to')} 100%)`,
                },
                // Social media gradient utilities
                '.bg-gradient-social': {
                    '&-email': {
                        background: `linear-gradient(to bottom right, ${theme('colors.gradient.social.email.from')}, ${theme('colors.gradient.social.email.via')}, ${theme('colors.gradient.social.email.to')})`,
                    },
                    '&-linkedin': {
                        background: `linear-gradient(to bottom right, ${theme('colors.gradient.social.linkedin.from')}, ${theme('colors.gradient.social.linkedin.via')}, ${theme('colors.gradient.social.linkedin.to')})`,
                    },
                    '&-upwork': {
                        background: `linear-gradient(to bottom right, ${theme('colors.gradient.social.upwork.from')}, ${theme('colors.gradient.social.upwork.via')}, ${theme('colors.gradient.social.upwork.to')})`,
                    },
                    '&-github': {
                        background: `linear-gradient(to bottom right, ${theme('colors.gradient.social.github.from')}, ${theme('colors.gradient.social.github.via')}, ${theme('colors.gradient.social.github.to')})`,
                    },
                },
            };
            addUtilities(gradientUtilities);
        }),
        animate,
    ],
} satisfies Config;
