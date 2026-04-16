import { Metadata } from 'next';
import React from 'react';

import Header from '@/components/layout/header';
import About from '@/components/sections/homepage/about';
import ContactUs from '@/components/sections/homepage/contact-us';
import Hero from '@/components/sections/homepage/hero';
import Portfolio from '@/components/sections/homepage/portfolio';
import Services from '@/components/sections/homepage/services';
import WhyUs from '@/components/sections/homepage/why-us';
import { DEFAULT_LANGUAGE } from '@/lib/constants';
import { buildHeaderData } from '@/lib/models/header';
import { loadLanguagesJson } from '@/lib/models/languages';
import { buildMetadata } from '@/lib/models/metadata';
import { buildHomePageData } from '@/lib/models/pages/home';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const { metadata } = await buildHomePageData(lang);
    const languages = await loadLanguagesJson();

    return buildMetadata(lang, '', metadata, languages);
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const data = await buildHomePageData(lang);
    const languages = await loadLanguagesJson();
    const validLang = languages.find((l) => l.code === lang)?.code || DEFAULT_LANGUAGE;

    return (
        <>
            <Header data={await buildHeaderData(validLang)} />
            <main className='main'>
                <Hero data={data.hero} />
                <About data={data.about} />
                <Services data={data.services} />
                <WhyUs data={data.whyUs} />
                <Portfolio data={data.portfolio} />
                <ContactUs data={data.contact} />
            </main>
        </>
    );
}
