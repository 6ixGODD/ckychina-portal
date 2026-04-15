import { z } from 'zod';

import type { HeaderData } from '@/components/layout/header';
import { loadLanguagesJson } from '@/lib/models/languages';
import { loadLogoJson } from '@/lib/models/logo';

export const HeaderJsonSchema = z.object({
    nav: z.array(
        z.object({
            name: z.string(),
            href: z.string(),
        }),
    ),
});

export type HeaderJsonData = z.infer<typeof HeaderJsonSchema>;

export async function loadHeaderJson(currLang: string): Promise<HeaderJsonData> {
    const mod = await import(`@/data/${currLang}/header.json`);
    return HeaderJsonSchema.parse(mod.default);
}

export async function buildHeaderData(currLang: string): Promise<HeaderData> {
    const headerJson = await loadHeaderJson(currLang);
    const logoJson = await loadLogoJson(currLang);
    const languagesJson = await loadLanguagesJson();

    return {
        logo: {
            src: logoJson.src,
            alt: logoJson.alt,
            width: logoJson.width,
            height: logoJson.height,
        },
        nav: {
            elements: headerJson.nav.map((element) => ({
                name: element.name,
                href: element.href,
            })),
            languages: languagesJson.map((lang) => ({
                code: lang.code,
                name: lang.name,
                nativeName: lang.nativeName,
                bcp47: lang.bcp47,
            })),
        },
    };
}
