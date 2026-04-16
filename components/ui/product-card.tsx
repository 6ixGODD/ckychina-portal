'use client';

import Image from 'next/image';
import Link from 'next/link';

export type ProductCardData = {
    id: string;
    name: string;
    category: string;
    categoryName: string;
    year: string;
    description: string;
    features: string[];
    mainImage: string;
    imagePosition: 'left' | 'right';
};

type Props = {
    data: ProductCardData;
    lang: string;
};

export default function ProductCard({ data, lang }: Props) {
    const imageOrder = data.imagePosition === 'right' ? 'order-md-2' : '';
    const textOrder = data.imagePosition === 'right' ? 'order-md-1' : '';
    const detailLink = `/${lang}/products/${data.category}/${data.id}`;

    return (
        <div className='col-lg-12'>
            <article className='portfolio-card'>
                <div className='row g-4'>
                    <div className={`col-md-6 ${imageOrder}`}>
                        <div className='project-visual'>
                            <Image
                                src={data.mainImage}
                                alt={data.name}
                                className='img-fluid'
                                width={600}
                                height={400}
                                loading='lazy'
                                unoptimized={true}
                            />
                            <div className='project-overlay'>
                                <div className='overlay-content'>
                                    <a
                                        href={data.mainImage}
                                        className='view-project glightbox'
                                        aria-label='View product image'
                                    >
                                        <i className='bi bi-eye'></i>
                                    </a>
                                    <Link href={detailLink} className='project-link' aria-label='View product details'>
                                        <i className='bi bi-arrow-up-right'></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`col-md-6 ${textOrder}`}>
                        <div className='project-details'>
                            <div className='project-header'>
                                <span className='project-category'>{data.categoryName}</span>
                                <time className='project-year'>{data.year}</time>
                            </div>
                            <h3 className='project-title'>{data.name}</h3>
                            <p className='project-description'>{data.description}</p>
                            <div className='project-meta'>
                                <div className='project-scope'>
                                    {data.features.map((feature, index) => (
                                        <span key={index} className='scope-item'>
                                            {feature}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
}
