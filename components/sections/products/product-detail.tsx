import Image from 'next/image';

import type { ProductJsonData } from '@/lib/models/products';

type Props = {
    data: ProductJsonData;
};

export default function ProductDetail({ data }: Props) {
    return (
        <>
            {/* Project Intro */}
            <div className='project-intro'>
                <div className='intro-content' data-aos='fade-up'>
                    <div className='project-meta'>
                        <span className='project-type'>{data.projectMeta.type}</span>
                        <span className='project-year'>{data.projectMeta.year}</span>
                    </div>
                    <h1 className='project-title'>{data.name}</h1>
                    <p className='project-description'>{data.detailDescription}</p>
                </div>
            </div>

            {/* Showcase */}
            <div className='project-showcase' data-aos='fade-up' data-aos-delay='200'>
                <div className='showcase-slider swiper init-swiper'>
                    <script type='application/json' className='swiper-config'>
                        {JSON.stringify({
                            loop: true,
                            speed: 800,
                            autoplay: { delay: 5000 },
                            effect: 'fade',
                            fadeEffect: { crossFade: true },
                            slidesPerView: 1,
                            pagination: {
                                el: '.swiper-pagination',
                                type: 'bullets',
                                clickable: true,
                            },
                        })}
                    </script>
                    <div className='swiper-wrapper'>
                        {data.showcaseImages.map((img, index) => (
                            <div key={index} className='swiper-slide'>
                                <Image
                                    src={img}
                                    alt={data.name}
                                    className='img-fluid'
                                    width={1200}
                                    height={800}
                                    loading='lazy'
                                    unoptimized={true}
                                />
                            </div>
                        ))}
                    </div>
                    <div className='swiper-pagination'></div>
                </div>
            </div>

            {/* Details Grid */}
            <div className='project-details-grid'>
                <div className='row'>
                    <div className='col-lg-8' data-aos='fade-up' data-aos-delay='100'>
                        <div className='project-narrative'>
                            <h2>{data.introduction.title}</h2>
                            {data.introduction.paragraphs.map((p, index) => (
                                <p key={index}>{p}</p>
                            ))}
                        </div>
                    </div>
                    <div className='col-lg-4' data-aos='fade-up' data-aos-delay='200'>
                        <div className='project-info'>
                            {data.specifications.map((spec, index) => (
                                <div key={index} className='info-block'>
                                    <div className='info-label'>{spec.label}</div>
                                    <div className='info-value'>{spec.value}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Core Advantages */}
            <div className='solution-approach' data-aos='fade-up' data-aos-delay='100'>
                <div className='approach-header'>
                    <h2>{data.coreAdvantages.title}</h2>
                    <p>{data.coreAdvantages.description}</p>
                </div>

                <div className='approach-steps'>
                    {data.coreAdvantages.items.map((item, index) => (
                        <div key={index} className='step-item' data-aos='fade-up' data-aos-delay={150 + index * 50}>
                            <div className='step-number'>{item.number}</div>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Gallery (Optional) */}
            {data.gallery && data.gallery.length > 0 && (
                <div className='project-gallery' data-aos='fade-up' data-aos-delay='100'>
                    <h2>Product Details</h2>
                    <div className='gallery-grid'>
                        {data.gallery.map((img, index) => (
                            <div
                                key={index}
                                className={`gallery-item ${img.featured ? 'featured' : ''}`}
                                data-aos='fade-up'
                                data-aos-delay={200 + index * 50}
                            >
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    className='img-fluid glightbox'
                                    width={600}
                                    height={400}
                                    loading='lazy'
                                    unoptimized={true}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Technical Specs */}
            <div className='technologies-used' data-aos='fade-up' data-aos-delay='100'>
                <div className='row'>
                    <div className='col-lg-6'>
                        <h2>{data.technicalSpecs.title}</h2>
                        <p>{data.technicalSpecs.description}</p>
                    </div>
                    <div className='col-lg-6'>
                        <div className='tech-stack'>
                            {data.technicalSpecs.groups.map((group, index) => (
                                <div
                                    key={index}
                                    className='tech-group'
                                    data-aos='fade-up'
                                    data-aos-delay={150 + index * 50}
                                >
                                    <h4>{group.title}</h4>
                                    <div className='tech-tags'>
                                        {group.tags.map((tag, tagIndex) => (
                                            <span key={tagIndex} className='tech-tag'>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Highlights */}
            <div className='project-outcomes' data-aos='fade-up' data-aos-delay='100'>
                <div className='outcomes-header'>
                    <h2>{data.highlights.title}</h2>
                </div>
                <div className='outcomes-grid'>
                    {data.highlights.items.map((item, index) => (
                        <div key={index} className='outcome-card' data-aos='fade-up' data-aos-delay={150 + index * 50}>
                            <div className='outcome-stat'>{item.stat}</div>
                            <div className='outcome-label'>{item.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
