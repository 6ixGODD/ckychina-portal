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

export const TermsPageJsonSchema = z.object({
    metadata: PageMetadataJsonSchema,
    pageTitle: PageTitleSchema,
    lastUpdated: z.string(),
    sections: z.array(SectionSchema),
});

export type TermsPageJsonData = z.infer<typeof TermsPageJsonSchema>;

export async function loadTermsPageJson(lang: string): Promise<TermsPageJsonData> {
    const mod = await import(`@/data/${lang}/pages/terms.json`);
    return TermsPageJsonSchema.parse(mod.default);
}
