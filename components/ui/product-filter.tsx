'use client';

import React, { useState } from 'react';

export type FilterOption = {
    value: string;
    label: string;
};

type Props = {
    filters: FilterOption[];
    filterChangeAction: (filter: string) => void;
    searchChangeAction: (search: string) => void;
};

export default function ProductFilter({ filters, filterChangeAction, searchChangeAction }: Props) {
    const [activeFilter, setActiveFilter] = useState('*');
    const [searchTerm, setSearchTerm] = useState('');

    const handleFilterClick = (value: string) => {
        setActiveFilter(value);
        filterChangeAction(value);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        searchChangeAction(value);
    };

    return (
        <div className='product-filter-controls'>
            <ul className='filters category-filters isotope-filters'>
                {filters.map((filter) => (
                    <li
                        key={filter.value}
                        data-filter={filter.value}
                        className={activeFilter === filter.value ? 'filter-active' : ''}
                        onClick={() => handleFilterClick(filter.value)}
                    >
                        {filter.label}
                    </li>
                ))}
            </ul>
            <div className='search-box'>
                <input
                    type='text'
                    className='form-control'
                    placeholder='Search products...'
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
        </div>
    );
}
