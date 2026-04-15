import Image from 'next/image';

export type HeroData = {
    title: string;
    content: string;
    statistics: {
        number: string;
        label: string;
    }[];
    cta: string;
    img: {
        src: string;
        alt: string;
    };
};

type Props = {
    data: HeroData;
};

export default function Hero({ data }: Props) {
    return (
        <section id='hero' className='hero section light-background'>
            <div className='container' data-aos='fade-up' data-aos-delay='100'>
                <div className='row align-items-center'>
                    <div className='col-lg-6'>
                        <div className='hero-content'>
                            <h1 data-aos='fade-up' data-aos-delay='200'>
                                {data.title}
                            </h1>
                            <p data-aos='fade-up' data-aos-delay='300'>
                                {data.content}
                            </p>
                            <div className='hero-cta' data-aos='fade-up' data-aos-delay='400'>
                                <a href='#about' className='btn-primary'>
                                    {data.cta}
                                </a>
                            </div>
                            <div className='hero-stats' data-aos='fade-up' data-aos-delay='500'>
                                {data.statistics.map((stat) => (
                                    <div className='stat-item' key={stat.label}>
                                        <div className='stat-number'>{stat.number}</div>
                                        <div className='stat-label'>{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-6'>
                        <div className='hero-image' data-aos='fade-left' data-aos-delay='300'>
                            <Image
                                src={data.img.src}
                                alt={data.img.alt}
                                className='img-fluid'
                                width={1024}
                                height={1024}
                                unoptimized={true} // Disable image optimization for exports
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
