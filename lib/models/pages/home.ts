import { z } from 'zod';

import type { AboutData } from '@/components/sections/homepage/about';
import type { ContactData } from '@/components/sections/homepage/contact';
import type { HeroData } from '@/components/sections/homepage/hero';
import type { PortfolioData } from '@/components/sections/homepage/portfolio';
import type { ServicesData } from '@/components/sections/homepage/services';
import type { WhyUsData } from '@/components/sections/homepage/why-us';
import { PageMetadataJsonSchema } from '@/lib/models/metadata';

/**
 * Schema for Section Title (reusable)
 */
export const SectionTitleJsonSchema = z.object({
    subtitle: z.string(),
    title: z.string(),
    description: z.string(),
});

/**
 * Schema for Hero section
 */
export const HeroJsonSchema = z.object({
    title: z.string(),
    content: z.string(),
    cta: z.string(),
    statistics: z.array(
        z.object({
            number: z.string(),
            label: z.string(),
        }),
    ),
    image: z.object({
        src: z.string(),
        alt: z.string(),
    }),
});

/**
 * Schema for About section
 */
export const AboutJsonSchema = z.object({
    sectionTitle: SectionTitleJsonSchema,
    logo: z.object({
        src: z.string(),
        alt: z.string(),
    }),
    mainContent: z.object({
        title: z.string(),
        lead: z.string(),
        paragraphs: z.array(z.string()),
        stats: z.array(
            z.object({
                number: z.string(),
                label: z.string(),
            }),
        ),
    }),
    image: z.object({
        src: z.string(),
        alt: z.string(),
    }),
    additionalContent: z.object({
        title: z.string(),
        paragraphs: z.array(z.string()),
    }),
});

/**
 * Schema for Services section
 */
export const ServicesJsonSchema = z.object({
    sectionTitle: SectionTitleJsonSchema,
    items: z.array(
        z.object({
            icon: z.string(),
            title: z.string(),
            description: z.string(),
            link: z.object({
                text: z.string(),
                href: z.string(),
                filter: z.string().optional(),
            }),
        }),
    ),
});

/**
 * Schema for Why Us section
 */
export const WhyUsJsonSchema = z.object({
    sectionTitle: SectionTitleJsonSchema,
    mainContent: z.object({
        title: z.string(),
        paragraphs: z.array(z.string()),
    }),
    image: z.object({
        src: z.string(),
        alt: z.string(),
    }),
    features: z.array(
        z.object({
            icon: z.string(),
            title: z.string(),
            description: z.string(),
        }),
    ),
});

/**
 * Schema for Portfolio section
 */
export const PortfolioJsonSchema = z.object({
    sectionTitle: SectionTitleJsonSchema,
    filters: z.array(
        z.object({
            label: z.string(),
            value: z.string(),
        }),
    ),
    items: z.array(
        z.object({
            filterClass: z.string(),
            category: z.string(),
            year: z.string(),
            title: z.string(),
            description: z.string(),
            image: z.object({
                src: z.string(),
                alt: z.string(),
            }),
            link: z.string(),
            tags: z.array(z.string()),
            imageOrder: z.enum(['left', 'right']),
        }),
    ),
    conclusion: z.object({
        title: z.string(),
        description: z.string(),
        primaryAction: z.object({
            text: z.string(),
            href: z.string(),
        }),
        secondaryAction: z.object({
            text: z.string(),
            href: z.string(),
        }),
    }),
});

/**
 * Schema for Contact section
 */
export const ContactJsonSchema = z.object({
    sectionTitle: SectionTitleJsonSchema,
    intro: z.object({
        icon: z.string(),
        title: z.string(),
        description: z.string(),
    }),
    details: z.array(
        z.object({
            icon: z.string(),
            label: z.string(),
            value: z.string(),
        }),
    ),
    cta: z.object({
        title: z.string(),
        description: z.string(),
        button: z.object({
            text: z.string(),
            email: z.string(),
        }),
    }),
});

/**
 * Complete Home page schema
 */
export const HomePageJsonSchema = z.object({
    metadata: PageMetadataJsonSchema,
    hero: HeroJsonSchema,
    about: AboutJsonSchema,
    services: ServicesJsonSchema,
    whyUs: WhyUsJsonSchema,
    portfolio: PortfolioJsonSchema,
    contact: ContactJsonSchema,
});

export type HomePageJsonData = z.infer<typeof HomePageJsonSchema>;

/**
 * Load and validate home page JSON data
 */
export async function loadHomePageJson(lang: string): Promise<HomePageJsonData> {
    const mod = await import(`@/data/${lang}/pages/home.json`);
    return HomePageJsonSchema.parse(mod.default);
}

/**
 * Build typed data for all homepage sections
 */
export async function buildHomePageData(lang: string) {
    const json = await loadHomePageJson(lang);

    const heroData: HeroData = {
        title: json.hero.title,
        content: json.hero.content,
        cta: json.hero.cta,
        statistics: json.hero.statistics.map((stat) => ({
            number: stat.number,
            label: stat.label,
        })),
        img: {
            src: json.hero.image.src,
            alt: json.hero.image.alt,
        },
    };

    const aboutData: AboutData = {
        sectionTitle: {
            subtitle: json.about.sectionTitle.subtitle,
            title: json.about.sectionTitle.title,
            description: json.about.sectionTitle.description,
        },
        logo: {
            src: json.about.logo.src,
            alt: json.about.logo.alt,
        },
        mainContent: {
            title: json.about.mainContent.title,
            lead: json.about.mainContent.lead,
            paragraphs: json.about.mainContent.paragraphs,
            stats: json.about.mainContent.stats.map((stat) => ({
                number: stat.number,
                label: stat.label,
            })),
        },
        image: {
            src: json.about.image.src,
            alt: json.about.image.alt,
        },
        additionalContent: {
            title: json.about.additionalContent.title,
            paragraphs: json.about.additionalContent.paragraphs,
        },
    };

    const servicesData: ServicesData = {
        sectionTitle: {
            subtitle: json.services.sectionTitle.subtitle,
            title: json.services.sectionTitle.title,
            description: json.services.sectionTitle.description,
        },
        services: json.services.items.map((item) => ({
            icon: item.icon,
            title: item.title,
            description: item.description,
            link: {
                text: item.link.text,
                href: item.link.href,
                filter: item.link.filter,
            },
        })),
    };

    const whyUsData: WhyUsData = {
        sectionTitle: {
            subtitle: json.whyUs.sectionTitle.subtitle,
            title: json.whyUs.sectionTitle.title,
            description: json.whyUs.sectionTitle.description,
        },
        mainContent: {
            title: json.whyUs.mainContent.title,
            paragraphs: json.whyUs.mainContent.paragraphs,
        },
        image: {
            src: json.whyUs.image.src,
            alt: json.whyUs.image.alt,
        },
        features: json.whyUs.features.map((feature) => ({
            icon: feature.icon,
            title: feature.title,
            description: feature.description,
        })),
    };

    const portfolioData: PortfolioData = {
        sectionTitle: {
            subtitle: json.portfolio.sectionTitle.subtitle,
            title: json.portfolio.sectionTitle.title,
            description: json.portfolio.sectionTitle.description,
        },
        filters: json.portfolio.filters.map((filter) => ({
            label: filter.label,
            value: filter.value,
        })),
        items: json.portfolio.items.map((item) => ({
            category: item.category,
            year: item.year,
            title: item.title,
            description: item.description,
            image: {
                src: item.image.src,
                alt: item.image.alt,
            },
            link: item.link,
            tags: item.tags,
            imageOrder: item.imageOrder,
            filterClass: item.filterClass,
        })),
        conclusion: {
            title: json.portfolio.conclusion.title,
            description: json.portfolio.conclusion.description,
            primaryAction: {
                text: json.portfolio.conclusion.primaryAction.text,
                href: json.portfolio.conclusion.primaryAction.href,
            },
            secondaryAction: {
                text: json.portfolio.conclusion.secondaryAction.text,
                href: json.portfolio.conclusion.secondaryAction.href,
            },
        },
    };

    const contactData: ContactData = {
        sectionTitle: {
            subtitle: json.contact.sectionTitle.subtitle,
            title: json.contact.sectionTitle.title,
            description: json.contact.sectionTitle.description,
        },
        intro: {
            icon: json.contact.intro.icon,
            title: json.contact.intro.title,
            description: json.contact.intro.description,
        },
        details: json.contact.details.map((detail) => ({
            icon: detail.icon,
            label: detail.label,
            value: detail.value,
        })),
        cta: {
            title: json.contact.cta.title,
            description: json.contact.cta.description,
            button: {
                text: json.contact.cta.button.text,
                email: json.contact.cta.button.email,
            },
        },
    };

    return {
        metadata: json.metadata,
        hero: heroData,
        about: aboutData,
        services: servicesData,
        whyUs: whyUsData,
        portfolio: portfolioData,
        contact: contactData,
    };
}
