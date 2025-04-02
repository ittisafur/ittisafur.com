export interface Image {
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
