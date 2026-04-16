import { z } from 'zod';

import type { AboutData } from '@/components/sections/homepage/about';
import type { ContactData } from '@/components/sections/homepage/contact-us';
import type { HeroData } from '@/components/sections/homepage/hero';
import type { PortfolioData } from '@/components/sections/homepage/portfolio';
import type { ServicesData } from '@/components/sections/homepage/services';
import type { WhyUsData } from '@/components/sections/homepage/why-us';
import { PageMetadataJsonSchema } from '@/lib/models/metadata';
import { getFeaturedProducts } from '@/lib/models/pages/products';

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
    const homePageJsonData = await loadHomePageJson(lang);
    const featuredProducts = await getFeaturedProducts(lang);
    const heroData: HeroData = {
        title: homePageJsonData.hero.title,
        content: homePageJsonData.hero.content,
        cta: homePageJsonData.hero.cta,
        statistics: homePageJsonData.hero.statistics.map((stat) => ({
            number: stat.number,
            label: stat.label,
        })),
        img: {
            src: homePageJsonData.hero.image.src,
            alt: homePageJsonData.hero.image.alt,
        },
    };

    const aboutData: AboutData = {
        sectionTitle: {
            subtitle: homePageJsonData.about.sectionTitle.subtitle,
            title: homePageJsonData.about.sectionTitle.title,
            description: homePageJsonData.about.sectionTitle.description,
        },
        logo: {
            src: homePageJsonData.about.logo.src,
            alt: homePageJsonData.about.logo.alt,
        },
        mainContent: {
            title: homePageJsonData.about.mainContent.title,
            lead: homePageJsonData.about.mainContent.lead,
            paragraphs: homePageJsonData.about.mainContent.paragraphs,
            stats: homePageJsonData.about.mainContent.stats.map((stat) => ({
                number: stat.number,
                label: stat.label,
            })),
        },
        image: {
            src: homePageJsonData.about.image.src,
            alt: homePageJsonData.about.image.alt,
        },
        additionalContent: {
            title: homePageJsonData.about.additionalContent.title,
            paragraphs: homePageJsonData.about.additionalContent.paragraphs,
        },
    };

    const servicesData: ServicesData = {
        sectionTitle: {
            subtitle: homePageJsonData.services.sectionTitle.subtitle,
            title: homePageJsonData.services.sectionTitle.title,
            description: homePageJsonData.services.sectionTitle.description,
        },
        services: homePageJsonData.services.items.map((item) => ({
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
            subtitle: homePageJsonData.whyUs.sectionTitle.subtitle,
            title: homePageJsonData.whyUs.sectionTitle.title,
            description: homePageJsonData.whyUs.sectionTitle.description,
        },
        mainContent: {
            title: homePageJsonData.whyUs.mainContent.title,
            paragraphs: homePageJsonData.whyUs.mainContent.paragraphs,
        },
        image: {
            src: homePageJsonData.whyUs.image.src,
            alt: homePageJsonData.whyUs.image.alt,
        },
        features: homePageJsonData.whyUs.features.map((feature) => ({
            icon: feature.icon,
            title: feature.title,
            description: feature.description,
        })),
    };

    const portfolioData: PortfolioData = {
        sectionTitle: {
            subtitle: homePageJsonData.portfolio.sectionTitle.subtitle,
            title: homePageJsonData.portfolio.sectionTitle.title,
            description: homePageJsonData.portfolio.sectionTitle.description,
        },
        filters: homePageJsonData.portfolio.filters.map((filter) => ({
            label: filter.label,
            value: filter.value === '*' ? '*' : `.filter-${filter.value}`,
        })),
        items: featuredProducts.map((product) => ({
            category: product.categoryName,
            year: product.year,
            title: product.name,
            description: product.description,
            image: {
                src: product.mainImage,
                alt: product.name,
            },
            link: `/${lang}/products/${product.category}/${product.id}`,
            tags: product.features,
            imageOrder: product.imagePosition,
            filterClass: `filter-${product.category}`,
        })),
        conclusion: {
            title: homePageJsonData.portfolio.conclusion.title,
            description: homePageJsonData.portfolio.conclusion.description,
            primaryAction: {
                text: homePageJsonData.portfolio.conclusion.primaryAction.text,
                href: homePageJsonData.portfolio.conclusion.primaryAction.href,
            },
            secondaryAction: {
                text: homePageJsonData.portfolio.conclusion.secondaryAction.text,
                href: homePageJsonData.portfolio.conclusion.secondaryAction.href,
            },
        },
    };

    const contactData: ContactData = {
        sectionTitle: {
            subtitle: homePageJsonData.contact.sectionTitle.subtitle,
            title: homePageJsonData.contact.sectionTitle.title,
            description: homePageJsonData.contact.sectionTitle.description,
        },
        intro: {
            icon: homePageJsonData.contact.intro.icon,
            title: homePageJsonData.contact.intro.title,
            description: homePageJsonData.contact.intro.description,
        },
        details: homePageJsonData.contact.details.map((detail) => ({
            icon: detail.icon,
            label: detail.label,
            value: detail.value,
        })),
        cta: {
            title: homePageJsonData.contact.cta.title,
            description: homePageJsonData.contact.cta.description,
            button: {
                text: homePageJsonData.contact.cta.button.text,
                email: homePageJsonData.contact.cta.button.email,
            },
        },
    };

    return {
        metadata: homePageJsonData.metadata,
        hero: heroData,
        about: aboutData,
        services: servicesData,
        whyUs: whyUsData,
        portfolio: portfolioData,
        contact: contactData,
    };
}
