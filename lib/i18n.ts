import { LanguagesJsonData } from '@/lib/models/languages';
import { getPathSegments } from '@/lib/utils';

export type Language = {
    code: string;
    name: string;
    nativeName: string;
    bcp47: string;
};

const langKey = 'lang';

/**
 * Get current language from localStorage or browser
 */
export function getCurrentLanguage(): string {
    if (typeof window === 'undefined') return 'en';

    const stored = localStorage.getItem(langKey);
    if (stored) {
        return stored;
    }

    const browserLang = getBrowserLanguage();
    setLanguage(browserLang);
    return browserLang;
}

/**
 * Get browser language (ISO 639-1 code)
 */
export function getBrowserLanguage(): string {
    if (typeof navigator === 'undefined') return 'en';
    const lang = navigator.language || (navigator.languages && navigator.languages[0]) || 'en';
    return lang.split('-')[0]; // Return only the language code (e.g., 'en' from 'en-US')
}

/**
 * Get browser language in BCP 47 format
 */
export function getBrowserLanguageBCP47(): string {
    if (typeof navigator === 'undefined') return 'en-US';
    return navigator.language || (navigator.languages && navigator.languages[0]) || 'en-US';
}

/**
 * Set language in localStorage
 */
export function setLanguage(lang: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(langKey, lang);
}

/**
 * Find language code by BCP 47 tag
 * Returns the language code if found, otherwise returns default language
 */
export function getCodeByBCP47(languages: LanguagesJsonData, bcp47: string, defaultLang: string = 'en'): string {
    // First try exact match
    const exactMatch = languages.find((l) => l.bcp47.toLowerCase() === bcp47.toLowerCase());
    if (exactMatch) {
        return exactMatch.code;
    }

    // Then try matching the language part (e.g., 'zh' from 'zh-CN')
    const langPart = bcp47.split('-')[0].toLowerCase();
    const langMatch = languages.find((l) => l.bcp47.toLowerCase().startsWith(langPart));
    if (langMatch) {
        return langMatch.code;
    }

    return defaultLang;
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

export function extractLangFromPath(pathname: string): string | null {
    const segments = getPathSegments(pathname);
    return segments[0] ?? null;
}

export function buildPathWithLang(pathname: string, lang: string): string {
    const segments = getPathSegments(pathname);

    if (segments.length === 0) {
        return `/${lang}`;
    }

    segments[0] = lang;
    return `/${segments.join('/')}`;
}
