import type { MetadataRoute } from 'next';

import { SITE_URL } from '@/lib/config';
import { loadLanguagesJson } from '@/lib/models/languages';
import { getAllProducts } from '@/lib/models/pages/products';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const languages = await loadLanguagesJson();

    const routes: MetadataRoute.Sitemap = [];

    routes.push({
        url: SITE_URL,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 1,
    });

    for (const lang of languages) {
        routes.push({
            url: `${SITE_URL}/${lang.code}/`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
            alternates: {
                languages: Object.fromEntries(languages.map((l) => [l.code, `${SITE_URL}/${l.code}/`])),
            },
        });

        routes.push({
            url: `${SITE_URL}/${lang.code}/products/`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
            alternates: {
                languages: Object.fromEntries(languages.map((l) => [l.code, `${SITE_URL}/${l.code}/products/`])),
            },
        });

        const products = await getAllProducts(lang.code);
        for (const product of products) {
            routes.push({
                url: `${SITE_URL}/${lang.code}/products/${product.category}/${product.id}/`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: 0.6,
                alternates: {
                    languages: Object.fromEntries(
                        languages.map((l) => [
                            l.code,
                            `${SITE_URL}/${l.code}/products/${product.category}/${product.id}/`,
                        ]),
                    ),
                },
            });
        }

        routes.push({
            url: `${SITE_URL}/${lang.code}/404/`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.1,
        });
    }

    return routes;
}
