'use client';

import Link from 'next/link';

export type ProductNavigationData = {
    labels: {
        prev: string;
        all: string;
        next: string;
    };
    prev: {
        name: string;
        category: string;
        id: string;
    } | null;
    next: {
        name: string;
        category: string;
        id: string;
    } | null;
    allHref: string;
    lang: string;
};

type Props = {
    data: ProductNavigationData;
};

export default function ProductNavigation({ data }: Props) {
    const { labels, prev, next, allHref, lang } = data;

    return (
        <div className='project-navigation' data-aos='fade-up' data-aos-delay='200'>
            <div className='nav-container'>
                {prev ? (
                    <Link href={`/${lang}/products/${prev.category}/${prev.id}`} className='nav-item prev'>
                        <span className='nav-label'>{labels.prev}</span>
                        <span className='nav-title'>{prev.name}</span>
                    </Link>
                ) : (
                    <div className='nav-item prev disabled'>
                        <span className='nav-label'>{labels.prev}</span>
                        <span className='nav-title'>-</span>
                    </div>
                )}

                <Link href={allHref} className='nav-item center'>
                    <i className='bi bi-grid'></i>
                    <span>{labels.all}</span>
                </Link>

                {next ? (
                    <Link href={`/${lang}/products/${next.category}/${next.id}`} className='nav-item next'>
                        <span className='nav-label'>{labels.next}</span>
                        <span className='nav-title'>{next.name}</span>
                    </Link>
                ) : (
                    <div className='nav-item next disabled'>
                        <span className='nav-label'>{labels.next}</span>
                        <span className='nav-title'>-</span>
                    </div>
                )}
            </div>
        </div>
    );
}
