import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'aos/dist/aos.css';
import 'glightbox/dist/css/glightbox.min.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '@/app/styles/main.scss';

import { Metadata } from 'next';
import React from 'react';

import Footer from '@/components/layout/footer';
import ClientProviders from '@/components/providers/client';
import { DEFAULT_LANGUAGE } from '@/lib/constants';
import { buildFooterData } from '@/lib/models/footer';
import { getBCP47ByCode, loadLanguagesJson } from '@/lib/models/languages';
import { buildMetadata } from '@/lib/models/metadata';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const languages = await loadLanguagesJson();

    return buildMetadata(lang, '', undefined, languages);
}

export async function generateStaticParams() {
    const languages = await loadLanguagesJson();
    return languages.map((lang) => ({
        lang: lang.code,
    }));
}

export default async function LangLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const languages = await loadLanguagesJson();

    // Validate language
    const validLang = languages.find((l) => l.code === lang)?.code || DEFAULT_LANGUAGE;
    const bcp47 = getBCP47ByCode(languages, validLang);

    return (
        <html lang={bcp47}>
            <body>
                {children}
                <Footer data={await buildFooterData(validLang)} />
                {/* Client-side providers and components */}
                <ClientProviders languages={languages} />
            </body>
        </html>
    );
}
