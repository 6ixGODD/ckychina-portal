import SectionTitle, { SectionTitleData } from '@/components/ui/section-title';
import ServiceCard, { ServiceCardData } from '@/components/ui/service-card';

export type ServicesData = {
    sectionTitle: SectionTitleData;
    services: ServiceCardData[];
};

type Props = {
    data: ServicesData;
};

export default function Services({ data }: Props) {
    return (
        <section id='services' className='services section'>
            <SectionTitle data={data.sectionTitle} />

            <div className='container' data-aos='fade-up' data-aos-delay='100'>
                <div className='row gy-5 justify-content-center'>
                    {data.services.map((service, index) => (
                        <ServiceCard key={service.title} data={service} delay={200 + index * 100} />
                    ))}
                </div>
            </div>
        </section>
    );
}
