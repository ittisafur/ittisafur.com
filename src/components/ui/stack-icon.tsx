'use client';

import React from 'react';
import * as SimpleIcons from 'simple-icons';
import type { SimpleIcon } from 'simple-icons';
import Image from 'next/image';
import type { StackIconProps, StackGridProps } from '@/types/tech';

const getTechnologyName = (name: string): string => {
    const lowercaseName = name.toLowerCase();

    const nameMap: Record<string, string> = {
        'react.js': 'react',
        'next.js': 'nextdotjs',
        'vue.js': 'vuedotjs',
        'node.js': 'nodedotjs',
        'redux.js': 'redux',
        'strapi cms': 'strapi',
        'chart.js': 'chartdotjs',
        playwright: 'playwright',
        gcp: 'googlecloud',
        'wordpress api': 'wordpress',
        'wp engine': 'wordpress',
        'apollo gql': 'apollographql',
        'gitlab ci': 'gitlab',
        'yarn workspace': 'yarn',
        'adobe xd': 'adobe',
        adobe: 'adobe',
        'tmdb api': 'themoviedatabase',
        'react query': 'reactquery',
        'digital ocean': 'digitalocean',
        typescript: 'typescript',
        tailwindcss: 'tailwindcss',
        'material-ui': 'mui',
        mui: 'mui',
        docker: 'docker',
        php: 'php',
        symfony: 'symfony',
        vite: 'vite',
        graphql: 'graphql',
        wordpress: 'wordpress',
        laravel: 'laravel',
        jquery: 'jquery',
        figma: 'figma',
        elementor: 'elementor',
        bootstrap: 'bootstrap',
        cpanel: 'cpanel',
    };

    return (
        nameMap[lowercaseName] ||
        lowercaseName
            .replace(/[-.\s]js$/g, '')
            .replace(/[-.\s]api$/g, '')
            .replace(/[-.\s]/g, '')
            .toLowerCase()
    );
};

const getSimpleIcon = (name: string): SimpleIcon | undefined => {
    const cleanName = getTechnologyName(name);
    const iconKey =
        `si${cleanName.charAt(0).toUpperCase()}${cleanName.slice(1)}` as keyof typeof SimpleIcons;
    return SimpleIcons[iconKey] as SimpleIcon;
};

const StackIcon: React.FC<StackIconProps> = ({
    tech,
    className = '',
    iconSize = 'w-6 h-6',
    showLabel = false,
}) => {
    const simpleIcon = getSimpleIcon(tech.title) as SimpleIcon | undefined;
    const iconUrl = tech.icon?.url;

    if (!simpleIcon?.path && !iconUrl) {
        console.warn(`No icon found for: ${tech.title}`);
        return null;
    }

    if (iconUrl) {
        return (
            <div className="flex flex-col justify-center items-center">
                <div
                    className={`relative ${iconSize} hover:scale-110 transition-transform duration-300 ${className} -mt-1 `}
                >
                    <Image
                        src={`${iconUrl}`}
                        alt={tech.title}
                        className="w-full h-full object-contain"
                        fill
                    />
                </div>

                {showLabel && (
                    <span className="text-xs uppercase font-semibold mt-2">{tech.title}</span>
                )}
            </div>
        );
    }

    return (
        <div className="">
            <div className={`flex items-center justify-center gap-2 ${className}`}>
                <svg
                    role="img"
                    viewBox="0 0 24 24"
                    className={`${iconSize} hover:scale-110 transition-transform duration-300`}
                    fill="currentColor"
                >
                    <path d={simpleIcon?.path} />
                </svg>
            </div>

            {showLabel && <span className="text-xs uppercase font-semibold">{tech.title}</span>}
        </div>
    );
};

/**
 * Grid component for displaying technology stack icons
 * @param technologies - Array of technology objects to display
 * @param className - Additional CSS classes for the grid container
 * @param showLabels - Whether to show labels below icons
 * @param iconSize - Size classes for the icons
 * @param limit - Optional layout option: 'small' (5 per row), 'medium' (8 per row), 'large' (12 per row), or undefined for flex layout
 */
const StackGrid: React.FC<StackGridProps> = ({
    technologies,
    className = '',
    showLabels = false,
    iconSize = 'w-6 h-6',
    limit,
}) => {
    // Determine flex layout based on the limit parameter
    const getIconsClasses = (index: number): string => {
        if (!limit) return ''; // No special classes for default flex layout

        // Determine if this icon is in the first row
        const isFirstRow =
            (limit === 'small' && index < 5) ||
            (limit === 'medium' && index < 6) ||
            (limit === 'large' && index < 8);

        return isFirstRow ? 'first-row' : '';
    };

    // Set up container classes based on the limit
    let containerClasses: string;

    switch (limit) {
        case 'small':
            containerClasses = 'grid grid-cols-5 md:grid-cols-5 gap-4 auto-rows-auto';
            break;
        case 'medium':
            containerClasses = 'grid grid-cols-4 md:grid-cols-8 gap-4 auto-rows-auto';
            break;
        case 'large':
            containerClasses =
                'grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-4 auto-rows-auto';
            break;
        default:
            containerClasses = 'flex flex-wrap gap-3';
    }

    return (
        <div
            className={`${containerClasses} justify-center lg:justify-start ${className} relative z-50`}
        >
            {technologies.map((tech, index) => (
                <StackIcon
                    key={`${tech.title}-${index}`}
                    tech={tech}
                    showLabel={showLabels}
                    iconSize={iconSize}
                    className={getIconsClasses(index)}
                />
            ))}
        </div>
    );
};

export { StackIcon, StackGrid };
