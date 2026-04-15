type Props = {
    sections: {
        id: string;
        title: string;
        content: string;
    }[];
};

export default function TermsContent({ sections }: Props) {
    return (
        <div className='tos-content'>
            {sections.map((section, index) => (
                <div
                    key={section.id}
                    id={section.id}
                    className='content-section'
                    data-aos='fade-up'
                    data-aos-delay={200 + index * 100}
                >
                    {section.title && <h3>{section.title}</h3>}
                    <div dangerouslySetInnerHTML={{ __html: section.content }} />
                </div>
            ))}
        </div>
    );
}
