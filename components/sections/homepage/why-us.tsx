import Image from 'next/image';

import FeatureItem, { FeatureItemData } from '@/components/ui/feature-item';
import SectionTitle, { SectionTitleData } from '@/components/ui/section-title';

export type WhyUsData = {
    sectionTitle: SectionTitleData;
    mainContent: {
        title: string;
        paragraphs: string[];
    };
    image: {
        src: string;
        alt: string;
    };
    features: FeatureItemData[];
};

type Props = {
    data: WhyUsData;
};

export default function WhyUs({ data }: Props) {
    return (
        <section id='why-us' className='why-us section'>
            <SectionTitle data={data.sectionTitle} />

            <div className='container' data-aos='fade-up' data-aos-delay='100'>
                <div className='row'>
                    <div className='col-lg-6' data-aos='fade-right' data-aos-delay='200'>
                        <div className='content'>
                            <h2>{data.mainContent.title}</h2>
                            {data.mainContent.paragraphs.map((paragraph, index) => (
                                <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
                            ))}
                        </div>
                    </div>
                    <div className='col-lg-6' data-aos='fade-left' data-aos-delay='300'>
                        <div className='image-wrapper'>
                            <Image
                                src={data.image.src}
                                alt={data.image.alt}
                                className='img-fluid'
                                width={600}
                                height={400}
                            />
                        </div>
                    </div>
                </div>

                <div className='features-grid' data-aos='fade-up' data-aos-delay='400'>
                    <div className='row g-5'>
                        {data.features.map((feature, index) => (
                            <FeatureItem key={feature.title} data={feature} delay={100 + index * 100} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
