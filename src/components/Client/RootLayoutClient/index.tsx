'use client';

import { Fragment } from 'react';
import SmoothScroll from '@/components/SmoothScroll';
import { ViewTransitions } from 'next-view-transitions';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { TransitionProvider } from '@/providers/Transition';
import AnimationProvider from '@/providers/AnimationProvider';
import AnimationInitializer from '@/providers/AnimationProvider/AnimationInitializer';
import { PostHogProvider } from '@/providers/PostHogProvider';

interface RootLayoutClientProps {
    children: React.ReactNode;
}

export default function RootLayoutClient({ children }: RootLayoutClientProps): JSX.Element {
    return (
        <Fragment>
            <PostHogProvider>
                <SmoothScroll>
                    <TransitionProvider>
                        <AnimationProvider>
                            <ViewTransitions>
                                <Header />
                                <main className="min-h-screen pt-[var(--header-height)] bg-it-dark-900">
                                    <div id="page-content">{children}</div>
                                </main>
                                <Footer />
                                <AnimationInitializer />
                            </ViewTransitions>
                        </AnimationProvider>
                    </TransitionProvider>
                </SmoothScroll>
            </PostHogProvider>
        </Fragment>
    );
}
