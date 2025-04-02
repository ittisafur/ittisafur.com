import { Image } from './common';

export interface Keyword {
    keyword: string;
}

export interface MetaData {
    description: string;
    image: Image;
    keywords: Keyword[];
    title: string;
}
