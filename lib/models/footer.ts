import { z } from 'zod';

import { FooterData } from '@/components/layout/footer';

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
                    content: z.string(),
                    href: z.string().optional(),
                    icon: z.string().optional(),
                }),
            ),
        }),
    ),
    logo: z.object({
        src: z.string(),
        alt: z.string(),
        width: z.number(),
        height: z.number(),
    }),
});

export type FooterJsonData = z.infer<typeof FooterJsonSchema>;

export async function loadFooterJson(currLang: string): Promise<FooterJsonData> {
    const mod = await import(`@/data/${currLang}/footer.json`);
    return FooterJsonSchema.parse(mod.default);
}

export async function buildFooterData(currLang: string): Promise<FooterData> {
    const footerJson = await loadFooterJson(currLang);

    return {
        about: {
            logo: {
                src: footerJson.logo.src,
                alt: footerJson.logo.alt,
                width: footerJson.logo.width,
                height: footerJson.logo.height,
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
                content: link.content,
                href: link.href,
                icon: link.icon,
            })),
        })),
    };
}
