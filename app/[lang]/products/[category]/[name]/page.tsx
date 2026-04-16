import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import ProductDetail from '@/components/sections/products/product-detail';
import PageTitle from '@/components/ui/page-title';
import { loadLanguagesJson } from '@/lib/models/languages';
import { buildMetadata } from '@/lib/models/metadata';
import { getAllProducts, getProductById } from '@/lib/models/products';

export async function generateStaticParams() {
    const products = await getAllProducts('en');
    return products.map((product) => ({
        category: product.category,
        name: product.id,
    }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string; category: string; name: string }>;
}): Promise<Metadata> {
    const { lang, category, name } = await params;
    const product = await getProductById(lang, category, name);
    const languages = await loadLanguagesJson();

    if (!product) {
        return buildMetadata(lang, '', { title: 'Product Not Found' }, languages);
    }

    return buildMetadata(lang, `products/${category}/${name}`, product.metadata, languages);
}

export default async function ProductDetailPage({
    params,
}: {
    params: Promise<{ lang: string; category: string; name: string }>;
}) {
    const { lang, category, name } = await params;
    const product = await getProductById(lang, category, name);

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
            <PageTitle data={pageTitleData} />

            <section id='portfolio-details' className='portfolio-details section'>
                <div className='container' data-aos='fade-up' data-aos-delay='100'>
                    <ProductDetail data={product} />
                </div>
            </section>
        </>
    );
}
