import '../styles/fonts.css';
import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import Header from 'components/Header';
import { Fragment, useEffect } from 'react';
import Footer from 'components/Footer';
import { Analytics } from '@vercel/analytics/react';
import TagManager from 'react-gtm-module';

function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        TagManager.initialize({ gtmId: process.env.NEXT_PUBLIC_GTM_ID });
    }, []);

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
