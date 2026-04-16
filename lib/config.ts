/**
 * Google Analytics Measurement ID
 * Set via NEXT_PUBLIC_GA_MEASUREMENT_ID environment variable
 */
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

/**
 * Check if Google Analytics is enabled
 */
export function isGAEnabled(): boolean {
    return !!GA_MEASUREMENT_ID && GA_MEASUREMENT_ID.trim().length > 0;
}

/**
 * Site URL for canonical links
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ckychina.com';

/**
 * Items per page for product listing
 */
export const ITEMS_PER_PAGE = 5;
