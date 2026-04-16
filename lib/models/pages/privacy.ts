import { z } from 'zod';

import { PageMetadataJsonSchema } from '@/lib/models/metadata';

const BreadcrumbSchema = z.object({
    label: z.string(),
    href: z.string().optional(),
});

const PageTitleSchema = z.object({
    breadcrumbs: z.array(BreadcrumbSchema),
    title: z.string(),
    description: z.string(),
});

const SectionSchema = z.object({
    id: z.string(),
    title: z.string(),
    content: z.string(), // HTML content
});

export const PrivacyPageJsonSchema = z.object({
    metadata: PageMetadataJsonSchema,
    pageTitle: PageTitleSchema,
    lastUpdated: z.string(),
    sections: z.array(SectionSchema),
});

export type PrivacyPageJsonData = z.infer<typeof PrivacyPageJsonSchema>;

export async function loadPrivacyPageJson(lang: string): Promise<PrivacyPageJsonData> {
    const mod = await import(`@/data/${lang}/pages/privacy.json`);
    return PrivacyPageJsonSchema.parse(mod.default);
}
