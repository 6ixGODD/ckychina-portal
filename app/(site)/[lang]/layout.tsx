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

import ClientProviders from '@/components/client';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { buildFooterData } from '@/lib/models/footer';
import { buildHeaderData } from '@/lib/models/header';
import { getBCP47ByCode, loadLanguagesJson } from '@/lib/models/languages';
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

                {/* Client-side providers and components */}
                <ClientProviders />
            </body>
        </html>
    );
}
