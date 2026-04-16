import { z } from 'zod';

/**
 * Schema for a single language entry representation.
 *
 * This schema describes the raw data shape stored in the JSON file.
 * Each entry represents one supported language in the site configuration layer.
 *
 * It is important to note that this is **JSON-layer data**, not necessarily the
 * final object shape consumed by UI components. In other words:
 *
 * - `LanguageJsonData` describes how language information is stored on disk/db
 * - a separate model/conversion step may transform it into a simpler `Language`
 *   object for component props
 *
 * Example JSON entry:
 *
 * ```json
 * {
 *   "code": "en",
 *   "name": "English",
 *   "nativeName": "English",
 *   "bcp47": "en-US"
 * }
 * ```
 */
export const LanguageJsonSchema = z.object({
    /**
     * Language code.
     *
     * This field should remain short, stable, and filesystem-friendly.
     */
    code: z.string(),

    /**
     * English display name of the language.
     */
    name: z.string(),

    /**
     * Native display name of the language.
     */
    nativeName: z.string(),

    /**
     * BCP 47 language tag.
     *
     * While `code` is usually enough for internal routing, `bcp47` is the more
     * semantically correct value for standards-based metadata and browser-facing
     * language declarations.
     */
    bcp47: z.string(),
});

/**
 * Schema for the language entries representation.
 *
 * The JSON object is expected to contain an array of language entries, where each
 * entry conforms to `LanguageJsonSchema`.
 *
 * Example:
 *
 * ```json
 * [
 *   {
 *     "code": "en",
 *     "name": "English",
 *     "nativeName": "English",
 *     "bcp47": "en-US"
 *   },
 *   {
 *     "code": "zh",
 *     "name": "Chinese",
 *     "nativeName": "中文",
 *     "bcp47": "zh-CN"
 *   }
 * ]
 * ```
 */
export const LanguagesJsonSchema = z.array(LanguageJsonSchema);

/**
 * Type representing the full validated contents of `languages.json`.
 *
 * In practice, this is an array of `LanguageJsonData`.
 */
export type LanguagesJsonData = z.infer<typeof LanguagesJsonSchema>;

/**
 * Load and validate `data/languages.json`.
 *
 * This function is intended for use in the model/data-loading layer during the
 * build process. Since this project is a static portal, the JSON file is read
 * and validated at build time rather than at client runtime.
 *
 * Responsibilities:
 * - import the raw JSON module
 * - validate its structure against `LanguagesJsonSchema`
 * - return a strongly typed, validated result
 *
 * This function does **not** transform the JSON into a UI-facing `Language`
 * object. That conversion should be handled separately by a model-layer
 * transformation function if the component layer requires a reduced shape.
 *
 * @returns The validated array of language entries from `languages.json`.
 * @throws If the imported JSON does not conform to `LanguagesJsonSchema`.
 */
export async function loadLanguagesJson(): Promise<LanguagesJsonData> {
    const mod = await import('@/data/languages.json');
    return LanguagesJsonSchema.parse(mod.default);
}

/**
 * Resolve BCP 47 tag from language code.
 *
 * This function looks up the corresponding `bcp47` value
 * from the loaded language configuration.
 *
 * It should be used when:
 * - setting `<html lang="...">`
 * - generating `hreflang`
 * - producing SEO metadata
 *
 * @param languages Loaded language list
 * @param code Language code (e.g., 'en', 'zh')
 * @returns Corresponding BCP 47 tag (e.g., 'en-US', 'zh-CN')
 */
export function getBCP47ByCode(languages: LanguagesJsonData, code: string): string {
    const lang = languages.find((l) => l.code === code);
    return lang?.bcp47 || code;
}
