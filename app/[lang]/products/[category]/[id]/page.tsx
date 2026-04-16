import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react';

import Header from '@/components/layout/header';
import ProductDetail from '@/components/sections/products/product-detail';
import PageTitle from '@/components/ui/page-title';
import { DEFAULT_LANGUAGE } from '@/lib/constants';
import { buildHeaderData } from '@/lib/models/header';
import { loadLanguagesJson } from '@/lib/models/languages';
import { buildMetadata } from '@/lib/models/metadata';
import { getAllProducts, getProductById } from '@/lib/models/products';

export async function generateStaticParams() {
    const languages = await loadLanguagesJson();
    const params = [];

    for (const lang of languages) {
        const products = await getAllProducts(lang.code);
        for (const product of products) {
            params.push({
                lang: lang.code,
                category: product.category,
                id: product.id,
            });
        }
    }

    return params;
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string; category: string; id: string }>;
}): Promise<Metadata> {
    const { lang, category, id } = await params;
    const product = await getProductById(lang, category, id);
    const languages = await loadLanguagesJson();

    if (!product) {
        return buildMetadata(lang, '', { title: 'Product Not Found' }, languages);
    }

    return buildMetadata(lang, `products/${category}/${id}`, product.metadata, languages);
}

export default async function ProductDetailPage({
    params,
}: {
    params: Promise<{ lang: string; category: string; id: string }>;
}) {
    const { lang, category, id } = await params;
    const product = await getProductById(lang, category, id);
    const languages = await loadLanguagesJson();
    const validLang = languages.find((l) => l.code === lang)?.code || DEFAULT_LANGUAGE;

    if (!product) {
        notFound();
    }

    const pageTitleData = {
        breadcrumbs: [
            { label: 'Home', href: `/${lang}` },
            { label: 'All Products', href: `/${lang}/products` },
            { label: product.name },
        ],
        title: 'Product Details',
        description: product.detailDescription,
    };

    return (
        <>
            <Header data={await buildHeaderData(validLang)} sticky={true} />
            <main className='main'>
                <PageTitle data={pageTitleData} />

                <section id='portfolio-details' className='portfolio-details section'>
                    <div className='container' data-aos='fade-up' data-aos-delay='100'>
                        <ProductDetail data={product} />
                    </div>
                </section>
            </main>
        </>
    );
}
