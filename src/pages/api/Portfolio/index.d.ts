export interface Images {
    thumbnail: string;
    images: string[];
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
}

export interface Data {
    portfolio: Portfolio[];
}
