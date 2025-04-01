import React from 'react';
import { Inter, Figtree, Roboto_Mono, Fira_Code } from 'next/font/google';
import './globals.scss';
import { ApolloWrapper } from '@/lib/ApolloProvider';
import RootLayoutClient from '@/components/Client/RootLayoutClient';

// Font configurations
const figtree = Figtree({
    subsets: ['latin'],
    display: 'swap',
    weight: ['400', '500', '600', '700', '900'],
    variable: '--font-figtree',
});

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    weight: ['300', '400', '500', '600'],
    variable: '--font-inter',
});

const robotoMono = Roboto_Mono({
    subsets: ['latin'],
    display: 'swap',
    weight: ['400', '500', '700'],
    variable: '--font-roboto-mono',
});

const firaCode = Fira_Code({
    subsets: ['latin'],
    display: 'swap',
    weight: ['400', '500', '700'],
    variable: '--font-fira-code',
});

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>): React.ReactElement {
    return (
        <html lang="en">
            <body
                className={`${inter.variable} ${figtree.variable} ${robotoMono.variable} ${firaCode.variable} antialiased`}
            >
                <ApolloWrapper>
                    <RootLayoutClient>{children}</RootLayoutClient>
                </ApolloWrapper>
            </body>
        </html>
    );
}
