export interface Images {
    thumbnail: string;
    images: any;
}

export interface Portfolio {
    id: number | string;
    title: string;
    slug: string;
    startDate: string | number;
    endDate: string | number;
    isWorking: boolean;
    hasDesign: boolean;
    workType: string;
    location: string;
    description: string;
    sideProject: boolean;
    media: Images;
    summary: string;
    stack: any;
    testimonial?: string;
    url?: string;
}

export interface Data {
    portfolio: Portfolio[];
}
