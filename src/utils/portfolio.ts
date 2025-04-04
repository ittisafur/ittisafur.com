import { Portfolio } from '@/types/portfolio';

/**
 * Determines the job type based on portfolio data
 * @param portfolio The portfolio item
 * @returns Job type label and corresponding icon name
 */
export function getJobType(portfolio: Portfolio): { label: string; icon: string } {
    // First check if it's a side project
    if (portfolio.isSideProject) {
        return {
            label: 'Side-Project',
            icon: 'flask',
        };
    }

    // Then check if it's a freelance/contract job
    if (portfolio.isFreelance) {
        return {
            label: 'Contract',
            icon: 'file-contract',
        };
    }

    // Otherwise it's a full-time professional position
    return {
        label: 'Full Time',
        icon: 'briefcase',
    };
}

/**
 * Calculates and formats the tenure period from portfolio dates
 * @param portfolio The portfolio item
 * @returns Formatted tenure string
 */
export function getTenure(portfolio: Portfolio): string {
    // Extract year from date strings (YYYY-MM-DD format)
    const startYear = portfolio.startDate ? new Date(portfolio.startDate).getFullYear() : null;

    // Handle case where no start date is available
    if (!startYear) return '';

    // If currently working (takes precedence) or no end date
    if (portfolio.isWorking || !portfolio.endDate) {
        return `${startYear} - Present`;
    }

    // Has both start and end dates
    const endYear = new Date(portfolio.endDate).getFullYear();
    return `${startYear} - ${endYear}`;
}
