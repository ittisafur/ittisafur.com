'use client';

import React, { useState } from 'react';
import PortfolioShared from '../shared/Portfolio';
import PortfolioFilter, { FilterType } from './Filter';
import type { Portfolio } from '@/types/portfolio';
import { motion, AnimatePresence } from 'framer-motion';

interface PortfolioLandingProps {
    portfolioItems: Portfolio[];
}

const PortfolioLanding: React.FC<PortfolioLandingProps> = ({ portfolioItems }) => {
    const [activeFilter, setActiveFilter] = useState<FilterType>('all');

    const filteredItems = portfolioItems.filter((item) => {
        if (activeFilter === 'all') return true;

        if (activeFilter === 'side-project') {
            return item.isSideProject === true;
        }

        if (activeFilter === 'full-time') {
            return !item.isSideProject && !item.isFreelance;
        }

        if (activeFilter === 'contract') {
            return !item.isSideProject && item.isFreelance === true;
        }

        return true;
    });

    const handleFilterChange = (filter: FilterType) => {
        setActiveFilter(filter);
    };
    const getCounts = () => {
        const counts = {
            all: portfolioItems.length,
            'full-time': portfolioItems.filter((item) => !item.isSideProject && !item.isFreelance)
                .length,
            contract: portfolioItems.filter((item) => !item.isSideProject && item.isFreelance)
                .length,
            'side-project': portfolioItems.filter((item) => item.isSideProject).length,
        };
        return counts;
    };

    return (
        <div className="w-full bg-[#111111] text-[#F0F0F0] py-16 px-4 md:px-8">
            <div
                className="container mx-auto mb-16 text-center"
                data-animate
                data-animate-order="1"
                data-animate-type="blur-to-sharp"
            >
                <p className="text-xs tracking-widest uppercase mb-4 opacity-70">Featured Work</p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wider mb-2">
                    Creative <span className="text-gray-400">Projects</span>
                </h1>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wider">
                    Crafted With{' '}
                    <span className="relative">
                        Precision.
                        <span className="absolute bottom-1 left-0 w-full h-1 bg-blue-500"></span>
                    </span>
                </h2>
            </div>

            {/* Filter Component */}
            <PortfolioFilter
                onFilterChange={handleFilterChange}
                activeFilter={activeFilter}
                counts={getCounts()}
                totalCount={portfolioItems.length}
            />

            {/* Results count */}
            {/* <div className="container mx-auto mb-6 text-center"> */}
            {/*   <p className="text-sm text-gray-400"> */}
            {/*     Showing {filteredItems.length} of {portfolioItems.length} projects */}
            {/*   </p> */}
            {/* </div> */}

            {/* Portfolio Grid */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeFilter}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="container mx-auto"
                >
                    <div className="gap-6 grid grid-cols-1 xl:grid-cols-2">
                        {filteredItems.length > 0 ? (
                            filteredItems.map((content, index) => (
                                <motion.div
                                    key={content.id || index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.1,
                                        ease: 'easeOut',
                                    }}
                                >
                                    <PortfolioShared content={content} />
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full py-16 text-center">
                                <p className="text-xl text-gray-400">
                                    No projects found matching the selected filter.
                                </p>
                                <button
                                    onClick={() => setActiveFilter('all')}
                                    className="mt-4 px-6 py-2 bg-blue-600 rounded-md text-white hover:bg-blue-700 transition-colors"
                                >
                                    Show All Projects
                                </button>
                            </div>
                        )}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default PortfolioLanding;
