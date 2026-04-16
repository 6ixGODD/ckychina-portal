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

export type ProductGalleryImage = z.infer<typeof ProductGalleryImageSchema>;

/**
 * Schema for product specification
 */
export const ProductSpecificationSchema = z.object({
    label: z.string(),
    value: z.string(),
});

export type ProductSpecification = z.infer<typeof ProductSpecificationSchema>;

/**
 * Schema for product core advantage
 */
export const ProductCoreAdvantageSchema = z.object({
    number: z.string(),
    title: z.string(),
    description: z.string(),
});

export type ProductCoreAdvantage = z.infer<typeof ProductCoreAdvantageSchema>;

/**
 * Schema for product technical spec group
 */
export const ProductTechnicalSpecGroupSchema = z.object({
    title: z.string(),
    tags: z.array(z.string()),
});

export type ProductTechnicalSpecGroup = z.infer<typeof ProductTechnicalSpecGroupSchema>;

/**
 * Schema for product highlight
 */
export const ProductHighlightSchema = z.object({
    stat: z.string(),
    label: z.string(),
});

export type ProductHighlight = z.infer<typeof ProductHighlightSchema>;

/**
 * Schema for individual product (JSON layer)
 */
export const ProductJsonSchema = z.object({
    id: z.string(),
    name: z.string(),
    category: z.enum(['soundbar', 'portable', 'turntable']),
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
 * Schema for products collection
 */
export const ProductsJsonSchema = z.object({
    products: z.array(ProductJsonSchema),
});

export type ProductsJsonData = z.infer<typeof ProductsJsonSchema>;

/**
 * Load and validate products JSON data for a given language
 */
export async function loadProductsJson(lang: string): Promise<ProductsJsonData> {
    const mod = await import(`@/data/${lang}/products.json`);
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

/**
 * Get products by category
 */
export async function getProductsByCategory(lang: string, category: string): Promise<ProductJsonData[]> {
    const products = await getAllProducts(lang);
    return products.filter((p) => p.category === category);
}

/**
 * Get all product categories
 */
export function getProductCategories(): Array<{ value: string; label: string }> {
    return [
        { value: '*', label: 'All Products' },
        { value: 'soundbar', label: 'SOUNDBAR' },
        { value: 'portable', label: 'PORTABLE' },
        { value: 'turntable', label: 'TURNTABLE' },
    ];
}
