import { Metadata } from 'next';
import React from 'react';

import Header from '@/components/layout/header';
import PrivacyContent from '@/components/sections/privacy/privacy-content';
import LastUpdated from '@/components/ui/last-updated';
import PageTitle from '@/components/ui/page-title';
import { DEFAULT_LANGUAGE } from '@/lib/constants';
import { buildHeaderData } from '@/lib/models/header';
import { loadLanguagesJson } from '@/lib/models/languages';
import { buildMetadata } from '@/lib/models/metadata';
import { loadPrivacyPageJson } from '@/lib/models/pages/privacy';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const { metadata } = await loadPrivacyPageJson(lang);
    const languages = await loadLanguagesJson();

    return buildMetadata(lang, 'privacy', metadata, languages);
}

export default async function PrivacyPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const data = await loadPrivacyPageJson(lang);
    const languages = await loadLanguagesJson();
    const validLang = languages.find((l) => l.code === lang)?.code || DEFAULT_LANGUAGE;

    return (
        <>
            <Header data={await buildHeaderData(validLang)} sticky={true} />
            <main className='main'>
                <PageTitle data={data.pageTitle} />

                <section id='privacy' className='privacy section'>
                    <div className='container' data-aos='fade-up' data-aos-delay='100'>
                        <div className='row'>
                            <div className='col-lg-10 mx-auto'>
                                <LastUpdated date={data.lastUpdated} />
                                <PrivacyContent sections={data.sections} />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
