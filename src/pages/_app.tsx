import '../styles/fonts.css';
import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import Header from 'components/Header';
import { Fragment } from 'react';
import Footer from 'components/Footer';
import { Analytics } from '@vercel/analytics/react';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Fragment>
            <Header />
            <Component {...pageProps} />
            <Footer />
            <Analytics />
        </Fragment>
    );
}

export default MyApp;
