'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export type FilterType = 'all' | 'full-time' | 'contract' | 'side-project';

interface PortfolioFilterProps {
  onFilterChange: (filter: FilterType) => void;
  activeFilter: FilterType;
  counts: Record<FilterType, number>;
  totalCount: number;
}

const PortfolioFilter: React.FC<PortfolioFilterProps> = ({ 
  onFilterChange, 
  activeFilter,
  counts = { all: 0, 'full-time': 0, contract: 0, 'side-project': 0 },
  totalCount = 0
}) => {
  // Function to get the display name for a filter
  const getFilterName = (filter: FilterType): string => {
    switch(filter) {
      case 'all': return 'All Projects';
      case 'full-time': return 'Full Time';
      case 'contract': return 'Contract';
      case 'side-project': return 'Side Project';
      default: return filter;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8" data-animate data-animate-order="2" data-animate-type="slide-up">
      <div className="flex flex-wrap justify-center gap-3">
        {/* All Projects Button */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={activeFilter === 'all' ? "default" : "outline"}
                size="sm"
                className="gap-2"
                onClick={() => onFilterChange('all')}
              >
                <Icon name="grid" className="w-4 h-4" />
                <span>All Projects</span>
                <Badge variant="secondary" className="ml-1 text-xs">
                  {totalCount}
                </Badge>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Show all portfolio projects</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Professional Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant={activeFilter === 'full-time' || activeFilter === 'contract' ? "default" : "outline"}
              size="sm"
              className="gap-2"
            >
              <Icon name="briefcase" className="w-4 h-4" />
              <span>Professional</span>
              <Icon name="chevron-down" className="w-3 h-3 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="w-48">
            <DropdownMenuItem 
              className="gap-2"
              onClick={() => onFilterChange('full-time')}
            >
              <Icon name="briefcase" className="w-4 h-4" />
              <span>Full Time</span>
              <Badge variant="secondary" className="ml-auto text-xs">
                {counts['full-time']}
              </Badge>
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="gap-2"
              onClick={() => onFilterChange('contract')}
            >
              <Icon name="file-contract" className="w-4 h-4" />
              <span>Contract / Freelance</span>
              <Badge variant="secondary" className="ml-auto text-xs">
                {counts['contract']}
              </Badge>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Side Projects Button */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={activeFilter === 'side-project' ? "default" : "outline"}
                size="sm"
                className="gap-2"
                onClick={() => onFilterChange('side-project')}
              >
                <Icon name="flask" className="w-4 h-4" />
                <span>Side Projects</span>
                <Badge variant="secondary" className="ml-1 text-xs">
                  {counts['side-project']}
                </Badge>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Show personal projects & experiments</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Active filter indicator */}
      <div className="mt-4 text-center text-sm text-muted-foreground">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="inline-flex items-center gap-2"
          >
            <span>Showing:</span>
            <Badge variant="secondary" className="font-medium">
              {getFilterName(activeFilter)}
            </Badge>
            |
            <span className="uppercase text-xs tracking-tight font-medium text-it-white">A total of: {totalCount} projects</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PortfolioFilter;
