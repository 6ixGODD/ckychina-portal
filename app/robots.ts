import type { MetadataRoute } from 'next';

export const dynamic = 'force-static'; // Force static generation for this route

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/404/', '/**/404/'], // Disallow all paths containing '404'
            },
        ],
        sitemap: 'https://www.ckychina.com/sitemap.xml',
        host: 'https://www.ckychina.com',
    };
}
