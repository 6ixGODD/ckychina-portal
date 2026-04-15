import { Metadata } from 'next';

import About from '@/components/sections/homepage/about';
import Contact from '@/components/sections/homepage/contact';
import Hero from '@/components/sections/homepage/hero';
import Portfolio from '@/components/sections/homepage/portfolio';
import Services from '@/components/sections/homepage/services';
import WhyUs from '@/components/sections/homepage/why-us';
import { loadLanguagesJson } from '@/lib/models/language';
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

    return (
        <>
            <Hero data={data.hero} />
            <About data={data.about} />
            <Services data={data.services} />
            <WhyUs data={data.whyUs} />
            <Portfolio data={data.portfolio} />
            <Contact data={data.contact} />
        </>
    );
}
