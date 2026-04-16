'use client';

import { useMemo, useState } from 'react';

import Pagination from '@/components/ui/pagination';
import ProductCard, { ProductCardData } from '@/components/ui/product-card';
import ProductFilter, { FilterOption } from '@/components/ui/product-filter';

type Props = {
    products: ProductCardData[];
    filters: FilterOption[];
    lang: string;
    itemsPerPage?: number;
};

export default function ProductList({ products, filters, lang, itemsPerPage = 5 }: Props) {
    const [currentPage, setCurrentPage] = useState(1);
    const [currentFilter, setCurrentFilter] = useState('*');
    const [searchTerm, setSearchTerm] = useState('');

    // Filter products
    const filteredProducts = useMemo(() => {
        let result = products;

        // Apply category filter
        if (currentFilter !== '*') {
            result = result.filter((p) => p.category === currentFilter);
        }

        // Apply search filter
        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            result = result.filter(
                (p) =>
                    p.name.toLowerCase().includes(searchLower) ||
                    p.description.toLowerCase().includes(searchLower) ||
                    p.features.some((f) => f.toLowerCase().includes(searchLower)),
            );
        }

        return result;
    }, [products, currentFilter, searchTerm]);

    // Calculate total pages
    const totalPages = useMemo(
        () => Math.ceil(filteredProducts.length / itemsPerPage),
        [filteredProducts.length, itemsPerPage],
    );

    // Auto-reset to page 1 if current page exceeds total pages
    const validCurrentPage = useMemo(() => {
        if (totalPages === 0) return 1;
        if (currentPage > totalPages) return 1;
        return currentPage;
    }, [currentPage, totalPages]);

    // Paginate products
    const paginatedProducts = useMemo(() => {
        const startIndex = (validCurrentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredProducts.slice(startIndex, endIndex);
    }, [filteredProducts, validCurrentPage, itemsPerPage]);

    // Scroll to top of products section when page changes
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        const portfolioSection = document.querySelector('#portfolio');
        if (portfolioSection) {
            const headerHeight = document.querySelector('#header')?.clientHeight || 0;
            const offsetTop = (portfolioSection as HTMLElement).offsetTop - headerHeight - 20;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
    };

    return (
        <>
            <ProductFilter filters={filters} filterChangeAction={setCurrentFilter} searchChangeAction={setSearchTerm} />

            <div className='row gy-5' id='productsContainer'>
                {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} data={product} lang={lang} />
                ))}
            </div>

            <Pagination currentPage={validCurrentPage} totalPages={totalPages} pageChangeAction={handlePageChange} />
        </>
    );
}
