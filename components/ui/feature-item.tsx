'use client';

export type FeatureItemData = {
    icon: string;
    title: string;
    description: string;
};

type Props = {
    data: FeatureItemData;
    delay?: number;
};

export default function FeatureItem({ data, delay = 0 }: Props) {
    return (
        <div className='col-lg-6' data-aos='fade-up' data-aos-delay={delay}>
            <div className='feature-item'>
                <div className='icon-wrapper'>
                    <i className={data.icon}></i>
                </div>
                <div className='feature-content'>
                    <h3>{data.title}</h3>
                    <p>{data.description}</p>
                </div>
            </div>
        </div>
    );
}
