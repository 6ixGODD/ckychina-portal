import { z } from 'zod';

/**
 * Schema for cookie consent text configuration
 */
export const CookieConsentJsonSchema = z.object({
    title: z.string(),
    description: z.string(),
    accept: z.string(),
    decline: z.string(),
});

export type CookieConsentJsonData = z.infer<typeof CookieConsentJsonSchema>;

/**
 * Load and validate cookie consent text for a given language
 *
 * @param lang Language code (e.g., 'en', 'zh', 'fr')
 * @returns Validated cookie consent text
 * @throws If the JSON file does not conform to CookieConsentJsonSchema
 */
export async function loadCookieConsentJson(lang: string): Promise<CookieConsentJsonData> {
    const mod = await import(`@/data/${lang}/cookie-consent.json`);
    return CookieConsentJsonSchema.parse(mod.default);
}
