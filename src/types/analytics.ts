export type PrimitiveValue = string | number | boolean | null | undefined;

export type AnalyticsValue =
  | PrimitiveValue
  | PrimitiveValue[]
  | Record<string, PrimitiveValue>
  | Record<string, PrimitiveValue>[];

export type AnalyticsProperties = Record<string, AnalyticsValue>;

export type PortfolioAnalyticsData = {
  id: string | number;
  title: string;
  slug: string;
  stack?: Array<{ title: string }>;
  isFeatured?: boolean | null;
  isBreakThrough?: boolean | null;
  isSideProject?: boolean | null;
  url?: string;
};
