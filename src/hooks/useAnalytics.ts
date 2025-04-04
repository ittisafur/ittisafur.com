'use client';

import { useEffect } from 'react';
import type { Portfolio } from '@/types/portfolio';
import { trackPortfolioView } from '@/utils/analytics';

export function usePortfolioTracking(portfolio: Portfolio) {
  useEffect(() => {
    if (portfolio) {
      trackPortfolioView({
        id: portfolio.id || portfolio.slug,
        title: portfolio.title,
        slug: portfolio.slug,
        stack: portfolio.stack,
      });
    }
  }, [portfolio]);
}
