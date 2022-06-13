export interface ArticleMeta {
    title: string;
    slug: string;
    description: string;
    thumbnail: string;
}

export interface ArticleInfo {
    meta: ArticleMeta;
    content: string;
}
