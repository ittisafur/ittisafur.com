'use client';

import { useEffect } from 'react';
import type { Portfolio } from '@/types/portfolio';
import { trackPortfolioView } from '@/utlis/analytics';

export function usePortfolioTracking(portfolio: Portfolio) {
    useEffect(() => {
        if (portfolio) {
            trackPortfolioView({
                id: portfolio.id,
                title: portfolio.title,
                slug: portfolio.slug,
                stack: portfolio.stack,
            });
        }
    }, [portfolio]);
}
