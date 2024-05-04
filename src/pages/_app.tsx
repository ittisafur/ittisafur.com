import '../styles/fonts.css';
import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import Header from 'components/Header';
import { Fragment, useEffect } from 'react';
import Footer from 'components/Footer';
import { Analytics } from '@vercel/analytics/react';
import TagManager from 'react-gtm-module';
import Script from 'next/script';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';

if (typeof window !== 'undefined') {
    // checks that we are client-side
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
        loaded: (posthog) => {
            if (process.env.NODE_ENV === 'development') posthog.debug(); // debug mode in development
        },
    });
}

function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        TagManager.initialize({ gtmId: process.env.NEXT_PUBLIC_GTM_ID });
    }, []);
    posthog.capture('my event', { property: 'value' });

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
            <PostHogProvider client={posthog}>
                <Header />
                <Component {...pageProps} />
                <Footer />
            </PostHogProvider>
            <Analytics />
        </Fragment>
    );
}

export default MyApp;
