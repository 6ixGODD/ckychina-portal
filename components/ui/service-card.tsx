export type ServiceCardData = {
    icon: string;
    title: string;
    description: string;
    link: {
        text: string;
        href: string;
        filter?: string;
    };
};

type Props = {
    data: ServiceCardData;
    delay?: number;
};

export default function ServiceCard({ data, delay = 0 }: Props) {
    return (
        <div className='col-lg-4 col-md-6' data-aos='fade-up' data-aos-delay={delay}>
            <div className='service-item'>
                <div className='service-icon'>
                    <i className={data.icon}></i>
                </div>
                <h3>{data.title}</h3>
                <p>{data.description}</p>
                <a href={data.link.href} className='service-link' data-filter={data.link.filter}>
                    {data.link.text} <i className='bi bi-arrow-right'></i>
                </a>
            </div>
        </div>
    );
}
