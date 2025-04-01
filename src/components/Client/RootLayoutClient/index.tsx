'use client';

import SmoothScroll from '@/components/SmoothScroll';
import { Fragment } from 'react';
import { ViewTransitions } from 'next-view-transitions';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Transition from '@/providers/Transition';

interface RootLayoutClientProps {
    children: React.ReactNode;
}

export default function RootLayoutClient({ children }: RootLayoutClientProps): JSX.Element {
    return (
        <Fragment>
            <SmoothScroll>
                <Transition>
                    <ViewTransitions>
                        <Header />
                        <main className="min-h-screen pt-[var(--header-height)] bg-it-dark-900">
                            <div id="page-content">{children}</div>
                        </main>
                        <Footer />
                    </ViewTransitions>
                </Transition>
            </SmoothScroll>
        </Fragment>
    );
}
