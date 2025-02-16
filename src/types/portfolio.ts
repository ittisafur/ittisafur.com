import { Image } from './common';
import { MetaData } from './metadata';

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
  yt_demo?: string;
}

interface PortfolioResponse {
  portfolios: {
    Portfolio: Portfolio[];
  };
}

export type { Icon, StackItem, Portfolio, PortfolioResponse };
