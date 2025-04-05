'use client';

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import { GalleryItem } from '@/types/portfolio';

// Import the required CSS
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

interface PortfolioGalleryProps {
    gallery?: GalleryItem[];
    title: string;
}

const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({ gallery, title }) => {
    // All hooks must be called at the top level, before any conditional returns
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);

    // Define useCallback before any conditional logic
    const openLightbox = useCallback((photoIndex: number) => {
        setIndex(photoIndex);
        setOpen(true);
    }, []);

    // Format gallery items for the lightbox - can be empty array if no gallery
    const slides =
        gallery?.map((item) => ({
            src: item.url,
            alt: item.alternativeText || item.name,
            width: item.width || 1200,
            height: item.height || 800,
            title: item.name,
            description: item.alternativeText || '',
        })) || [];

    // Guard clause - if no gallery items, don't render anything
    if (!gallery || gallery.length === 0) {
        return null;
    }

    return (
        <div className="py-12 bg-it-dark-850">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl font-bold mb-8 text-it-white uppercase">Project Gallery</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {gallery.map((item, photoIndex) => (
                        <div
                            key={`gallery-item-${photoIndex}`}
                            className="relative overflow-hidden h-64 rounded-md cursor-pointer group"
                            onClick={() => openLightbox(photoIndex)}
                        >
                            <Image
                                src={item.url}
                                alt={item.alternativeText || item.name}
                                fill
                                className="object-cover transition-all duration-500 ease-in-out filter 
                          saturate-75 group-hover:saturate-100 group-hover:scale-105"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-it-dark-800/70 opacity-100 group-hover:opacity-60 transition-opacity duration-300"></div>

                            <div className="absolute bottom-0 left-0 p-4 w-full">
                                <span className="text-it-white text-sm font-medium truncate block">
                                    {item.name || `${title} - Image ${photoIndex + 1}`}
                                </span>
                            </div>

                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="bg-it-dark-600/80 p-3 rounded-full">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-it-blue-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            <Lightbox
                open={open}
                close={() => setOpen(false)}
                index={index}
                slides={slides}
                plugins={[Captions, Fullscreen, Thumbnails, Zoom]}
                captions={{ descriptionTextAlign: 'center' }}
                carousel={{ finite: gallery.length <= 5 }}
                thumbnails={{
                    border: 2,
                    borderColor: '#4287f5',
                    borderRadius: 4,
                    padding: 4,
                    gap: 12,
                }}
                zoom={{
                    maxZoomPixelRatio: 3,
                    zoomInMultiplier: 2,
                }}
                styles={{
                    container: { backgroundColor: 'rgba(17, 17, 17, 0.95)' },
                    thumbnail: { backgroundColor: '#1E1E1E' },
                }}
                render={{
                    iconPrev: () => (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                    ),
                    iconNext: () => (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    ),
                    iconClose: () => (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    ),
                }}
            />
        </div>
    );
};

export default PortfolioGallery;
