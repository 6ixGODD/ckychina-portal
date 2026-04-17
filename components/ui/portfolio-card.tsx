'use client';

import Image from 'next/image';

export type PortfolioCardData = {
    category: string;
    year: string;
    title: string;
    description: string;
    image: {
        src: string;
        alt: string;
    };
    link: string;
    tags: string[];
    imageOrder?: 'left' | 'right';
};

type Props = {
    data: PortfolioCardData;
};

export default function PortfolioCard({ data }: Props) {
    const imageOrder = data.imageOrder === 'right' ? 'order-md-2' : '';
    const detailsOrder = data.imageOrder === 'right' ? 'order-md-1' : '';

    return (
        <article className='portfolio-card'>
            <div className='row g-4'>
                <div className={`col-md-6 ${imageOrder}`}>
                    <div className='project-visual'>
                        <Image
                            src={data.image.src}
                            alt={data.image.alt}
                            className='img-fluid'
                            loading='lazy'
                            width={600}
                            height={400}
                            unoptimized={true}
                        />
                        <div className='project-overlay'>
                            <div className='overlay-content'>
                                <a
                                    href={data.image.src}
                                    className='view-project glightbox'
                                    aria-label='View product image'
                                >
                                    <i className='bi bi-eye'></i>
                                </a>
                                <a href={data.link} className='project-link' aria-label='View product details'>
                                    <i className='bi bi-arrow-up-right'></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`col-md-6 ${detailsOrder}`}>
                    <div className='project-details'>
                        <div className='project-header'>
                            <span className='project-category'>{data.category}</span>
                            <time className='project-year'>{data.year}</time>
                        </div>
                        <h3 className='project-title'>{data.title}</h3>
                        <p className='project-description'>{data.description}</p>
                        <div className='project-meta'>
                            <div className='project-scope'>
                                {data.tags.map((tag) => (
                                    <span key={tag} className='scope-item'>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}
