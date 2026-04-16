import { DEFAULT_LANGUAGE, LANGUAGE_STORAGE_KEY } from '@/lib/constants';

export type Language = {
    code: string;
    name: string;
    nativeName: string;
    bcp47: string;
};

/**
 * Get current language from localStorage or browser
 */
export function getCurrentLanguage(availableLangs: Language[]): string {
    if (typeof window === 'undefined') return DEFAULT_LANGUAGE;

    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored) {
        const isValid = availableLangs.some((l) => l.code === stored);
        if (isValid) return stored;
    }

    const browserLang = getBrowserLanguage();
    const matched = availableLangs.find(
        (l) => l.code === browserLang || l.bcp47.toLowerCase().startsWith(browserLang.toLowerCase()),
    );

    return matched?.code || DEFAULT_LANGUAGE;
}

/**
 * Get browser language (ISO 639-1 code)
 */
export function getBrowserLanguage(): string {
    if (typeof navigator === 'undefined') return DEFAULT_LANGUAGE;
    const lang = navigator.language || navigator.languages?.[0] || DEFAULT_LANGUAGE;
    return lang.split('-')[0];
}

/**
 * Set language in localStorage
 */
export function setLanguage(lang: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
}

/**
 * Check if bot/crawler
 */
export function isBot(): boolean {
    if (typeof navigator === 'undefined') return false;

    // Check for webdriver
    if (navigator.webdriver) return true;

    // Check user agent for common bots
    const botPattern =
        /bot|crawler|spider|crawling|googlebot|bingbot|slurp|duckduckbot|baiduspider|yandexbot|facebookexternalhit|twitterbot|rogerbot|linkedinbot|embedly|quora link preview|showyoubot|outbrain|pinterest|developers\.google\.com/i;
    return botPattern.test(navigator.userAgent);
}

/**
 * Extract language code from pathname
 * All languages now have prefix, including 'en'
 */
export function extractLangFromPath(pathname: string, availableLangs: Language[]): string | null {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length === 0) return null;

    const firstSegment = segments[0];
    const langCodes = availableLangs.map((l) => l.code);

    return langCodes.includes(firstSegment) ? firstSegment : null;
}

/**
 * Build path with language code
 * All languages use /{code} prefix now
 */
export function buildPathWithLang(pathname: string, targetLang: string, availableLangs: Language[]): string {
    const langCodes = availableLangs.map((l) => l.code);
    const segments = pathname.split('/').filter(Boolean);

    // Remove existing language prefix if present
    if (segments.length > 0 && langCodes.includes(segments[0])) {
        segments.shift();
    }

    // Add target language prefix
    const path = segments.length > 0 ? `/${segments.join('/')}` : '';
    return `/${targetLang}${path}`;
}

/**
 * Get language code from pathname, defaulting to DEFAULT_LANGUAGE
 */
export function getLangFromPathname(pathname: string, availableLangs: Language[]): string {
    const extracted = extractLangFromPath(pathname, availableLangs);
    return extracted || DEFAULT_LANGUAGE;
}
