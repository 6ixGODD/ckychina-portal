import { getPathSegments } from '@/lib/utils';

export type Language = {
    code: string;
    name: string;
    nativeName: string;
    bcp47: string;
};

const langKey = 'lang';

export function getCurrentLanguage(): string {
    if (typeof window === 'undefined') return 'en';
    if (localStorage.getItem(langKey)) {
        return localStorage.getItem(langKey) as string;
    }
    const lang = getBrowserLanguage();
    setLanguage(lang);
    return lang;
}

export function getBrowserLanguage(): string {
    if (typeof navigator === 'undefined') return 'en';
    const lang = navigator.language || navigator.languages[0] || 'en';
    return lang.split('-')[0]; // Return only the language code (e.g., 'en' from 'en-US')
}

export function setLanguage(lang: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(langKey, lang);
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
