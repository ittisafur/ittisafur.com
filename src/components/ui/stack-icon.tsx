'use client';

import React from 'react';
import * as SimpleIcons from 'simple-icons';
import type { SimpleIcon } from 'simple-icons';
// import { IconCloud } from "@/components/ui/icon-cloud";
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

// const TechCloud: React.FC<TechCloudProps> = ({ technologies }) => {
//   if (!technologies?.length) return null;

//   const uniqueTitles = Array.from(new Set(technologies.map(tech => tech.title)));

//   const icons = uniqueTitles.map(title => {
//     const icon = getSimpleIcon(title);
//     if (!icon) return null;

//     const IconComponent = () => (
//       <div>
//         <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor">
//           <path d={icon.path} />
//         </svg>
//       </div>
//     );
//     return <IconComponent key={title} />;
//   }).filter(Boolean);

//   return (
//     <div className="relative w-full h-full flex items-center justify-center">
//       <IconCloud icons={icons} />
//     </div>
//   );
// };
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
            <div
                className={`relative ${iconSize} hover:scale-110 transition-transform duration-300 ${className}`}
            >
                <Image
                    src={`${process.env.NEXT_PUBLIC_MEDIA_API ? process.env.NEXT_PUBLIC_MEDIA_API : 'https://endpoints.ittisafur.com'}${iconUrl}`}
                    alt={tech.title}
                    className="w-full h-full object-contain dark:invert"
                    fill
                />
                {showLabel && (
                    <span className="text-sm font-medium text-muted-foreground">{tech.title}</span>
                )}
            </div>
        );
    }

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <svg
                role="img"
                viewBox="0 0 24 24"
                className={`${iconSize} ${showLabel ? '' : 'hover:scale-110'} transition-transform duration-300`}
                fill="currentColor"
            >
                <path d={simpleIcon?.path} />
            </svg>
            {showLabel && (
                <span className="text-sm font-medium text-muted-foreground">{tech.title}</span>
            )}
        </div>
    );
};

const StackGrid: React.FC<StackGridProps> = ({
    technologies,
    className = '',
    showLabels = false,
    iconSize = 'w-6 h-6',
}) => {
    return (
        <div className={`flex flex-wrap gap-3 justify-center lg:justify-start ${className}`}>
            {technologies.map((tech, index) => (
                <StackIcon
                    key={`${tech.title}-${index}`}
                    tech={tech}
                    showLabel={showLabels}
                    iconSize={iconSize}
                />
            ))}
        </div>
    );
};

export { StackIcon, StackGrid };
