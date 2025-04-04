import { Image } from './common';
import { MetaData } from './metadata';
import { StackItem } from './tech';

/**
 * Icon type for stack items
 */
export interface Icon {
    __typename?: string;
    alternativeText?: string | null;
    ext?: string;
    formats?: string | Image;
    height?: number;
    name?: string;
    size?: number;
    url: string;
    width?: number;
    hash?: string;
    previewUrl?: string | null;
}

/**
 * Date string type (YYYY-MM-DD format from API)
 */
export type DateString = string;

/**
 * Media gallery item
 */
export interface GalleryItem {
    __typename?: string;
    url: string;
    name: string;
    alternativeText?: string | null;
    ext?: string;
    width?: number;
    height?: number;
    size?: number;
    formats?: Image;
}

/**
 * Portfolio item type
 */
export interface Portfolio {
    __typename?: string;
    id?: string;

    // Content fields
    title: string;
    slug: string;
    summary: string;
    description?: string;
    url?: string;
    yt_demo?: string;

    // Dates
    startDate?: DateString | null;
    endDate?: DateString | null;

    // Status flags
    isWorking?: boolean;
    hasDesign?: boolean;
    isBreakThrough?: boolean;
    isFeatured?: boolean;
    isSideProject?: boolean;
    isFreelance?: boolean;

    // Related content
    metaData?: MetaData;
    stack?: StackItem[];
    thumbnail?: Image;
    gallery?: GalleryItem[];
}

/**
 * Full portfolio response from GraphQL API
 */
export interface PortfolioResponse {
    portfolios: [
        {
            __typename?: string;
            Portfolio: Portfolio[];
        },
    ];
}

/**
 * Input variables for portfolio query
 */
export interface PortfolioQueryVariables {
    slug: string;
    filters?: string;
}

/**
 * Portfolio filters input for API
 */
export interface PortfolioFiltersInput {
    and?: PortfolioFiltersInput[];
    or?: PortfolioFiltersInput[];
    not?: PortfolioFiltersInput;
    id?: IDFilterInput;
    // Add other filter fields as needed
}

/**
 * ID filter input
 */
export interface IDFilterInput {
    eq?: string;
    ne?: string;
    in?: string[];
    notIn?: string[];
}
