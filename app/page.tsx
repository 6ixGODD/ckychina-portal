'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { getBrowserLanguageBCP47, getCodeByBCP47, isBot, setLanguage } from '@/lib/i18n';
import { loadLanguagesJson } from '@/lib/models/languages';

export default function RootPage() {
    const router = useRouter();

    useEffect(() => {
        async function handleLanguageRedirect() {
            // Skip redirect if it's a bot
            if (isBot()) {
                router.replace('/en');
                return;
            }

            try {
                const languages = await loadLanguagesJson();

                // Check localStorage first
                const storedLang = typeof window !== 'undefined' ? localStorage.getItem('lang') : null;

                if (storedLang) {
                    // Validate stored language
                    const isValid = languages.some((l) => l.code === storedLang);
                    if (isValid) {
                        router.replace(`/${storedLang}`);
                        return;
                    }
                }

                // Get browser language in BCP47 format
                const browserBCP47 = getBrowserLanguageBCP47();

                // Find corresponding language code
                const langCode = getCodeByBCP47(languages, browserBCP47, 'en');

                // Save to localStorage
                setLanguage(langCode);

                // Redirect
                router.replace(`/${langCode}`);
            } catch (error) {
                console.error('Failed to load languages:', error);
                router.replace('/en');
            }
        }

        handleLanguageRedirect();
    }, [router]);

    // Show loading state
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                fontSize: '18px',
                color: '#666',
            }}
        >
            Redirecting...
        </div>
    );
}
