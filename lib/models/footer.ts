import { z } from 'zod';

import { FooterData } from '@/components/layout/footer';
import { loadLogoJson } from '@/lib/models/logo';

export const FooterJsonSchema = z.object({
    about: z.string(),
    copyright: z.object({
        year: z.number(),
        holder: z.string(),
        text: z.string(),
    }),
    linksGroups: z.array(
        z.object({
            title: z.string(),
            links: z.array(
                z.object({
                    name: z.string(),
                    href: z.string(),
                }),
            ),
        }),
    ),
});

export type FooterJsonData = z.infer<typeof FooterJsonSchema>;

export async function loadFooterJson(currLang: string): Promise<FooterJsonData> {
    const mod = await import(`@/data/${currLang}/footer.json`);
    return FooterJsonSchema.parse(mod.default);
}

export async function buildFooterData(currLang: string): Promise<FooterData> {
    const footerJson = await loadFooterJson(currLang);
    const logoJson = await loadLogoJson(currLang);

    return {
        about: {
            logo: {
                src: logoJson.src,
                alt: logoJson.alt,
                width: logoJson.width,
                height: logoJson.height,
            },
            content: footerJson.about,
        },
        copyright: {
            year: footerJson.copyright.year,
            holder: footerJson.copyright.holder,
            text: footerJson.copyright.text,
        },
        linksGroups: footerJson.linksGroups.map((group) => ({
            title: group.title,
            items: group.links.map((link) => ({
                name: link.name,
                href: link.href,
            })),
        })),
    };
}
