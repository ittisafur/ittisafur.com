import React from 'react';
import { IconCloud } from "@/components/ui/icon-cloud";
import Image from 'next/image';
import { PortfolioAPI } from '@/utlis/dummy-data';

// Create Icons object for stack icons
const Icons = {
  createStackIcon: (iconPath) => () => (
    <div className="w-10 h-10">
      <div className="relative w-full h-full">
        <Image
          src={iconPath}
          alt="tech stack"
          fill
          className="w-full h-full object-contain dark:invert"
        />
      </div>
    </div>
  )
};

export function TechStackCloud() {
  // Get unique stack items from all portfolio projects
  const uniqueStack = Array.from(
    new Set(
      PortfolioAPI.data.portfolio.flatMap(project => 
        project.stack.map(tech => JSON.stringify(tech))
      )
    )
  ).map(str => JSON.parse(str));

  // Create icon components from the stack
  const createIconComponents = () => {
    const components = uniqueStack.map((tech, index) => {
      const StackIcon = Icons.createStackIcon(tech.icon);
      // Create multiple instances of each icon to fill the cloud
      return [
        <StackIcon key={`${tech.title}-1-${index}`} />,
        <StackIcon key={`${tech.title}-2-${index}`} />,
        <StackIcon key={`${tech.title}-3-${index}`} />
      ];
    }).flat();

    // Ensure we have enough icons for a good-looking cloud
    return components;
  };

  return (
    <div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden rounded-lg border bg-background">
      <IconCloud
        icons={createIconComponents()}
      />
    </div>
  );
}

export default function TechCloudDemo() {
  return (
    <div className="w-full h-[600px] flex items-center justify-center bg-background">
      <TechStackCloud />
    </div>
  );
}
