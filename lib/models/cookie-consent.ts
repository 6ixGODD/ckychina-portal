import { z } from 'zod';

/**
 * Schema for cookie consent configuration
 */
export const CookieConsentJsonSchema = z.object({
    title: z.string(),
    description: z.string(),
    purposes: z
        .array(
            z.object({
                title: z.string(),
                description: z.string(),
            }),
        )
        .optional(),
    buttons: z.object({
        accept: z.string(),
        decline: z.string(),
    }),
    links: z
        .object({
            privacy: z
                .object({
                    text: z.string(),
                    href: z.string(),
                })
                .optional(),
            terms: z
                .object({
                    text: z.string(),
                    href: z.string(),
                })
                .optional(),
        })
        .optional(),
});

export type CookieConsentJsonData = z.infer<typeof CookieConsentJsonSchema>;

/**
 * Load and validate cookie consent JSON data
 */
export async function loadCookieConsentJson(lang: string): Promise<CookieConsentJsonData> {
    const mod = await import(`@/data/${lang}/cookie-consent.json`);
    return CookieConsentJsonSchema.parse(mod.default);
}
