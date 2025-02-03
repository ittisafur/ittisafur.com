interface Image {
    formats?: Record<string, null>;
    hash?: string;
    height: number;
    width: number;
    name: string;
    previewUrl?: string;
    provider_metadata?: Record<string, null>;
    size: number;
    url: string;
    alternativeText?: string;
    ext?: string;
}

interface Keyword {
    keyword: string;
}

interface MetaData {
    description: string;
    image: Image;
    keywords: Keyword[];
    title: string;
}

interface Icon {
    __typename?: string;
    alternativeText?: string | null;
    ext?: string;
    formats?: string | null;
    height?: number;
    name?: string;
    size?: number;
    url?: string;
    width?: number;
}

interface StackItem {
    __typename?: string;
    title: string;
    icon?: Icon | null;
}

interface Portfolio {
    id: string;
    isBreakThrough: boolean;
    isFeatured: boolean;
    isSideProject: boolean;
    slug: string;
    metaData: MetaData;
    summary: string;
    stack: StackItem[];
    title: string;
    url: string;
    thumbnail: Image;
}

interface PortfolioResponse {
    portfolios: {
        Portfolio: Portfolio[];
    };
}

export type { Portfolio, PortfolioResponse, Image, StackItem, MetaData };
