'use client';

import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { useEffect, useState } from 'react';

import { GA_MEASUREMENT_ID, isGAEnabled } from '@/lib/config';
import { COOKIE_CONSENT_KEY } from '@/lib/constants';
import { getLangFromPathname, type Language } from '@/lib/i18n';
import { type CookieConsentJsonData, loadCookieConsentJson } from '@/lib/models/cookie-consent';

type Props = {
    languages: Language[];
};

type ConsentStatus = 'pending' | 'accepted' | 'declined';

export default function CookieConsent({ languages }: Props) {
    const pathname = usePathname();

    const [consentStatus, setConsentStatus] = useState<ConsentStatus>(() => {
        if (typeof window === 'undefined') return 'pending';

        const saved = localStorage.getItem(COOKIE_CONSENT_KEY);
        if (saved === 'accepted') return 'accepted';
        if (saved === 'declined') return 'declined';
        return 'pending';
    });

    const [showBanner, setShowBanner] = useState(() => {
        if (typeof window === 'undefined') return false;
        return !localStorage.getItem(COOKIE_CONSENT_KEY);
    });

    const [text, setText] = useState<CookieConsentJsonData | null>(null);

    useEffect(() => {
        const lang = getLangFromPathname(pathname, languages);

        loadCookieConsentJson(lang)
            .then((data) => setText(data))
            .catch((err) => {
                console.error('Failed to load cookie consent text:', err);
                loadCookieConsentJson('en').then((data) => setText(data));
            });
    }, [pathname, languages]);

    const updateConsent = (status: ConsentStatus) => {
        localStorage.setItem(COOKIE_CONSENT_KEY, status);
        setConsentStatus(status);
        setShowBanner(false);
    };

    if (!isGAEnabled()) {
        return null;
    }

    return (
        <>
            {consentStatus === 'accepted' && (
                <>
                    <Script
                        id='gtag-base'
                        strategy='afterInteractive'
                        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
                    />
                    <Script
                        id='gtag-init'
                        strategy='afterInteractive'
                        dangerouslySetInnerHTML={{
                            __html: `
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                                gtag('config', '${GA_MEASUREMENT_ID}', {
                                    anonymize_ip: true,
                                    cookie_flags: 'SameSite=None;Secure'
                                });
                            `,
                        }}
                    />
                </>
            )}

            {/* Cookie Banner */}
            {showBanner && text && (
                <div className='cookie-consent'>
                    <div className='cookie-content'>
                        <div className='cookie-text'>
                            <h4>{text.title}</h4>
                            <p>{text.description}</p>
                        </div>
                        <div className='cookie-actions'>
                            <button
                                className='cookie-btn cookie-btn-primary'
                                onClick={() => updateConsent('accepted')}
                                aria-label={text.accept}
                            >
                                {text.accept}
                            </button>
                            <button
                                className='cookie-btn cookie-btn-outline'
                                onClick={() => updateConsent('declined')}
                                aria-label={text.decline}
                            >
                                {text.decline}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
