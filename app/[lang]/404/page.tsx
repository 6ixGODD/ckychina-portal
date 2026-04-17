import { Metadata } from 'next';
import React from 'react';

import Header from '@/components/layout/header';
import ErrorContent, { ErrorContentData } from '@/components/sections/error/error-content';
import HelpfulLinks, { HelpfulLinksData } from '@/components/sections/error/helpful-links';
import { DEFAULT_LANGUAGE } from '@/lib/constants';
import { buildHeaderData } from '@/lib/models/header';
import { loadLanguagesJson } from '@/lib/models/languages';
import { buildMetadata } from '@/lib/models/metadata';
import { loadNotFoundPageJson } from '@/lib/models/pages/not-found';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const notFoundData = await loadNotFoundPageJson(lang);
    const languages = await loadLanguagesJson();

    return buildMetadata(lang, '404', notFoundData.metadata, languages);
}

export async function generateStaticParams() {
    const languages = await loadLanguagesJson();
    return languages.map((lang) => ({
        lang: lang.code,
    }));
}

export default async function NotFoundPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const notFoundData = await loadNotFoundPageJson(lang);
    const languages = await loadLanguagesJson();
    const validLang = languages.find((l) => l.code === lang)?.code || DEFAULT_LANGUAGE;

    const errorContentData: ErrorContentData = {
        errorNumber: notFoundData.errorNumber,
        errorTitle: notFoundData.errorTitle,
        errorDescription: notFoundData.errorDescription,
    };

    const helpfulLinksData: HelpfulLinksData = {
        title: notFoundData.helpfulLinksTitle,
        links: notFoundData.helpfulLinks.map((link) => ({
            icon: link.icon,
            title: link.title,
            description: link.description,
            linkText: link.linkText,
            linkHref: link.linkHref.replace('{lang}', validLang),
        })),
    };

    return (
        <>
            <Header data={await buildHeaderData(validLang)} sticky={true} />
            <main className='main'>
                <section id='error-404' className='error-404 section'>
                    <div className='container' data-aos='fade-up' data-aos-delay='100'>
                        <ErrorContent data={errorContentData} />
                        <HelpfulLinks data={helpfulLinksData} />
                    </div>
                </section>
            </main>
        </>
    );
}
