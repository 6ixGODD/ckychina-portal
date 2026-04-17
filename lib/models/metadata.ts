import type { Metadata } from 'next';
import { z } from 'zod';

import { SITE_URL } from '@/lib/config';

/**
 * Schema for default metadata configuration
 */
export const DefaultMetadataJsonSchema = z.object({
    titleTemplate: z.string(),
    defaultTitle: z.string(),
    description: z.string(),
    keywords: z.string(),
    siteName: z.string(),
    siteUrl: z.string(),
    openGraph: z.object({
        type: z.string(),
        siteName: z.string(),
    }),
    twitter: z
        .object({
            card: z.string(),
            site: z.string(),
        })
        .optional(),
});

export type DefaultMetadataJsonData = z.infer<typeof DefaultMetadataJsonSchema>;

/**
 * Schema for page-specific metadata (all fields optional)
 */
export const PageMetadataJsonSchema = z
    .object({
        title: z.string().optional(),
        description: z.string().optional(),
        keywords: z.string().optional(),
        openGraph: z
            .object({
                title: z.string().optional(),
                description: z.string().optional(),
                image: z.string().optional(),
            })
            .optional(),
    })
    .optional();

export type PageMetadataJsonData = z.infer<typeof PageMetadataJsonSchema>;

/**
 * Load default metadata configuration
 */
export async function loadDefaultMetadata(): Promise<DefaultMetadataJsonData> {
    const mod = await import(`@/data/metadata.json`);
    return DefaultMetadataJsonSchema.parse(mod.default);
}

/**
 * Build Next.js Metadata object with language and optional page-specific overrides
 *
 * @param lang - Language code (e.g., 'en', 'zh')
 * @param path - Path relative to language root (e.g., '', 'products', 'about')
 * @param pageMetadata - Optional page-specific metadata overrides
 * @param languages - Available languages for alternates
 * @returns Next.js Metadata object
 */
export async function buildMetadata(
    lang: string,
    path: string = '',
    pageMetadata?: PageMetadataJsonData,
    languages?: Array<{ code: string; bcp47: string }>,
): Promise<Metadata> {
    const defaultMeta = await loadDefaultMetadata();

    // Build canonical URL
    const pathSegment = path ? `/${path}` : '';
    const canonical = `/${lang}${pathSegment}`;
    const absoluteUrl = `${defaultMeta.siteUrl}${canonical}`;

    // Merge page metadata with defaults
    const title = pageMetadata?.title || defaultMeta.defaultTitle;
    const description = pageMetadata?.description || defaultMeta.description;
    const keywords = pageMetadata?.keywords || defaultMeta.keywords;

    // Build language alternates
    const languageAlternates: Record<string, string> = {};
    if (languages) {
        languages.forEach((l) => {
            languageAlternates[l.bcp47] = `${SITE_URL}/${l.code}${pathSegment}`;
        });
    }

    // Determine locale based on language
    const locale = lang === 'zh' ? 'zh_CN' : 'en_US';

    return {
        title: pageMetadata?.title
            ? defaultMeta.titleTemplate.replace('%s', pageMetadata.title)
            : defaultMeta.defaultTitle,
        description,
        keywords,
        metadataBase: new URL(defaultMeta.siteUrl),
        alternates: {
            canonical,
            ...(languages && { languages: languageAlternates }),
        },
        openGraph: {
            title: pageMetadata?.openGraph?.title || title,
            description: pageMetadata?.openGraph?.description || description,
            url: absoluteUrl,
            siteName: defaultMeta.openGraph.siteName,
            type: defaultMeta.openGraph.type as any,
            locale,
            ...(pageMetadata?.openGraph?.image && {
                images: [
                    {
                        url: pageMetadata.openGraph.image,
                        alt: pageMetadata?.openGraph?.title || title,
                    },
                ],
            }),
        },
        ...(defaultMeta.twitter && {
            twitter: {
                card: defaultMeta.twitter.card as any,
                site: defaultMeta.twitter.site,
                title: pageMetadata?.openGraph?.title || title,
                description: pageMetadata?.openGraph?.description || description,
                ...(pageMetadata?.openGraph?.image && {
                    images: [pageMetadata.openGraph.image],
                }),
            },
        }),
    };
}
