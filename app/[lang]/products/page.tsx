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
import { getAllProducts, getProductCategories } from '@/lib/models/products';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const languages = await loadLanguagesJson();

    const metadata = {
        title: 'All Products - CKY Audio',
        description:
            'Explore all CKY audio products including soundbar systems, portable party speakers, and vinyl turntables',
        keywords: 'CKY products,soundbar,portable speakers,turntables,audio equipment',
    };

    return buildMetadata(lang, 'products', metadata, languages);
}

export default async function ProductsPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const products = await getAllProducts(lang);
    const filters = getProductCategories();
    const languages = await loadLanguagesJson();
    const validLang = languages.find((l) => l.code === lang)?.code || DEFAULT_LANGUAGE;

    const pageTitleData = {
        breadcrumbs: [{ label: 'Home', href: `/${lang}` }, { label: 'All Products' }],
        title: 'All Products',
        description: "Explore CKY's complete range of innovative audio products",
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
