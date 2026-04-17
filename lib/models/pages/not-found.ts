import { z } from 'zod';

import { PageMetadataJsonSchema } from '@/lib/models/metadata';

/**
 * Schema for helpful link item
 */
export const HelpfulLinkItemSchema = z.object({
    icon: z.string(),
    title: z.string(),
    description: z.string(),
    linkText: z.string(),
    linkHref: z.string(),
});

/**
 * Schema for 404 Not Found page
 */
export const NotFoundPageJsonSchema = z.object({
    metadata: PageMetadataJsonSchema,
    errorNumber: z.string(),
    errorTitle: z.string(),
    errorDescription: z.string(),
    helpfulLinksTitle: z.string(),
    helpfulLinks: z.array(HelpfulLinkItemSchema),
});

export type NotFoundPageJsonData = z.infer<typeof NotFoundPageJsonSchema>;

/**
 * Load and validate 404 page JSON data
 */
export async function loadNotFoundPageJson(lang: string): Promise<NotFoundPageJsonData> {
    const mod = await import(`@/data/${lang}/pages/not-found.json`);
    return NotFoundPageJsonSchema.parse(mod.default);
}
