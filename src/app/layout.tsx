import { Inter, Figtree, Roboto_Mono, Fira_Code } from 'next/font/google';
import './globals.scss';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ApolloWrapper } from '@/lib/ApolloProvider';

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

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${inter.variable} ${figtree.variable} ${robotoMono.variable} ${firaCode.variable} antialiased`}
            >
                <ApolloWrapper>
                    <Header />
                    <main className="min-h-screen pt-[var(--header-height)] bg-it-dark-900 ">
                        <div>{children}</div>
                    </main>
                    <Footer />
                </ApolloWrapper>
            </body>
        </html>
    );
}
