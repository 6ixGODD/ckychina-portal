import { Metadata } from 'next';
import React from 'react';

import Header from '@/components/layout/header';
import ProductList from '@/components/sections/products/product-list';
import PageTitle from '@/components/ui/page-title';
import { ITEMS_PER_PAGE } from '@/lib/config';
import { DEFAULT_LANGUAGE } from '@/lib/constants';
import { buildHeaderData } from '@/lib/models/header';
import { loadLanguagesJson } from '@/lib/models/languages';
import { buildMetadata } from '@/lib/models/metadata';
import { loadProductsJson } from '@/lib/models/pages/products';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const languages = await loadLanguagesJson();
    const metadata = (await loadProductsJson(lang)).metadata;

    return buildMetadata(lang, 'products', metadata, languages);
}

export default async function ProductsPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const productsJson = await loadProductsJson(lang);
    const products = productsJson.products;
    const filters = productsJson.categories;
    const pageTitle = productsJson.pageTitle;

    const languages = await loadLanguagesJson();
    const validLang = languages.find((l) => l.code === lang)?.code || DEFAULT_LANGUAGE;

    const pageTitleData = {
        breadcrumbs: pageTitle.breadcrumbs,
        title: pageTitle.title,
        description: pageTitle.description,
    };

    const productCardData = products.map((p) => ({
        id: p.id,
        name: p.name,
        category: p.category,
        categoryName: p.categoryName,
        year: p.year,
        description: p.description,
        features: p.features,
        mainImage: p.mainImage,
        imagePosition: p.imagePosition,
    }));

    return (
        <>
            <Header data={await buildHeaderData(validLang)} sticky={true} />
            <main className='main'>
                <PageTitle data={pageTitleData} />

                <section id='portfolio' className='portfolio section'>
                    <div className='container' data-aos='fade-up' data-aos-delay='100'>
                        <ProductList
                            products={productCardData}
                            filters={filters}
                            lang={lang}
                            itemsPerPage={ITEMS_PER_PAGE}
                        />
                    </div>
                </section>
            </main>
        </>
    );
}
