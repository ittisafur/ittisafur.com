'use client';

import posthog from 'posthog-js';
import { AnalyticsProperties, PortfolioAnalyticsData } from '@/types/analytics';

/**
 * Tracks an event with PostHog
 */
export const trackEvent = (eventName: string, properties?: AnalyticsProperties) => {
  if (typeof window !== 'undefined') {
    posthog.capture(eventName, properties);
  }
};

/**
 * Tracks viewing a portfolio item
 */
export const trackPortfolioView = (portfolioData: PortfolioAnalyticsData) => {
  trackEvent('portfolio_viewed', {
    portfolio_id: portfolioData.id,
    portfolio_title: portfolioData.title,
    portfolio_slug: portfolioData.slug,
    portfolio_stack: portfolioData.stack?.map((item) => item.title).join(', '),
    is_featured: Boolean(portfolioData.isFeatured),
    is_breakthrough: Boolean(portfolioData.isBreakThrough),
    is_side_project: Boolean(portfolioData.isSideProject),
    timestamp: new Date().toISOString(),
  });
};

/**
 * Tracks clicks on external links
 */
export const trackExternalLinkClick = (url: string, title?: string, source?: string) => {
  trackEvent('external_link_clicked', {
    url,
    link_text: title || url,
    source,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Tracks page views
 */
export const trackPageView = (path: string, referrer?: string) => {
  trackEvent('$pageview', {
    $current_url: path,
    referrer: referrer || document.referrer,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Tracks form submissions
 */
export const trackFormSubmission = (formName: string, success: boolean, errorMessage?: string) => {
  trackEvent('form_submission', {
    form_name: formName,
    success,
    error_message: errorMessage,
    timestamp: new Date().toISOString(),
  });
};
