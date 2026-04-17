import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/404/'],
            },
        ],
        sitemap: 'https://www.ckychina.com/sitemap.xml',
        host: 'https://www.ckychina.com',
    };
}
