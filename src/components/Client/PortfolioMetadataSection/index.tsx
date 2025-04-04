'use client';

import React from 'react';
import { Icon } from '@/components/ui/icon';
import type { Portfolio } from '@/types/portfolio';
import { getJobType, getTenure } from '@/utils/portfolio';

interface PortfolioMetadataSectionProps {
    portfolio: Portfolio;
}

const PortfolioMetadataSection: React.FC<PortfolioMetadataSectionProps> = ({ portfolio }) => {
    // Get job type and tenure using the utility functions
    const jobType = getJobType(portfolio);
    const tenure = getTenure(portfolio);

    return (
        <div className="container mx-auto px-4 py-8 text-it-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Job Type Section */}
                <div className="flex items-start">
                    <div className="bg-it-dark-650 p-2 rounded-full mr-3">
                        <Icon
                            name={jobType.icon || 'briefcase'}
                            className="h-4 w-4 text-it-blue-400"
                        />
                    </div>
                    <div>
                        <span className="uppercase text-xs tracking-wider text-gray-400 block mb-2">
                            Work Type
                        </span>
                        <div className="flex flex-wrap gap-2">
                            <span className="inline-block px-3 py-1 rounded-full bg-it-dark-600 text-it-blue-400 text-xs tracking-wider uppercase transition-all duration-300 hover:bg-it-blue-600/20">
                                {jobType.label}
                            </span>

                            {/* Show appropriate badge based on portfolio properties */}
                            {portfolio.hasDesign && (
                                <span className="inline-block px-3 py-1 rounded-full bg-it-dark-600 text-purple-400 text-xs tracking-wider uppercase transition-all duration-300 hover:bg-purple-500/20">
                                    Design Involved
                                </span>
                            )}
                            {portfolio.isBreakThrough && (
                                <span className="inline-block px-3 py-1 rounded-full bg-it-dark-600 text-yellow-400 text-xs tracking-wider uppercase transition-all duration-300 hover:bg-yellow-500/20">
                                    Breakthrough Project
                                </span>
                            )}
                            {portfolio.isFeatured && (
                                <span className="inline-block px-3 py-1 rounded-full bg-it-dark-600 text-green-400 text-xs tracking-wider uppercase transition-all duration-300 hover:bg-green-500/20">
                                    Featured Work
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Tenure Section - Only show if tenure exists */}
                {tenure && (
                    <div className="flex items-start">
                        <div className="bg-it-dark-650 p-2 rounded-full mr-3">
                            <Icon name="calendar" className="h-4 w-4 text-it-blue-400" />
                        </div>
                        <div>
                            <span className="uppercase text-xs tracking-wider text-gray-400 block mb-2">
                                Time Period
                            </span>
                            <div className="flex flex-wrap gap-2">
                                <span className="inline-block px-3 py-1 rounded-full bg-it-dark-650 text-it-white text-xs tracking-wider uppercase transition-all duration-300">
                                    {tenure}
                                </span>

                                {portfolio.isWorking && (
                                    <span className="inline-block px-3 py-1 rounded-full bg-it-dark-600 text-green-400 text-xs tracking-wider uppercase transition-all duration-300 hover:bg-green-500/20">
                                        Currently Working
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PortfolioMetadataSection;
