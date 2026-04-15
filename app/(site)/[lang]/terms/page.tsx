import { Metadata } from 'next';
import React from 'react';

import Header from '@/components/layout/header';
import TermsContent from '@/components/sections/terms/terms-content';
import LastUpdated from '@/components/ui/last-updated';
import PageTitle from '@/components/ui/page-title';
import { DEFAULT_LANGUAGE } from '@/lib/constants';
import { buildHeaderData } from '@/lib/models/header';
import { loadLanguagesJson } from '@/lib/models/languages';
import { buildMetadata } from '@/lib/models/metadata';
import { loadTermsPageJson } from '@/lib/models/pages/terms';

export default async function TermsPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const data = await loadTermsPageJson(lang);
    const languages = await loadLanguagesJson();
    const validLang = languages.find((l) => l.code === lang)?.code || DEFAULT_LANGUAGE;

    return (
        <>
            <Header data={await buildHeaderData(validLang)} sticky={true} />
            <main className='main'>
                <PageTitle data={data.pageTitle} />

                <section id='terms-of-service' className='terms-of-service section'>
                    <div className='container' data-aos='fade-up'>
                        <div className='tos-content' data-aos='fade-up' data-aos-delay='200'>
                            <LastUpdated date={data.lastUpdated} />
                            <TermsContent sections={data.sections} />
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const { metadata } = await loadTermsPageJson(lang);
    const languages = await loadLanguagesJson();

    return buildMetadata(lang, 'terms', metadata, languages);
}
