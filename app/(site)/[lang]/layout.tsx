import '@/app/styles/main.scss';

import { Metadata } from 'next';
import Script from 'next/script';
import React from 'react';

import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import ClientInitProvider from '@/components/providers/client';
import CookieConsent from '@/components/providers/cookie-consent';
import HashScroll from '@/components/ui/hash-scroll';
import Preloader from '@/components/ui/preloader';
import ScrollEffect from '@/components/ui/scroll-effect';
import ScrollTop from '@/components/ui/scroll-top';
import { buildFooterData } from '@/lib/models/footer';
import { buildHeaderData } from '@/lib/models/header';
import { getBCP47ByCode, loadLanguagesJson } from '@/lib/models/language';
import { buildMetadata } from '@/lib/models/metadata';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const languages = await loadLanguagesJson();

    return buildMetadata(lang, '', undefined, languages);
}

export default async function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const languages = await loadLanguagesJson();
    const bcp47 = getBCP47ByCode(languages, lang);

    return (
        <html lang={bcp47}>
            <body className='index-page'>
                <Header data={await buildHeaderData(lang)} />
                <main className='main'>{children}</main>
                <Footer data={await buildFooterData(lang)} />

                {/* Client-side components */}
                <ScrollTop />
                <Preloader />
                <ScrollEffect />
                <HashScroll />
                <ClientInitProvider />
                <CookieConsent />

                {/* Vendor JS Files */}
                <Script src='/assets/vendor/bootstrap/js/bootstrap.bundle.min.js' strategy='afterInteractive' />
                <Script src='/assets/vendor/aos/aos.js' strategy='afterInteractive' />
                <Script src='/assets/vendor/glightbox/js/glightbox.min.js' strategy='afterInteractive' />
                <Script src='/assets/vendor/purecounter/purecounter_vanilla.js' strategy='afterInteractive' />
                <Script src='/assets/vendor/imagesloaded/imagesloaded.pkgd.min.js' strategy='afterInteractive' />
                <Script src='/assets/vendor/isotope-layout/isotope.pkgd.min.js' strategy='afterInteractive' />
                <Script src='/assets/vendor/swiper/swiper-bundle.min.js' strategy='afterInteractive' />
            </body>
        </html>
    );
}
