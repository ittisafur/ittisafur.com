'use client';

import React from 'react';
import * as SimpleIcons from 'simple-icons';
import { IconCloud } from "@/components/ui/icon-cloud";
import Image from 'next/image'

// Mapping function for technology names to simple-icons names
const getTechnologyName = (name) => {
  // Convert to lowercase for case-insensitive comparison
  const lowercaseName = name.toLowerCase();

  // Common technology name mappings
  const nameMap = {
    'react.js': 'react',
    'next.js': 'nextdotjs',
    'vue.js': 'vuedotjs',
    'node.js': 'nodedotjs',
    'redux.js': 'redux',
    'strapi cms': 'strapi',
    'chart.js': 'chartdotjs',
    'playwright': 'playwright',
    'gcp': 'googlecloud',
    'wordpress api': 'wordpress',
    'wp engine': 'wordpress',
    'apollo gql': 'apollographql',
    'gitlab ci': 'gitlab',
    'yarn workspace': 'yarn',
    'adobe xd': 'adobe',
    'adobe': 'adobe',
    'tmdb api': 'themoviedatabase',
    'react query': 'reactquery',
    'digital ocean': 'digitalocean',
    'typescript': 'typescript',
    'tailwindcss': 'tailwindcss',
    'material-ui': 'mui',
    'mui': 'mui',
    'docker': 'docker',
    'php': 'php',
    'symfony': 'symfony',
    'vite': 'vite',
    'graphql': 'graphql',
    'wordpress': 'wordpress',
    'laravel': 'laravel',
    'jquery': 'jquery',
    'figma': 'figma',
    'elementor': 'elementor',
    'bootstrap': 'bootstrap',
    'cpanel': 'cpanel'
  };

  // Return mapped name or clean up the original name
  return nameMap[lowercaseName] || 
         lowercaseName
           .replace(/[-.\s]js$/g, '') // Remove .js suffix
           .replace(/[-.\s]api$/g, '') // Remove api suffix
           .replace(/[-.\s]/g, '') // Remove spaces, hyphens, and dots
           .toLowerCase();
};


// Get simple-icons component
const getSimpleIcon = (name) => {
  const cleanName = getTechnologyName(name);
  const iconKey = `si${cleanName.charAt(0).toUpperCase()}${cleanName.slice(1)}`;
  
  // For debugging
  if (!SimpleIcons[iconKey]) {
    console.warn(`Icon not found for: ${name} (tried: ${iconKey})`);
  }
  
  return SimpleIcons[iconKey];
};

// Tech Cloud Component
const TechCloud = ({ technologies }) => {
    if (!technologies?.length) return null;

    // Get unique technology titles and filter out duplicates
    const uniqueTitles = Array.from(
        new Set(technologies.map(tech => tech.title))
    );

    console.log({technologies})

    
    // Create icon components using simple-icons
    const icons = uniqueTitles.map(title => {
        const icon = getSimpleIcon(title);
        
        if (!icon) return null;

        const IconComponent = () => (
      <div>

            <svg
                width="100"
                height="100"
                viewBox="0 0 24 24"
                fill="currentColor"
            >
                <path d={icon.path} />
            </svg>
      </div>
        );

        return <IconComponent key={title} />;
    }).filter(Boolean);

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            <IconCloud icons={icons} />
        </div>
    );
};

// Stack Icon Component
const StackIcon = ({ 
  tech, 
  className = '',
  iconSize = 'w-6 h-6',
  showLabel = false,
}) => {
  const icon = getSimpleIcon(tech.title);

  if (!icon) {
    // Fallback to using the provided icon if simple-icons version isn't available
    return (
      <div className={`relative ${iconSize} hover:scale-110 transition-transform duration-300 ${className}`}>
        <Image
          src={tech.icon}
          alt={tech.title}
          className="w-full h-full object-contain dark:invert"
          fill
        />
        {showLabel && (
          <span className="text-sm font-medium text-muted-foreground">
            {tech.title}
          </span>
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
        <path d={icon.path} />
      </svg>
      {showLabel && (
        <span className="text-sm font-medium text-muted-foreground">
          {tech.title}
        </span>
      )}
    </div>
  );
};

// Stack Grid Component
const StackGrid = ({ 
  technologies,
  className = '',
  showLabels = false,
  iconSize = 'w-6 h-6'
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

export { StackIcon, StackGrid, TechCloud };
