'use client';

type Props = {
    sections: {
        id: string;
        title: string;
        content: string;
    }[];
};

export default function PrivacyContent({ sections }: Props) {
    return (
        <div className='privacy-content'>
            {sections.map((section, index) => (
                <div
                    key={section.id}
                    id={section.id}
                    className='privacy-section'
                    data-aos='fade-up'
                    data-aos-delay={300 + index * 100}
                >
                    <h3>{section.title}</h3>
                    <div dangerouslySetInnerHTML={{ __html: section.content }} />
                </div>
            ))}
        </div>
    );
}
