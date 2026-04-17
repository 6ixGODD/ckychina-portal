import type { MetadataRoute } from 'next';

import { SITE_URL } from '@/lib/config';
import { loadLanguagesJson } from '@/lib/models/languages';
import { getAllProducts } from '@/lib/models/pages/products';

export const dynamic = 'force-static'; // Force static generation for this route

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = SITE_URL;
    const languages = await loadLanguagesJson();

    const routes: MetadataRoute.Sitemap = [];

    // Root home page
    routes.push({
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 1,
    });

    for (const lang of languages) {
        // Home page for each language
        routes.push({
            url: `${baseUrl}/${lang.code}/`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
            alternates: {
                languages: Object.fromEntries(languages.map((l) => [l.code, `${baseUrl}/${l.code}/`])),
            },
        });

        // Products listing page for each language
        routes.push({
            url: `${baseUrl}/${lang.code}/products/`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
            alternates: {
                languages: Object.fromEntries(languages.map((l) => [l.code, `${baseUrl}/${l.code}/products/`])),
            },
        });

        // Individual product pages for each language
        const products = await getAllProducts(lang.code);
        for (const product of products) {
            routes.push({
                url: `${baseUrl}/${lang.code}/products/${product.category}/${product.id}/`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: 0.6,
                alternates: {
                    languages: Object.fromEntries(
                        languages.map((l) => [
                            l.code,
                            `${baseUrl}/${l.code}/products/${product.category}/${product.id}/`,
                        ]),
                    ),
                },
            });
        }

        // 404 page for each language
        routes.push({
            url: `${baseUrl}/${lang.code}/404/`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.1,
        });
    }

    return routes;
}
