'use client';

import Image from 'next/image';
import CountUp from 'react-countup';

import { parseCounter } from '@/lib/utils';

export type HeroData = {
    title: string;
    content: string;
    statistics: {
        number: string;
        label: string;
        counter?: boolean;
        style?: string;
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
                                {data.statistics.map((stat) => {
                                    const parsed = parseCounter(stat.number);

                                    if (stat.counter && parsed.hasNumber) {
                                        return (
                                            <div className='stat-item' key={stat.label}>
                                                <div className='stat-number'>
                                                    {parsed.prefix && <span>{parsed.prefix} </span>}
                                                    <CountUp
                                                        start={0}
                                                        end={parsed.value}
                                                        delay={0.5}
                                                        duration={2}
                                                        separator=','
                                                        decimals={
                                                            parsed.rawNumber.includes('.')
                                                                ? parsed.rawNumber.split('.')[1].length
                                                                : 0
                                                        }
                                                        enableScrollSpy
                                                        scrollSpyOnce
                                                    />
                                                    {parsed.suffix && <span>{parsed.suffix}</span>}
                                                </div>
                                                <div className='stat-label'>{stat.label}</div>
                                            </div>
                                        );
                                    }

                                    // fallback
                                    return (
                                        <div className='stat-item' key={stat.label}>
                                            <div className='stat-number'>{stat.number}</div>
                                            <div className='stat-label'>{stat.label}</div>
                                        </div>
                                    );
                                })}
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
                                unoptimized={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
