import { z } from 'zod';

/**
 * Schema for the logo configuration defined in `data/${lang}/logo.json`.
 *
 * This schema describes the raw logo data stored in the JSON layer.
 * It represents a language-specific logo configuration and is typically used
 * as part of higher-level model composition (e.g., building HeaderData or FooterData).
 *
 * Important distinctions:
 *
 * - This is **JSON-layer data**, not the final shape used by UI components
 * - Additional fields (such as `href`) may be injected later during model assembly
 * - Default values (e.g., fallback width/height) are handled at the component layer
 *
 * Example JSON:
 *
 * ```json
 * {
 *   "src": "/assets/logo.svg",
 *   "alt": "CKY Logo",
 *   "width": 120,
 *   "height": 40
 * }
 * ```
 */
export const LogoJsonSchema = z.object({
    /**
     * Path or URL to the logo image.
     *
     * This field specifies where the logo asset is located. It can be:
     *
     * - a relative path within the project (e.g., `/assets/logo.svg`)
     * - a public URL served by a CDN or external service
     *
     * This value is passed directly to the rendering layer (e.g., `<img>` or `<Image />`).
     */
    src: z.string(),

    /**
     * Alternative text for the logo image.
     *
     * This text is used for accessibility (screen readers) and SEO purposes.
     * It should be concise and describe the meaning of the logo rather than its appearance.
     *
     * Examples:
     * - "CKY Logo"
     * - "CKY - Next-generation Audio Brand"
     */
    alt: z.string(),

    /**
     * Width of the logo image in pixels.
     *
     * This is an optional field. If provided, it will be used by the rendering layer
     * to explicitly control the layout size of the image.
     *
     * If omitted:
     * - a default width will be applied in the component layer
     * - layout behavior may be controlled via CSS instead
     *
     * This value should be a positive integer.
     */
    width: z.number().optional(),

    /**
     * Height of the logo image in pixels.
     *
     * This is an optional field. Similar to `width`, it is used to control
     * the rendered dimensions of the logo.
     *
     * If omitted:
     * - a default height will be applied in the component layer
     *
     * This value should be a positive integer.
     */
    height: z.number().optional(),
});

/**
 * Type representing validated logo data from the JSON layer.
 *
 * This type is inferred directly from `LogoJsonSchema`, ensuring that
 * runtime validation and TypeScript types remain consistent.
 */
export type LogoJsonData = z.infer<typeof LogoJsonSchema>;

/**
 * Load and validate the logo configuration for a given language.
 *
 * This function:
 * - dynamically imports the corresponding `logo.json` file
 * - validates the structure using `LogoJsonSchema`
 * - returns a strongly typed, validated result
 *
 * This function is intended to be used in the model layer during build time.
 *
 * It does **not**:
 * - inject routing-related fields (e.g., `href`)
 * - apply default values for missing fields
 * - transform the data into component-specific props
 *
 * Those responsibilities belong to the model composition layer
 * (e.g., `buildHeaderData`, `buildFooterData`).
 *
 * @param lang Language code used to resolve the JSON file path (e.g., 'en', 'zh')
 * @returns A validated logo configuration object
 * @throws If the JSON file does not conform to `LogoJsonSchema`
 */
export async function loadLogoJson(lang: string): Promise<LogoJsonData> {
    const mod = await import(`@/data/${lang}/logo.json`);
    return LogoJsonSchema.parse(mod.default);
}
