import '../styles/fonts.css';
import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import Header from 'components/Header';
import { Fragment, useEffect } from 'react';
import Footer from 'components/Footer';
import { Analytics } from '@vercel/analytics/react';
import TagManager from 'react-gtm-module';
import Script from 'next/script';

function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        TagManager.initialize({ gtmId: process.env.NEXT_PUBLIC_GTM_ID });
    }, []);

    return (
        <Fragment>
            <Script
                src="https://www.googletagmanager.com/gtag/js?id=G-7VYVZFTH80"
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){window.dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-7VYVZFTH80');
              `}
            </Script>
            <Header />
            <Component {...pageProps} />
            <Footer />
            <Analytics />
        </Fragment>
    );
}

export default MyApp;
