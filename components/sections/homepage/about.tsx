'use client';

import Image from 'next/image';
import CountUp from 'react-countup';

import SectionTitle, { SectionTitleData } from '@/components/ui/section-title';
import { parseCounter } from '@/lib/utils';

export type AboutData = {
    sectionTitle: SectionTitleData;
    logo: {
        src: string;
        alt: string;
    };
    mainContent: {
        title: string;
        lead: string;
        paragraphs: string[];
        stats: {
            number: string;
            label: string;
            counter?: boolean;
            style?: string;
        }[];
    };
    image: {
        src: string;
        alt: string;
    };
    additionalContent: {
        title: string;
        paragraphs: string[];
    };
};

type Props = {
    data: AboutData;
};

export default function About({ data }: Props) {
    return (
        <section id='about' className='about section'>
            <SectionTitle data={data.sectionTitle} />

            <div className='container' data-aos='fade-up' data-aos-delay='100'>
                {/* Logo */}
                <div className='row justify-content-center mb-5' data-aos='zoom-in' data-aos-delay='200'>
                    <div className='image-wrapper text-center'>
                        <Image
                            src={data.logo.src}
                            alt={data.logo.alt}
                            className='cky-full-logo'
                            width={400}
                            height={320}
                            unoptimized={true}
                        />
                    </div>
                </div>

                {/* Main Content */}
                <div className='row align-items-center'>
                    <div className='col-lg-6' data-aos='fade-right' data-aos-delay='200'>
                        <div className='content'>
                            <h2>{data.mainContent.title}</h2>
                            <p className='lead'>{data.mainContent.lead}</p>

                            {data.mainContent.paragraphs.map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}

                            <div className='stats-row'>
                                {data.mainContent.stats.map((stat, index) => {
                                    const parsed = parseCounter(stat.number);

                                    if (stat.counter && parsed.hasNumber) {
                                        return (
                                            <div key={index} className='stat-item'>
                                                <div className='stat-number'>
                                                    {parsed.prefix && <span>{parsed.prefix} </span>}
                                                    <CountUp
                                                        start={0}
                                                        end={parsed.value}
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
                                        <div key={index} className='stat-item'>
                                            <div className='stat-number'>{stat.number}</div>
                                            <div className='stat-label'>{stat.label}</div>
                                        </div>
                                    );
                                })}
                            </div>
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
                                unoptimized={true}
                            />
                        </div>
                    </div>
                </div>

                {/* Additional Content */}
                <div className='row mt-5' data-aos='fade-up' data-aos-delay='400'>
                    <div className='col-12'>
                        <div className='content'>
                            <h3>{data.additionalContent.title}</h3>
                            {data.additionalContent.paragraphs.map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
