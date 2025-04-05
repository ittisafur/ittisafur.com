export interface Category {
    name: string;
    slug: string;
    blog?: BlogDocID[];
    count?: number | string;
}

export interface Tag {
    name: string;
    slug: string;
    blog?: BlogDocID[];
    count?: number | string;
}

interface Image {
    url: string;
    name: string;
}

interface BlogDocID {
    documentId: string;
}

interface Blog {
    title: string;
    slug: string;
    publishedAt: Date | string;
    excerpt: string | null;
    categories?: Category[];
    tags?: Tag[];
    featuredImage?: Image;
    content?: string | null;
}

interface BlogResponse {
    data: {
        blogs: Blog[];
    };
}

export type { Blog, BlogResponse };
