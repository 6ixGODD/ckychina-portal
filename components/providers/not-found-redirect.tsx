'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import type { Language } from '@/lib/i18n';
import { getCurrentLanguage, isBot, setLanguage } from '@/lib/i18n';

type Props = {
    languages: Language[];
};

export default function NotFoundRedirect({ languages }: Props) {
    const router = useRouter();

    useEffect(() => {
        // Skip redirect for bots
        if (isBot()) {
            // For bots, redirect to default language
            router.replace('/en/404');
            return;
        }

        // Get detected language
        const detectedLang = getCurrentLanguage(languages);

        // Save to localStorage
        setLanguage(detectedLang);

        // Redirect to detected language's 404 page
        router.replace(`/${detectedLang}/404`);
    }, [router, languages]);

    return null;
}
