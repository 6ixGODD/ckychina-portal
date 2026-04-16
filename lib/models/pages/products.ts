import { z } from 'zod';

import { PageMetadataJsonSchema } from '@/lib/models/metadata';

/**
 * Schema for product gallery image
 */
export const ProductGalleryImageSchema = z.object({
    src: z.string(),
    alt: z.string(),
    featured: z.boolean().optional(),
});

/**
 * Schema for product specification
 */
export const ProductSpecificationSchema = z.object({
    label: z.string(),
    value: z.string(),
});

/**
 * Schema for product core advantage
 */
export const ProductCoreAdvantageSchema = z.object({
    number: z.string(),
    title: z.string(),
    description: z.string(),
});

/**
 * Schema for product technical spec group
 */
export const ProductTechnicalSpecGroupSchema = z.object({
    title: z.string(),
    tags: z.array(z.string()),
});

/**
 * Schema for product highlight
 */
export const ProductHighlightSchema = z.object({
    stat: z.string(),
    label: z.string(),
});

/**
 * Schema for individual product (JSON layer)
 */
export const ProductJsonSchema = z.object({
    id: z.string(),
    name: z.string(),
    category: z.string(),
    categoryName: z.string(),
    year: z.string(),

    // List page data
    description: z.string(),
    features: z.array(z.string()),
    mainImage: z.string(),
    imagePosition: z.enum(['left', 'right']),
    featured: z.boolean(),

    // Detail page data
    metadata: PageMetadataJsonSchema,

    projectMeta: z.object({
        type: z.string(),
        year: z.string(),
    }),

    detailDescription: z.string(),
    showcaseImages: z.array(z.string()),

    introduction: z.object({
        title: z.string(),
        paragraphs: z.array(z.string()),
    }),

    specifications: z.array(ProductSpecificationSchema),

    coreAdvantages: z.object({
        title: z.string(),
        description: z.string(),
        items: z.array(ProductCoreAdvantageSchema),
    }),

    gallery: z.array(ProductGalleryImageSchema).optional(),

    technicalSpecs: z.object({
        title: z.string(),
        description: z.string(),
        groups: z.array(ProductTechnicalSpecGroupSchema),
    }),

    highlights: z.object({
        title: z.string(),
        items: z.array(ProductHighlightSchema),
    }),
});

export type ProductJsonData = z.infer<typeof ProductJsonSchema>;

/**
 * Schema for the product category entries representation.
 *
 * The JSON object is expected to contain an array of product entries, where each
 * entry conforms to `ProductJsonSchema`.
 */
export const ProductCategoriesJsonSchema = z.array(
    z.object({
        value: z.string(),
        label: z.string(),
    }),
);

export const BreadcrumbSchema = z.object({
    label: z.string(),
    href: z.string().optional(),
});

export const PageTitleSchema = z.object({
    breadcrumbs: z.array(BreadcrumbSchema),
    title: z.string(),
    details: z.object({
        breadcrumbs: z.array(BreadcrumbSchema),
        title: z.string(),
    }),
    description: z.string(),
});

/**
 * Schema for products collection
 */
export const ProductsJsonSchema = z.object({
    metadata: PageMetadataJsonSchema,
    pageTitle: PageTitleSchema,
    products: z.array(ProductJsonSchema),
    categories: ProductCategoriesJsonSchema,
});

export type ProductsJsonData = z.infer<typeof ProductsJsonSchema>;

/**
 * Load and validate products JSON data for a given language
 */
export async function loadProductsJson(lang: string): Promise<ProductsJsonData> {
    const mod = await import(`@/data/${lang}/pages/products.json`);
    return ProductsJsonSchema.parse(mod.default);
}

/**
 * Get all products
 */
export async function getAllProducts(lang: string): Promise<ProductJsonData[]> {
    const data = await loadProductsJson(lang);
    return data.products;
}

/**
 * Get featured products for homepage
 */
export async function getFeaturedProducts(lang: string): Promise<ProductJsonData[]> {
    const products = await getAllProducts(lang);
    return products.filter((p) => p.featured);
}

/**
 * Get product by category and id
 */
export async function getProductById(lang: string, category: string, id: string): Promise<ProductJsonData | null> {
    const products = await getAllProducts(lang);
    return products.find((p) => p.category === category && p.id === id) || null;
}
