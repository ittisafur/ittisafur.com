import dynamic from 'next/dynamic';
import { memo } from 'react';
import { isMobile } from 'react-device-detect';

const Switcher = memo(({ children }: { children: any }) => {
    const MobileLayout = dynamic(() => import('./Mobile'), { ssr: true });
    const DesktopLayout = dynamic(() => import('./Desktop'), { ssr: true });
    return isMobile ? <MobileLayout children={children} /> : <DesktopLayout children={children} />;
});

export default Switcher;
