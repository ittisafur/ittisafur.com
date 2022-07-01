import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import Header from 'components/Header';
import { Fragment } from 'react';
import Footer from 'components/Footer';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Fragment>
            <Header />
            <Component {...pageProps} />
            <Footer />
        </Fragment>
    );
}

export default MyApp;
