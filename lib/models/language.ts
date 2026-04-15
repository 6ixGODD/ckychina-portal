import { z } from 'zod';

/**
 * Schema for a single language entry defined in `data/languages.json`.
 *
 * This schema describes the raw data shape stored in the JSON file.
 * Each entry represents one supported language in the site configuration layer.
 *
 * It is important to note that this is **JSON-layer data**, not necessarily the
 * final object shape consumed by UI components. In other words:
 *
 * - `LanguageJsonData` describes how language information is stored on disk
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
     * ISO 639-1 language code.
     *
     * This is the short language identifier used internally by the project as the
     * primary language key. In this codebase, it is typically used in places such as:
     *
     * - URL path segments, for example `/en/...` or `/zh/...`
     * - language-specific file lookup, for example `data/${lang}/...`
     * - route params and internal model-building logic
     *
     * Examples:
     * - `en` for English
     * - `zh` for Chinese
     * - `fr` for French
     *
     * This field should remain short, stable, and filesystem-friendly.
     */
    code: z.string(),

    /**
     * English display name of the language.
     *
     * This value is intended for contexts where the language list is shown in English
     * or in an internationalized administrative/configuration context.
     *
     * Typical examples:
     * - `English`
     * - `Chinese`
     * - `French`
     *
     * This field is mainly a human-readable label and is useful when:
     * - rendering language selectors in English-oriented contexts
     * - debugging or inspecting configuration data
     * - generating documentation or metadata
     */
    name: z.string(),

    /**
     * Native display name of the language.
     *
     * This is the self-name of the language written in its own script and preferred
     * native form. It is especially useful for user-facing language switchers, because
     * native speakers can recognize their language more naturally this way.
     *
     * Typical examples:
     * - `English`
     * - `中文`
     * - `Français`
     *
     * In many UI designs, `nativeName` is preferable to `name` when rendering the
     * language switcher menu, while `name` may still be useful in English-only
     * back-office or developer-facing contexts.
     */
    nativeName: z.string(),

    /**
     * BCP 47 language tag.
     *
     * This is the standardized language tag used in web and internationalization
     * contexts. It is more precise than the simple `code` field because it can
     * include regional and script information where necessary.
     *
     * Typical usage includes:
     * - the HTML `lang` attribute
     * - `hreflang` metadata
     * - browser language matching
     * - SEO and alternate language declarations
     *
     * Examples:
     * - `en-US` for American English
     * - `en-GB` for British English
     * - `zh-CN` for Simplified Chinese (China)
     * - `zh-TW` for Traditional Chinese (Taiwan)
     *
     * While `code` is usually enough for internal routing, `bcp47` is the more
     * semantically correct value for standards-based metadata and browser-facing
     * language declarations.
     */
    bcp47: z.string(),
});

/**
 * Schema for the full `data/languages.json` file.
 *
 * The JSON file is expected to contain an array of language entries, where each
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
 *
 * This schema is used to validate the raw JSON file before it is converted into
 * any simplified or UI-facing model objects.
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
