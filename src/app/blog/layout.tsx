import { BionicReadingProvider } from '@/providers/BionicReading';

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return <BionicReadingProvider>{children}</BionicReadingProvider>;
}
