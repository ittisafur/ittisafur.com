import { Image } from './common';
import { MetaData } from './metadata';

export interface Icon {
    __typename?: string;
    alternativeText?: string | null;
    ext?: string;
    formats?: string;
    height?: number;
    name?: string;
    size?: number;
    url: string;
    width?: number;
    hash?: string;
    previewUrl?: string | null;
}

export interface StackItem {
    __typename?: string;
    title: string;
    icon?: Icon | null;
}

export interface Portfolio {
    __typename?: string;
    id: string;
    isBreakThrough?: boolean | null;
    isFeatured?: boolean | null;
    isSideProject?: boolean | null;
    slug: string;
    metaData: MetaData;
    summary: string;
    stack: StackItem[];
    title: string;
    url: string;
    thumbnail?: Image;
    yt_demo?: string;
    description?: string;
}

export interface PortfolioResponse {
    portfolios: [
        {
            __typename?: string;
            Portfolio: Portfolio[];
        },
    ];
}
